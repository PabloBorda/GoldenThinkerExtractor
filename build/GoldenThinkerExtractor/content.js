/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
// CORS: 'sha256-3woF8BZ54TeXM+czaH3aXoaJsVpiamuAKFsXDykAR/Q='

function attach_event_listeners() {
  // Save selectors to cookies
  console.log("Attaching event listener to start/stopScript button");
  document.getElementById("startButton").addEventListener("click", function () {
    var button = this;
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, function (tabs) {
      var activeTab = tabs[0];
      console.log("Sending 'startScript' message to background script");
      chrome.runtime.sendMessage({
        action: "startScript",
        tabId: activeTab.id
      }, function (response) {
        if (chrome.runtime.lastError) {
          console.error("Error sending message:", chrome.runtime.lastError.message);
          return;
        }
        if (response.status === "success") {
          console.log("Script injection worked.");
          button.innerHTML = "Stop";
          // Handle UI changes or further actions
        } else if (response.status === "error") {
          console.error("Script failed to inject:", response.message);
          // Handle error
        }
      });
    });
  });
  document.getElementById("downloadButton").addEventListener("click", function () {
    console.log("downloading...");
    var filenameInput = document.getElementById("filename");
    var filename = filenameInput.value.trim() || "download"; // Use a default filename if none is provided

    chrome.storage.local.get(["globalResultsArray"], function (data) {
      if (data.globalResultsArray) {
        var jsonString = JSON.stringify(data.globalResultsArray, null, 2);
        var blob = new Blob([jsonString], {
          type: "application/json"
        });
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = "".concat(filename, ".json"); // Use the user-specified filename
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else {
        console.log("No data to download.");
      }
    });
  });

  // Clear selectors from cookies and text area
  document.getElementById("clearButton").addEventListener("click", function () {
    console.log("clear");
    chrome.storage.local.clear(function () {
      var error = chrome.runtime.lastError;
      if (error) {
        console.error(error);
      } else {
        console.log('Data cleared from chrome.storage.local');
      }
    });
  });
  document.getElementById("addElementButton").addEventListener("click", function () {
    var nameInput = document.getElementById("elementName");
    var selectorInput = document.getElementById("elementSelector");
    var name = nameInput.value.trim();
    var selector = selectorInput.value.trim();
    if (name && selector) {
      chrome.tabs.query({
        active: true,
        currentWindow: true
      }, function (tabs) {
        var currentTabId = tabs[0].id.toString(); // Convert tab ID to string for use as a key
        var newElement = {
          name: name,
          selector: selector
        };

        // Retrieve the current list of selectors for the tab, add the new one, and save it back
        chrome.storage.local.get([currentTabId], function (result) {
          var currentSelectors = result[currentTabId] ? result[currentTabId] : [];
          currentSelectors.push(newElement);
          var storageObject = {};
          storageObject[currentTabId] = currentSelectors;
          chrome.storage.local.set(storageObject, function () {
            console.log('Selector saved for tab ID:', currentTabId);
            // Clear inputs and refresh the list of selectors
            nameInput.value = '';
            selectorInput.value = '';
            loadSelectorsForCurrentTab();
          });
        });
      });
    } else {
      alert("Please fill in both name and selector fields.");
    }
  });
}
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOMContentLoaded");
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    var url = new URL(tabs[0].url);
    var domain = url.hostname;
    document.getElementById("domainName").textContent = domain;
  });
  attach_event_listeners();
  loadSelectorsForCurrentTab(); // Load selectors for the current tab

  var tablinks = document.getElementsByClassName("tablinks");
  for (var i = 0; i < tablinks.length; i++) {
    tablinks[i].addEventListener('click', function (event) {
      var tabName = this.getAttribute('data-tab');
      openTab(event, tabName);
    });

    // Automatically open the first tab or a specific tab
    if (tablinks.length > 0) {
      tablinks[0].click();
    }
  }
  function getFaviconUrl(url) {
    // Assuming favicon is at the root directory as a fallback
    var faviconUrl = "".concat(url.protocol, "//").concat(url.hostname, "/favicon.ico");

    // Attempt to fetch the favicon specified in the page's link element
    function findFaviconInDocument() {
      var link = document.querySelector("link[rel~='icon']");
      if (link) {
        return link.href;
      }
      return '';
    }
    chrome.scripting.executeScript({
      target: {
        tabId: url.id
      },
      "function": findFaviconInDocument
    }, function (injectionResults) {
      var _iterator = _createForOfIteratorHelper(injectionResults),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var frameResult = _step.value;
          if (frameResult.result && frameResult.result !== '') {
            faviconUrl = frameResult.result;
            break;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      document.getElementById('target_favicon').src = faviconUrl;
    });
    return faviconUrl; // This will return the default favicon path or the updated one if found
  }

  // Fetch and display the favicon and domain
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    var url = new URL(tabs[0].url);
    document.getElementById("domainName").textContent = url.hostname;
    document.getElementById('target_favicon').src = "".concat(url.protocol, "//").concat(url.host, "/favicon.ico");
  });
});
function loadSelectorsForCurrentTab() {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    var currentTabId = tabs[0].id.toString();
    chrome.storage.local.get([currentTabId], function (result) {
      var selectors = result[currentTabId] ? result[currentTabId] : [];
      var elementsList = document.getElementById("elementsList");
      elementsList.innerHTML = ''; // Clear existing list

      selectors.forEach(function (element, index) {
        var elementItem = document.createElement("div");
        elementItem.className = "element-item";
        elementItem.innerHTML = "<td>".concat(element.name, ": ").concat(element.selector, "</td><td></td><td></td><td><button class=\"removeElementButton\" data-index=\"").concat(index, "\">X</button></td>");
        elementsList.appendChild(elementItem);

        // Add remove functionality
        elementItem.querySelector(".removeElementButton").addEventListener("click", function () {
          removeSelectorFromCurrentTab(index);
        });
      });
    });
  });
}
function removeSelectorFromCurrentTab(index) {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    var currentTabId = tabs[0].id.toString();
    chrome.storage.local.get([currentTabId], function (result) {
      var selectors = result[currentTabId];
      if (selectors) {
        selectors.splice(index, 1); // Remove the selector at the specified index
        var storageObject = {};
        storageObject[currentTabId] = selectors;
        chrome.storage.local.set(storageObject, function () {
          console.log('Selector removed for tab ID:', currentTabId);
          loadSelectorsForCurrentTab(); // Refresh the list of selectors
        });
      }
    });
  });
}
function openTab(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  var targetTab = document.getElementById(tabName);
  if (targetTab) {
    targetTab.style.display = "block";
    evt.currentTarget.className += " active";
  } else {
    console.error("Tab not found: ", tabName);
  }
}
/******/ })()
;
//# sourceMappingURL=content.js.map