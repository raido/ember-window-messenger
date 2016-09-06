import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Service.extend(Ember.Evented, {
  windowMessengerEvents: service(),

  init() {
    this._super(...arguments);
    this.get('windowMessengerEvents').on('from:ember-window-messenger-client', this, this.onMessage);
  },

  respond(uuid, payload, event, hasError) {
    let query = {
      id: uuid,
      type: 'ember-window-messenger-server',
      response: payload,
      error: hasError
    };
    event.source.postMessage(JSON.stringify(query), event.origin);
  },

  onMessage(message) {
    this.trigger(message.name, (response) => {
      this.respond(message.id, response, event, false);
    }, (response) => {
      this.respond(message.id, response, event, true);
    }, message.query);
  },

  willDestroy() {
    this._super(...arguments);
    this.get('windowMessengerEvents').off('from:ember-window-messenger-client', this, this.onMessage);
  }
});
