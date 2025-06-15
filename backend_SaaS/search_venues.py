#!/usr/bin/env python3
"""
Robust venue extractor:
• Google 'web' → seat counts etc.
• Google Maps     → street address
• Wikipedia REST  → opening year
• OpenAI chat     → JSON struct
"""

import argparse, json, os, re, sys
from typing import List, Optional

import requests
from serpapi import GoogleSearch
from openai import OpenAI
from dotenv import load_dotenv

# ── env / clients ──────────────────────────────────────────────────────────
load_dotenv()                                       # loads .env automatically
SERPAPI_KEY = os.getenv("SERPAPI_API_KEY") or sys.exit("Missing SERPAPI_API_KEY")
client = OpenAI()                                   # OPENAI_API_KEY auto-loaded

# ── helpers ────────────────────────────────────────────────────────────────
def google_web_snippets(query: str, num: int = 3) -> List[str]:
    """Return up to `num` organic snippets from a normal Google search."""
    data = GoogleSearch({
        "engine": "google",
        "q": query,
        "api_key": SERPAPI_KEY,
        "hl": "en",
        "location": "United States",
        "num": num
    }).get_dict()
    return [
        snip for r in data.get("organic_results", [])
        if (snip := r.get("snippet") or
                   r.get("rich_snippet", {}).get("top", {}).get("snippet"))
    ][:num]

def google_maps_address(place: str) -> Optional[str]:
    """Look up a place in Google Maps and return the first formatted address."""
    data = GoogleSearch({
        "engine": "google_maps",
        "q": place,
        "api_key": SERPAPI_KEY,
        "type": "place"
    }).get_dict()
    try:
        return data["local_results"][0]["address"]
    except (KeyError, IndexError):
        return None

def wiki_opening_year(title: str) -> Optional[str]:
    """Fetch opening/founded year from Wikipedia page summary."""
    url = f"https://en.wikipedia.org/api/rest_v1/page/summary/{title.replace(' ', '_')}"
    try:
        text = requests.get(url, timeout=10).json().get("extract", "")
    except Exception:
        return None
    m = re.search(r"\b(18|19|20)\d{2}\b", text)
    return m.group(0) if m else None

def search_venue_snippets(venue: str, web_num: int = 3) -> str:
    """Aggregate web snippets + Maps address + Wiki year into one text blob."""
    snippets = google_web_snippets(f"{venue} venue specifications", web_num)

    if (addr := google_maps_address(venue)):
        snippets.append(f"Address: {addr}")

    if (yr := wiki_opening_year(venue)):
        snippets.append(f"Year opened: {yr}")

    return "\n\n".join(snippets)

# ── OpenAI extraction ──────────────────────────────────────────────────────
def extract_venue_details(text: str, model="gpt-4o-mini") -> dict:
    prompt = f"""
    Extract the following fields from the text below and return a JSON object
    with exactly these keys. If a field is missing, use null.

    Fields:
    - seat_count (integer)
    - area_sqft (number)
    - num_rooms (integer)
    - address (string)
    - year_opened (integer)

    Text:
    \"\"\"{text}\"\"\"
    """
    resp = client.chat.completions.create(
        model=model,
        temperature=0,
        response_format={"type": "json_object"},
        messages=[
            {"role": "system", "content": "You are a data-extraction assistant."},
            {"role": "user",   "content": prompt}
        ]
    )
    return json.loads(resp.choices[0].message.content)

# ── CLI ────────────────────────────────────────────────────────────────────
def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("venue_name")
    ap.add_argument("--model", default="gpt-4o-mini")
    args = ap.parse_args()

    print(f"🔍  Gathering search data for “{args.venue_name}”…")
    blob = search_venue_snippets(args.venue_name)
    if not blob:
        print("Nothing found – check SerpAPI quota or spelling.")
        return

    print("🤖  Extracting with OpenAI …")
    details = extract_venue_details(blob, model=args.model)

    print("\n🎉  Extracted venue details:")
    print(json.dumps(details, indent=2))

if __name__ == "__main__":
    main()
