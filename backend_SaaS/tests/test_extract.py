# tests/test_extract.py
import search_venues, json, pytest

def test_extract_venue_details(monkeypatch):
    # mock OpenAI
    fake_json = '{"seat_count":1000,"area_sqft":50000,"num_rooms":12,"address":"foo","year_opened":2000}'
    class FakeCompletion:
        choices = [type("x",(object,),{"message":type("y",(object,),{"content":fake_json})})()]
    monkeypatch.setattr(search_venues.openai.ChatCompletion, "create",
                        lambda *a, **k: FakeCompletion)

    out = search_venues.extract_venue_details("dummy")
    assert json.loads(out)["seat_count"] == 1000
