import Ember from 'ember';
import BaseServiceMixin from 'ember-window-messenger/mixins/base-service';
import { module, test } from 'qunit';

module('Unit | Mixin | base service');

// Replace this with your real tests.
test('it works', function(assert) {
  var BaseServiceObject = Ember.Object.extend(BaseServiceMixin);
  var win = {
    addEventListener(event) {
      assert.equal('message', event, 'It should register message event listener');
    }
  };

  var subject = BaseServiceObject.create({
    window: win
  });

  assert.ok(subject);

  assert.equal(null, subject._parseMessage({}), 'It should return null');
  assert.ok(subject._parseMessage('{}'), 'It should return empty object');
  assert.equal(win, subject.getWindow(), 'It should match, window objects');

  let message = subject._getMessageForType('my-type', '{ "type": "my-type" }');
  assert.ok(message, 'It should return message for the type');

  let messageNotExisting = subject._getMessageForType('my-type-not-existing', '{ "type": "my-type" }');
  assert.equal(null, messageNotExisting, 'It should return null for non matching type');

  let unparseableMessage = subject._getMessageForType('my-type-unparseable', '');
  assert.equal(null, unparseableMessage, 'It should return null for non parseable message');
});
