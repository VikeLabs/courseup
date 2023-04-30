from algoliasearch.search_client import SearchClient, SearchIndex, List
from pydantic import BaseModel


class AlgoliaIndex(BaseModel):
    name: str
    term: str
    description: str
    subject: str
    code: str
    pid: str
    in_session: bool  # i don't know how to get this...
    profs: str


class Algolia:
    _cx: SearchClient
    _idx: SearchIndex

    def __init__(self, app_id: str, key: str) -> None:
        self._cx = SearchClient.create(app_id, key)
        self._idx = self._cx.init_index("courseup")

    def set_index(self, data: List[AlgoliaIndex]) -> None:
        opt = {"autoGenerateObjectIDIfNotExist": True}
        self._idx.save_objects([i.dict() for i in data], opt)
