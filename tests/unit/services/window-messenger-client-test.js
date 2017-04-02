import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

const { getOwner } = Ember;

moduleFor('service:window-messenger-client', 'Unit | Service | window messenger client', {
  // Specify the other units that are required for this test.
  needs: ['service:window-messenger-events', 'service:window-messenger-server']
});

test('it should receive response from the server', function(assert) {
  let client = this.subject();
  let server = getOwner(client).lookup('service:window-messenger-server');

  server.on('client-request', (resolve) => {
    resolve('Hello');
  });
  client.fetch('client-request').then((response) => assert.equal(response, 'Hello'));
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
