import { moduleFor, test } from 'ember-qunit';

moduleFor('service:window-messenger-client', 'Unit | Service | Client', {
  // Specify the other units that are required for this test.
  // needs: ['service:server']
});

// Replace this with your real tests.
test('It works', function(assert) {
  assert.expect(8);

  let name = 'Foo';
  let age = 5;
  let notFound = 404;
  let rpc = 200;

  let windowEvents = {};

  let client = this.subject({
    targetOriginMap: {
      parent: '*'
    },
    answers: {
      'my-name-is': name,
      'my-age-is': age,
      'not-found': notFound,
      'rpc-run': rpc,
      'json-object': {
        key: 'json'
      }
    },
    window: {
      parent: {
        postMessage: (payload, targetOrigin) => {
          function respond(uuid, responsePayload, hasError) {
            let query = {
              id: uuid,
              type: 'ember-window-messenger-server',
              response: responsePayload,
              error: hasError
            };

            windowEvents.message({
              data: JSON.stringify(query),
              origin: targetOrigin,
              source: null
            });
          }

          let question = JSON.parse(payload);
          let error = false;
          if (question.name === 'not-found') {
            error = true;
          }
          respond(question.id, client.answers[question.name], error);
        }
      },

      addEventListener: (event, callback) => {
        windowEvents[event] = callback;
      },

      removeEventListener: (event) => {
        delete windowEvents[event];
      }
    }
  });
  assert.ok(client);

  client.fetch('parent:my-name-is').then(function(returnedName) {
    assert.equal(returnedName, name, 'Name should be Foo');
  });

  client.fetch('parent:json-object').then(function(obj) {
    assert.equal(obj.key, 'json', 'It should be an object with key field');
  });

  client.fetch('parent:my-age-is').then(function(returnedAge) {
    assert.equal(returnedAge, age, 'Age should be 5');
  });

  client.fetch('parent:not-found').then(null, function(returnedError) {
    assert.equal(returnedError, notFound, 'It should match the response: 404');
  });

  client.rpc('parent:rpc-run').then(function(statusCode) {
    assert.equal(statusCode, rpc, 'RPC status code should match');
  });

  client.addTarget('target-1', {});
  assert.ok(client.get('targets.target-1'), 'There should be an empty target');

  client.removeTarget('target-1');
  assert.equal(null, client.get('targets.target-1'), 'There should not be a target');
});
