import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { settled } from '@ember/test-helpers';

module('Unit | Service | window messenger client', function (hooks) {
  setupTest(hooks);

  test('it should receive response from the server for targeted request', async function (assert) {
    let client = this.owner.lookup('service:window-messenger-client');
    client.addTarget('target-1', window);
    let server = this.owner.lookup('service:window-messenger-server');

    server.on('client-request', (resolve) => {
      resolve('Hello');
    });
    await client
      .fetch('target-1:client-request')
      .then((response) => assert.equal(response, 'Hello'));
  });

  test('it should throw error if target window is not registered', async function (assert) {
    let client = this.owner.lookup('service:window-messenger-client');

    assert.throws(() => {
      client.fetch('target-1:client-request');
    }, /Target window is not registered for: target-1/);
  });

  test('it should add and remove target', async function (assert) {
    let client = this.owner.lookup('service:window-messenger-client');
    client.addTarget('target-1', window);
    client.removeTarget('target-1');

    assert.throws(() => {
      client.fetch('target-1:client-request');
    }, /Target window is not registered for: target-1/);
  });

  test('it should receive response from the server', async function (assert) {
    let client = this.owner.lookup('service:window-messenger-client');
    let server = this.owner.lookup('service:window-messenger-server');

    server.on('client-request', (resolve) => {
      resolve('Hello');
    });
    await client
      .fetch('client-request')
      .then((response) => assert.equal(response, 'Hello'));
  });

  test('it should receive response from the server - rpc', async function (assert) {
    let client = this.owner.lookup('service:window-messenger-client');
    let server = this.owner.lookup('service:window-messenger-server');

    server.on('client-request', (resolve) => {
      resolve('I am RPC');
    });
    await client
      .rpc('client-request')
      .then((response) => assert.equal(response, 'I am RPC'));
  });

  test('it should receive rejection from the server', async function (assert) {
    let client = this.owner.lookup('service:window-messenger-client');
    let server = this.owner.lookup('service:window-messenger-server');

    server.on('client-request', (resolve, reject) => {
      reject('Failed');
    });
    await client
      .fetch('client-request')
      .catch((response) => assert.equal(response, 'Failed'));
  });

  test('it should receive object from the server', async function (assert) {
    let client = this.owner.lookup('service:window-messenger-client');
    let server = this.owner.lookup('service:window-messenger-server');

    let model = {
      complex: {
        id: 1,
      },
    };

    server.on('client-request', (resolve) => {
      resolve(model);
    });
    await client
      .fetch('client-request')
      .then((response) => assert.deepEqual(response, model));
  });

  test('it should complex rejection object from the server', async function (assert) {
    let client = this.owner.lookup('service:window-messenger-client');
    let server = this.owner.lookup('service:window-messenger-server');

    let error = {
      complex: {
        id: 1,
      },
    };

    server.on('client-request', (resolve, reject) => {
      reject(error);
    });
    await client
      .fetch('client-request')
      .catch((response) => assert.deepEqual(response, error));
  });

  test('it should not receive server response if destroyed', async function (assert) {
    assert.expect(0);
    let client = this.owner.lookup('service:window-messenger-client');
    let server = this.owner.lookup('service:window-messenger-server');

    server.on('client-request', (resolve) => {
      resolve('Hello');
    });
    client.fetch('client-request').then(() => assert.ok(true));

    run(() => {
      client.destroy();
    });
    await settled();
  });
});
