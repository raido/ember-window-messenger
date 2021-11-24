import config from '../config/environment';
import Client from 'ember-window-messenger/services/client';

export default class WindowMessengerClientService extends Client {
  targetOriginMap = config.APP['ember-window-messenger'] || {};
}
