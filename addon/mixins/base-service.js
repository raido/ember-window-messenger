import Ember from 'ember';

const { run } = Ember;

export default Ember.Mixin.create({
  window: null,
  targetOriginMap: null,

  init() {
    this._super(...arguments);
    this.getWindow().addEventListener('message', run.bind(this, 'onMessage'));
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

  _getMessageForType(type, event) {
    if (this._isOriginAllowed(event.origin)) {
      let message = this._parseMessage(event.data);
      if (message !== null) {
        if (message.type === type) {
          return message;
        }
      }
    }
    return null;
  }
});
