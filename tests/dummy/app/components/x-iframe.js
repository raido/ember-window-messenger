import Ember from 'ember';
import componentLayout from '../templates/components/x-iframe';

export default Ember.Component.extend({
  tagName: 'iframe',
  attributeBindings: ['src'],
  layout: componentLayout,

  client: Ember.inject.service('window-messenger-client'),

  didInsertElement() {
    this.get('client').addTarget(this.get('target'), this.$().get(0).contentWindow);
  },

  willDestroyElement() {
    this.get('client').removeTarget(this.get('target'));
  }
});
