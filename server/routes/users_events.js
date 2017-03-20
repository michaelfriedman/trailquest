const express = require('express');
const knex = require('../../knex');
const jwt = require('jsonwebtoken');
const boom = require('boom');
const router = express.Router();

const auth = (req, res, next) => {
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
    if (err) {
      return next(boom.create(401, 'Unauthorized'));
    }

    req.claim = payload;

    next();
  });
};

router.get('/users_events/user/:userId', (req, res, next) => {
  knex('users_events')
    .where('user_id', req.params.userId)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      next(err)
    })
})

router.get('/users_events/trail/:trail_id', (req, res, next) => {
  knex('events')
    .where('trail_id', req.params.trail_id)
    .then((response) => {
      res.send(response)
    })
    .catch((err) => {
      next(err)
    })
})

module.exports = router
