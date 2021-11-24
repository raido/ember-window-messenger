import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ClientServerOneController extends Controller {
  @service('window-messenger-server')
  server;

  @service('window-messenger-client')
  client;

  @tracked
  model = null;

  @action
  askParent() {
    this.client.fetch('demo-data', { action: 'yes' }).then((response) => {
      this.model = JSON.stringify(response);
    });
  }

  @action
  askParentFail() {
    this.client.fetch('demo-data', { action: 'nope' }).catch((response) => {
      this.model = response;
    });
  }
}
