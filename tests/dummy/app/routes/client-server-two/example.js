import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default Route.extend({
  client: service('window-messenger-client'),

  model() {
    return this.get('client').fetch('demo-data');
  },
});
