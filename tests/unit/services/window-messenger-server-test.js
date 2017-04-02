import { moduleFor, test } from 'ember-qunit';

moduleFor('service:window-messenger-server', 'Unit | Service | server', {
  // Specify the other units that are required for this test.
  needs: ['service:window-messenger-events']
});

// Replace this with your real tests.
test('it works', function(assert) {
  let service = this.subject();

  assert.ok(service);
});
