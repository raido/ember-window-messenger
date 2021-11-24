import Evented from '@ember/object/evented';
import Service, { inject as service } from '@ember/service';

export default Service.extend(Evented, {
  windowMessengerEvents: service(),

  init() {
    this._super(...arguments);
    this.windowMessengerEvents.on(
      'from:ember-window-messenger-client',
      this,
      this._onMessage
    );
  },

  /**
   * Send response to back to client
   *
   * @param  {String}  uuid
   * @param  {Object}  payload
   * @param  {MessageEvent}  event
   * @param  {Boolean} hasError
   */
  _respond(uuid, payload, event, hasError) {
    let query = {
      id: uuid,
      type: 'ember-window-messenger-server',
      response: payload,
      error: hasError,
    };
    event.source.postMessage(JSON.stringify(query), event.origin);
  },

  /**
   * Handle message that we got from Messenger Events
   *
   * @param  {Object} message
   * @param  {Object} event
   */
  _onMessage(message, event) {
    this.trigger(
      message.name,
      (response) => {
        this._respond(message.id, response, event, false);
      },
      (response) => {
        this._respond(message.id, response, event, true);
      },
      message.query
    );
  },

  willDestroy() {
    this._super(...arguments);
    this.windowMessengerEvents.off(
      'from:ember-window-messenger-client',
      this,
      this._onMessage
    );
  },
});
