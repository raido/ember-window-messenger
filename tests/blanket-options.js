/* globals blanket, module */
// jscs:disable

var options = {
  modulePrefix: 'ember-window-messenger',
  filter: '//.*ember-window-messenger/.*/',
  antifilter: '//.*(tests|template).*/',
  loaderExclusions: [],
  enableCoverage: true,
  cliOptions: {
    lcovOptions: {
      outputFile: 'lcov.info',
      renamer: function(moduleName){
        var expression = /^ember-window-messenger/;
        return moduleName.replace(expression, 'addon') + '.js';
      }
    },
    reporters: ['lcov'],
    autostart: true
  }
};
if (typeof exports === 'undefined') {
  blanket.options(options);
} else {
  module.exports = options;
}
