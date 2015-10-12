import Ember from 'ember';

export default Ember.Route.extend({
  server: Ember.inject.service('window-messenger-server'),

  beforeModel() {
    this.get('server').on('popup-name', (resolve) => {
      resolve('I am a popup window :)');
    });
  }
});
