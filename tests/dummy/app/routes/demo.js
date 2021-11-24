import Route from '@ember/routing/route';

export default class DemoRoute extends Route {
  setupController(controller) {
    controller.server.on('demo-data', (resolve, reject, query) => {
      this.model = JSON.stringify(query);
      if (query.action === 'nope') {
        reject('No can do');
      } else {
        resolve({
          name: 'Demo',
          version: '1.2.3',
        });
      }
    });
  }
}
