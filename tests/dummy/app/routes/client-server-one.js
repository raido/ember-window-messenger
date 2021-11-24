import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default Route.extend({
  client: service('window-messenger-client'),
  server: service('window-messenger-server'),

  init() {
    this._super(...arguments);

    this.server.on('name', (resolve) => {
      resolve('My name is: Target 1 - client/server one');
    });
  },

  actions: {
    askParent() {
      this.client.fetch('demo-data', { action: 'yes' }).then((response) => {
        this.controller.set('model', JSON.stringify(response));
      });
    },

    askParentFail() {
      this.client.fetch('demo-data', { action: 'nope' }).catch((response) => {
        this.controller.set('model', response);
      });
    },
  },
});
