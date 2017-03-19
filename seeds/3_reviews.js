exports.seed = function (knex) {
  return knex('reviews').del()
    .then(() => {
      return knex('reviews').insert([
        {
          id: 1,
          trail_id: 342,
          user_id: 1,
          review_body: 'This hike was freaking amazing.'
        },
      ])
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('reviews_id_seq', (SELECT MAX(id) FROM reviews));"
      )
    })
}
