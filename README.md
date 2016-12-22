# ember-window-messenger

[![Build Status](https://travis-ci.org/raido/ember-window-messenger.svg)](https://travis-ci.org/raido/ember-window-messenger)
[![Code Climate](https://codeclimate.com/github/raido/ember-window-messenger/badges/gpa.svg)](https://codeclimate.com/github/raido/ember-window-messenger)
[![Test Coverage](https://codeclimate.com/github/raido/ember-window-messenger/badges/coverage.svg)](https://codeclimate.com/github/raido/ember-window-messenger/coverage)
[![npm version](https://badge.fury.io/js/ember-window-messenger.svg)](https://badge.fury.io/js/ember-window-messenger)
![npm version](https://embadge.io/v1/badge.svg?start=1.13.0)

This Ember addon is a lightweight postMessage client/server implementation. It is built on promises so the `fetch` and `rpc` methods can used directly in your route `model()` hooks.

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

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
