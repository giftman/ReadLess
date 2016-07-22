'use strict';

var {applyMiddleware, createStore} = require('redux');
var reducers = require('../reducers');
var createLogger = require('redux-logger');
var thunk = require('redux-thunk').default;
var analytics = require('./analytics');
import promise from './promise';

var isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

var logger = createLogger({
  predicate: () => isDebuggingInChrome,
  collapsed: true,
  duration: true,
});

var store = applyMiddleware(thunk,promise,analytics,logger)(createStore)(reducers);

function configureStore() {
  if(isDebuggingInChrome) {
    window.store = store;
  }

  return store;
}

module.exports = configureStore;