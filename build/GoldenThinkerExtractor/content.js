/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
console.log("content.js script successfully injected from the static manifest.json");
var UserSimulator = /*#__PURE__*/(/* unused pure expression or super */ null && (function () {
  function UserSimulator() {
    _classCallCheck(this, UserSimulator);
  }
  _createClass(UserSimulator, [{
    key: "simulate_user_typing",
    value: function simulate_user_typing(selector, value) {
      var maxDelayMs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;
      var input = document.querySelector(selector);
      if (!input) {
        console.error('Input field not found');
        return;
      }
      input.focus();
      var chars = value.split('');
      var typingPromise = Promise.resolve(); // Start with a resolved promise

      chars.forEach(function (_char) {
        typingPromise = typingPromise.then(function () {
          return new Promise(function (resolve) {
            setTimeout(function () {
              // Create and dispatch the keydown event
              var keydownEvent = new KeyboardEvent('keydown', {
                key: _char,
                code: "Key".concat(_char.toUpperCase()),
                bubbles: true
              });
              input.dispatchEvent(keydownEvent);
              input.value += _char; // Add character to input value

              // Create and dispatch the keyup event
              var keyupEvent = new KeyboardEvent('keyup', {
                key: _char,
                code: "Key".concat(_char.toUpperCase()),
                bubbles: true
              });
              input.dispatchEvent(keyupEvent);

              // Trigger input event after keyup to simulate the input change
              var event = new Event('input', {
                bubbles: true
              });
              input.dispatchEvent(event);
              resolve(); // Resolve the promise to allow the next iteration
            }, Math.random() * maxDelayMs);
          });
        });
      });
    }
  }, {
    key: "listen_mouse_movement",
    value: function listen_mouse_movement() {
      document.addEventListener('mousemove', function (event) {
        var x = event.clientX; // Get the horizontal coordinate
        var y = event.clientY; // Get the vertical coordinate
        console.log("Mouse position: X=".concat(x, ", Y=").concat(y));
      });
    }
  }]);
  return UserSimulator;
}()));
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "simulate_user_typing") {
    // Implement keyboard simulation logic here
    console.log("execute: simulate_user_typing");
    user_simulator.simulate_user_typing(message.target, message.text);
    sendResponse({
      success: true,
      message: "Typing simulation complete"
    });
  } else if (message.action === "listen_mouse_movement") {
    // Implement mouse simulation logic here
    user_simulator.listen_mouse_movement(message.eventType, message.options);
    sendResponse({
      success: true,
      message: "Typing simulation complete"
    });
  }
  return true;
});

// wait_for_dom_changes
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  function waitForDomChanges() {
    var elementSelector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'body';
    var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10000;
    return new Promise(function (resolve, reject) {
      var observer = new MutationObserver(function (mutations, obs) {
        resolve();
        obs.disconnect(); // Stop observing after changes are detected
      });
      var elem = document.querySelector(elementSelector);
      if (!elem) {
        reject(new Error("Element ".concat(elementSelector, " not found")));
        return;
      }
      observer.observe(elem, {
        childList: true,
        // observe direct children
        subtree: true,
        // and lower descendants too
        attributes: false,
        // do not listen to attribute changes
        characterData: false // do not listen to text content changes
      });

      // Optional: Reject the promise if no changes are observed within the timeout period
      setTimeout(function () {
        observer.disconnect();
        reject(new Error('Timeout waiting for DOM changes'));
      }, timeout);
    });
  }
  if (message.action === "wait_for_dom_changes") {
    // Define the function outside or just use it directly if not needed elsewhere
    waitForDomChanges(message.elementSelector, message.timeout).then(function () {
      sendResponse({
        success: true,
        message: "DOM changes detected"
      });
    })["catch"](function (error) {
      sendResponse({
        success: false,
        error: error.message
      });
    });
    return true; // Indicate an asynchronous response
  }
});
/******/ })()
;
//# sourceMappingURL=content.js.map