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
      {
        id: 2,
        first_name: 'Biggie',
        last_name: 'Smalls',
        email: 'notorious@big.com',
        hashed_password: '$2a$12$PDaSkiV/jhN4ARdA7ghzYOOiq4.0xRnsueZEW5sUKPp0XtFQIU/9y',
        profile_photo_url: 'https://res.cloudinary.com/dk5dqve4y/image/upload/v1488319564/cfpvbwxgociczr8nifqu.jpg',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC'),
      },
      {
        id: 3,
        first_name: 'Andre',
        last_name: '3000',
        email: 'andre@outkast.com',
        hashed_password: '$2a$12$PDaSkiV/jhN4ARdA7ghzYOOiq4.0xRnsueZEW5sUKPp0XtFQIU/9y',
        profile_photo_url: 'https://res.cloudinary.com/dk5dqve4y/image/upload/v1488319564/cfpvbwxgociczr8nifqu.jpg',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC'),
      },
      {
        id: 4,
        first_name: 'Big',
        last_name: 'Boy',
        email: 'big@outkast.com',
        hashed_password: '$2a$12$PDaSkiV/jhN4ARdA7ghzYOOiq4.0xRnsueZEW5sUKPp0XtFQIU/9y',
        profile_photo_url: 'https://res.cloudinary.com/dk5dqve4y/image/upload/v1488319564/cfpvbwxgociczr8nifqu.jpg',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC'),
      },
      {
        id: 5,
        first_name: 'Dr',
        last_name: 'Dre',
        email: 'dre@deathrowrecords.com',
        hashed_password: '$2a$12$PDaSkiV/jhN4ARdA7ghzYOOiq4.0xRnsueZEW5sUKPp0XtFQIU/9y',
        profile_photo_url: 'https://res.cloudinary.com/dk5dqve4y/image/upload/v1488319564/cfpvbwxgociczr8nifqu.jpg',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC'),
      },
      {
        id: 6,
        first_name: 'Snoop',
        last_name: 'Dogg',
        email: 'snoop@deathrowrecords.com',
        hashed_password: '$2a$12$PDaSkiV/jhN4ARdA7ghzYOOiq4.0xRnsueZEW5sUKPp0XtFQIU/9y',
        profile_photo_url: 'https://res.cloudinary.com/dk5dqve4y/image/upload/v1488319564/cfpvbwxgociczr8nifqu.jpg',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC'),
      },
    ]))
    .then(() => knex.raw(
        "SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));"));
};
