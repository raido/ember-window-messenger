import Ember from 'ember';
import BaseServiceMixin from '../mixins/base-service';
import generateUuid from '../utils/generate-uuid';

const { run } = Ember;

export default Ember.Service.extend(BaseServiceMixin, {
  callbacks: {},
  targets: {},
  targetOriginMap: null,

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

  fetch(question, queryParams) {
    let client = this;
    let uri = client._parseURI(question);
    let targetName = uri.target;

    let targetOrigin = client._targetOriginFor(targetName);
    Ember.assert(`Target origin for target: ${targetName} does not exist`, targetOrigin);

    let target = client._targetFor(targetName);
    Ember.assert(`Target window is not registered for: ${targetName}`, target);

    return new Ember.RSVP.Promise(function(resolve, reject) {
      let uuid = generateUuid();
      let query = {
        id: uuid,
        type: 'ember-window-messenger-client',
        name: uri.resource,
        query: queryParams ? queryParams : {}
      };

      client.callbacks[uuid] = {
        success: (json) => {
          run(null, resolve, json);
        },
        error: (json) => {
          run(null, reject, json);
        }
      };
      target.postMessage(JSON.stringify(query), targetOrigin);
    });
  },

  onMessage(event) {
    let message = this._getMessageForType('ember-window-messenger-server', event.data);

    if (message !== null) {
      let inQueue = this.callbacks[message.id];
      if (inQueue !== null) {
        if (message.error) {
          inQueue.error(message.response);
        } else {
          inQueue.success(message.response);
        }
      }
    }
  }
});
