import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default class ClientServerTwoRoute extends Route {
  @service('window-messenger-server')
  server;

  activate() {
    this.server.on('popup-name', (resolve) => {
      resolve('I am a popup window :)');
    });
  }
}
