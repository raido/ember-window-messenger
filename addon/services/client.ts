import { typeOf } from '@ember/utils';
import RSVP, { Promise as EmberPromise } from 'rsvp';
import { assert } from '@ember/debug';
import { dasherize } from '@ember/string';
import { join as runJoin } from '@ember/runloop';
import { guidFor } from '@ember/object/internals';
import Service, { inject as service } from '@ember/service';
import WindowMessengerEventService from './window-messenger-events';
import { ServerResponseMessage } from './server';
import { buildWaiter } from '@ember/test-waiters';

const testWaiter = buildWaiter(
  'ember-window-messenger:client-wait-for-response'
);

export default class WindowMessengerClientService extends Service {
  @service('window-messenger-events')
  windowMessengerEvents!: WindowMessengerEventService;

  callbacks: CallbacksMap = {};
  targets: { [key: string]: Window } = {};

  targetOriginMap: { [key: string]: string } = {}; // This is set from environment config automatically

  /**
   * Add new contentWindow target
   *
   * @param {String} name         String name of the target
   * @param {contentWindow} targetWindow DOM contentWindow
   * @public
   */
  addTarget(name: string, targetWindow: Window) {
    this.targets[name] = targetWindow;
  }

  /**
   * Remove contentWindow target
   *
   * @param  {String} name
   * @public
   */
  removeTarget(name: string) {
    delete this.targets[name];
  }

  /**
   * Tests whether a target is currently registered and open.
   *
   * @param  {String} name
   * @public
   *
   * @return {Boolean}
   */
  hasTarget(name: string) {
    if (!(name in this.targets)) {
      return false;
    }
    return this.targets[name].opener && !this.targets[name].opener.closed;
  }

  /*
   * @private
   * @return {Window}
   */
  _getWindow(): Window {
    return window;
  }

  /**
   * Parse <target>:<request> uri
   *
   * @param  {String} uri
   * @return {Object}
   */
  _parseURI(uri: string) {
    const split = uri.split(':');
    const resource = split[1] || split[0];
    return {
      target: split[1] ? split[0] : 'parent',
      resource: dasherize(resource),
    };
  }

  /**
   * Determine if resource target is parent or not
   *
   * @param  {String}  target
   * @private
   * @return {Boolean}
   */
  _isTargetParent(target: string) {
    const win = this._getWindow();
    const isEmbedded = win.self !== (win.top || win.opener);
    return isEmbedded || target === 'parent';
  }

  /**
   * @private
   * @return {Window}
   */
  _getWindowParent(): Window {
    const win = this._getWindow();
    return win.opener || win.parent;
  }

  /**
   * @param {String} target
   * @private
   * @return {Object}
   */
  _targetFor(target: string) {
    return this._isTargetParent(target)
      ? this._getWindowParent()
      : this.targets[target];
  }

  /**
   * @param {String} target
   * @private
   * @return {String}
   */
  _targetOriginFor(target: string) {
    return this.targetOriginMap[target];
  }

  /**
   * Fetch data from server side
   *
   * @param  {String} path
   * @param  {Object} queryParams
   * @return {Promise}
   */
  fetch<R, Q = void>(path: string, queryParams?: Query & Q): RSVP.Promise<R> {
    const uri = this._parseURI(path);
    const targetName = uri.target;
    const queryObject = queryParams ? { ...queryParams } : {};

    const targetOrigin = this._targetOriginFor(targetName);
    assert(
      `Target origin for target: ${targetName} does not exist`,
      targetOrigin
    );

    const target = this._targetFor(targetName);
    assert(`Target window is not registered for: ${targetName}`, target);

    return new EmberPromise((resolve, reject) => {
      this._lazyRegisterMessagesListener();

      const uuid = guidFor(queryObject);
      const query = {
        id: uuid,
        type: 'ember-window-messenger-client',
        name: uri.resource,
        query: queryObject,
      };

      this.callbacks[uuid] = {
        testWaiterToken: <string>testWaiter.beginAsync(uuid),
        success: (json) => {
          runJoin(null, resolve, json);
        },
        error: (json) => {
          runJoin(null, reject, json);
        },
      };
      target.postMessage(JSON.stringify(query), targetOrigin);
    }, `ember-window-messenger: ${path}`);
  }

  /**
   * Fetch data from server side
   *
   * @param  {String} path
   * @param  {Object} queryParams
   * @return {Promise}
   */
  rpc<R, Q = void>(path: string, queryParams?: Query & Q) {
    return this.fetch<R, Q>(path, queryParams);
  }

  /**
   * Handle message event from Messenger Events
   *
   * @private
   * @param  {Object} message
   */
  _onMessage = (message: ServerResponseMessage) => {
    const { response, id, error } = message;
    const inQueue = this.callbacks[id];

    if (typeOf(inQueue) === 'object') {
      if (error) {
        inQueue.error(response);
      } else {
        inQueue.success(response);
      }
      this.finishAsyncTestWaiter(inQueue.testWaiterToken);
    }
    delete this.callbacks[id];
  };

  _lazyRegisterMessagesListener() {
    this.windowMessengerEvents.on(
      'from:ember-window-messenger-server',
      this._onMessage
    );
  }

  private finishAsyncTestWaiter(token: string) {
    testWaiter.endAsync(token);
  }

  willDestroy() {
    super.willDestroy();
    Object.keys(this.callbacks).forEach((uuid) => {
      const handler = this.callbacks[uuid];
      this.finishAsyncTestWaiter(handler.testWaiterToken);
    });
    this.windowMessengerEvents.off(
      'from:ember-window-messenger-server',
      this._onMessage
    );
  }
}

type Query = Record<string, unknown>;
type Payload =
  | Record<string, unknown>
  | string
  | boolean
  | number
  | null
  | undefined;
type SuccessMethod = (json: Payload) => void;
type ErrorMethod = (json: Payload) => void;

type CallbacksMap = {
  [key: string]: {
    testWaiterToken: string;
    success: SuccessMethod;
    error: ErrorMethod;
  };
};

declare module '@ember/service' {
  interface Registry {
    'window-messenger-client': WindowMessengerClientService;
  }
}
