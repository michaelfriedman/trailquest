exports.up = knex => knex.schema.createTable('trails', (table) => {
  table.increments();
  table.string('name').defaultTo('');
  table.string('features').defaultTo('');
  table.string('google_map').defaultTo('');
  table.string('current_rating').defaultTo('');
  table.string('thumbnail').defaultTo('');
  table.string('region_image').defaultTo('');
  table.string('region').defaultTo('');
  table.string('location').defaultTo('');
  table.string('latitude');
  table.string('longitude');
  table.string('distance').defaultTo();
  table.text('driving_directions').defaultTo('');
  table.text('trail_description').defaultTo('');
  table.string('highest_point');
  table.string('elevation_gain');
  table.timestamps(true, true);
});

exports.down = knex => knex.schema.dropTable('trails');
