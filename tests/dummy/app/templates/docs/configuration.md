# Configuration


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
