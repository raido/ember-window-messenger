import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class DemoController extends Controller {
  @service('window-messenger-server')
  server;

  @service('window-messenger-client')
  client;

  @service('router')
  router;

  @tracked
  popup = false;

  @tracked
  model = null;

  get clientServerOneSrc() {
    return this.router.urlFor('client-server-one');
  }

  get clientServerTwoSrc() {
    return this.router.urlFor('client-server-two');
  }

  @action
  askTarget1() {
    this.client.fetch('target-1:name').then((name) => {
      this.model = name;
    });
  }

  @action
  openPopup() {
    let win = window.open(
      this.router.urlFor('client-server-two.example'),
      'Example popup',
      'toolbar=no,resizable=no,width=400,height=400'
    );
    this.client.addTarget('popup', win);
    this.popup = true;
  }

  @action
  askPopup() {
    this.client.fetch('popup:popup-name').then((name) => {
      this.model = name;
    });
  }
}
