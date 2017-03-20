const router = require('express').Router();
const knex = require('../../knex');
const jwt = require('jsonwebtoken');
const boom = require('boom');

const auth = (req, res, next) => {
  // eslint-disable-next-line consistent-return
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
    if (err) {
      return next(boom.create(401, 'Unauthorized'));
    }
    // eslint-disable-next-line no-param-reassign
    req.claim = payload;

    next();
  });
};

router.get('/reviews', (_req, res, next) => {
  knex('reviews')
    .then((rows) => {
      const reviews = rows;

      res.send(reviews);
    })
    .catch((err) => {
      next(err);
    });
});

// eslint-disable-next-line consistent-return
router.get('/reviews/:id', (req, res, next) => {
  // eslint-disable-next-line radix
  const id = Number.parseInt(req.params.id);

  if (Number.isNaN(id)) {
    return next();
  }

  knex('reviews')
    .where('id', id)
    .first()
    .then((row) => {
      if (!row) {
        throw boom.create(404, 'Not found');
      }

      const review = row;

      res.send(review);
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/reviews/user/:userId', (req, res, next) => {
  // eslint-disable-next-line camelcase
  const user_id = req.params.userId;

  knex('reviews')
    .where('user_id', user_id)
    .then((row) => {
      if (!row) {
        throw boom.create(404, 'Not found');
      }

      const review = row;

      res.send(review);
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/reviews/trail/:id', (req, res, next) => {
  // eslint-disable-next-line radix
  const id = Number.parseInt(req.params.id);

  if (Number.isNaN(id)) {
    return next();
  }

  knex('reviews')
    .where('trail_id', id)
    .then((row) => {
      if (!row) {
        throw boom.create(404, 'Not found');
      }

      const review = row;

      res.send(review);
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/reviews', (req, res, next) => {
  const { trail_id, user_id, review_body } = req.body;

  knex('reviews')
    .insert({ trail_id, user_id, review_body }, '*')
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
