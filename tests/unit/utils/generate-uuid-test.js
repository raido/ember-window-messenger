import generateUuid from 'ember-window-messenger/utils/generate-uuid';
import { module, test } from 'qunit';

module('Unit | Utility | generate uuid');

// Replace this with your real tests.
test('it works', function(assert) {
  let uuid1 = generateUuid();
  let uuid2 = generateUuid();
  assert.notEqual(uuid1, uuid2, 'All the values should be unique');
});
