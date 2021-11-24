import EmberRouter from '@ember/routing/router';
import config from 'dummy/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  // dummy app
  this.route('client-server-one', {});
  this.route('client-server-two', {}, function () {
    this.route('example', {});
  });
  this.route('demo', {});

  // 404
  this.route('not-found', { path: '/*path' });
});
