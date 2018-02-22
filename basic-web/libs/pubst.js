'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*
 *  Pubst - Basic JavaScript Pub/Sub Event Emitter
 *
 *  Copyright 2017 Jason Schindler
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.pubst = factory();
  }
})(typeof self !== 'undefined' ? self : undefined, function () {

  var config = {
    showWarnings: true
  };

  function warn() {
    if (config.showWarnings) {
      var _console;

      for (var _len = arguments.length, messages = Array(_len), _key = 0; _key < _len; _key++) {
        messages[_key] = arguments[_key];
      }

      // eslint-disable-next-line no-console
      (_console = console).warn.apply(_console, ['WARNING:'].concat(messages));
    }
  }

  function configure() {
    var userConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    for (var key in userConfig) {
      if (config.hasOwnProperty(key)) {
        config[key] = userConfig[key];
      }
    }
  }

  var store = {};
  var stringSubs = {};
  var regexSubs = [];

  function getStringSubsFor(topic) {
    return Array.isArray(stringSubs[topic]) ? stringSubs[topic] : [];
  }

  function getRegexSubsFor(topic) {
    return regexSubs.filter(function (sub) {
      return Boolean(topic.match(sub.topic));
    });
  }

  function addSub(subscriber) {
    if (typeof subscriber.topic === 'string') {
      stringSubs[subscriber.topic] = getStringSubsFor(subscriber.topic).concat(subscriber);
    } else if (subscriber.topic instanceof RegExp) {
      regexSubs.push(subscriber);
    } else {
      throw new Error('Unable to add subscriber.  Topic is not a string or a RegExp');
    }
  }

  function removeSub(subscriber) {
    if (typeof subscriber.topic === 'string') {
      stringSubs[subscriber.topic] = getStringSubsFor(subscriber.topic).filter(function (sub) {
        return sub !== subscriber;
      });
    } else if (subscriber.topic instanceof RegExp) {
      regexSubs = regexSubs.filter(function (sub) {
        return sub !== subscriber;
      });
    }
  }

  function allSubsFor(topic) {
    return getStringSubsFor(topic).concat(getRegexSubsFor(topic));
  }

  function isNotSet(item) {
    return item === null || typeof item === 'undefined';
  }

  function isSet(item) {
    return !isNotSet(item);
  }

  function valueOrDefault(value, def) {
    if (isNotSet(value) && typeof def !== 'undefined') {
      return def;
    }

    return value;
  }

  function scheduleCall(handler, payload, def, topic) {
    setTimeout(handler, 0, valueOrDefault(payload, def), topic);
  }

  function publish(topic, payload) {
    if (store[topic] !== payload) {
      store[topic] = payload;
      var subs = allSubsFor(topic);

      if (subs.length === 0) {
        warn('There are no subscribers that match \'' + topic + '\'!');
      } else {
        subs.forEach(function (sub) {
          scheduleCall(sub.handler, store[topic], sub.default, topic);
        });
      }
    }
  }

  function subscribe(topic, handler, def) {
    var subscription = {
      topic: topic,
      default: undefined,
      handler: function handler() {}
    };

    if (typeof handler === 'function') {
      subscription.default = def;
      subscription.handler = handler;
    } else if ((typeof handler === 'undefined' ? 'undefined' : _typeof(handler)) === 'object') {
      for (var key in handler) {
        if (subscription.hasOwnProperty(key)) {
          subscription[key] = handler[key];
        }
      }
    }

    addSub(subscription);

    var stored = void 0;

    if (typeof topic === 'string') {
      stored = [{
        topic: topic,
        val: currentVal(topic, def)
      }];
    } else if (topic instanceof RegExp) {
      stored = Object.keys(store).filter(function (key) {
        return key.match(topic);
      }).map(function (key) {
        return {
          topic: key,
          val: currentVal(key, def)
        };
      });
    }

    stored.forEach(function (item) {
      if (isSet(item.val)) {
        scheduleCall(subscription.handler, item.val, subscription.default, item.topic);
      }
    });

    return function () {
      removeSub(subscription);
    };
  }

  function currentVal(topic, def) {
    return valueOrDefault(store[topic], def);
  }

  function clear(topic) {
    if (store.hasOwnProperty(topic)) {
      publish(topic, null);
    }
  }

  function clearAll() {
    Object.keys(store).forEach(clear);
  }

  return {
    clear: clear,
    clearAll: clearAll,
    configure: configure,
    currentVal: currentVal,
    publish: publish,
    subscribe: subscribe
  };
});