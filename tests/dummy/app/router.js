import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('client-server-one', {});
  this.route('client-server-two', {}, function() {
    this.route('example', {});
  });
  this.route('demo', {});
});

export default Router;
