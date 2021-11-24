import { inject as service } from '@ember/service';
import Component from '@ember/component';
import componentLayout from '../templates/components/x-iframe';

export default Component.extend({
  tagName: 'iframe',
  attributeBindings: ['src'],
  layout: componentLayout,

  client: service('window-messenger-client'),

  didInsertElement() {
    this.client.addTarget(this.target, this.element.contentWindow);
  },

  willDestroyElement() {
    this.client.removeTarget(this.target);
  },
});
