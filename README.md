# ember-window-messenger

[![CI](https://github.com/raido/ember-window-messenger/actions/workflows/ci.yml/badge.svg)](https://github.com/raido/ember-window-messenger/actions/workflows/ci.yml)
[![npm version](https://badge.fury.io/js/ember-window-messenger.svg)](https://badge.fury.io/js/ember-window-messenger)

This Ember addon is a lightweight postMessage client/server implementation. It is built on promises so the `fetch` and `rpc` methods can be used directly in your route `model()` hooks.

For changelog see [CHANGELOG.md](https://github.com/raido/ember-window-messenger/blob/main/CHANGELOG.md)

**It supports JSON only messages for now**


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.20 or above
* Ember CLI v3.20 or above
* Node.js v12 or above

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
// app/service/your-server.js
import Service, { inject as service } from '@ember/service';

export default class YourServerService extends Service {
  @service('window-messenger-server');
  server;

  setup() {
    this.server.on('demo-data', this.onDemoDataRequest);
  }

  teardown() {
    this.server.off('demo-data', this.onDemoDataRequest);
  }

  onDemoDataRequest = (resolve, reject, query) => {
    resolve('Some data');
  }
}

// app/routes/your-route.js
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class YourRoute extends Route {
  @service('your-server');
  yourServer;

  activate() {
    super.activate();
    this.yourServer.setup();
  }

  deactivate() {
    super.deactivate();
    this.yourServer.teardown();
  }
}
```

#### Fetch from parent

```javascript
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class YourRoute extends Route {
  @service('window-messenger-client')
  client;

  model() {
    return this.client.fetch('demo-data');
  }
}
```

#### Fetch from a specific target

This can be used from parent window to frames/tabs communication.

```javascript
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class YourRoute extends Route {
  @service('window-messenger-client')
  client;

  model() {
    return this.client.fetch('popup:demo-data');
  }
}
```

#### Execute RPC call

Internally it is the same as `fetch`, but provides semantic sugar to your app code.

```javascript
import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class YourController extends Controller {
  @service('window-messenger-client')
  client;

  @action
  runMe() {
    this.client.rpc('start-worker').then((response) => {
      // handle response here
    });
  }
}
```

### iFrames, popup windows

If you want to communicate with an iframe or a popup window opened with `window.open`, then you have to register your window instance on the client with matching target name from `config/environment` map.

#### iFrame

```javascript
// app/components/x-frame.js
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class XFrameComponent extends Component {
  @service('window-messenger-client')
  client;

  register(frameElement) {
    this.client.addTarget(this.args.target, frameElement.contentWindow);
  },

  unregister() {
    this.client.removeTarget(this.args.target);
  }
}
```
```html
<!-- app/components/x-frame.hbs -->
<!-- Install ember-render-modifiers for did-insert/will-destory modifiers -->
<iframe 
  ...attributes
  {{did-insert this.register}}
  {{will-destory this.unregister}}
></iframe>

<!-- app/templates/your-route.hbs -->
<XFrame src="<url>" @target="target-1"/>
```
#### Popup with window.open

```javascript
// app/controller/your-controller.js
import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class YourController extends Controller {
  @service('window-messenger-client')
  client;

  @tracked
  model = null;

  @action
  openPopup() {
    let win = window.open('/some/path', 'Example popup', 'toolbar=no,resizable=no,width=400,height=400');
    this.client.addTarget('popup', win);
  }

  @action
  fetchFromPopup() {
    this.client.fetch('popup:some-data').then((name) => {
      this.model = name;
    });
  }
}
```

#### Open popup if it isn't already open, or has been closed by the user

```javascript
// app/controller/your-controller.js
import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class YourController extends Controller {
  @service('window-messenger-client')
  client;

  @action
  openPopup() {
    if (!this.client.hasTarget('popup')) {
      let win = window.open('/some/path', 'Example popup', 'toolbar=no,resizable=no,width=400,height=400');
      this.client.addTarget('popup', win);
    }
  }
}
```


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
