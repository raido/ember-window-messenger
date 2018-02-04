import { getOwner } from '@ember/application';
import { run } from '@ember/runloop';
import { moduleFor, test } from 'ember-qunit';
import wait from 'ember-test-helpers/wait';

moduleFor('service:window-messenger-server', 'Unit | Service | window messenger server', {
  // Specify the other units that are required for this test.
  needs: ['service:window-messenger-events', 'service:window-messenger-client']
});

test('it should receive client\'s request', function(assert) {
  let server = this.subject();
  let client = getOwner(server).lookup('service:window-messenger-client');

  server.on('client-request', (/*resolve, reject, query*/) => {
    assert.ok(true);
  });
  client.fetch('client-request');
  return wait();
});

test('it should not receive client\'s request if not a match', function(assert) {
  assert.expect(0);

  let server = this.subject();
  let client = getOwner(server).lookup('service:window-messenger-client');

  server.on('client-request', (/*resolve, reject, query*/) => {
    assert.ok(true);
  });
  client.fetch('client-request-no-match');
  return wait();
});

test('it should receive query from client', function(assert) {
  let server = this.subject();
  let client = getOwner(server).lookup('service:window-messenger-client');

  server.on('client-request', (resolve, reject, query) => {
    assert.equal(query.id, 1, 'it should have got query parameters');
  });

  client.fetch('client-request', {
    id: 1
  });
  return wait();
});

test('it should not receive client request if destroyed', function(assert) {
  assert.expect(0);
  let server = this.subject();
  let client = getOwner(server).lookup('service:window-messenger-client');

  server.on('client-request', () => {
    assert.ok(true);
  });

  run(() => {
    server.destroy();
    client.fetch('client-request');
  });
  return wait();
});
