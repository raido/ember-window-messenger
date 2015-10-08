import Ember from 'ember';
import BaseServiceMixin from '../mixins/base-service';

export default Ember.Service.extend(Ember.Evented, BaseServiceMixin, {

  respond(id, answer, source, error) {
    let query = {
      id: id,
      type: 'messenger-server-inbound',
      response: answer,
      error: error
    };
    source.postMessage(JSON.stringify(query), '*');
  },

  onMessage(event) {
    let question = this._parseQuestion(event.data);
    if (question !== null) {
      if ( question.type === 'messenger-client-inbound' ) {
        this.trigger(question.name, (response) => {
          this.respond(question.id, response, event.source, false);
        }, (response) => {
          this.respond(question.id, response, event.source, true);
        }, question.query);
      }
    }
  }
});
