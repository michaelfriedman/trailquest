exports.up = knex => knex.schema.createTable('events', (table) => {
  table.increments();
  table.string('trail_name').notNullable().defaultTo('');
  table.string('trail_id').notNullable().defaultTo('');
  table.integer('organizer_id').notNullable().defaultTo(0);
  table.string('event_date');
  table.integer('max_participants');
  table.timestamps(true, true);
});

exports.down = knex => knex.schema.dropTable('events');
