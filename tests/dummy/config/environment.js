'use strict';

const TESTS_DEV_SERVER_PORT =
  process.env.EMBER_CLI_INJECT_LIVE_RELOAD_PORT || 7357;

module.exports = function (environment) {
  let ENV = {
    modulePrefix: 'dummy',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false,
      },
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
      'ember-window-messenger': {
        parent: 'http://localhost:4200',
        'target-1': 'http://localhost:4200',
        'target-2': 'http://localhost:4200',
        popup: 'http://localhost:4200',
      },
    },
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;

    ENV.APP['ember-window-messenger'] = {
      parent: `http://localhost:${TESTS_DEV_SERVER_PORT}`,
      'target-1': `http://localhost:${TESTS_DEV_SERVER_PORT}`,
    };
  }

  if (environment === 'production') {
    ENV.rootURL = '/ember-window-messenger';
    ENV.locationType = 'hash';
    ENV.APP['ember-window-messenger'] = {
      parent: 'https://raido.github.io',
      'target-1': 'https://raido.github.io',
      'target-2': 'https://raido.github.io',
      popup: 'https://raido.github.io',
    };
  }

  return ENV;
};
