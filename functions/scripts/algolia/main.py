from typing import List
from algolia import Algolia, AlgoliaIndex
from database import get_data
import os


if __name__ == "__main__":
    cx = Algolia("ACBOOIQ3QR", "APIKEY")
    dsn = os.environ["DATABASE_URL"]  # TODO: change this dsn

    if dsn == "":
        raise Exception("Missing DATABASE_URL env")

    data: List[AlgoliaIndex] = get_data(dsn)

    cx.set_index(data)  # set index

    # name
    # term
    # desc
    # sub
    # code
    # pid
    # insession
    # profs

    # Batching is done automatically by the API client
