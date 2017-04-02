import { moduleFor, test } from 'ember-qunit';

moduleFor('service:window-messenger-client', 'Unit | Service | Client', {
  // Specify the other units that are required for this test.
  needs: ['service:window-messenger-events']
});

test('it works', function(assert) {
  let service = this.subject();
  assert.ok(service);
});
