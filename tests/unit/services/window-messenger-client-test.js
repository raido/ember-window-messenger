import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

const { getOwner, run } = Ember;

moduleFor('service:window-messenger-client', 'Unit | Service | window messenger client', {
  // Specify the other units that are required for this test.
  needs: ['service:window-messenger-events', 'service:window-messenger-server']
});

test('it should receive response from the server for targeted request', function(assert) {
  let client = this.subject();
  client.addTarget('target-1', window);
  let server = getOwner(client).lookup('service:window-messenger-server');

  server.on('client-request', (resolve) => {
    resolve('Hello');
  });
  client.fetch('target-1:client-request').then((response) => assert.equal(response, 'Hello'));
});

test('it should throw error if target window is not registered', function(assert) {
  let client = this.subject();

  assert.throws(() => {
    client.fetch('target-1:client-request');
  }, /Target window is not registered for: target-1/);
});

test('it should receive response from the server', function(assert) {
  let client = this.subject();
  let server = getOwner(client).lookup('service:window-messenger-server');

  server.on('client-request', (resolve) => {
    resolve('Hello');
  });
  client.fetch('client-request').then((response) => assert.equal(response, 'Hello'));
});

test('it should receive response from the server - rpc', function(assert) {
  let client = this.subject();
  let server = getOwner(client).lookup('service:window-messenger-server');

  server.on('client-request', (resolve) => {
    resolve('I am RPC');
  });
  client.rpc('client-request').then((response) => assert.equal(response, 'I am RPC'));
});

test('it should receive rejection from the server', function(assert) {
  let client = this.subject();
  let server = getOwner(client).lookup('service:window-messenger-server');

  server.on('client-request', (resolve, reject) => {
    reject('Failed');
  });
  client.fetch('client-request').catch((response) => assert.equal(response, 'Failed'));
});

test('it should receive object from the server', function(assert) {
  let client = this.subject();
  let server = getOwner(client).lookup('service:window-messenger-server');

  let model = {
    complex: {
      id: 1
    }
  };

  server.on('client-request', (resolve) => {
    resolve(model);
  });
  client.fetch('client-request').then((response) => assert.deepEqual(response, model));
});

test('it should complex rejection object from the server', function(assert) {
  let client = this.subject();
  let server = getOwner(client).lookup('service:window-messenger-server');

  let error = {
    complex: {
      id: 1
    }
  };

  server.on('client-request', (resolve, reject) => {
    reject(error);
  });
  client.fetch('client-request').catch((response) => assert.deepEqual(response, error));
});

test('it should not receive server response if destroyed', function(assert) {
  assert.expect(0);
  let client = this.subject();
  let server = getOwner(client).lookup('service:window-messenger-server');

  server.on('client-request', (resolve) => {
    resolve('Hello');
  });

  run(() => {
    client.fetch('client-request').then(() => assert.ok(true));
    client.destroy();
  })
});
