import Ember from 'ember';

const { run } = Ember;

export default Ember.Mixin.create({
  window: null,

  init() {
    this._super(...arguments);
    this.getWindow().addEventListener('message', run.bind(this, 'onMessage'));
  },

  getWindow() {
    return this.get('window');
  },

  _parseMessage(data) {
    let message = null;
    if (typeof data === 'string') {
      try {
        message = JSON.parse(data);
      } catch(e) {/* Ignored */}
    }
    return message;
  },

  _getMessageForType(type, data) {
    let message = this._parseMessage(data);
    if (message !== null) {
      if ( message.type === type ) {
        return message;
      }
    }
    return null;
  }
});
