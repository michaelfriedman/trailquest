exports.up = knex => knex.schema.createTable('users_events', (table) => {
  table.increments();
  table.integer('user_id')
    .notNullable()
    .references('users.id')
    .onDelete('CASCADE')
    .index();
  table.integer('event_id')
    .notNullable()
    .references('events.id')
    .onDelete('CASCADE')
    .index();
  table.timestamps(true, true);
});

exports.down = knex => knex.schema.dropTable('users_events');
