const test = require('tape');

test('cleanupFeatures', assert => {
  const message = 'should return a string of characters';
  const actual = cleanupFeatures("{'Wildflowers/Meadows','Mountain views','Wildlife','Good for kids''}");
  const expected = 'Wildflowers/Meadows, Mountain views, Wildlife, Good for kids';

  assert.equal(actual, expected, message);
  assert.equal();
});