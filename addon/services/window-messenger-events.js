import { A } from '@ember/array';
import { bind as runBind } from '@ember/runloop';
import Evented from '@ember/object/evented';
import Service from '@ember/service';
import { computed, set } from '@ember/object';

export default Service.extend(Evented, {
  window,
  targetOriginMap: null,
  allowedOrigins: computed('targetOriginMap', function () {
    let map = this.targetOriginMap;
    return A(
      Object.keys(map).map((key) => {
        return map[key];
      })
    );
  }),
  eventListener: null,

  init() {
    this._super(...arguments);
    let listener = runBind(this, '_onMessage');
    this._getWindow().addEventListener(
      'message',
      set(this, 'eventListener', listener)
    );
  },

  /**
   * @private
   * @return {Window}
   */
  _getWindow() {
    return this.window;
  },

  /**
   * Check if message origin is allowed
   *
   * @param  {String}  origin
   * @private
   * @return {Boolean}
   */

  _isOriginAllowed(origin) {
    return this.allowedOrigins.includes(origin);
  },

  _parseMessage(data) {
    let message = null;
    if (typeof data === 'string') {
      try {
        message = JSON.parse(data);
      } catch (e) {
        /* Ignored */
      }
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
    this._getWindow().removeEventListener('message', this.eventListener);
  },
});
