import { moduleFor, test } from 'ember-qunit';

moduleFor('service:window-messenger-server', 'Unit | Service | server', {
  // Specify the other units that are required for this test.
  needs: ['service:window-messenger-events']
});

// Replace this with your real tests.
test('It works', function(assert) {
  assert.expect(4);

  let service = this.subject({
    targetOriginMap: {
      parent: '*'
    },

    window: {
      addEventListener: (/*event, callback*/) => {

      },

      removeEventListener: () => {

      }
    }
  });
  assert.ok(service);

  // Resolved request
  service.on('resolved-request', (resolve) => {
    resolve(200);
  });

  service.onMessage({
    source: {
      postMessage: (payload) => {
        let json = JSON.parse(payload);
        assert.ok(json.response, 200, 'It should match');
      }
    },
    origin: '*',
    data: '{ "type": "ember-window-messenger-client", "name": "resolved-request" }'
  });

  // Rejected request
  service.on('rejected-request', (resolve, reject) => {
    reject(404);
  });

  service.onMessage({
    source: {
      postMessage: (payload) => {
        let json = JSON.parse(payload);
        assert.ok(json.response, 404, 'It should match');
      }
    },
    origin: '*',
    data: '{ "type": "ember-window-messenger-client", "name": "rejected-request" }'
  });

  // Query
  service.on('query-request', (resolve, reject, query) => {
    assert.equal(query.key, 'name', 'Query parameter should exist');
  });

  service.onMessage({
    source: {
      postMessage: () => {}
    },
    origin: '*',
    data: '{ "type": "ember-window-messenger-client", "name": "query-request", "query": { "key": "name"} }'
  });
});
