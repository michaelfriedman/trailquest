const express = require('express');
const knex = require('../../knex');
const jwt = require('jsonwebtoken');
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

// This gets all the information about one event
router.get('/events/event/:eventId', (req, res, next) => {
  const id = req.params.eventId;
  knex('events')
    .where('id', id)
    .then((details) => {
      res.send(details);
    })
    .catch((err) => {
      next(err);
    });
});

// this grabs all the users from one event
router.get('/events/:eventId', (req, res, next) => {
  const eventId = req.params.eventId;
  knex('users_events')
    .where('event_id', eventId)
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      next(err);
    });
});


// this grabs all the events that have been created
router.get('/events/', (req, res, next) => {
  knex('events')
    .then((events) => {
      res.send(events);
    })
    .catch((err) => {
      next(err);
    });
});

// this grabs all the events for one user
router.get('/events/user/:userId', (req, res, next) => {
  const userId = req.params.userId;
  knex('events')
    .where('organizer_id', userId)
    .then((events) => {
      res.send(events);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/events', (req, res, next) => {
  const { trail_id, max_participants, organizer_id, event_date, trail_name } = req.body;

  knex('events')
    .insert({ trail_id, max_participants, organizer_id, event_date, trail_name }, '*')
    .then(event => {
      res.send(event);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
