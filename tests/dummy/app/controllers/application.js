import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class ApplicationController extends Controller {
  @service('router')
  router;

  get hideHeader() {
    return this.router.currentURL.indexOf('client-') !== -1;
  }
}
