import { moduleFor, test } from 'ember-qunit';

moduleFor('service:client', 'Unit | Service | Client', {
  // Specify the other units that are required for this test.
  //needs: ['service:server']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  assert.expect(6);

  let name = 'Foo';
  let age = 5;

  let windowEvents = {};

  var client = this.subject({
    answers: {
      'my-name-is': name,
      'my-age-is': age
    },
    window: {
      parent: {
        postMessage: function(payload) {
          function respond(id, answer) {
            let query = {
              id: id,
              type: 'messenger-server-inbound',
              response: answer
            };

            windowEvents['message']({
              data: JSON.stringify(query),
              origin: null,
              source: null
            });
          }

          let question = JSON.parse(payload);
          respond(question.id, client.answers[question.name]);
        }
      },

      addEventListener: function(event, callback) {
        windowEvents[event] = callback;
      }
    }
  });
  assert.ok(client);

  client.fetch('parent:my-name-is').then(function(returnedName) {
    assert.equal(returnedName, name, 'Name should be Foo');
  });

  client.fetch('parent:my-age-is').then(function(returnedAge) {
    assert.equal(returnedAge, age, 'Age should be 5');
  });

  client.addTarget('target-1', {});
  assert.ok(client.get('targets.target-1'), 'There should be an empty target');

  client.removeTarget('target-1');
  assert.equal(null, client.get('targets.target-1'), 'There should not be a target');

  assert.equal(null, client._parseQuestion({}), 'It should return null');
});
