import config from '../config/environment';
import EventsService from 'ember-window-messenger/services/window-messenger-events';

export default EventsService.extend({
  targetOriginMap: config.APP['ember-window-messenger'] || {}
});
