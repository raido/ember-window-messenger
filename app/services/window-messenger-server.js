import config from '../config/environment';
import Server from 'ember-window-messenger/services/server';

export default Server.extend({
  targetOriginMap: config.APP['ember-window-messenger'] || {}
});
