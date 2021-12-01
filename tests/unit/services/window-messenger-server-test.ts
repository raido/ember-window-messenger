import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { settled } from '@ember/test-helpers';
import WindowMessengerServerService, {
  OnEventCallback,
} from 'ember-window-messenger/services/server';

module('Unit | Service | window messenger server', function (hooks) {
  setupTest(hooks);

  test("it should receive client's request", async function (assert) {
    assert.expect(1);
    const server: WindowMessengerServerService = this.owner.lookup(
      'service:window-messenger-server'
    );
    const client = this.owner.lookup('service:window-messenger-client');

    server.on('client-request', (resolve /*, reject, query*/) => {
      assert.ok(true);
      resolve();
    });
    await client.fetch('client-request');
  });

  test("it should not receive client's request if not a match", async function (assert) {
    assert.expect(0);

    const server: WindowMessengerServerService = this.owner.lookup(
      'service:window-messenger-server'
    );
    const client = this.owner.lookup('service:window-messenger-client');

    server.on('client-request', (/*resolve, reject, query*/) => {
      assert.ok(true);
    });
    client.fetch('client-request-no-match');
  });

  test('it should receive query from client', async function (assert) {
    assert.expect(1);
    const server: WindowMessengerServerService = this.owner.lookup(
      'service:window-messenger-server'
    );
    const client = this.owner.lookup('service:window-messenger-client');

    server.on<null, null, { id: number }>(
      'client-request',
      (resolve, _reject, query) => {
        assert.equal(query.id, 1, 'it should have got query parameters');
        resolve();
      }
    );

    await client.fetch('client-request', {
      id: 1,
    });
  });

  test('it should not receive client request if destroyed', async function (assert) {
    assert.expect(0);
    const server: WindowMessengerServerService = this.owner.lookup(
      'service:window-messenger-server'
    );
    const client = this.owner.lookup('service:window-messenger-client');

    server.on('client-request', () => {
      assert.ok(true);
    });
    client.fetch('client-request');
    server.destroy();
    await settled();
  });

  test('it should not receive client request if manually de-registering', async function (assert) {
    assert.expect(0);
    const server: WindowMessengerServerService = this.owner.lookup(
      'service:window-messenger-server'
    );
    const client = this.owner.lookup('service:window-messenger-client');

    const handler: OnEventCallback<null, null, null> = () => {
      assert.ok(true);
    };
    server.on('client-request', handler);
    server.off('client-request', handler);
    client.fetch('client-request');
    await settled();
  });
});
