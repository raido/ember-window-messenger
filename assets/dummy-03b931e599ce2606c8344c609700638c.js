"use strict"
function _typeof(e){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},_typeof(e)}function _typeof(e){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},_typeof(e)}function _typeof(e){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},_typeof(e)}function _typeof(e){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},_typeof(e)}function _typeof(e){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},_typeof(e)}function _typeof(e){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},_typeof(e)}function _typeof(e){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},_typeof(e)}function _typeof(e){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},_typeof(e)}function _typeof(e){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},_typeof(e)}function _typeof(e){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},_typeof(e)}function _typeof(e){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},_typeof(e)}function _typeof(e){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},_typeof(e)}define("dummy/app",["exports","@ember/application","ember-resolver","ember-load-initializers","dummy/config/environment"],(function(e,t,r,n,o){function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){return u=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},u(e,t)}function c(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1
if(Reflect.construct.sham)return!1
if("function"==typeof Proxy)return!0
try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}()
return function(){var r,n=a(e)
if(t){var o=a(this).constructor
r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments)
return l(this,r)}}function l(e,t){if(t&&("object"===_typeof(t)||"function"==typeof t))return t
if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined")
return f(e)}function f(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return e}function a(e){return a=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},a(e)}function p(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var s=function(e){(function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function")
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&u(e,t)})(n,e)
var t=c(n)
function n(){var e
i(this,n)
for(var u=arguments.length,c=new Array(u),l=0;l<u;l++)c[l]=arguments[l]
return p(f(e=t.call.apply(t,[this].concat(c))),"modulePrefix",o.default.modulePrefix),p(f(e),"podModulePrefix",o.default.podModulePrefix),p(f(e),"Resolver",r.default),e}return n}(t.default)
e.default=s,(0,n.default)(s,o.default.modulePrefix)})),define("dummy/component-managers/glimmer",["exports","@glimmer/component/-private/ember-component-manager"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})})),define("dummy/components/x-iframe",["exports","@ember/component","@ember/template-factory","@ember/service","@glimmer/component","@ember/object"],(function(e,t,r,n,o,i){var u,c,l
function f(e,t,r,n){r&&Object.defineProperty(e,t,{enumerable:r.enumerable,configurable:r.configurable,writable:r.writable,value:r.initializer?r.initializer.call(n):void 0})}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function p(e,t){for(var r=0;r<t.length;r++){var n=t[r]
n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function s(e,t){return s=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},s(e,t)}function y(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1
if(Reflect.construct.sham)return!1
if("function"==typeof Proxy)return!0
try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}()
return function(){var r,n=m(e)
if(t){var o=m(this).constructor
r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments)
return d(this,r)}}function d(e,t){if(t&&("object"===_typeof(t)||"function"==typeof t))return t
if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined")
return b(e)}function b(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return e}function m(e){return m=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},m(e)}function v(e,t,r,n,o){var i={}
return Object.keys(n).forEach((function(e){i[e]=n[e]})),i.enumerable=!!i.enumerable,i.configurable=!!i.configurable,("value"in i||i.initializer)&&(i.writable=!0),i=r.slice().reverse().reduce((function(r,n){return n(e,t,r)||r}),i),o&&void 0!==i.initializer&&(i.value=i.initializer?i.initializer.call(o):void 0,i.initializer=void 0),void 0===i.initializer&&(Object.defineProperty(e,t,i),i=null),i}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var h=(0,r.createTemplateFactory)({id:"ADn2ZWPN",block:'[[[11,"iframe"],[16,"title",[30,1]],[17,2],[4,[38,0],[[30,0,["register"]]],null],[4,[38,1],[[30,0,["unregister"]]],null],[12],[13]],["@target","&attrs"],false,["did-insert","will-destroy"]]',moduleName:"dummy/components/x-iframe.hbs",isStrictMode:!1}),w=(u=(0,n.inject)("window-messenger-client"),c=function(e){(function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function")
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&s(e,t)})(i,e)
var t,r,n,o=y(i)
function i(){var e
a(this,i)
for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n]
return f(b(e=o.call.apply(o,[this].concat(r))),"client",l,b(e)),e}return t=i,(r=[{key:"register",value:function(e){this.client.addTarget(this.args.target,e.contentWindow)}},{key:"unregister",value:function(){this.client.removeTarget(this.args.target)}}])&&p(t.prototype,r),n&&p(t,n),i}(o.default),l=v(c.prototype,"client",[u],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),v(c.prototype,"register",[i.action],Object.getOwnPropertyDescriptor(c.prototype,"register"),c.prototype),v(c.prototype,"unregister",[i.action],Object.getOwnPropertyDescriptor(c.prototype,"unregister"),c.prototype),c)
e.default=w,(0,t.setComponentTemplate)(h,w)})),define("dummy/controllers/application",["exports","@ember/controller","@ember/service"],(function(e,t,r){var n,o,i
function u(e,t,r,n){r&&Object.defineProperty(e,t,{enumerable:r.enumerable,configurable:r.configurable,writable:r.writable,value:r.initializer?r.initializer.call(n):void 0})}function c(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){for(var r=0;r<t.length;r++){var n=t[r]
n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function f(e,t){return f=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},f(e,t)}function a(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1
if(Reflect.construct.sham)return!1
if("function"==typeof Proxy)return!0
try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}()
return function(){var r,n=y(e)
if(t){var o=y(this).constructor
r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments)
return p(this,r)}}function p(e,t){if(t&&("object"===_typeof(t)||"function"==typeof t))return t
if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined")
return s(e)}function s(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return e}function y(e){return y=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},y(e)}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var d,b,m,v,h,w,g=(n=(0,r.inject)("router"),o=function(e){(function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function")
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&f(e,t)})(p,e)
var t,r,n,o=a(p)
function p(){var e
c(this,p)
for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n]
return u(s(e=o.call.apply(o,[this].concat(r))),"router",i,s(e)),e}return t=p,(r=[{key:"hideHeader",get:function(){return-1!==this.router.currentURL.indexOf("client-")}}])&&l(t.prototype,r),n&&l(t,n),p}(t.default),d=o.prototype,b="router",m=[n],v={configurable:!0,enumerable:!0,writable:!0,initializer:null},w={},Object.keys(v).forEach((function(e){w[e]=v[e]})),w.enumerable=!!w.enumerable,w.configurable=!!w.configurable,("value"in w||w.initializer)&&(w.writable=!0),w=m.slice().reverse().reduce((function(e,t){return t(d,b,e)||e}),w),h&&void 0!==w.initializer&&(w.value=w.initializer?w.initializer.call(h):void 0,w.initializer=void 0),void 0===w.initializer&&(Object.defineProperty(d,b,w),w=null),i=w,o)
e.default=g})),define("dummy/controllers/client-server-one",["exports","@ember/controller","@ember/service","@ember/object","@glimmer/tracking"],(function(e,t,r,n,o){var i,u,c,l,f,a
function p(e,t,r,n){r&&Object.defineProperty(e,t,{enumerable:r.enumerable,configurable:r.configurable,writable:r.writable,value:r.initializer?r.initializer.call(n):void 0})}function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function y(e,t){for(var r=0;r<t.length;r++){var n=t[r]
n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function d(e,t){return d=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},d(e,t)}function b(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1
if(Reflect.construct.sham)return!1
if("function"==typeof Proxy)return!0
try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}()
return function(){var r,n=h(e)
if(t){var o=h(this).constructor
r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments)
return m(this,r)}}function m(e,t){if(t&&("object"===_typeof(t)||"function"==typeof t))return t
if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined")
return v(e)}function v(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return e}function h(e){return h=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},h(e)}function w(e,t,r,n,o){var i={}
return Object.keys(n).forEach((function(e){i[e]=n[e]})),i.enumerable=!!i.enumerable,i.configurable=!!i.configurable,("value"in i||i.initializer)&&(i.writable=!0),i=r.slice().reverse().reduce((function(r,n){return n(e,t,r)||r}),i),o&&void 0!==i.initializer&&(i.value=i.initializer?i.initializer.call(o):void 0,i.initializer=void 0),void 0===i.initializer&&(Object.defineProperty(e,t,i),i=null),i}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var g=(i=(0,r.inject)("window-messenger-server"),u=(0,r.inject)("window-messenger-client"),c=function(e){(function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function")
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&d(e,t)})(i,e)
var t,r,n,o=b(i)
function i(){var e
s(this,i)
for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n]
return p(v(e=o.call.apply(o,[this].concat(r))),"server",l,v(e)),p(v(e),"client",f,v(e)),p(v(e),"model",a,v(e)),e}return t=i,(r=[{key:"askParent",value:function(){var e=this
this.client.fetch("demo-data",{action:"yes"}).then((function(t){e.model=JSON.stringify(t)}))}},{key:"askParentFail",value:function(){var e=this
this.client.fetch("demo-data",{action:"nope"}).catch((function(t){e.model=t}))}}])&&y(t.prototype,r),n&&y(t,n),i}(t.default),l=w(c.prototype,"server",[i],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),f=w(c.prototype,"client",[u],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),a=w(c.prototype,"model",[o.tracked],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),w(c.prototype,"askParent",[n.action],Object.getOwnPropertyDescriptor(c.prototype,"askParent"),c.prototype),w(c.prototype,"askParentFail",[n.action],Object.getOwnPropertyDescriptor(c.prototype,"askParentFail"),c.prototype),c)
e.default=g})),define("dummy/controllers/demo",["exports","@ember/controller","@ember/service","@ember/object","@glimmer/tracking"],(function(e,t,r,n,o){var i,u,c,l,f,a,p,s,y
function d(e,t,r,n){r&&Object.defineProperty(e,t,{enumerable:r.enumerable,configurable:r.configurable,writable:r.writable,value:r.initializer?r.initializer.call(n):void 0})}function b(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function m(e,t){for(var r=0;r<t.length;r++){var n=t[r]
n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function v(e,t){return v=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},v(e,t)}function h(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1
if(Reflect.construct.sham)return!1
if("function"==typeof Proxy)return!0
try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}()
return function(){var r,n=O(e)
if(t){var o=O(this).constructor
r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments)
return w(this,r)}}function w(e,t){if(t&&("object"===_typeof(t)||"function"==typeof t))return t
if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined")
return g(e)}function g(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return e}function O(e){return O=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},O(e)}function _(e,t,r,n,o){var i={}
return Object.keys(n).forEach((function(e){i[e]=n[e]})),i.enumerable=!!i.enumerable,i.configurable=!!i.configurable,("value"in i||i.initializer)&&(i.writable=!0),i=r.slice().reverse().reduce((function(r,n){return n(e,t,r)||r}),i),o&&void 0!==i.initializer&&(i.value=i.initializer?i.initializer.call(o):void 0,i.initializer=void 0),void 0===i.initializer&&(Object.defineProperty(e,t,i),i=null),i}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var j=(i=(0,r.inject)("window-messenger-server"),u=(0,r.inject)("window-messenger-client"),c=(0,r.inject)("router"),l=function(e){(function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function")
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&v(e,t)})(i,e)
var t,r,n,o=h(i)
function i(){var e
b(this,i)
for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n]
return d(g(e=o.call.apply(o,[this].concat(r))),"server",f,g(e)),d(g(e),"client",a,g(e)),d(g(e),"router",p,g(e)),d(g(e),"popup",s,g(e)),d(g(e),"model",y,g(e)),e}return t=i,(r=[{key:"clientServerOneSrc",get:function(){return this.router.urlFor("client-server-one")}},{key:"clientServerTwoSrc",get:function(){return this.router.urlFor("client-server-two")}},{key:"askTarget1",value:function(){var e=this
this.client.fetch("target-1:name").then((function(t){e.model=t}))}},{key:"openPopup",value:function(){var e=window.open(this.router.urlFor("client-server-two.example"),"Example popup","toolbar=no,resizable=no,width=400,height=400")
this.client.addTarget("popup",e),this.popup=!0}},{key:"askPopup",value:function(){var e=this
this.client.fetch("popup:popup-name").then((function(t){e.model=t}))}}])&&m(t.prototype,r),n&&m(t,n),i}(t.default),f=_(l.prototype,"server",[i],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),a=_(l.prototype,"client",[u],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),p=_(l.prototype,"router",[c],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),s=_(l.prototype,"popup",[o.tracked],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!1}}),y=_(l.prototype,"model",[o.tracked],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),_(l.prototype,"askTarget1",[n.action],Object.getOwnPropertyDescriptor(l.prototype,"askTarget1"),l.prototype),_(l.prototype,"openPopup",[n.action],Object.getOwnPropertyDescriptor(l.prototype,"openPopup"),l.prototype),_(l.prototype,"askPopup",[n.action],Object.getOwnPropertyDescriptor(l.prototype,"askPopup"),l.prototype),l)
e.default=j})),define("dummy/helpers/page-title",["exports","ember-page-title/helpers/page-title"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var r=t.default
e.default=r})),define("dummy/initializers/container-debug-adapter",["exports","ember-resolver/resolvers/classic/container-debug-adapter"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var r={name:"container-debug-adapter",initialize:function(){var e=arguments[1]||arguments[0]
e.register("container-debug-adapter:main",t.default)}}
e.default=r})),define("dummy/initializers/export-application-global",["exports","ember","dummy/config/environment"],(function(e,t,r){function n(){var e=arguments[1]||arguments[0]
if(!1!==r.default.exportApplicationGlobal){var n
if("undefined"!=typeof window)n=window
else if("undefined"!=typeof global)n=global
else{if("undefined"==typeof self)return
n=self}var o,i=r.default.exportApplicationGlobal
o="string"==typeof i?i:t.default.String.classify(r.default.modulePrefix),n[o]||(n[o]=e,e.reopen({willDestroy:function(){this._super.apply(this,arguments),delete n[o]}}))}}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,e.initialize=n
var o={name:"export-application-global",initialize:n}
e.default=o})),define("dummy/modifiers/did-insert",["exports","@ember/render-modifiers/modifiers/did-insert"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})})),define("dummy/modifiers/did-update",["exports","@ember/render-modifiers/modifiers/did-update"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})})),define("dummy/modifiers/will-destroy",["exports","@ember/render-modifiers/modifiers/will-destroy"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})})),define("dummy/router",["exports","@ember/routing/router","dummy/config/environment"],(function(e,t,r){function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){return o=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},o(e,t)}function i(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1
if(Reflect.construct.sham)return!1
if("function"==typeof Proxy)return!0
try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}()
return function(){var r,n=l(e)
if(t){var o=l(this).constructor
r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments)
return u(this,r)}}function u(e,t){if(t&&("object"===_typeof(t)||"function"==typeof t))return t
if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined")
return c(e)}function c(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return e}function l(e){return l=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},l(e)}function f(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var a=function(e){(function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function")
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&o(e,t)})(u,e)
var t=i(u)
function u(){var e
n(this,u)
for(var o=arguments.length,i=new Array(o),l=0;l<o;l++)i[l]=arguments[l]
return f(c(e=t.call.apply(t,[this].concat(i))),"location",r.default.locationType),f(c(e),"rootURL",r.default.rootURL),e}return u}(t.default)
e.default=a,a.map((function(){this.route("client-server-one",{}),this.route("client-server-two",{},(function(){this.route("example",{})})),this.route("demo",{}),this.route("not-found",{path:"/*path"})}))})),define("dummy/routes/client-server-one",["exports","@ember/routing/route"],(function(e,t){function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(e,t){for(var r=0;r<t.length;r++){var n=t[r]
n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function o(e,t){return o=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},o(e,t)}function i(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1
if(Reflect.construct.sham)return!1
if("function"==typeof Proxy)return!0
try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}()
return function(){var r,n=c(e)
if(t){var o=c(this).constructor
r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments)
return u(this,r)}}function u(e,t){if(t&&("object"===_typeof(t)||"function"==typeof t))return t
if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined")
return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return e}(e)}function c(e){return c=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},c(e)}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var l=function(e){(function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function")
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&o(e,t)})(f,e)
var t,u,c,l=i(f)
function f(){return r(this,f),l.apply(this,arguments)}return t=f,(u=[{key:"setupController",value:function(e){e.server.on("name",(function(e){e("My name is: Target 1 - client/server one")}))}}])&&n(t.prototype,u),c&&n(t,c),f}(t.default)
e.default=l})),define("dummy/routes/client-server-two",["exports","@ember/service","@ember/routing/route"],(function(e,t,r){var n,o,i
function u(e,t,r,n){r&&Object.defineProperty(e,t,{enumerable:r.enumerable,configurable:r.configurable,writable:r.writable,value:r.initializer?r.initializer.call(n):void 0})}function c(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){for(var r=0;r<t.length;r++){var n=t[r]
n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function f(e,t){return f=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},f(e,t)}function a(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1
if(Reflect.construct.sham)return!1
if("function"==typeof Proxy)return!0
try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}()
return function(){var r,n=y(e)
if(t){var o=y(this).constructor
r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments)
return p(this,r)}}function p(e,t){if(t&&("object"===_typeof(t)||"function"==typeof t))return t
if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined")
return s(e)}function s(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return e}function y(e){return y=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},y(e)}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var d,b,m,v,h,w,g=(n=(0,t.inject)("window-messenger-server"),o=function(e){(function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function")
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&f(e,t)})(p,e)
var t,r,n,o=a(p)
function p(){var e
c(this,p)
for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n]
return u(s(e=o.call.apply(o,[this].concat(r))),"server",i,s(e)),e}return t=p,(r=[{key:"activate",value:function(){this.server.on("popup-name",(function(e){e("I am a popup window :)")}))}}])&&l(t.prototype,r),n&&l(t,n),p}(r.default),d=o.prototype,b="server",m=[n],v={configurable:!0,enumerable:!0,writable:!0,initializer:null},w={},Object.keys(v).forEach((function(e){w[e]=v[e]})),w.enumerable=!!w.enumerable,w.configurable=!!w.configurable,("value"in w||w.initializer)&&(w.writable=!0),w=m.slice().reverse().reduce((function(e,t){return t(d,b,e)||e}),w),h&&void 0!==w.initializer&&(w.value=w.initializer?w.initializer.call(h):void 0,w.initializer=void 0),void 0===w.initializer&&(Object.defineProperty(d,b,w),w=null),i=w,o)
e.default=g})),define("dummy/routes/client-server-two/example",["exports","@ember/service","@ember/routing/route"],(function(e,t,r){var n,o,i
function u(e,t,r,n){r&&Object.defineProperty(e,t,{enumerable:r.enumerable,configurable:r.configurable,writable:r.writable,value:r.initializer?r.initializer.call(n):void 0})}function c(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){for(var r=0;r<t.length;r++){var n=t[r]
n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function f(e,t){return f=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},f(e,t)}function a(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1
if(Reflect.construct.sham)return!1
if("function"==typeof Proxy)return!0
try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}()
return function(){var r,n=y(e)
if(t){var o=y(this).constructor
r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments)
return p(this,r)}}function p(e,t){if(t&&("object"===_typeof(t)||"function"==typeof t))return t
if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined")
return s(e)}function s(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return e}function y(e){return y=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},y(e)}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var d,b,m,v,h,w,g=(n=(0,t.inject)("window-messenger-client"),o=function(e){(function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function")
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&f(e,t)})(p,e)
var t,r,n,o=a(p)
function p(){var e
c(this,p)
for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n]
return u(s(e=o.call.apply(o,[this].concat(r))),"client",i,s(e)),e}return t=p,(r=[{key:"model",value:function(){return this.client.fetch("demo-data")}}])&&l(t.prototype,r),n&&l(t,n),p}(r.default),d=o.prototype,b="client",m=[n],v={configurable:!0,enumerable:!0,writable:!0,initializer:null},w={},Object.keys(v).forEach((function(e){w[e]=v[e]})),w.enumerable=!!w.enumerable,w.configurable=!!w.configurable,("value"in w||w.initializer)&&(w.writable=!0),w=m.slice().reverse().reduce((function(e,t){return t(d,b,e)||e}),w),h&&void 0!==w.initializer&&(w.value=w.initializer?w.initializer.call(h):void 0,w.initializer=void 0),void 0===w.initializer&&(Object.defineProperty(d,b,w),w=null),i=w,o)
e.default=g})),define("dummy/routes/demo",["exports","@ember/routing/route"],(function(e,t){function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(e,t){for(var r=0;r<t.length;r++){var n=t[r]
n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function o(e,t){return o=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},o(e,t)}function i(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1
if(Reflect.construct.sham)return!1
if("function"==typeof Proxy)return!0
try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}()
return function(){var r,n=c(e)
if(t){var o=c(this).constructor
r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments)
return u(this,r)}}function u(e,t){if(t&&("object"===_typeof(t)||"function"==typeof t))return t
if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined")
return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return e}(e)}function c(e){return c=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},c(e)}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var l=function(e){(function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function")
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&o(e,t)})(f,e)
var t,u,c,l=i(f)
function f(){return r(this,f),l.apply(this,arguments)}return t=f,(u=[{key:"setupController",value:function(e){var t=this
e.server.on("demo-data",(function(e,r,n){t.model=JSON.stringify(n),"nope"===n.action?r("No can do"):e({name:"Demo",version:"1.2.3"})}))}}])&&n(t.prototype,u),c&&n(t,c),f}(t.default)
e.default=l})),define("dummy/services/page-title-list",["exports","ember-page-title/services/page-title-list"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})})),define("dummy/services/page-title",["exports","ember-page-title/services/page-title"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})})),define("dummy/services/window-messenger-client",["exports","dummy/config/environment","ember-window-messenger/services/client"],(function(e,t,r){function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){return o=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},o(e,t)}function i(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1
if(Reflect.construct.sham)return!1
if("function"==typeof Proxy)return!0
try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}()
return function(){var r,n=l(e)
if(t){var o=l(this).constructor
r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments)
return u(this,r)}}function u(e,t){if(t&&("object"===_typeof(t)||"function"==typeof t))return t
if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined")
return c(e)}function c(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return e}function l(e){return l=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},l(e)}function f(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var a=function(e){(function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function")
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&o(e,t)})(u,e)
var r=i(u)
function u(){var e
n(this,u)
for(var o=arguments.length,i=new Array(o),l=0;l<o;l++)i[l]=arguments[l]
return f(c(e=r.call.apply(r,[this].concat(i))),"targetOriginMap",t.default.APP["ember-window-messenger"]||{}),e}return u}(r.default)
e.default=a})),define("dummy/services/window-messenger-events",["exports","dummy/config/environment","ember-window-messenger/services/window-messenger-events"],(function(e,t,r){function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){return o=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},o(e,t)}function i(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1
if(Reflect.construct.sham)return!1
if("function"==typeof Proxy)return!0
try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}()
return function(){var r,n=l(e)
if(t){var o=l(this).constructor
r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments)
return u(this,r)}}function u(e,t){if(t&&("object"===_typeof(t)||"function"==typeof t))return t
if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined")
return c(e)}function c(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return e}function l(e){return l=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},l(e)}function f(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var a=function(e){(function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function")
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&o(e,t)})(u,e)
var r=i(u)
function u(){var e
n(this,u)
for(var o=arguments.length,i=new Array(o),l=0;l<o;l++)i[l]=arguments[l]
return f(c(e=r.call.apply(r,[this].concat(i))),"targetOriginMap",t.default.APP["ember-window-messenger"]||{}),e}return u}(r.default)
e.default=a})),define("dummy/services/window-messenger-server",["exports","ember-window-messenger/services/server"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})})),define("dummy/templates/application",["exports","@ember/template-factory"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var r=(0,t.createTemplateFactory)({id:"bOMaimhy",block:'[[[41,[51,[30,0,["hideHeader"]]],[[[1,"  "],[1,[28,[35,1],["ember-window-messenger"],null]],[1,"\\n  "],[10,"h2"],[12],[1,"ember-window-messenger"],[13],[1,"\\n"]],[]],null],[1,"\\n"],[46,[28,[37,3],null,null],null,null,null]],[],false,["unless","page-title","component","-outlet"]]',moduleName:"dummy/templates/application.hbs",isStrictMode:!1})
e.default=r})),define("dummy/templates/client-server-one",["exports","@ember/template-factory"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var r=(0,t.createTemplateFactory)({id:"NFD2a5vf",block:'[[[10,"h2"],[12],[1,"This here is client/server one"],[13],[1,"\\n\\n"],[10,"h4"],[12],[1,"Got response: "],[1,[30,0,["model"]]],[13],[1,"\\n\\n"],[11,"button"],[24,4,"button"],[4,[38,0],["click",[30,0,["askParent"]]],null],[12],[1,"Communicate with parent with success"],[13],[1,"\\n"],[11,"button"],[24,4,"button"],[4,[38,0],["click",[30,0,["askParentFail"]]],null],[12],[1,"Communicate with parent with fail"],[13]],[],false,["on"]]',moduleName:"dummy/templates/client-server-one.hbs",isStrictMode:!1})
e.default=r})),define("dummy/templates/client-server-two",["exports","@ember/template-factory"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var r=(0,t.createTemplateFactory)({id:"d5fDu4Q6",block:'[[[10,"h2"],[12],[1,"This here is client/server two"],[13],[1,"\\n\\n"],[8,[39,0],null,[["@route"],["client-server-two.example"]],[["default"],[[[[1,"Route model hook example"]],[]]]]],[1,"\\n\\n"],[46,[28,[37,2],null,null],null,null,null]],[],false,["link-to","component","-outlet"]]',moduleName:"dummy/templates/client-server-two.hbs",isStrictMode:!1})
e.default=r})),define("dummy/templates/client-server-two/example",["exports","@ember/template-factory"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var r=(0,t.createTemplateFactory)({id:"r7v9oLGA",block:'[[[10,2],[12],[1,"Name = "],[1,[30,0,["model","name"]]],[13],[1,"\\n"],[10,2],[12],[1,"Version= "],[1,[30,0,["model","version"]]],[13],[1,"\\n\\n"],[46,[28,[37,1],null,null],null,null,null]],[],false,["component","-outlet"]]',moduleName:"dummy/templates/client-server-two/example.hbs",isStrictMode:!1})
e.default=r})),define("dummy/templates/demo",["exports","@ember/template-factory"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var r=(0,t.createTemplateFactory)({id:"hyYUWmMn",block:'[[[10,0],[12],[1,"\\n  "],[8,[39,0],[[16,"src",[30,0,["clientServerOneSrc"]]]],[["@target"],["target-1"]],null],[1,"\\n  "],[8,[39,0],[[16,"src",[30,0,["clientServerTwoSrc"]]]],[["@target"],["target-2"]],null],[1,"\\n"],[13],[1,"\\n\\n"],[10,"h4"],[12],[1,"Got server query: "],[1,[30,0,["model"]]],[13],[1,"\\n\\n"],[11,"button"],[24,4,"button"],[4,[38,1],["click",[30,0,["askTarget1"]]],null],[12],[1,"Target-1 - What is your name?"],[13],[1,"\\n"],[11,"button"],[24,4,"button"],[4,[38,1],["click",[30,0,["openPopup"]]],null],[12],[1,"Popup (new window) example"],[13],[1,"\\n\\n"],[41,[30,0,["popup"]],[[[1,"  "],[11,"button"],[24,4,"button"],[4,[38,1],["click",[30,0,["askPopup"]]],null],[12],[1,"Popup - What is your name?"],[13],[1,"\\n"]],[]],null]],[],false,["x-iframe","on","if"]]',moduleName:"dummy/templates/demo.hbs",isStrictMode:!1})
e.default=r})),define("dummy/templates/index",["exports","@ember/template-factory"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var r=(0,t.createTemplateFactory)({id:"PGbjbd7P",block:'[[[8,[39,0],null,[["@route"],["demo"]],[["default"],[[[[1,"See demo"]],[]]]]]],[],false,["link-to"]]',moduleName:"dummy/templates/index.hbs",isStrictMode:!1})
e.default=r})),define("dummy/templates/not-found",["exports","@ember/template-factory"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var r=(0,t.createTemplateFactory)({id:"j0ENYbXi",block:'[[[10,"h1"],[12],[1,"Not found"],[13],[1,"\\n"],[10,2],[12],[1,"This page doesn\\"t exist. "],[8,[39,0],null,[["@route"],["index"]],[["default"],[[[[1,"Head home?"]],[]]]]],[13]],[],false,["link-to"]]',moduleName:"dummy/templates/not-found.hbs",isStrictMode:!1})
e.default=r})),define("dummy/config/environment",[],(function(){try{var e="dummy/config/environment",t=document.querySelector('meta[name="'+e+'"]').getAttribute("content"),r={default:JSON.parse(decodeURIComponent(t))}
return Object.defineProperty(r,"__esModule",{value:!0}),r}catch(n){throw new Error('Could not read config from meta tag with name "'+e+'".')}}))
runningTests||require("dummy/app").default.create({"ember-window-messenger":{parent:"https://raido.github.io","target-1":"https://raido.github.io","target-2":"https://raido.github.io",popup:"https://raido.github.io"}})
