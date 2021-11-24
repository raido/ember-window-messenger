import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default Route.extend({
  server: service('window-messenger-server'),
  client: service('window-messenger-client'),

  init() {
    this._super(...arguments);

    this.get('server').on('demo-data', (resolve, reject, query) => {
      this.controller.set('model', JSON.stringify(query));
      if (query.action === 'nope') {
        reject('No can do');
      } else {
        resolve({
          name: 'Demo',
          version: '1.2.3',
        });
      }
    });
  },

  actions: {
    askTarget1() {
      this.get('client')
        .fetch('target-1:name')
        .then((name) => {
          this.controller.set('model', name);
        });
    },

    openPopup() {
      let win = window.open(
        '/client-server-two/example',
        'Example popup',
        'toolbar=no,resizable=no,width=400,height=400'
      );
      this.get('client').addTarget('popup', win);
      this.controller.set('popup', true);
    },

    askPopup() {
      this.get('client')
        .fetch('popup:popup-name')
        .then((name) => {
          this.controller.set('model', name);
        });
    },
  },
});
