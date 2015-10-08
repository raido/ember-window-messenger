import Ember from 'ember';

const { run } = Ember;

function generateUuid() {
  var date = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (character) {
    var random = (date + Math.random() * 16) % 16 | 0;
    date = Math.floor(date / 16);
    return (character === 'x' ? random : (random & 0x7 | 0x8)).toString(16);
  });
  return uuid;
}

export default Ember.Service.extend({
  callbacks: {},
  window: null,
  targets: {},

  init() {
    this._super(...arguments);
    this.getWindow().addEventListener('message', run.bind(this, 'onMessage'));
  },

  getWindow() {
    return this.get('window');
  },

  /**
   * Add new contentWindow target
   *
   * @param {String} name         String name of the target
   * @param {contentWindow} targetWindow DOM contentWindow
   */

  addTarget(name, targetWindow) {
    this.targets[name] = targetWindow;
  },

  /**
   * Remove contentWindow target
   *
   * @param  {String} name
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
   * @return {Boolean}
   */

  _isTargetParent(target) {
    let win = this.getWindow();
    let isEmbedded = win.self !== win.top;
    return isEmbedded || target === 'parent';
  },

  _targetFor(target) {
    return this._isTargetParent(target) ? this.getWindow().parent : this.targets[target];
  },

  fetch(question, queryParams) {
    let client = this;
    let uri = client._parseURI(question);
    return new Ember.RSVP.Promise(function(resolve/*, reject*/) {
      let id = generateUuid();
      let query = {
        id: id,
        type: 'messenger-client-inbound',
        name: uri.resource,
        query: queryParams ? queryParams : {}
      };

      client.callbacks[id] = {
        success: function(json) {
          Ember.run(null, resolve, json);
        }/* TODO implement,
        error: function() {
          Ember.run(null, reject, null);
        }*/
      };
      client._targetFor(uri.target).postMessage(JSON.stringify(query), '*');
    });
  },

  onMessage(event) {
    let question = this._parseQuestion(event.data);
    if (question !== null) {
      if ( question.type === 'messenger-server-inbound' ) {
        let inQueue = this.callbacks[question.id];
        if (inQueue !== null) {
          inQueue.success(question.response);
        }
      }
    }
  },

  _parseQuestion(data) {
    if (typeof data !== 'object') {
      return JSON.parse(data) || null;
    }
    return null;
  }
});
