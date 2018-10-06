import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { settled } from '@ember/test-helpers';

module('Unit | Service | window messenger server', function(hooks) {
  setupTest(hooks);

  test('it should receive client\'s request', function(assert) {
    let server = this.owner.lookup('service:window-messenger-server');
    let client = this.owner.lookup('service:window-messenger-client');

    server.on('client-request', (/*resolve, reject, query*/) => {
      assert.ok(true);
    });
    client.fetch('client-request');
    return settled();
  });

  test('it should not receive client\'s request if not a match', function(assert) {
    assert.expect(0);

    let server = this.owner.lookup('service:window-messenger-server');
    let client = this.owner.lookup('service:window-messenger-client');

    server.on('client-request', (/*resolve, reject, query*/) => {
      assert.ok(true);
    });
    client.fetch('client-request-no-match');
    return settled();
  });

  test('it should receive query from client', function(assert) {
    let server = this.owner.lookup('service:window-messenger-server');
    let client = this.owner.lookup('service:window-messenger-client');

    server.on('client-request', (resolve, reject, query) => {
      assert.equal(query.id, 1, 'it should have got query parameters');
    });

    client.fetch('client-request', {
      id: 1
    });
    return settled();
  });

  test('it should not receive client request if destroyed', function(assert) {
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
    return settled();
  });
});
