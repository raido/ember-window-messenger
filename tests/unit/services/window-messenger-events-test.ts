import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { settled } from '@ember/test-helpers';
import WindowMessengerEventService, {
  OnEventCallback,
} from 'ember-window-messenger/services/window-messenger-events';
import waitUntil from '@ember/test-helpers/wait-until';

module('Unit | Service | window messenger events', function (hooks) {
  setupTest(hooks);

  test('it should register and deregister message event listener when destroyed', async function (assert) {
    assert.expect(1);

    let service: WindowMessengerEventService = this.owner.lookup(
      'service:window-messenger-events'
    );

    let message = JSON.stringify({
      id: +new Date(),
      type: 'test-dummy',
      name: 'hello-world',
      query: {},
    });

    service.on<{ name: string }>('from:test-dummy', (payload) => {
      assert.equal(payload.name, 'hello-world');
      service.destroy();
    });
    // send first message
    window.postMessage(message, '*');

    await settled();

    // send second message
    window.postMessage(message, '*');
  });

  test('it should register and deregister message event listener manually', async function (assert) {
    assert.expect(1);

    let service: WindowMessengerEventService = this.owner.lookup(
      'service:window-messenger-events'
    );

    let message = JSON.stringify({
      id: +new Date(),
      type: 'test-dummy',
      name: 'hello-world',
      query: {},
    });

    let gotTheMessage = false;
    const handler: OnEventCallback<{ name: string }> = (payload) => {
      assert.equal(payload.name, 'hello-world');
      gotTheMessage = true;
    };
    service.on<{ name: string }>('from:test-dummy', handler);
    // send first message
    window.postMessage(message, '*');

    await waitUntil(() => {
      return gotTheMessage;
    });

    service.off('from:test-dummy', handler);

    // send second message
    window.postMessage(message, '*');

    await settled();
  });

  test('it should handle message, if not allowed origin', async function (assert) {
    assert.expect(0);

    let service: WindowMessengerEventService = this.owner.lookup(
      'service:window-messenger-events'
    );
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
    await settled();
  });
});
