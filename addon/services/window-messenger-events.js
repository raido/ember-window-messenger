import Ember from 'ember';

const { run, set, Evented, Service, computed } = Ember;

export default Service.extend(Evented, {
  window,
  targetOriginMap: null,
  allowedOrigins: computed('targetOriginMap', function() {
    let map = this.get('targetOriginMap');
    return Ember.A(Object.keys(map).map((key) => {
      return map[key];
    }));
  }),
  eventListener: null,

  init() {
    this._super(...arguments);
    let listener = run.bind(this, 'onMessage');
    this.getWindow().addEventListener('message', set(this, 'eventListener', listener));
  },

  getWindow() {
    return this.get('window');
  },

  /**
   * Check if message origin is allowed
   *
   * @param  {String}  origin
   * @private
   * @return {Boolean}
   */

  _isOriginAllowed(origin) {
    return this.get('allowedOrigins').contains(origin);
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

  onMessage(event) {
    if (this._isOriginAllowed(event.origin)) {
      let message = this._parseMessage(event.data);
      if (message !== null) {
        this.trigger(`from:${message.type}`, message);
      }
    }
    return null;
  },

  willDestroy() {
    // Remove event listener when this service is getting destroyed
    this.getWindow().removeEventListener('message', this.get('eventListener'));
    this._super(...arguments);
  }
});
