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

// This gets all the information about one event
router.get('/events/event/:eventId', (req, res, next) => {
  const id = req.params.eventId;
  // console.log('event id', req.params.eventId)
  knex('events')
    .innerJoin('trails', 'trails.id', 'events.trail_id')
    .innerJoin('users', 'users.id', 'events.organizer_id')
    .where('events.id', id)
    .then((details) => {
      // console.log(details)
      if (details.length) {
        delete details[0].hashed_password;
      }
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
    .select('events.id as id', 'users.phone as phone', 'trails.features as features', 'users.first_name as first_name', 'users.last_name as last_name', 'users.email as email', 'events.max_participants as max_participants', 'trails.distance as distance', 'users.profile_photo_url as profile_photo_url', 'trails.elevation_gain as elevation_gain', 'trails.region as region', 'trails.trail_description as trail_description', 'trails.driving_directions as driving_directions', 'trails.current_rating as current_rating', 'trails.latitude as latitude', 'trails.longitude as longitude', 'trails.name as trail_name', 'events.event_time as event_time', 'events.event_date as event_date')
    .innerJoin('trails', 'trails.id', '=', 'events.trail_id')
    .innerJoin('users', 'users.id', '=', 'events.organizer_id')
    .then((events) => {
      events.map(item => {
        delete item.hashed_password;
      });
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
  const { event_date, event_time, organizer_id, trail_id, trail_name, max_participants } = req.body;
  knex('events')
    .insert({ trail_id, max_participants, organizer_id, event_date, trail_name, event_time }, '*')
    .then(event => {
      res.send(event);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
