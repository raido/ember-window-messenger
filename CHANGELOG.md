# ember-window-messenger

## [1.2.2] - 2018-03-31
### Changed
- Moved Bower under devDependencies

## [1.2.1] - 2018-03-31
### Changed
- Upgrade to Ember v3.0

## [1.2.0] - 2018-02-04
### Changed
- Upgrade to Babel 6.6.0+
- Upgrade to Ember-CLI 2.18 and Ember.js 2.18

## [1.1.0] - 2017-09-10
### Changed
- Upgrade to Ember-CLI 2.15 and Ember.js 2.15

## [1.0.1] - 2017-08-17
### Fixed
- PR #6 - issue with winow.opener check + ember-assign-polyfill
- PR #8 - using global event to post back to the client

## [1.0.0] - 2017-04-24
### Added
- Service for dispatching messages, so only one post message event listener is registered

### Changed
- Refactored tests to be more meaningful
- Upgraded to Ember-CLI 2.13.beta-4 for Babel 6 support

## [0.3.0] - 2016-02-08
### Changed
- Update dependencies

### Removed
- `ember-uuid` dependency, in favor of Ember's `guidFor` and keeping it simple

## [0.2.1] - 2016-01-20
### Added
- Add promise label for better instrumentation with Ember Inspector

## [0.2.0] - 2016-01-18
### Changed
- Migrate to ember-uuid.
- Update toolset
- Update docs

### Fixed
- Breaking unit testing in consuming app

### Removed
- The initializer

## [0.1.1] - 2015-10-19
### Added
- Unit tests for server: resolve, reject, query scenarios

### Changed
- Refactoring

## [0.1.0] - 2015-10-18
### Added
- An initial release of this addon.

[1.2.2]: https://github.com/raido/ember-window-messenger/compare/v1.2.1...v1.2.2
[1.2.1]: https://github.com/raido/ember-window-messenger/compare/v1.2.0...v1.2.1
[1.2.0]: https://github.com/raido/ember-window-messenger/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/raido/ember-window-messenger/compare/v1.0.1...v1.1.0
[1.0.1]: https://github.com/raido/ember-window-messenger/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/raido/ember-window-messenger/compare/v0.3.0...v1.0.0
[0.3.0]: https://github.com/raido/ember-window-messenger/compare/v0.2.1...v0.3.0
[0.2.1]: https://github.com/raido/ember-window-messenger/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/raido/ember-window-messenger/compare/v0.1.0...v0.2.0
[0.1.1]: https://github.com/raido/ember-window-messenger/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/raido/ember-window-messenger/tree/v0.1.0
