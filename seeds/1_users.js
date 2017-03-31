exports.seed = (knex) => knex('users').del()
    .then(() => knex('users').insert([
      {
        id: 1,
        first_name: 'Eric',
        last_name: 'Peterson',
        email: 'ericpeterson@gmail.com',
        hashed_password: '$2a$12$PDaSkiV/jhN4ARdA7ghzYOOiq4.0xRnsueZEW5sUKPp0XtFQIU/9y',
        profile_photo_url: 'https://res.cloudinary.com/dk5dqve4y/image/upload/v1488319564/cfpvbwxgociczr8nifqu.jpg',
        phone: '2069999437',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC'),
      },
      {
        id: 2,
        first_name: 'William',
        last_name: 'Clinton',
        email: 'bill@clinton.com',
        hashed_password: '$2a$12$PDaSkiV/jhN4ARdA7ghzYOOiq4.0xRnsueZEW5sUKPp0XtFQIU/9y',
        profile_photo_url: 'http://res.cloudinary.com/dk5dqve4y/image/upload/v1490045088/fcjasqge6qnlxzjooxsa.jpg',
        phone: '2069999438',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC'),
      },
      {
        id: 3,
        first_name: 'Rambo',
        last_name: 'Friedman',
        email: 'rambo@gmail.com',
        hashed_password: '$2a$12$PDaSkiV/jhN4ARdA7ghzYOOiq4.0xRnsueZEW5sUKPp0XtFQIU/9y',
        profile_photo_url: 'https://res.cloudinary.com/dk5dqve4y/image/upload/v1488319564/cfpvbwxgociczr8nifqu.jpg',
        phone: '2069999439',
        created_at: new Date('2017-06-29 14:26:16 UTC'),
        updated_at: new Date('2017-06-29 14:26:16 UTC'),
      },
    ]))
    .then(() => knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));"));
