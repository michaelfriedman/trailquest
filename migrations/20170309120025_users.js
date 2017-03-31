exports.up = knex => knex.schema.createTable('users', (table) => {
  table.increments();
  table.string('first_name').defaultTo('');
  table.string('last_name').defaultTo('');
  table.string('email').unique().notNullable();
  table.specificType('hashed_password', 'char(60)').notNullable();
  table.string('profile_photo_url').defaultTo('');
  table.string('phone').unique();
  table.timestamps(true, true);
});

exports.down = knex => knex.schema.dropTable('users');
