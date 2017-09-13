require('dotenv').config();

const Promise = require('bluebird');
const request = require('request');

const today = new Date(Date.now());

const validateHours = hours => new Promise(() => hours <= 24 && hours !== 0);

const post = (req, res, hours) => {
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

  request.post({
    url,
    headers: auth,
    body: form,
    json: true
  },
  (err) => {
    if (err) { throw err; }
    res.send(`Logged ${hours} hour(s) to Harvest!`);
  });
};

module.exports = {
  validateHours, post
};
