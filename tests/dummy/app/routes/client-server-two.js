import Ember from 'ember';

export default Ember.Route.extend({
  server: Ember.inject.service('window-messenger-server'),

  init() {
    this._super.apply(...arguments);

    this.get('server').on('popup-name', (resolve) => {
      resolve('I am a popup window :)');
    });
  }
});
