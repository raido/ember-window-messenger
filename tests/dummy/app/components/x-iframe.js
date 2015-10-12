import Ember from 'ember';
import layout from '../templates/components/x-iframe';

export default Ember.Component.extend({
  tagName: 'iframe',
  attributeBindings: ['src'],
  layout: layout,

  client: Ember.inject.service('window-messenger-client'),

  didInsertElement: function() {
    this.get('client').addTarget(this.get('target'), this.$().get(0).contentWindow);
  },

  willDestroyElement: function() {
    this.get('client').removeTarget(this.get('target'));
  }
});
