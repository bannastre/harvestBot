require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

const validateHours = hours => hours <= 24 && hours !== 0;

app.get('/', (req, res) => {
  res.send('Hello HarvestBot!');
});

app.post('/hours', (req, res) => {
  const today = new Date(Date.now());
  const hours = req.body.text;
  const url = process.env.URL;
  const auth = {
    Authorization: process.env.AUTHORIZATION,
    'Content-Type': process.env.CONTENT_TYPE,
    Accept: process.env.ACCEPT
  };
  const form = {
    id: process.env.ID,
    user_id: process.env.USER_ID,
    spent_at: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`,
    project_id: process.env.PROJECT_ID,
    task_id: process.env.TASK_ID,
    project: process.env.PROJECT,
    task: process.env.TASK,
    client: process.env.CLIENT,
    hours_without_timer: hours,
    hours
  };

  const options = {
    url,
    headers: auth,
    body: form,
    json: true
  };

  if (validateHours(hours)) {
    request.post(options, (err, httpResponse, body) => {
      if (err) { throw err; }
      res.send(body);
    });
  } else {
    res.send('ERR: Please specify a legit number of hours');
  }
});

app.listen(port, () => {
  console.log(`HarvestBot listening on port ${port}!`);
});
