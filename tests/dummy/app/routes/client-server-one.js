import Route from '@ember/routing/route';

export default class ClientServerOneRoute extends Route {
  setupController(controller) {
    controller.server.on('name', (resolve) => {
      resolve('My name is: Target 1 - client/server one');
    });
  }
}
