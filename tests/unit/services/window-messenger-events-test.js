import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | window messenger events', function (hooks) {
  setupTest(hooks);

  test('it should register and deregister message event listener', async function (assert) {
    assert.expect(1);

    let service = this.owner.lookup('service:window-messenger-events');

    let message = JSON.stringify({
      id: +new Date(),
      type: 'test-dummy',
      name: 'hello-world',
      query: {},
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

  test('it should handle message, if not allowed origin', async function (assert) {
    assert.expect(0);

    let service = this.owner.lookup('service:window-messenger-events');
    let message = JSON.stringify({
      id: +new Date(),
      type: 'test-dummy',
      name: 'hello-world',
      query: {},
    });

    service.on('from:test-dummy', () => {
      assert.ok(true);
    });

    window.postMessage(message, 'http://localhost:9999');
  });
});
