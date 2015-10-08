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

  assert.equal(null, subject._parseQuestion({}), 'It should return null');
  assert.equal(win, subject.getWindow(), 'It should match, window objects');
});
