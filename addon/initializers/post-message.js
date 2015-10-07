export function initialize() {
  let application = arguments[1] || arguments[0];
  application.register('window:main', window, { instantiate: false });
  application.inject('service', 'window', 'window:main');
}

export default {
  name: 'post-message',
  initialize: initialize
};
