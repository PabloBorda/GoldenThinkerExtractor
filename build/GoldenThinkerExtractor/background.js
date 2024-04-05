/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "check_script_injected") {
    // Check for the marker
    var scriptInjected = document.body.getAttribute('data-script-injected') === 'true' || window.scriptInjected === true;
    sendResponse({
      scriptInjected: scriptInjected
    });
  } else if (message.action === "execute_visitor_link_tree_bfs") {
    // Execute the function if requested
    visitor_link_tree_bfs(rootLinks);
    sendResponse({
      status: "executed",
      message: "visitor_link_tree_bfs executed."
    });
  }
});

// start_web_crawl_message
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "start_web_crawl_message") {
    // Function to check if the script is already injected
    var checkScriptInjected = function checkScriptInjected(tabId, callback) {
      chrome.tabs.sendMessage(tabId, {
        action: "check_script_injected"
      }, function (response) {
        if (response && response.scriptInjected) {
          callback(true);
        } else {
          callback(false);
        }
      });
    }; // Determine the tabId to use
    var tabId = message.current_tab_id || (sender.tab ? sender.tab.id : null);
    if (tabId) {
      checkScriptInjected(tabId, function (isInjected) {
        if (isInjected) {
          // Script already injected, directly execute the function
          chrome.tabs.sendMessage(tabId, {
            action: "execute_visitor_link_tree_bfs"
          });
          console.log("Directly executing visitor_link_tree_bfs in tab:", tabId);
          sendResponse({
            status: "success",
            message: "Function executed directly."
          });
        } else {
          // Inject the script for the first time
          // Ensure we have a valid URL from the sender.tab if current_tab_id was not provided
          var tabUrl = sender.tab && sender.tab.url ? sender.tab.url : null;
          if (!tabUrl) {
            console.error("Tab URL is undefined.");
            sendResponse({
              status: "error",
              message: "Tab URL is undefined."
            });
            return;
          }
          var url = new URL(tabUrl);
          var domain = url.hostname;
          chrome.scripting.executeScript({
            target: {
              tabId: tabId
            },
            files: ['com_goldenthinkerextractor_injection/' + domain + '/injection.js']
          }).then(function () {
            console.log("Script injected into tab:", tabId);
            sendResponse({
              status: "success",
              domain: domain
            });
          })["catch"](function (error) {
            console.error("Error injecting script into tab:", tabId, error);
            sendResponse({
              status: "error",
              message: error.message
            });
          });
        }
      });
      return true; // Keep the message channel open for the asynchronous response
    } else {
      console.error("Tab ID is undefined.");
      sendResponse({
        status: "error",
        message: "Tab ID is undefined."
      });
    }
  }
});

// stop_web_crawl_message
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "stop_web_crawl_message") {
    // Handle stop_web_crawl_message action
    sendResponse({
      status: "stopped"
    });
    return true;
  }
});

// get_active_tab
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "get_active_tab") {
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, function (tabs) {
      if (tabs.length > 0) {
        var activeTab = tabs[0];
        sendResponse({
          tabId: activeTab.id
        });
      } else {
        sendResponse({
          error: "No active tab found"
        });
      }
    });
    return true; // Indicates that the response is sent asynchronously
  }
});

// open_new_tab
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "open_new_tab") {
    chrome.tabs.create({
      url: message.url,
      active: false
    }, function (newTab) {
      var checkTabLoaded = function checkTabLoaded(tabId, changeInfo, tab) {
        if (tabId === newTab.id && changeInfo.status === 'complete') {
          // Tab is fully loaded, now safe to inject the script
          chrome.tabs.onUpdated.removeListener(checkTabLoaded); // Clean up the listener
          console.log("Tab fully loaded with ID:", newTab.id);
          // Proceed with any actions needed after the tab is loaded
          sendResponse({
            status: "tab_was_opened",
            new_tab_id: newTab.id
          });
        }
      };
      chrome.tabs.onUpdated.addListener(checkTabLoaded);
    });
    return true; // Keep the message channel open for the sendResponse callback
  }
});

// close_current_tab
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "close_current_tab") {
    // Check if sender.tab.id is available to ensure the message comes from a content script within a tab
    if (sender.tab && sender.tab.id) {
      chrome.tabs.remove(sender.tab.id, function () {
        // Check for any error that might have occurred during tab removal
        if (chrome.runtime.lastError) {
          console.error("Error closing tab:", chrome.runtime.lastError.message);
          sendResponse({
            status: "error",
            message: chrome.runtime.lastError.message
          });
        } else {
          console.log("Tab closed successfully");
          sendResponse({
            status: "success",
            message: "Tab closed successfully"
          });
        }
      });
    } else {
      console.error("Tab ID not found or message not sent from a tab.");
      sendResponse({
        status: "error",
        message: "Tab ID not found or message not sent from a tab."
      });
    }
    return true; // Indicates that you wish to send a response asynchronously
  }
});

//apply_macro_button_message
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "apply_macro_button_message") {
    try {
      var jsonData = JSON.parse(message.data);
      console.log("JSON data is valid", jsonData);
      // Perform operations with jsonData here

      sendResponse({
        success: true,
        message: "Data processed successfully"
      });
    } catch (error) {
      console.error("Invalid JSON data", error);
      sendResponse({
        success: false,
        error: "Invalid JSON data"
      });
    }

    // Use sender.tab.id if message.tab is undefined
    var tabId = message.current_tab_id;
    if (!tabId) {
      console.error("Tab ID is undefined.");
      sendResponse({
        status: "error",
        message: "Tab ID is undefined."
      });
      return true;
    }

    // Fetch the tab information to get its URL
    chrome.tabs.get(tabId, function (tab) {
      // Extract the domain from the tab's URL
      var url = new URL(tab.url);
      var domain = url.hostname;
      console.log("Domain of the current tab:", domain);

      // Now proceed with injecting the script
      chrome.scripting.executeScript({
        target: {
          tabId: tabId
        },
        files: ['com_goldenthinkerextractor_injection/' + domain + '/macro_injection.js']
      }).then(function () {
        console.log("macro_injection.js Script successfully injected into tab " + tabId);
        sendResponse({
          status: "success",
          domain: domain
        });
      })["catch"](function (error) {
        console.error("Error injecting script into tab " + tabId, error);
        sendResponse({
          status: "error",
          message: error.message
        });
      });
    });
    return true; // indicates an asynchronous response.

    // Example of processing data. Replace this with your actual logic.

    return true; // Indicates that the response is sent asynchronously
  }
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
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "extracted_links") {
    console.log("Links received in background script: ", message.links);
    // Process the links as needed
    sendResponse({
      status: "Links processed"
    });
  }
});

//delay
function delay(_x) {
  return _delay.apply(this, arguments);
} //http requests listener rate limit 
function _delay() {
  _delay = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(milliseconds) {
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.abrupt("return", new Promise(function (resolve) {
            return setTimeout(resolve, milliseconds);
          }));
        case 1:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _delay.apply(this, arguments);
}
chrome.webRequest.onCompleted.addListener( /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(details) {
    var retryAfterHeader, retryAfterSeconds;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (!(details.statusCode === 429 || details.statusCode === 403)) {
            _context.next = 11;
            break;
          }
          retryAfterHeader = details.responseHeaders.find(function (header) {
            return header.name.toLowerCase() === "retry-after";
          });
          if (!retryAfterHeader) {
            _context.next = 10;
            break;
          }
          retryAfterSeconds = parseInt(retryAfterHeader.value, 10) || 0; // Default to 0 if parsing fails
          console.log("Received ".concat(details.statusCode, ", retrying after:"), retryAfterSeconds, "seconds");

          // Convert seconds to milliseconds for the delay function
          _context.next = 7;
          return delay(retryAfterSeconds * 1000);
        case 7:
          // After delay, you can take further action, such as retrying the request
          console.log("Retrying now...");
          // Implement retry logic here
          _context.next = 11;
          break;
        case 10:
          // If there's no Retry-After header, you might choose to handle it differently
          console.log("Received ".concat(details.statusCode, " without a Retry-After header."));
          // Implement alternative handling here
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function (_x2) {
    return _ref.apply(this, arguments);
  };
}(), {
  urls: ["<all_urls>"]
}, ["responseHeaders"]);

// Listen for messages from the background script
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "execute_visitor_link_tree_bfs") {
    // Execute the BFS function
    var _rootLinks = ["https://www.mercadolibre.com.co/categorias#menu=categories"];
    visitor_link_tree_bfs(_rootLinks).then(function () {
      sendResponse({
        status: "completed"
      });
    })["catch"](function (error) {
      console.error("Error executing visitor_link_tree_bfs:", error);
      sendResponse({
        status: "error",
        message: error.toString()
      });
    });
    return true; // Return true to indicate asynchronous response
  }
});
/******/ })()
;
//# sourceMappingURL=background.js.map