import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Service.extend(Ember.Evented, {
  windowMessengerEvents: service(),

  init() {
    this._super(...arguments);
    this.get('windowMessengerEvents').on('from:ember-window-messenger-client', this, this._onMessage);
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
   */
  _onMessage(message) {
    this.trigger(message.name, (response) => {
      this._respond(message.id, response, event, false);
    }, (response) => {
      this._respond(message.id, response, event, true);
    }, message.query);
  },

  willDestroy() {
    this._super(...arguments);
    this.get('windowMessengerEvents').off('from:ember-window-messenger-client', this, this._onMessage);
  }
});
