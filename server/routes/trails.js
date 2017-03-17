const router = require('express').Router();
const knex = require('../../knex');
const jwt = require('jsonwebtoken');
const boom = require('boom');

const auth = (req, res, next) => {
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
    if (err) {
      return next(boom.create(401, 'Unauthorized'));
    }

    req.claim = payload;

    next();
  });
};

// router.get('/trails', (_req, res, next) => {
//   knex('trails')
//     .orderBy('name')
//     .then((rows) => {
//       const trails = rows;
//
//       res.send(trails);
//     })
//     .catch((err) => {
//       next(err);
//     });
// });

router.get('/trails/:id', (req, res, next) => {
  const id = Number.parseInt(req.params.id);

  if (Number.isNaN(id)) {
    return next();
  }

  knex('trails')
    .where('id', id)
    .first()
    .then((row) => {
      if (!row) {
        throw boom.create(404, 'Not found');
      }

      const trail = row;

      res.send(trail);
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/trails/:name', (req, res, next) => {
  const name = req.params.name;

  knex('trails')
    .where('name', name)
    .first()
    .then((row) => {
      if (!row) {
        throw boom.create(404, 'Not found');
      }

      const trail = row;

      res.send(trail);
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
