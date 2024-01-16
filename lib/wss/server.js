const cors = require('cors');
const express = require('express');

const app = express();
app.use(cors);
const PORT = process.env.WSSPORT ?? 1738;

app.get('/', (req, res) => {
  res.status(200).send({ msg: 'hello world' });
});

app.listen(PORT, () => {
  console.log('CourseUp wss backend active on port: ' + PORT);
});
