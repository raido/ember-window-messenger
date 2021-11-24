import { A } from '@ember/array';
import Service from '@ember/service';

export default class WindowMessengerEventService extends Service {
  registeredEvents = {};

  targetOriginMap = {}; // This is set from environment config automatically

  get allowedOrigins() {
    let map = this.targetOriginMap;
    return A(
      Object.keys(map).map((key) => {
        return map[key];
      })
    );
  }

  constructor() {
    super();
    window.addEventListener('message', this._onMessage);
  }

  on(eventName, callback) {
    this.registeredEvents[eventName] = callback;
  }

  off(eventName, callback) {
    if (this.registeredEvents[eventName] === callback) {
      this.registeredEvents[eventName] = null;
    }
  }

  trigger(eventName, message, event) {
    const cb = this.registeredEvents[eventName];
    if (cb) {
      cb(message, event);
    }
  }

  /**
   * Check if message origin is allowed
   *
   * @param  {String}  origin
   * @private
   * @return {Boolean}
   */

  _isOriginAllowed(origin) {
    return this.allowedOrigins.includes(origin);
  }

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
  }

  _onMessage = (event) => {
    if (this._isOriginAllowed(event.origin)) {
      let message = this._parseMessage(event.data);
      if (message !== null) {
        this.trigger(`from:${message.type}`, message, event);
      }
    }
    return null;
  };

  willDestroy() {
    super.willDestroy();
    // Remove event listener when this service is getting destroyed
    window.removeEventListener('message', this._onMessage);
  }
}
