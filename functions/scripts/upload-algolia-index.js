const algoliasearch = require('algoliasearch');
const { readFile } = require('fs').promises;

const client = algoliasearch('ALGOLIA_APPLICATION_ID', 'ALGOLIA_ADMIN_API_KEY');
const index = client.initIndex('ALGOLIA_INDEX_NAME');

const main = async () => {
  const data = JSON.parse(await readFile('index.json', 'utf-8'));

  index
    .saveObjects(data)
    .then(({ objectIDs }) => {
      console.log(objectIDs);
    })
    .catch((err) => {
      console.log(err);
    });
};

main();
