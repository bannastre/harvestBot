const express = require('express');
const bodyParser = require('body-parser');
const timesheet = require('./timesheet.js');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello HarvestBot!');
});

app.post('/timesheet', (req, res) => {
  // const hours = req.body.text;
  const hours = req.query.time;

  timesheet.validateHours(hours)
  .then(timesheet.post(req, res, hours))
  .catch(() => { res.send('ERR: Please specify a legit number of hours'); });
});

app.listen(port, () => console.log(`HarvestBot listening on port ${port}!`));
