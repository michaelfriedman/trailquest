exports.up = knex => knex.schema.createTable('reviews', (table) => {
  table.increments()
  table.integer('trail_id')
    .references('trails.id')
    .onDelete('CASCADE')
  table.integer('user_id')
    .references('users.id')
    .onDelete('CASCADE')
  table.text('review_body').notNullable().defaultTo('')
  table.timestamps()
})

exports.down = knex => knex.schema.dropTable('reviews')
