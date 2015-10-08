import Ember from 'ember';

const { run } = Ember;

export default Ember.Service.extend(Ember.Evented, {
  window: null,

  init() {
    this._super(...arguments);
    this.getWindow().addEventListener('message', run.bind(this, 'onMessage'));
  },

  getWindow() {
    return this.get('window');
  },

  respond(id, answer, source) {
    let query = {
      id: id,
      type: 'messenger-server-inbound',
      response: answer
    };
    source.postMessage(JSON.stringify(query), '*');
  },

  onMessage(event) {
    let question = this._parseQuestion(event.data);
    if (question !== null) {
      if ( question.type === 'messenger-client-inbound' ) {
        this.trigger(question.name, (response) => {
          this.respond(question.id, response, event.source);
        }, question.query);
      }
    }
  },

  _parseQuestion(data) {
    if (typeof data !== 'object') {
      return JSON.parse(data) || null;
    }
    return null;
  }
});
