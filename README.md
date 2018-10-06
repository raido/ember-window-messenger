# ember-window-messenger

[![Build Status](https://travis-ci.org/raido/ember-window-messenger.svg?branch=master)](https://travis-ci.org/raido/ember-window-messenger)
[![npm version](https://badge.fury.io/js/ember-window-messenger.svg)](https://badge.fury.io/js/ember-window-messenger)

This Ember addon is a lightweight postMessage client/server implementation. It is built on promises so the `fetch` and `rpc` methods can be used directly in your route `model()` hooks.

For changelog see [CHANGELOG.md](https://github.com/raido/ember-window-messenger/blob/master/CHANGELOG.md)

**It supports JSON only messages for now**

## Usage

`ember install ember-window-messenger`

#### Configuration

Add `target:origin` map to your `config/environment.js`. This effectively defines which targets (windows, frames) is your app communicating with.

```javascript
APP: {
  // Here you can pass flags/options to your application instance
  // when it is created
  'ember-window-messenger': {
    'parent': 'http://localhost:4200',
    'target-1': 'http://localhost:4200',
    'target-2': 'http://localhost:4200',
    'popup': 'http://localhost:4200'
  }
}
```

This list is also used for validation, to check if message comes from an allowed origin.

### Examples

If you dare, fire up the dummy app in this addon and test it out. Below are the basic examples, see dummy app for more.

#### Setup server on parent

```javascript
import Ember from 'ember';

export default Ember.Route.extend({
  server: Ember.inject.service('window-messenger-server'),

  init() {
    this._super(...arguments);

    this.get('server').on('demo-data', (resolve, reject, query) => {
      resolve('Some data');
    });
  }
});
```

#### Fetch from parent

```javascript
import Ember from 'ember';

export default Ember.Route.extend({
  client: Ember.inject.service('window-messenger-client'),

  model() {
    return this.get('client').fetch('demo-data');
  }
});
```

#### Fetch from a specific target

This can be used from parent window to frames/tabs communication.

```javascript
import Ember from 'ember';

export default Ember.Route.extend({
  client: Ember.inject.service('window-messenger-client'),

  model() {
    return this.get('client').fetch('popup:demo-data');
  }
});
```

#### Execute RPC call

Internally it is the same as `fetch`, but provides semantic sugar to your app code.

```javascript
import Ember from 'ember';

export default Ember.Route.extend({
  client: Ember.inject.service('window-messenger-client'),

  actions {
    runMe() {
      this.get('client').rpc('start-worker').then((response) => {
        // handle response here
      });
    }
  }
});
```

### iFrames, popup windows

If you want to communicate with an iframe or a popup window opened with `window.open`, then you have to register your window instance on the client with matching target name from `config/environment` map.

#### iFrame

```javascript
// app/components/x-frame.js
import Ember from 'ember';

export default Ember.Component.extend({
  client: Ember.inject.service('window-messenger-client'),

  didInsertElement() {
    this.get('client').addTarget('target-1', this.$().get(0).contentWindow);
  },

  willDestroyElement() {
    this.get('client').removeTarget('target-1');
  }
});

```
#### Popup with window.open

```javascript
// app/routes/my-route.js
import Ember from 'ember';

export default Ember.Route.extend({
  client: Ember.inject.service('window-messenger-client'),

  actions: {
    openPopup() {
      let win = window.open('/some/path', 'Example popup', 'toolbar=no,resizable=no,width=400,height=400');
      this.get('client').addTarget('popup', win);
    },

    fetchFromPopup() {
      this.get('client').fetch('popup:some-data').then((name) => {
        this.controller.set('model', name);
      });
    }
  }
});
```

#### Open popup if it isn't already open, or has been closed by the user

```javascript
// app/routes/my-route.js
import Ember from 'ember';

export default Ember.Route.extend({
  client: Ember.inject.service('window-messenger-client'),

  actions: {
    openPopup() {
      if (!this.get('client').hasTarget('popup')) {
        let win = window.open('/some/path', 'Example popup', 'toolbar=no,resizable=no,width=400,height=400');
        this.get('client').addTarget('popup', win);
      }
    },
  }
});
```

Installation
------------------------------------------------------------------------------

* `git clone <repository-url>` this repository
* `cd ember-window-messenger`
* `yarn install` or `npm install`

### Linting

* `yarn run lint:hbs`
* `yarn run lint:js`
* `yarn run lint:js -- --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
