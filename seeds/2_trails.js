exports.seed = function (knex) {
  return knex('trails').del()
    .then(() => knex('trails').insert([
      {
        id: 1,
        name: 'Echo Mountain',
        region: 'Puget Sound and Islands',
        location: 'Puget Sound and Islands -- Seattle-Tacoma Area',
        latitude: 47.437,
        longitude: -122.0941,
        distance: 4,
        driving_directions: 'From Bellevue, drive south on I-405 to exit 4 and turn east onto State Route 169 toward Maple Valley. In 6 miles, turn right onto 196th Street and continue 1.4 miles before turning right onto West Spring Lake Drive Southeast. Veer right at the Y junction and continue another 0.9 mile to enter Spring Lake/Lake Desire Park. There is limited parking (four to six cars), so get there early.',
        trail_description: 'The moss-topped rock slabs at the summit of Echo Mountain make for a wonderful location for a late-morning trail brunch, or an evening meal while enjoying a cool breeze before dark. The trails, built in the 1990s by volunteers with Washington Trails Association (WTA), wander the forested ridge leading to the summit of Echo and to the shores of Lake Desire. A wonderful wildland oasis to explore in the northern reaches of the Enumclaw Plateau.  From the summit you can drop down the north side of Echo to find more trails. To close out the 3.2-mile trek, stay left and in about 0.6 mile reach a scenic little footlog bridge over a gurgling brook in an emerald forest. Turn back at the bridge. Or, for a 2-mile outing, go right to loop back to your car.',
        highest_point: 880,
        elevation_gain: 400,
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC'),
      },
    ]))
    .then(() => knex.raw(
        "SELECT setval('trails_id_seq', (SELECT MAX(id) FROM trails));"));
};
