import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default Route.extend({
  server: service('window-messenger-server'),

  init() {
    this._super(...arguments);

    this.get('server').on('popup-name', (resolve) => {
      resolve('I am a popup window :)');
    });
  },
});
