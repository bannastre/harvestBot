const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello HarvestBot!');
});

app.post('/hours', (req, res) => {
  console.log('------HARVEST--------');
  console.log('req text: ', req.body.text);
  console.log('------HARVEST--------');
  res.send("Got a post request... so that's good");
});

app.listen(port, () => {
  console.log(`HarvestBot listening on port ${port}!`);
});
