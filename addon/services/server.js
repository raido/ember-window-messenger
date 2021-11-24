import Service, { inject as service } from '@ember/service';

export default class WindowMessengerServerService extends Service {
  @service('window-messenger-events')
  windowMessengerEvents;

  registeredResources = {};

  init() {
    super.init();
    this.windowMessengerEvents.on(
      'from:ember-window-messenger-client',
      this._onMessage
    );
  }

  /**
   * Send response to back to client
   *
   * @param  {String}  uuid
   * @param  {Object}  payload
   * @param  {MessageEvent}  event
   * @param  {Boolean} hasError
   */
  _respond(uuid, payload, event, hasError) {
    let query = {
      id: uuid,
      type: 'ember-window-messenger-server',
      response: payload,
      error: hasError,
    };
    event.source.postMessage(JSON.stringify(query), event.origin);
  }

  /**
   * Handle message that we got from Messenger Events
   *
   * @param  {Object} message
   * @param  {Object} event
   */
  _onMessage = (message, event) => {
    this.trigger(
      message.name,
      (response) => {
        this._respond(message.id, response, event, false);
      },
      (response) => {
        this._respond(message.id, response, event, true);
      },
      message.query
    );
  };

  willDestroy() {
    super.willDestroy();
    this.windowMessengerEvents.off(
      'from:ember-window-messenger-client',
      this._onMessage
    );
  }

  on(resourceName, callback) {
    this.registeredResources[resourceName] = callback;
  }

  off(resourceName, callback) {
    if (this.registeredResources[resourceName] === callback) {
      this.registeredResources[resourceName] = null;
    }
  }

  trigger(resourceName, resolve, reject, query) {
    const cb = this.registeredResources[resourceName];
    if (cb) {
      cb(resolve, reject, query);
    }
  }
}
