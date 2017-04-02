import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

const { run } = Ember;

moduleFor('service:window-messenger-events', 'Unit | Service | window messenger events', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
});

test('it should register and deregister message event listener', function(assert) {
  assert.expect(1);

  let service = this.subject();

  let message = JSON.stringify({
    id: +new Date(),
    type: 'test-dummy',
    name: 'hello-world',
    query: {}
  });

  service.on('from:test-dummy', (payload) => {
    assert.equal(payload.name, 'hello-world');
    run(() => {
      service.destroy();
    });
  });
  // send first message
  window.postMessage(message, '*');

  // send second message
  window.postMessage(message, '*');
});
