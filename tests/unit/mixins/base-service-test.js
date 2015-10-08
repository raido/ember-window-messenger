import Ember from 'ember';
import BaseServiceMixin from 'ember-window-messenger/mixins/base-service';
import { module, test } from 'qunit';

module('Unit | Mixin | base service');

// Replace this with your real tests.
test('it works', function(assert) {
  var BaseServiceObject = Ember.Object.extend(BaseServiceMixin);
  var subject = BaseServiceObject.create({
    window: {
      addEventListener(event) {
        assert.equal('message', event, 'It should register message event listener');
      }
    }
  });
  assert.ok(subject);
});
