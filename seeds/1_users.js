exports.seed = function (knex) {
  return knex('users').del()
    .then(() => knex('users').insert([
      {
        id: 1,
        first_name: 'Tupac',
        last_name: 'Shakur',
        email: '2pac@shakur.com',
        hashed_password: '$2a$12$PDaSkiV/jhN4ARdA7ghzYOOiq4.0xRnsueZEW5sUKPp0XtFQIU/9y',
        profile_photo_url: 'https://res.cloudinary.com/dk5dqve4y/image/upload/v1488319564/cfpvbwxgociczr8nifqu.jpg',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC'),
      },
    ]))
    .then(() => knex.raw(
        "SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));"));
};
