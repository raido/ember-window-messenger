import { A } from '@ember/array';
import { run } from '@ember/runloop';
import Evented from '@ember/object/evented';
import Service from '@ember/service';
import { computed, set } from '@ember/object';

export default Service.extend(Evented, {
  window,
  targetOriginMap: null,
  allowedOrigins: computed('targetOriginMap', function() {
    let map = this.get('targetOriginMap');
    return A(Object.keys(map).map((key) => {
      return map[key];
    }));
  }),
  eventListener: null,

  init() {
    this._super(...arguments);
    let listener = run.bind(this, '_onMessage');
    this._getWindow().addEventListener('message', set(this, 'eventListener', listener));
  },

  /**
   * @private
   * @return {Window}
   */
  _getWindow() {
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
    return this.get('allowedOrigins').includes(origin);
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

  _onMessage(event) {
    if (this._isOriginAllowed(event.origin)) {
      let message = this._parseMessage(event.data);
      if (message !== null) {
        this.trigger(`from:${message.type}`, message, event);
      }
    }
    return null;
  },

  willDestroy() {
    this._super(...arguments);
    // Remove event listener when this service is getting destroyed
    this._getWindow().removeEventListener('message', this.get('eventListener'));
  }
});
