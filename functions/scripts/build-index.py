import json
import requests
from algoliasearch.search_client import SearchClient

client = SearchClient.create('ACBOOIQ3QR', 'APIKEY')
index = client.init_index('courseup')

res = requests.get(
    'https://uvic.kuali.co/api/v1/catalog/courses/62daf5348b7d47001d0fc384')
response = json.loads(res.text)

# name
# term
# desc
# sub
# code
# pid
# insession
# profs

# Batching is done automatically by the API client
index.save_objects(response, {'autoGenerateObjectIDIfNotExist': True})
