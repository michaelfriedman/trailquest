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
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        first_name: 'Rambo',
        last_name: 'Friedman',
        email: 'rambo@gmail.com',
        hashed_password: '$2a$12$PDaSkiV/jhN4ARdA7ghzYOOiq4.0xRnsueZEW5sUKPp0XtFQIU/9y',
        profile_photo_url: 'https://res.cloudinary.com/dk5dqve4y/image/upload/v1488319564/cfpvbwxgociczr8nifqu.jpg',
        phone: '2069999439',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 3,
        first_name: 'Ali',
        last_name: 'Jenkins',
        email: 'alij@gmail.com',
        hashed_password: '$2a$12$PDaSkiV/jhN4ARdA7ghzYOOiq4.0xRnsueZEW5sUKPp0XtFQIU/9y',
        profile_photo_url: 'http://res.cloudinary.com/dk5dqve4y/image/upload/v1490921919/m5gyuwksqiqwyahyvvzj.jpg',
        phone: '2069999438',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]))
    .then(() => knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));"));
