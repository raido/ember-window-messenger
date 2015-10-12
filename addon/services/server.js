import Ember from 'ember';
import BaseServiceMixin from '../mixins/base-service';

export default Ember.Service.extend(Ember.Evented, BaseServiceMixin, {

  respond(id, answer, event, error) {
    let query = {
      id: id,
      type: 'ember-window-messenger-server',
      response: answer,
      error: error
    };
    event.source.postMessage(JSON.stringify(query), event.origin);
  },

  onMessage(event) {
    let message = this._getMessageForType('ember-window-messenger-client', event.data);
    if (message !== null) {
      this.trigger(message.name, (response) => {
        this.respond(message.id, response, event, false);
      }, (response) => {
        this.respond(message.id, response, event, true);
      }, message.query);
    }
  }
});
