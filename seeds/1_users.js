exports.seed = (knex) => knex('users').del()
    .then(() => knex('users').insert([
      {
        id: 1,
        first_name: 'Eric',
        last_name: 'Smith',
        email: 'ericsmith@gmail.com',
        hashed_password: '$2a$12$PDaSkiV/jhN4ARdA7ghzYOOiq4.0xRnsueZEW5sUKPp0XtFQIU/9y',
        profile_photo_url: 'https://res.cloudinary.com/dk5dqve4y/image/upload/v1488319564/cfpvbwxgociczr8nifqu.jpg',
        phone: '2069999437',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC'),
      },
      {
        id: 2,
        first_name: 'Michael',
        last_name: 'Friedman',
        email: 'michaelfriedman@gmail.com',
        hashed_password: '$2a$12$PDaSkiV/jhN4ARdA7ghzYOOiq4.0xRnsueZEW5sUKPp0XtFQIU/9y',
        profile_photo_url: 'https://res.cloudinary.com/dk5dqve4y/image/upload/v1488319564/cfpvbwxgociczr8nifqu.jpg',
        phone: '2069999439',
        created_at: new Date('2017-01-03 09:26:16 UTC'),
        updated_at: new Date('2017-01-03 09:26:16 UTC'),
      },
      {
        id: 3,
        first_name: 'Ali',
        last_name: 'Jenkins',
        email: 'alij@gmail.com',
        hashed_password: '$2a$12$PDaSkiV/jhN4ARdA7ghzYOOiq4.0xRnsueZEW5sUKPp0XtFQIU/9y',
        profile_photo_url: 'http://res.cloudinary.com/dk5dqve4y/image/upload/v1490921919/m5gyuwksqiqwyahyvvzj.jpg',
        phone: '2069999438',
        created_at: new Date('2017-03-03 09:26:16 UTC'),
        updated_at: new Date('2017-03-03 09:26:16 UTC'),
      },
    ]))
    .then(() => knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));"));
