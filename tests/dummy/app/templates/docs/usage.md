# Usage

## Setup server on parent

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

## Fetch from parent

```javascript
import Ember from 'ember';

export default Ember.Route.extend({
  client: Ember.inject.service('window-messenger-client'),

  model() {
    return this.get('client').fetch('demo-data');
  }
});
```

## Fetch from a specific target

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

## Execute RPC call

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

## iFrames, popup windows

If you want to communicate with an iframe or a popup window opened with `window.open`, then you have to register your window instance on the client with matching target name from `config/environment` map.

### iFrame

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
### Popup with window.open

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

### Open popup if it isn't already open, or has been closed by the user

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
