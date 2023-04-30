from typing import List
from algolia import Algolia, AlgoliaIndex
from database import get_data
import os


# NOTE: Batching is done automatically by the API client
if __name__ == "__main__":
    algolia_api_key = os.environ["ALGOLIA_API_KEY"]
    algolia_app_id = os.environ["ALGOLIA_APP_ID"]
    dsn = os.environ["DATABASE_URL"]

    key_map = {
        "DATABASE_URL": dsn,
        "ALGOLIA_APP_ID": algolia_app_id,
        "ALGOLIA_API_KEY": algolia_api_key,
    }

    for key, val in key_map:
        if val == "":
            raise Exception(f"Missing {key} env")

    cx = Algolia("ACBOOIQ3QR", "APIKEY")

    data: List[AlgoliaIndex] = get_data(dsn)

    cx.set_index(data)  # set index
