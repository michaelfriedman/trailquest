exports.seed = (knex) => knex('users_events').del()
    .then(() => knex('users_events').insert([
    ]))
  .then(() => knex.raw("SELECT setval('users_events_id_seq', (SELECT MAX(id) FROM users_events));"));
