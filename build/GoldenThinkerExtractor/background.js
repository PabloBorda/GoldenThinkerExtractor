/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "startScript") {
    // Use sender.tab.id if message.tab is undefined
    var tabId = message.tabId;
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
        files: ['com_goldenthinkerextractor_injection/' + domain + '/injection.js']
      }).then(function () {
        console.log("Script injected into tab " + tabId);
        sendResponse({
          status: "success",
          domain: domain
        }); // Optionally include the domain in the response
      })["catch"](function (error) {
        console.error("Error injecting script into tab " + tabId, error);
        sendResponse({
          status: "error",
          message: error.message
        });
      });
    });
    return true; // indicates an asynchronous response.
  } else if (message.action === "stopScript") {
    // Handle stopScript action
    sendResponse({
      status: "stopped"
    });
    return true;
  } else if (message.action === "open_new_tab") {
    var parent_tab_id = message.tabId;
    chrome.tabs.create({
      url: message.url,
      active: false
    }, function (newTab) {
      chrome.tabs.update(newTab.id, {
        active: true
      });
      sendResponse({
        status: "tab_was_opened",
        message: {
          new_tab_id: newTab.id,
          parent_tab: parent_tab_id
        }
      });
    });
  }
});
chrome.webRequest.onCompleted.addListener(function (details) {
  // Check if the request was rate-limited
  if (details.statusCode === 429) {
    console.log("Rate limit hit:", details);
    // Optionally, extract the Retry-After header if present
    var retryAfterHeader = details.responseHeaders.find(function (header) {
      return header.name.toLowerCase() === "retry-after";
    });
    if (retryAfterHeader) {
      console.log("Retry after (seconds):", retryAfterHeader.value);
      // Here you could broadcast a message to your content scripts or take other actions
    }
  }
}, {
  urls: ["*://www.example.com/*"]
},
// Adjust the pattern to match the URLs you're interested in
["responseHeaders"]);
/******/ })()
;
//# sourceMappingURL=background.js.map