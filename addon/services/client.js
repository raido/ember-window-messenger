import { typeOf } from '@ember/utils';
import { Promise as EmberPromise } from 'rsvp';
import { assert } from '@ember/debug';
import { dasherize } from '@ember/string';
import { join as runJoin } from '@ember/runloop';
import { guidFor } from '@ember/object/internals';
import Service, { inject as service } from '@ember/service';
import { set } from '@ember/object';

export default Service.extend({
  windowMessengerEvents: service(),

  callbacks: null,
  targets: null,

  init() {
    this._super(...arguments);
    this.setProperties({
      targets: {},
      callbacks: {},
    });
    this.windowMessengerEvents.on(
      'from:ember-window-messenger-server',
      this,
      this._onMessage
    );
  },

  /**
   * Add new contentWindow target
   *
   * @param {String} name         String name of the target
   * @param {contentWindow} targetWindow DOM contentWindow
   * @public
   */
  addTarget(name, targetWindow) {
    set(this.targets, name, targetWindow);
  },

  /**
   * Remove contentWindow target
   *
   * @param  {String} name
   * @public
   */
  removeTarget(name) {
    delete this.targets[name];
  },

  /**
   * Tests whether a target is currently registered and open.
   *
   * @param  {String} name
   * @public
   *
   * @return {Boolean}
   */
  hasTarget(name) {
    if (!(name in this.targets)) {
      return false;
    }
    return this.targets[name].opener && !this.targets[name].opener.closed;
  },

  /*
   * @private
   * @return {Window}
   */
  _getWindow() {
    return window;
  },

  /**
   * Parse <target>:<request> uri
   *
   * @param  {String} uri
   * @return {Object}
   */
  _parseURI(uri) {
    let split = uri.split(':');
    let resource = split[1] || split[0];
    return {
      target: split[1] ? split[0] : 'parent',
      resource: dasherize(resource),
    };
  },

  /**
   * Determine if resource target is parent or not
   *
   * @param  {String}  target
   * @private
   * @return {Boolean}
   */
  _isTargetParent(target) {
    let win = this._getWindow();
    let isEmbedded = win.self !== (win.top || win.opener);
    return isEmbedded || target === 'parent';
  },

  /**
   * @private
   * @return {Window}
   */
  _getWindowParent() {
    let win = this._getWindow();
    return win.opener || win.parent;
  },

  /**
   * @param {String} target
   * @private
   * @return {Object}
   */
  _targetFor(target) {
    return this._isTargetParent(target)
      ? this._getWindowParent()
      : this.targets[target];
  },

  /**
   * @param {String} target
   * @private
   * @return {Object}
   */
  _targetOriginFor(target) {
    return this.targetOriginMap[target];
  },

  /**
   * Fetch data from server side
   *
   * @param  {String} path
   * @param  {Object} queryParams
   * @return {Promise}
   */
  fetch(path, queryParams) {
    let uri = this._parseURI(path);
    let targetName = uri.target;
    let queryObject = queryParams ? { ...queryParams } : {};

    let targetOrigin = this._targetOriginFor(targetName);
    assert(
      `Target origin for target: ${targetName} does not exist`,
      targetOrigin
    );

    let target = this._targetFor(targetName);
    assert(`Target window is not registered for: ${targetName}`, target);

    return new EmberPromise((resolve, reject) => {
      let uuid = guidFor(queryObject);
      let query = {
        id: uuid,
        type: 'ember-window-messenger-client',
        name: uri.resource,
        query: queryObject,
      };

      this.callbacks[uuid] = {
        success: (json) => {
          runJoin(null, resolve, json);
        },
        error: (json) => {
          runJoin(null, reject, json);
        },
      };
      target.postMessage(JSON.stringify(query), targetOrigin);
    }, `ember-window-messenger: ${path}`);
  },

  /**
   * Fetch data from server side
   *
   * @param  {String} path
   * @param  {Object} queryParams
   * @return {Promise}
   */
  rpc(path, queryParams) {
    return this.fetch(path, queryParams);
  },

  /**
   * Handle message event from Messenger Events
   *
   * @private
   * @param  {Object} message
   */
  _onMessage(message) {
    let { response, id, error } = message;
    let inQueue = this.callbacks[id];

    if (typeOf(inQueue) === 'object') {
      if (error) {
        inQueue.error(response);
      } else {
        inQueue.success(response);
      }
    }
    delete this.callbacks[id];
  },

  willDestroy() {
    this._super(...arguments);
    this.windowMessengerEvents.off(
      'from:ember-window-messenger-server',
      this,
      this._onMessage
    );
  },
});
