exports.seed = (knex) => knex('events').del()
    .then(() => knex('events').insert([
      {
        id: 1,
        trail_name: 'Aasgard Pass',
        trail_id: 611,
        event_date: new Date(02-14-2018),
        organizer_id: 1,
        max_participants: 4,
      },
      {
        id: 2,
        trail_name: 'Silver Lake - Monte Cristo',
        trail_id: 211,
        event_date: new Date(09-14-2025),
        organizer_id: 1,
        max_participants: 4,
      },
    ]))
    .then(() => knex.raw("SELECT setval('events_id_seq', (SELECT MAX(id) FROM events));"));
