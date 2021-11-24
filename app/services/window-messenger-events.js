import config from '../config/environment';
import EventsService from 'ember-window-messenger/services/window-messenger-events';

export default class WindowMessengerEventsService extends EventsService {
  targetOriginMap = config.APP['ember-window-messenger'] || {};
}
