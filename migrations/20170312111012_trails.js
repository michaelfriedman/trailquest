exports.up = knex => knex.schema.createTable('trails', (table) => {
  table.increments();
  table.string('name').defaultTo('');
  table.string('region').defaultTo('');
  table.string('location').defaultTo('');
  table.decimal('latitude');
  table.decimal('longitude');
  table.decimal('distance').defaultTo();
  table.text('driving_directions').defaultTo('');
  table.text('trail_description').defaultTo('');
  table.integer('highest_point');
  table.integer('elevation_gain');
  table.timestamps(true, true);
});

exports.down = knex => knex.schema.dropTable('trails');
