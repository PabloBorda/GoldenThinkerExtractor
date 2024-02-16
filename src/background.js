import { extractFiltersAndValues } from './com_goldenthinkerextractor_filters_for_website/filters.js';


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "startScript") {
        const tabId = message.tab.id;

        // Fetch the tab information to get its URL
        chrome.tabs.get(tabId, function(tab) {
            // Extract the domain from the tab's URL
            const url = new URL(tab.url);
            const domain = url.hostname;

            console.log("Domain of the current tab:", domain);

            // Now proceed with injecting the script
            chrome.scripting.executeScript({
                target: { tabId: tabId },
                files: ['com_goldenthinkerextractor_injection/' + domain + '/injection.js']
            }).then(() => {
                console.log("Script injected into tab " + tabId);
                sendResponse({ status: "success", domain: domain }); // Optionally include the domain in the response
            }).catch((error) => {
                console.error("Error injecting script into tab " + tabId, error);
                sendResponse({ status: "error", message: error.message });
            });
        });

        return true; // indicates an asynchronous response.
    } else if (message.action === "stopScript") {
        // Handle stopScript action
        sendResponse({ status: "stopped" });
        return true;
    }
});


chrome.webRequest.onCompleted.addListener(
    function(details) {
      // Check if the request was rate-limited
      if (details.statusCode === 429) {
        console.log("Rate limit hit:", details);
        // Optionally, extract the Retry-After header if present
        const retryAfterHeader = details.responseHeaders.find(header => header.name.toLowerCase() === "retry-after");
        if (retryAfterHeader) {
          console.log("Retry after (seconds):", retryAfterHeader.value);
          // Here you could broadcast a message to your content scripts or take other actions
        }
      }
    },
    {urls: ["*://www.example.com/*"]}, // Adjust the pattern to match the URLs you're interested in
    ["responseHeaders"]
);
  

  

