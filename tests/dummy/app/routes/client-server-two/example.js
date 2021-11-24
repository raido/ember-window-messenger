import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default class ClientServerTwoExampleRoute extends Route {
  @service('window-messenger-client')
  client;

  model() {
    return this.client.fetch('demo-data');
  }
}
