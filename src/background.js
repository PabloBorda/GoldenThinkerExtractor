

// start_web_crawl_message
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "start_web_crawl_message") {
    // Use sender.tab.id if message.tab is undefined
    const tabId = message.current_tab_id;

    if (!tabId) {
        console.error("Tab ID is undefined.");
        sendResponse({ status: "error", message: "Tab ID is undefined." });
        return true;
    }
    
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
}});




// stop_web_crawl_message
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "stop_web_crawl_message") {
      // Handle stop_web_crawl_message action
      sendResponse({ status: "stopped" });
      return true;
}});
    



// get_active_tab
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "get_active_tab") {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          if (tabs.length > 0) {
              const activeTab = tabs[0];
              sendResponse({tabId: activeTab.id});
          } else {
              sendResponse({error: "No active tab found"});
          }
      });
      return true; // Indicates that the response is sent asynchronously
  }
});




// open_new_tab
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "open_new_tab") {
      chrome.tabs.create({ url: message.url, active: false }, function(newTab) {
        chrome.tabs.update(newTab.id, { active: true });
        console.log(JSON.stringify({status: "tab_was_opened", message: { new_tab_id: newTab.id}}));
        sendResponse({status: "tab_was_opened", message: { new_tab_id: newTab.id }});
      }); 
}});




//apply_macro_button_message
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.action === "apply_macro_button_message") {

      try {
          const jsonData = JSON.parse(message.data);
          console.log("JSON data is valid", jsonData);
          // Perform operations with jsonData here
        
          sendResponse({success: true, message: "Data processed successfully"});
      } catch (error) {
          console.error("Invalid JSON data", error);
          sendResponse({success: false, error: "Invalid JSON data"});
        }
    

        // Use sender.tab.id if message.tab is undefined
        const tabId = message.current_tab_id;

        if (!tabId) {
            console.error("Tab ID is undefined.");
            sendResponse({ status: "error", message: "Tab ID is undefined." });
            return true;
        }
        
        // Fetch the tab information to get its URL
        chrome.tabs.get(tabId, function(tab) {
            // Extract the domain from the tab's URL
            const url = new URL(tab.url);
            const domain = url.hostname;
    
    
            console.log("Domain of the current tab:", domain);
    
            // Now proceed with injecting the script
            chrome.scripting.executeScript({
                target: { tabId: tabId },
                files: ['com_goldenthinkerextractor_injection/' + domain + '/macro_injection.js']
            }).then(() => {
                console.log("macro_injection.js Script successfully injected into tab " + tabId);
                sendResponse({ status: "success", domain: domain });
            }).catch((error) => {
                console.error("Error injecting script into tab " + tabId, error);
                sendResponse({ status: "error", message: error.message });
            });
        });
    
        return true; // indicates an asynchronous response.
        
  // Example of processing data. Replace this with your actual logic.

  return true; // Indicates that the response is sent asynchronously
  }
});



  // wait_for_dom_changes
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    function waitForDomChanges(elementSelector = 'body', timeout = 10000) {
      return new Promise((resolve, reject) => {
        const observer = new MutationObserver((mutations, obs) => {
          resolve();
          obs.disconnect(); // Stop observing after changes are detected
        });
    
        const elem = document.querySelector(elementSelector);
        if (!elem) {
          reject(new Error(`Element ${elementSelector} not found`));
          return;
        }
    
        observer.observe(elem, {
          childList: true, // observe direct children
          subtree: true, // and lower descendants too
          attributes: false, // do not listen to attribute changes
          characterData: false, // do not listen to text content changes
        });
    
        // Optional: Reject the promise if no changes are observed within the timeout period
        setTimeout(() => {
          observer.disconnect();
          reject(new Error('Timeout waiting for DOM changes'));
        }, timeout);
      });
    }
  
    if (message.action === "wait_for_dom_changes") {
      // Define the function outside or just use it directly if not needed elsewhere
      waitForDomChanges(message.elementSelector, message.timeout)
        .then(() => {
          sendResponse({success: true, message: "DOM changes detected"});
        })
        .catch(error => {
          sendResponse({success: false, error: error.message});
        });
      return true; // Indicate an asynchronous response
    }
  });




  
//delay
async function delay(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}




//http requests listener rate limit 
chrome.webRequest.onCompleted.addListener(async function(details) {
  // Check for rate limiting or access denied
  if (details.statusCode === 429 || details.statusCode === 403) {
    const retryAfterHeader = details.responseHeaders.find(header => header.name.toLowerCase() === "retry-after");
    if (retryAfterHeader) {
      const retryAfterSeconds = parseInt(retryAfterHeader.value, 10) || 0; // Default to 0 if parsing fails
      console.log(`Received ${details.statusCode}, retrying after:`, retryAfterSeconds, "seconds");
      
      // Convert seconds to milliseconds for the delay function
      await delay(retryAfterSeconds * 1000);
      
      // After delay, you can take further action, such as retrying the request
      console.log("Retrying now...");
      // Implement retry logic here
    } else {
      // If there's no Retry-After header, you might choose to handle it differently
      console.log(`Received ${details.statusCode} without a Retry-After header.`);
      // Implement alternative handling here
    }
  }
},
{urls: ["<all_urls>"]},
["responseHeaders"]
);

