chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "check_script_injected") {
    // Check for the marker
    console.log("check_script_injected message received ");
    const scriptInjected = document.body.getAttribute('data-script-injected') === 'true' || window.scriptInjected === true;
    sendResponse({ scriptInjected: scriptInjected });
    console.log("check_script_injected:  " + scriptInjected);
  } else if (message.action === "execute_visitor_link_tree_bfs") {
    console.log("BFS iteration starts... ")
    // Execute the function if requested
    visitor_link_tree_bfs(rootLinks);
    sendResponse({status: "executed", message: "visitor_link_tree_bfs executed."});
  }
});





// start_web_crawl_message
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "start_web_crawl_message") {
    // Function to check if the script is already injected
    function checkScriptInjected(tabId, callback) {
      chrome.runtime.sendMessage(tabId, { action: "check_script_injected" }, response => {
        if (response && response.scriptInjected) {
          callback(true);
        } else {
          callback(false);
        }
        return true;
      });
    }

    // Determine the tabId to use
    const tabId = message.current_tab_id || (sender.tab ? sender.tab.id : null);

    if (tabId) {
      checkScriptInjected(tabId, isInjected => {
        if (isInjected) {
          // Script already injected, directly execute the function
          chrome.tabs.sendMessage(tabId, { action: "execute_visitor_link_tree_bfs" });
          console.log("Directly executing visitor_link_tree_bfs in tab:", tabId);
          sendResponse({ status: "success", message: "Function executed directly." });
        } else {
          // Inject the script for the first time
          // Ensure we have a valid URL from the sender.tab if current_tab_id was not provided
          const tabUrl = sender.tab && sender.tab.url ? sender.tab.url : null;
          if (!tabUrl) {
            console.error("Tab URL is undefined.");
            sendResponse({ status: "error", message: "Tab URL is undefined." });
            return;
          }
          const url = new URL(tabUrl);
          const domain = url.hostname;

          chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ['com_goldenthinkerextractor_injection/' + domain + '/injection.js']
          }).then(() => {
            console.log("Script injected into tab:", tabId);
            sendResponse({ status: "success", domain: domain });
          }).catch((error) => {
            console.error("Error injecting script into tab:", tabId, error);
            sendResponse({ status: "error", message: error.message });
          });
        }
      });
      return true; // Keep the message channel open for the asynchronous response
    } else {
      console.error("Tab ID is undefined.");
      sendResponse({ status: "error", message: "Tab ID is undefined." });
    }
  }
});




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
    chrome.tabs.create({url: message.url, active: false}, newTab => {
      const checkTabLoaded = (tabId, changeInfo, tab) => {
        if (tabId === newTab.id && changeInfo.status === 'complete') {
          // Tab is fully loaded, now safe to inject the script
          chrome.tabs.onUpdated.removeListener(checkTabLoaded); // Clean up the listener
          console.log("Tab fully loaded with ID:", newTab.id);
          // Proceed with any actions needed after the tab is loaded
          sendResponse({status: "tab_was_opened", new_tab_id: newTab.id});
        }
      };

      chrome.tabs.onUpdated.addListener(checkTabLoaded);
    });
    return true; // Keep the message channel open for the sendResponse callback
  }
});






// close_current_tab
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "close_current_tab") {
      // Check if sender.tab.id is available to ensure the message comes from a content script within a tab
      if (sender.tab && sender.tab.id) {
          chrome.tabs.remove(sender.tab.id, () => {
              // Check for any error that might have occurred during tab removal
              if (chrome.runtime.lastError) {
                  console.error("Error closing tab:", chrome.runtime.lastError.message);
                  sendResponse({status: "error", message: chrome.runtime.lastError.message});
              } else {
                  console.log("Tab closed successfully");
                  sendResponse({status: "success", message: "Tab closed successfully"});
              }
          });
      } else {
          console.error("Tab ID not found or message not sent from a tab.");
          sendResponse({status: "error", message: "Tab ID not found or message not sent from a tab."});
      }
      return true; // Indicates that you wish to send a response asynchronously
  }
});




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





chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "extracted_links") {
      console.log("Links received in background script: ", message.links);
      // Process the links as needed
      sendResponse({status: "Links processed"});
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

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "execute_visitor_link_tree_bfs") {
    // Execute the BFS function
    const rootLinks = ["https://www.mercadolibre.com.co/categorias#menu=categories"];
    visitor_link_tree_bfs(rootLinks).then(() => {
      sendResponse({status: "completed"});
    }).catch(error => {
      console.error("Error executing visitor_link_tree_bfs:", error);
      sendResponse({status: "error", message: error.toString()});
    });
    return true; // Return true to indicate asynchronous response
  }
});
