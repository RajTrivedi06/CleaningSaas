#!/usr/bin/env python3
import os
import argparse
import json
from serpapi import GoogleSearch
import openai
from dotenv import load_dotenv

# ——————— Setup ———————
# 1. pip install openai serpapi python-dotenv
# 2. Create a .env file with your keys:
#    OPENAI_API_KEY=sk-…
#    SERPAPI_API_KEY=your_serpapi_key

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")
SERPAPI_API_KEY = os.getenv("SERPAPI_API_KEY")

def search_venue_snippets(venue_name, num_results=3):
    """Use SerpAPI to grab the top snippets for a venue."""
    params = {
        "engine": "google",
        "q": f"{venue_name} venue specifications",
        "api_key": SERPAPI_API_KEY,
        "num": num_results
    }
    search = GoogleSearch(params)
    data = search.get_dict()
    snippets = []
    for r in data.get("organic_results", []):
        text = r.get("snippet") or r.get("rich_snippet", {}).get("top", {}).get("snippet")
        if text:
            snippets.append(text)
    return "\n\n".join(snippets)

def extract_venue_details(text, model="gpt-4-turbo"):
    """Ask ChatGPT to pull out the fields we care about."""
    prompt = f"""
Extract the following fields from the text below and return a JSON object with exactly these keys.
If a field is missing, use null.

Fields:
- seat_count (integer)
- area_sqft (number)
- num_rooms (integer)
- address (string)
- year_opened (integer)

Text:
\"\"\"{text}\"\"\"
"""
    resp = openai.ChatCompletion.create(
        model=model,
        temperature=0,
        messages=[
            {"role": "system", "content": "You are a data extraction assistant."},
            {"role": "user", "content": prompt}
        ]
    )
    # The assistant should reply with raw JSON
    return resp.choices[0].message.content.strip()

def main():
    parser = argparse.ArgumentParser(description="Search for a venue and extract specs via ChatGPT.")
    parser.add_argument("venue_name", help="Name of the venue to lookup")
    parser.add_argument("--model", default="gpt-4-turbo",
                        help="OpenAI model to use (e.g. gpt-3.5-turbo or gpt-4-turbo)")
    args = parser.parse_args()

    print(f"🔍 Searching for '{args.venue_name}'…")
    snippets = search_venue_snippets(args.venue_name)
    if not snippets:
        print("No search snippets found. Check your SerpAPI key or query.")
        return

    print("🤖 Extracting details with OpenAI…")
    details_json = extract_venue_details(snippets, model=args.model)

    # Pretty–print the JSON
    try:
        details = json.loads(details_json)
    except json.JSONDecodeError:
        print("⚠️  Got a non-JSON response, here it is raw:\n")
        print(details_json)
        return

    print("\n🎉 Extracted venue details:")
    print(json.dumps(details, indent=2))

if __name__ == "__main__":
    main()
