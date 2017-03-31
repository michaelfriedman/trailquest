const express = require('express');
const knex = require('../../knex');
const bcrypt = require('bcrypt-as-promised');
const jwt = require('jsonwebtoken');

const router = express.Router();

const auth = (req, res, next) => {
  // eslint-disable-next-line consistent-return
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
    if (err) {
      return next(err);
    }
    // eslint-disable-next-line no-param-reassign
    req.claim = payload;

    next();
  });
};

router.get('/users', auth, (req, res, next) => {
  knex('users')
    .whereNot('id', req.claim.userId)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/users/id', auth, (req, res, next) => {
  knex('users')
    .where('id', req.claim.userId)
    .first()
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/users', (req, res, next) => {
  let user;
  const { first_name, last_name, email, phone, password, profile_photo_url } = req.body;
  knex('users').where('email', email)
    .then((data) => {
      if (data.length) {
        throw new Error('email already exists in database');
      }
      return bcrypt.hash(password, 12);
    })
    // eslint-disable-next-line camelcase
    .then((hashed_password) => {
      user = { first_name, last_name, email, phone, hashed_password, profile_photo_url };

      return knex('users').insert((user), '*');
    })
    .then((array) => {
      user = array[0];
      delete user.hashed_password;

      const claim = { userId: array[0].id };
      const token = jwt.sign(claim, process.env.JWT_KEY, {
        expiresIn: '120 days',
      });

      res.cookie('token', token, {
        httpOnly: true,
        // eslint-disable-next-line no-mixed-operators
        expiresIn: new Date(Date.now() + 3600000 * 24 * 120),
        secure: router.get('env') === 'Production',
      }).send(user);
    })
    .catch(err => next(err));
});

module.exports = router;
