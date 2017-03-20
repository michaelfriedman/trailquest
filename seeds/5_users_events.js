exports.seed = (knex) => knex('users_events').del()
    .then(() => knex('users_events').insert([
      {
        id: 1,
        user_id: 1,
        event_id: 2,
      },
      {
        id: 2,
        user_id: 1,
        event_id: 1,
      },
      {
        id: 3,
        user_id: 2,
        event_id: 2,
      },
      {
        id: 4,
        user_id: 2,
        event_id: 1,
      },
    ]))
  .then(() => knex.raw("SELECT setval('users_events_id_seq', (SELECT MAX(id) FROM users_events));"));
