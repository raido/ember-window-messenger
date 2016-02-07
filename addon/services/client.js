import Ember from 'ember';
import BaseServiceMixin from '../mixins/base-service';

const { run, aliasMethod, guidFor } = Ember;

export default Ember.Service.extend(BaseServiceMixin, {
  callbacks: {},
  targets: {},

  /**
   * Add new contentWindow target
   *
   * @param {String} name         String name of the target
   * @param {contentWindow} targetWindow DOM contentWindow
   * @public
   */

  addTarget(name, targetWindow) {
    this.targets[name] = targetWindow;
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

  _parseURI(uri) {
    let split = uri.split(':');
    let resource = split[1] || split[0];
    return {
      target: split[1] ? split[0] : 'parent',
      resource: Ember.String.dasherize(resource)
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
    let win = this.getWindow();
    let isEmbedded = win.self !== win.top || win.opener;
    return isEmbedded || target === 'parent';
  },

  _getWindowParent() {
    let win = this.getWindow();
    return win.opener || win.parent;
  },

  _targetFor(target) {
    return this._isTargetParent(target) ? this._getWindowParent() : this.targets[target];
  },

  _targetOriginFor(target) {
    return this.get(`targetOriginMap.${target}`);
  },

  fetch(path, queryParams) {
    let uri = this._parseURI(path);
    let targetName = uri.target;
    let queryObject = queryParams ? queryParams : {};

    let targetOrigin = this._targetOriginFor(targetName);
    Ember.assert(`Target origin for target: ${targetName} does not exist`, targetOrigin);

    let target = this._targetFor(targetName);
    Ember.assert(`Target window is not registered for: ${targetName}`, target);

    return new Ember.RSVP.Promise((resolve, reject) => {
      let uuid = guidFor(queryObject);
      let query = {
        id: uuid,
        type: 'ember-window-messenger-client',
        name: uri.resource,
        query: queryObject
      };

      this.callbacks[uuid] = {
        success: (json) => {
          run(null, resolve, json);
        },
        error: (json) => {
          run(null, reject, json);
        }
      };
      target.postMessage(JSON.stringify(query), targetOrigin);
    }, `ember-window-messenger: ${path}`);
  },

  /**
   * Alias to fetch method, for providing semantic sugar
   *
   * @public
   */
  rpc: aliasMethod('fetch'),

  onMessage(event) {
    let message = this._getMessageForType('ember-window-messenger-server', event);

    if (message !== null) {
      const { response, id, error } = message;
      let inQueue = this.callbacks[id];
      // remove it from the queue right away, because otherwise RSVP catch handler
      // will interfare the code path here and doing delete in the end of
      // if condition below would simply not run when "error" === true
      delete this.callbacks[id];

      if (Ember.typeOf(inQueue) === 'object') {
        if (error) {
          inQueue.error(response);
        } else {
          inQueue.success(response);
        }
      }
    }
  }
});
