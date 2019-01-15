import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { settled } from '@ember/test-helpers';

module('Unit | Service | window messenger server', function(hooks) {
  setupTest(hooks);

  test('it should receive client\'s request', async function(assert) {
    assert.expect(1);
    let server = this.owner.lookup('service:window-messenger-server');
    let client = this.owner.lookup('service:window-messenger-client');

    server.on('client-request', (/*resolve, reject, query*/) => {
      assert.ok(true);
    });
    client.fetch('client-request');
  });

  test('it should not receive client\'s request if not a match', async function(assert) {
    assert.expect(0);

    let server = this.owner.lookup('service:window-messenger-server');
    let client = this.owner.lookup('service:window-messenger-client');

    server.on('client-request', (/*resolve, reject, query*/) => {
      assert.ok(true);
    });
    client.fetch('client-request-no-match');
  });

  test('it should receive query from client', async function(assert) {
    let server = this.owner.lookup('service:window-messenger-server');
    let client = this.owner.lookup('service:window-messenger-client');

    server.on('client-request', (resolve, reject, query) => {
      assert.equal(query.id, 1, 'it should have got query parameters');
    });

    client.fetch('client-request', {
      id: 1
    });
  });

  test('it should not receive client request if destroyed', async function(assert) {
    assert.expect(0);
    let server = this.owner.lookup('service:window-messenger-server');
    let client = this.owner.lookup('service:window-messenger-client');

    server.on('client-request', () => {
      assert.ok(true);
    });

    run(() => {
      server.destroy();
      client.fetch('client-request');
    });
    await settled();
  });

  test('it should receive messages with newly observed message types', async function(assert) {
    assert.expect(2);

    const server = this.owner.lookup('service:window-messenger-server');
    const client = this.owner.lookup('service:window-messenger-client');
    const message = JSON.stringify({
      id: +new Date(),
      type: 'test-dummy',
      name: 'hello-world',
      query: {}
    });

    server.on('hello-world', () => {
      assert.ok(true);
    });

    server.on('listen-to-type', () => {
      server.listenToType('test-dummy');
      assert.deepEqual(server.get('observedTypes'), ['test-dummy']);
    });

    window.postMessage(message, '*');
    client.fetch('listen-to-type');
    window.postMessage(message, '*');
  });

  test('it should not receive messages from ignored message types', async function(assert) {
    assert.expect(1);

    const server = this.owner.lookup('service:window-messenger-server');
    const message = JSON.stringify({
      id: +new Date(),
      type: 'test-dummy',
      name: 'hello-world',
      query: {}
    });

    server.on('hello-world', () => {
      assert.ok(false);
    });

    server.listenToType('test-dummy');
    server.ignoreType('test-dummy');

    assert.deepEqual(server.get('observedTypes'), []);

    window.postMessage(message, '*');
  });
});
