import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class XIframeComponent extends Component {
  @service('window-messenger-client')
  client;

  @action
  register(element) {
    this.client.addTarget(this.args.target, element.contentWindow);
  }

  @action
  unregister() {
    this.client.removeTarget(this.args.target);
  }
}
