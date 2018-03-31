import config from '../config/environment';
import Client from 'ember-window-messenger/services/client';

export default Client.extend({
  targetOriginMap: null,
  init() {
    this._super(...arguments);
    this.set('targetOriginMap', config.APP['ember-window-messenger'] || {});
  }
});
