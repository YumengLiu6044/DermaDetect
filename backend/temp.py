import requests
from pprint import pprint

header = {
    "X-Algolia-Application-Id": "55WTPYUY7Q",
    "X-Algolia-API-Key": "41da89e44195a72b2d9d109eeee8db8f",
    "Content-Type": "application/json; charset=UTF-8",
    "origin": "https://find-a-derm.aad.org",
    "referer": "https://find-a-derm.aad.org/"
}

AAD_URL_BASE = "https://55wtpyuy7q-dsn.algolia.net/1/indexes/production/query"
json_payload = {
    "query": "Melanoma",
    "aroundLatLng": "33.684566,-117.826508",
    "getRankingInfo": True,
    "aroundRadius": 10000000,
    "page": 0,
}

response = requests.post(AAD_URL_BASE, json=json_payload, headers=header)

# print(response.json())
pprint(response.headers)
