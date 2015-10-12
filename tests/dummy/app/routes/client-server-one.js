import Ember from 'ember';

export default Ember.Route.extend({
  client: Ember.inject.service('window-messenger-client'),
  server: Ember.inject.service('window-messenger-server'),

  beforeModel() {
    this.get('server').on('name', (resolve) => {
      resolve('My name is: Target 1 - client/server one');
    });
  },

  actions: {
    askParent() {
      this.get('client').fetch('demo-data', { action: 'yes' }).then((response) => {
        this.controller.set('model', JSON.stringify(response));
      });
    },
    
    askParentFail() {
      this.get('client').fetch('demo-data', { action: 'nope' }).catch((response) => {
        this.controller.set('model', response);
      });
    }
  }
});
