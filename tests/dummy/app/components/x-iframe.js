import { inject as service } from '@ember/service';
import Component from '@ember/component';
import componentLayout from '../templates/components/x-iframe';

export default Component.extend({
  tagName: 'iframe',
  attributeBindings: ['src'],
  layout: componentLayout,

  client: service('window-messenger-client'),

  didInsertElement() {
    this.get('client').addTarget(this.get('target'), this.$().get(0).contentWindow);
  },

  willDestroyElement() {
    this.get('client').removeTarget(this.get('target'));
  }
});
