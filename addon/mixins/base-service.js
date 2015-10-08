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

  _parseQuestion(data) {
    if (typeof data !== 'object') {
      return JSON.parse(data) || null;
    }
    return null;
  }
});
