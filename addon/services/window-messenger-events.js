import Ember from 'ember';

const { run, set, Evented, Service } = Ember;

export default Service.extend(Evented, {
  window,
  targetOriginMap: null,
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
    let map = this.get('targetOriginMap');
    let targets = Object.keys(map);
    let origins = Ember.A();
    targets.forEach((target) => {
      if (map.hasOwnProperty(target)) {
        origins.push(map[target]);
      }
    });
    return origins.indexOf(origin) !== -1;
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
