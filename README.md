# ember-window-messenger

[![Build Status](https://travis-ci.org/raido/ember-window-messenger.svg)](https://travis-ci.org/raido/ember-window-messenger)
[![Code Climate](https://codeclimate.com/github/raido/ember-window-messenger/badges/gpa.svg)](https://codeclimate.com/github/raido/ember-window-messenger)
[![Test Coverage](https://codeclimate.com/github/raido/ember-window-messenger/badges/coverage.svg)](https://codeclimate.com/github/raido/ember-window-messenger/coverage)

This Ember addon is a lightweight postMessage client/server implementation. It is built on promises so the `fetch` and `rpc` methods can used directly in your route `model()` hooks.

**It supports JSON only messages for now**

## Usage

`ember install ember-window-messenger`

### Examples

If dare, fire up the dummy app in this addon and test it out. Below are the basic examples, see dummy app for more.

#### Setup server on parent

```javascript
import Ember from 'ember';

export default Ember.Route.extend({
  server: Ember.inject.service('window-messenger-server'),

  beforeModel() {
    server.on('demo-data' (resolve, reject, query) => {
      resolve('Some data');
    });
  }
});```

#### Fetch from parent

```javascript
import Ember from 'ember';

export default Ember.Route.extend({
  client: Ember.inject.service('window-messenger-client'),

  model() {
    return this.get('client').fetch('demo-data');
  }
});```

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
});```

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
