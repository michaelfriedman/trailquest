if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const morgan = require('morgan');

const app = express();
const path = require('path');
const token = require('./routes/token');
const users = require('./routes/users');
const trails = require('./routes/trails');
const reviews = require('./routes/reviews');
const users_events = require('./routes/users_events');
// const events = require('./routes/events');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

app.disable('x-powered-by');


app.use(morgan('dev'));

app.use(express.static(path.resolve(__dirname, '..', 'build')));
app.use(express.static('assets'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(token);
app.use(users);
app.use(trails);
app.use(reviews);
// app.use(events);
app.use(users_events);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

app.use((err, _req, res, _next) => {
  if (err.status) {
    return res.status(err.status).send(err);
  }

  if (err.output && err.output.statusCode) {
    return res
      .status(err.output.statusCode)
      .set('Content-Type', 'text/plain')
      .send(err.message);
  }

  console.error(err.stack);
  res.sendStatus(500);
});

module.exports = app;
