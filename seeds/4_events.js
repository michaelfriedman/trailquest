exports.seed = (knex) => knex('events').del()
    .then(() => knex('events').insert([
      {
        id: 1,
        trail_name: 'Aasgard Pass',
        trail_id: 611,
        event_date: new Date(09-14-2025),
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
      {
        id: 3,
        trail_name: 'Quinault National Recreation Trails',
        trail_id: 509,
        event_date: new Date(09-14-2030),
        organizer_id: 3,
        max_participants: 6,
      }
    ]))
    .then(() => knex.raw("SELECT setval('events_id_seq', (SELECT MAX(id) FROM events));"));
