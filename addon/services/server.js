import Evented from '@ember/object/evented';
import Service, { inject as service } from '@ember/service';

export default Service.extend(Evented, {
  windowMessengerEvents: service(),

  init() {
    this._super(...arguments);
    this.set('observedTypes', []);
    this.get('windowMessengerEvents').on('from:ember-window-messenger-client', this, this._onMessage);
  },

  /**
   * Listen to messages published with a custom type
   *
   * @param {String} type - value to match in the message's type property
   */
  listenToType(type) {
    this.get('observedTypes').push(type);
    this.get('windowMessengerEvents').on(`from:${type}`, this, this._onMessage);
  },

  /**
   * Ignore messages published with the specified type
   *
   * @param {String} type - value to ignore in future messages' type property
   */
  ignoreType(type) {
    const index = this.get('observedTypes').indexOf(type);
    if (index != -1) {
      this.get('observedTypes').splice(index, 1);
      this.get('windowMessengerEvents').off(`from:${type}`, this, this._onMessage);
    }
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
      error: hasError
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
    this.trigger(message.name, (response) => {
      this._respond(message.id, response, event, false);
    }, (response) => {
      this._respond(message.id, response, event, true);
    }, message.query);
  },

  willDestroy() {
    this._super(...arguments);
    const windowMessengerEvents = this.get('windowMessengerEvents');
    windowMessengerEvents.off('from:ember-window-messenger-client', this, this._onMessage);
    this.get('observedTypes').forEach(type => windowMessengerEvents.off(`from:${type}`, this, this._onMessage));
  }
});
