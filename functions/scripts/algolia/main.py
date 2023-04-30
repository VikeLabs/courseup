import json
import requests
import psycopg
from pydantic import BaseModel
from algolia import Algolia


class AlgoliaIndex(BaseModel):
    name: str
    term: str
    description: str
    subject: str
    code: str
    pid: str
    in_session: bool
    profs: str


if __name__ == "__main__":
    cx = Algolia("ACBOOIQ3QR", "APIKEY")
    cx.set_index([])  # set index

    # name
    # term
    # desc
    # sub
    # code
    # pid
    # insession
    # profs

    # Batching is done automatically by the API client
