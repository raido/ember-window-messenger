import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

const { run } = Ember;

moduleFor('service:window-messenger-events', 'Unit | Service | window messenger events', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
});

// Replace this with your real tests.
test('it works', function(assert) {
  let win = {
    addEventListener(event) {
      assert.equal('message', event, 'It should register message event listener');
    },
    removeEventListener(event) {
      assert.equal('message', event, 'It should de-register message event listener');
    }
  };

  let subject = this.subject({
    window: win,
    targetOriginMap: {
      'target-1': 'http://localhost:4200'
    }
  });

  assert.ok(subject);

  assert.equal(subject._parseMessage({}), null, 'It should return null');
  assert.ok(subject._parseMessage('{}'), 'It should return empty object');
  assert.equal(win, subject.getWindow(), 'It should match, window objects');

  let message = subject._getMessageForType('my-type', {
    origin: 'http://localhost:4200',
    data: '{ "type": "my-type" }'
  });
  assert.ok(message, 'It should return message for the type');

  let messageNotExisting = subject._getMessageForType('my-type-not-existing', {
    origin: 'http://localhost:4200',
    data: '{ "type": "my-type" }'
  });
  assert.equal(messageNotExisting, null, 'It should return null for non matching type');

  let unparseableMessage = subject._getMessageForType('my-type-unparseable', {
    origin: 'http://localhost:4200',
    data: ''
  });
  assert.equal(unparseableMessage, null, 'It should return null for non parseable message');

  let notAllowedOrigin = subject._getMessageForType('my-type', {
    origin: 'http://random.host',
    data: '{ "type": "my-type" }'
  });
  assert.equal(notAllowedOrigin, null, 'It should return null for not allowed origin');

  assert.ok(subject._isOriginAllowed('http://localhost:4200'), 'Origin should be allowed');
  run(null, () => {
    subject.destroy();
  });
});
