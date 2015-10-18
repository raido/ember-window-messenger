import { moduleFor, test } from 'ember-qunit';

moduleFor('service:window-messenger-server', 'Unit | Service | server', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let service = this.subject({
    window: {
      addEventListener: (/*event, callback*/) => {

      }
    }
  });
  assert.ok(service);
});
