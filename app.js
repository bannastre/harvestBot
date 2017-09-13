const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello HarvestBot!');
});

app.post('/hours', (req, res) => {
  console.log('req.params: ', req.params);
  res.send("Got a post request... so that's good");
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
