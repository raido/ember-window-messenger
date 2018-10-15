import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({
  router: service(),

  hideHeader: computed('router.currentURL', function() {
    return this.get('router.currentURL').indexOf('client-') !== -1;
  })
});
