import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('client-server-one', {});
  this.route('client-server-two', {}, function() {
    this.route('example', {});
  });
  this.route('demo', {});
});

export default Router;
