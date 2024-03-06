console.log(new Date().toISOString(), "background.js", 1);

console.log(new Date().toISOString(), "background.js", 2);

console.log(new Date().toISOString(), "background.js", 3);
// start_web_crawl_message
console.log(new Date().toISOString(), "background.js", 4);
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
console.log(new Date().toISOString(), "background.js", 5);
  if (message.action === "start_web_crawl_message") {
console.log(new Date().toISOString(), "background.js", 6);
    // Use sender.tab.id if message.tab is undefined
console.log(new Date().toISOString(), "background.js", 7);
    const tabId = message.current_tab_id;
console.log(new Date().toISOString(), "background.js", 8);

console.log(new Date().toISOString(), "background.js", 9);
    if (!tabId) {
console.log(new Date().toISOString(), "background.js", 10);
        console.error("Tab ID is undefined.");
console.log(new Date().toISOString(), "background.js", 11);
        sendResponse({ status: "error", message: "Tab ID is undefined." });
console.log(new Date().toISOString(), "background.js", 12);
        return true;
console.log(new Date().toISOString(), "background.js", 13);
    }
console.log(new Date().toISOString(), "background.js", 14);
    
console.log(new Date().toISOString(), "background.js", 15);
    // Fetch the tab information to get its URL
console.log(new Date().toISOString(), "background.js", 16);
    chrome.tabs.get(tabId, function(tab) {
console.log(new Date().toISOString(), "background.js", 17);
        // Extract the domain from the tab's URL
console.log(new Date().toISOString(), "background.js", 18);
        const url = new URL(tab.url);
console.log(new Date().toISOString(), "background.js", 19);
        const domain = url.hostname;
console.log(new Date().toISOString(), "background.js", 20);

console.log(new Date().toISOString(), "background.js", 21);

console.log(new Date().toISOString(), "background.js", 22);
        console.log("Domain of the current tab:", domain);
console.log(new Date().toISOString(), "background.js", 23);

console.log(new Date().toISOString(), "background.js", 24);
        // Now proceed with injecting the script
console.log(new Date().toISOString(), "background.js", 25);
        chrome.scripting.executeScript({
console.log(new Date().toISOString(), "background.js", 26);
            target: { tabId: tabId },
console.log(new Date().toISOString(), "background.js", 27);
            files: ['com_goldenthinkerextractor_injection/' + domain + '/injection.js']
console.log(new Date().toISOString(), "background.js", 28);
        }).then(() => {
console.log(new Date().toISOString(), "background.js", 29);
            console.log("Script injected into tab " + tabId);
console.log(new Date().toISOString(), "background.js", 30);
            sendResponse({ status: "success", domain: domain }); // Optionally include the domain in the response
console.log(new Date().toISOString(), "background.js", 31);
        }).catch((error) => {
console.log(new Date().toISOString(), "background.js", 32);
            console.error("Error injecting script into tab " + tabId, error);
console.log(new Date().toISOString(), "background.js", 33);
            sendResponse({ status: "error", message: error.message });
console.log(new Date().toISOString(), "background.js", 34);
        });
console.log(new Date().toISOString(), "background.js", 35);
    });
console.log(new Date().toISOString(), "background.js", 36);

console.log(new Date().toISOString(), "background.js", 37);
    return true; // indicates an asynchronous response.
console.log(new Date().toISOString(), "background.js", 38);
}});
console.log(new Date().toISOString(), "background.js", 39);

console.log(new Date().toISOString(), "background.js", 40);

console.log(new Date().toISOString(), "background.js", 41);

console.log(new Date().toISOString(), "background.js", 42);

console.log(new Date().toISOString(), "background.js", 43);
// stop_web_crawl_message
console.log(new Date().toISOString(), "background.js", 44);
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
console.log(new Date().toISOString(), "background.js", 45);
  if (message.action === "stop_web_crawl_message") {
console.log(new Date().toISOString(), "background.js", 46);
      // Handle stop_web_crawl_message action
console.log(new Date().toISOString(), "background.js", 47);
      sendResponse({ status: "stopped" });
console.log(new Date().toISOString(), "background.js", 48);
      return true;
console.log(new Date().toISOString(), "background.js", 49);
}});
console.log(new Date().toISOString(), "background.js", 50);
    
console.log(new Date().toISOString(), "background.js", 51);

console.log(new Date().toISOString(), "background.js", 52);

console.log(new Date().toISOString(), "background.js", 53);

console.log(new Date().toISOString(), "background.js", 54);
// get_active_tab
console.log(new Date().toISOString(), "background.js", 55);
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
console.log(new Date().toISOString(), "background.js", 56);
  if (request.action === "get_active_tab") {
console.log(new Date().toISOString(), "background.js", 57);
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
console.log(new Date().toISOString(), "background.js", 58);
          if (tabs.length > 0) {
console.log(new Date().toISOString(), "background.js", 59);
              const activeTab = tabs[0];
console.log(new Date().toISOString(), "background.js", 60);
              sendResponse({tabId: activeTab.id});
console.log(new Date().toISOString(), "background.js", 61);
          } else {
console.log(new Date().toISOString(), "background.js", 62);
              sendResponse({error: "No active tab found"});
console.log(new Date().toISOString(), "background.js", 63);
          }
console.log(new Date().toISOString(), "background.js", 64);
      });
console.log(new Date().toISOString(), "background.js", 65);
      return true; // Indicates that the response is sent asynchronously
console.log(new Date().toISOString(), "background.js", 66);
  }
console.log(new Date().toISOString(), "background.js", 67);
});
console.log(new Date().toISOString(), "background.js", 68);

console.log(new Date().toISOString(), "background.js", 69);

console.log(new Date().toISOString(), "background.js", 70);

console.log(new Date().toISOString(), "background.js", 71);

console.log(new Date().toISOString(), "background.js", 72);
// open_new_tab
console.log(new Date().toISOString(), "background.js", 73);
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
console.log(new Date().toISOString(), "background.js", 74);
    if (message.action === "open_new_tab") {
console.log(new Date().toISOString(), "background.js", 75);
      chrome.tabs.create({ url: message.url, active: false }, function(newTab) {
console.log(new Date().toISOString(), "background.js", 76);
        chrome.tabs.update(newTab.id, { active: true });
console.log(new Date().toISOString(), "background.js", 77);
        console.log(JSON.stringify({status: "tab_was_opened", message: { new_tab_id: newTab.id}}));
console.log(new Date().toISOString(), "background.js", 78);
        sendResponse({status: "tab_was_opened", message: { new_tab_id: newTab.id }});
console.log(new Date().toISOString(), "background.js", 79);
        return true;
console.log(new Date().toISOString(), "background.js", 80);
      }); 
console.log(new Date().toISOString(), "background.js", 81);
}});
console.log(new Date().toISOString(), "background.js", 82);

console.log(new Date().toISOString(), "background.js", 83);

console.log(new Date().toISOString(), "background.js", 84);

console.log(new Date().toISOString(), "background.js", 85);

console.log(new Date().toISOString(), "background.js", 86);
// close_current_tab
console.log(new Date().toISOString(), "background.js", 87);
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
console.log(new Date().toISOString(), "background.js", 88);
  if (message.action === "close_current_tab") {
console.log(new Date().toISOString(), "background.js", 89);
      // Check if sender.tab.id is available to ensure the message comes from a content script within a tab
console.log(new Date().toISOString(), "background.js", 90);
      if (sender.tab && sender.tab.id) {
console.log(new Date().toISOString(), "background.js", 91);
          chrome.tabs.remove(sender.tab.id, () => {
console.log(new Date().toISOString(), "background.js", 92);
              // Check for any error that might have occurred during tab removal
console.log(new Date().toISOString(), "background.js", 93);
              if (chrome.runtime.lastError) {
console.log(new Date().toISOString(), "background.js", 94);
                  console.error("Error closing tab:", chrome.runtime.lastError.message);
console.log(new Date().toISOString(), "background.js", 95);
                  sendResponse({status: "error", message: chrome.runtime.lastError.message});
console.log(new Date().toISOString(), "background.js", 96);
              } else {
console.log(new Date().toISOString(), "background.js", 97);
                  console.log("Tab closed successfully");
console.log(new Date().toISOString(), "background.js", 98);
                  sendResponse({status: "success", message: "Tab closed successfully"});
console.log(new Date().toISOString(), "background.js", 99);
              }
console.log(new Date().toISOString(), "background.js", 100);
          });
console.log(new Date().toISOString(), "background.js", 101);
      } else {
console.log(new Date().toISOString(), "background.js", 102);
          console.error("Tab ID not found or message not sent from a tab.");
console.log(new Date().toISOString(), "background.js", 103);
          sendResponse({status: "error", message: "Tab ID not found or message not sent from a tab."});
console.log(new Date().toISOString(), "background.js", 104);
      }
console.log(new Date().toISOString(), "background.js", 105);
      return true; // Indicates that you wish to send a response asynchronously
console.log(new Date().toISOString(), "background.js", 106);
  }
console.log(new Date().toISOString(), "background.js", 107);
});
console.log(new Date().toISOString(), "background.js", 108);

console.log(new Date().toISOString(), "background.js", 109);

console.log(new Date().toISOString(), "background.js", 110);

console.log(new Date().toISOString(), "background.js", 111);

console.log(new Date().toISOString(), "background.js", 112);
//apply_macro_button_message
console.log(new Date().toISOString(), "background.js", 113);
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
console.log(new Date().toISOString(), "background.js", 114);
  if (message.action === "apply_macro_button_message") {
console.log(new Date().toISOString(), "background.js", 115);

console.log(new Date().toISOString(), "background.js", 116);
      try {
console.log(new Date().toISOString(), "background.js", 117);
          const jsonData = JSON.parse(message.data);
console.log(new Date().toISOString(), "background.js", 118);
          console.log("JSON data is valid", jsonData);
console.log(new Date().toISOString(), "background.js", 119);
          // Perform operations with jsonData here
console.log(new Date().toISOString(), "background.js", 120);
        
console.log(new Date().toISOString(), "background.js", 121);
          sendResponse({success: true, message: "Data processed successfully"});
console.log(new Date().toISOString(), "background.js", 122);
      } catch (error) {
console.log(new Date().toISOString(), "background.js", 123);
          console.error("Invalid JSON data", error);
console.log(new Date().toISOString(), "background.js", 124);
          sendResponse({success: false, error: "Invalid JSON data"});
console.log(new Date().toISOString(), "background.js", 125);
        }
console.log(new Date().toISOString(), "background.js", 126);
    
console.log(new Date().toISOString(), "background.js", 127);

console.log(new Date().toISOString(), "background.js", 128);
        // Use sender.tab.id if message.tab is undefined
console.log(new Date().toISOString(), "background.js", 129);
        const tabId = message.current_tab_id;
console.log(new Date().toISOString(), "background.js", 130);

console.log(new Date().toISOString(), "background.js", 131);
        if (!tabId) {
console.log(new Date().toISOString(), "background.js", 132);
            console.error("Tab ID is undefined.");
console.log(new Date().toISOString(), "background.js", 133);
            sendResponse({ status: "error", message: "Tab ID is undefined." });
console.log(new Date().toISOString(), "background.js", 134);
            return true;
console.log(new Date().toISOString(), "background.js", 135);
        }
console.log(new Date().toISOString(), "background.js", 136);
        
console.log(new Date().toISOString(), "background.js", 137);
        // Fetch the tab information to get its URL
console.log(new Date().toISOString(), "background.js", 138);
        chrome.tabs.get(tabId, function(tab) {
console.log(new Date().toISOString(), "background.js", 139);
            // Extract the domain from the tab's URL
console.log(new Date().toISOString(), "background.js", 140);
            const url = new URL(tab.url);
console.log(new Date().toISOString(), "background.js", 141);
            const domain = url.hostname;
console.log(new Date().toISOString(), "background.js", 142);
    
console.log(new Date().toISOString(), "background.js", 143);
    
console.log(new Date().toISOString(), "background.js", 144);
            console.log("Domain of the current tab:", domain);
console.log(new Date().toISOString(), "background.js", 145);
    
console.log(new Date().toISOString(), "background.js", 146);
            // Now proceed with injecting the script
console.log(new Date().toISOString(), "background.js", 147);
            chrome.scripting.executeScript({
console.log(new Date().toISOString(), "background.js", 148);
                target: { tabId: tabId },
console.log(new Date().toISOString(), "background.js", 149);
                files: ['com_goldenthinkerextractor_injection/' + domain + '/macro_injection.js']
console.log(new Date().toISOString(), "background.js", 150);
            }).then(() => {
console.log(new Date().toISOString(), "background.js", 151);
                console.log("macro_injection.js Script successfully injected into tab " + tabId);
console.log(new Date().toISOString(), "background.js", 152);
                sendResponse({ status: "success", domain: domain });
console.log(new Date().toISOString(), "background.js", 153);
            }).catch((error) => {
console.log(new Date().toISOString(), "background.js", 154);
                console.error("Error injecting script into tab " + tabId, error);
console.log(new Date().toISOString(), "background.js", 155);
                sendResponse({ status: "error", message: error.message });
console.log(new Date().toISOString(), "background.js", 156);
            });
console.log(new Date().toISOString(), "background.js", 157);
        });
console.log(new Date().toISOString(), "background.js", 158);
    
console.log(new Date().toISOString(), "background.js", 159);
        return true; // indicates an asynchronous response.
console.log(new Date().toISOString(), "background.js", 160);
        
console.log(new Date().toISOString(), "background.js", 161);
  // Example of processing data. Replace this with your actual logic.
console.log(new Date().toISOString(), "background.js", 162);

console.log(new Date().toISOString(), "background.js", 163);
  return true; // Indicates that the response is sent asynchronously
console.log(new Date().toISOString(), "background.js", 164);
  }
console.log(new Date().toISOString(), "background.js", 165);
});
console.log(new Date().toISOString(), "background.js", 166);

console.log(new Date().toISOString(), "background.js", 167);

console.log(new Date().toISOString(), "background.js", 168);

console.log(new Date().toISOString(), "background.js", 169);

console.log(new Date().toISOString(), "background.js", 170);
// wait_for_dom_changes
console.log(new Date().toISOString(), "background.js", 171);
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
console.log(new Date().toISOString(), "background.js", 172);

console.log(new Date().toISOString(), "background.js", 173);
  function waitForDomChanges(elementSelector = 'body', timeout = 10000) {
console.log(new Date().toISOString(), "background.js", 174);
    return new Promise((resolve, reject) => {
console.log(new Date().toISOString(), "background.js", 175);
      const observer = new MutationObserver((mutations, obs) => {
console.log(new Date().toISOString(), "background.js", 176);
        resolve();
console.log(new Date().toISOString(), "background.js", 177);
        obs.disconnect(); // Stop observing after changes are detected
console.log(new Date().toISOString(), "background.js", 178);
      });
console.log(new Date().toISOString(), "background.js", 179);
  
console.log(new Date().toISOString(), "background.js", 180);
      const elem = document.querySelector(elementSelector);
console.log(new Date().toISOString(), "background.js", 181);
      if (!elem) {
console.log(new Date().toISOString(), "background.js", 182);
        reject(new Error(`Element ${elementSelector} not found`));
console.log(new Date().toISOString(), "background.js", 183);
        return;
console.log(new Date().toISOString(), "background.js", 184);
      }
console.log(new Date().toISOString(), "background.js", 185);
  
console.log(new Date().toISOString(), "background.js", 186);
      observer.observe(elem, {
console.log(new Date().toISOString(), "background.js", 187);
        childList: true, // observe direct children
console.log(new Date().toISOString(), "background.js", 188);
        subtree: true, // and lower descendants too
console.log(new Date().toISOString(), "background.js", 189);
        attributes: false, // do not listen to attribute changes
console.log(new Date().toISOString(), "background.js", 190);
        characterData: false, // do not listen to text content changes
console.log(new Date().toISOString(), "background.js", 191);
      });
console.log(new Date().toISOString(), "background.js", 192);
  
console.log(new Date().toISOString(), "background.js", 193);
      // Optional: Reject the promise if no changes are observed within the timeout period
console.log(new Date().toISOString(), "background.js", 194);
      setTimeout(() => {
console.log(new Date().toISOString(), "background.js", 195);
        observer.disconnect();
console.log(new Date().toISOString(), "background.js", 196);
        reject(new Error('Timeout waiting for DOM changes'));
console.log(new Date().toISOString(), "background.js", 197);
      }, timeout);
console.log(new Date().toISOString(), "background.js", 198);
    });
console.log(new Date().toISOString(), "background.js", 199);
  }
console.log(new Date().toISOString(), "background.js", 200);

console.log(new Date().toISOString(), "background.js", 201);
  if (message.action === "wait_for_dom_changes") {
console.log(new Date().toISOString(), "background.js", 202);
    // Define the function outside or just use it directly if not needed elsewhere
console.log(new Date().toISOString(), "background.js", 203);
    waitForDomChanges(message.elementSelector, message.timeout)
console.log(new Date().toISOString(), "background.js", 204);
      .then(() => {
console.log(new Date().toISOString(), "background.js", 205);
        sendResponse({success: true, message: "DOM changes detected"});
console.log(new Date().toISOString(), "background.js", 206);
      })
console.log(new Date().toISOString(), "background.js", 207);
      .catch(error => {
console.log(new Date().toISOString(), "background.js", 208);
        sendResponse({success: false, error: error.message});
console.log(new Date().toISOString(), "background.js", 209);
      });
console.log(new Date().toISOString(), "background.js", 210);
    return true; // Indicate an asynchronous response
console.log(new Date().toISOString(), "background.js", 211);
  }
console.log(new Date().toISOString(), "background.js", 212);
});
console.log(new Date().toISOString(), "background.js", 213);

console.log(new Date().toISOString(), "background.js", 214);

console.log(new Date().toISOString(), "background.js", 215);

console.log(new Date().toISOString(), "background.js", 216);

console.log(new Date().toISOString(), "background.js", 217);
//open_new_tab_and_extract_links
console.log(new Date().toISOString(), "background.js", 218);
/* chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
console.log(new Date().toISOString(), "background.js", 219);
  if (message.action === "open_new_tab_and_extract_links") {
console.log(new Date().toISOString(), "background.js", 220);
    chrome.tabs.create({ url: message.url, active: false }, (tab) => {
console.log(new Date().toISOString(), "background.js", 221);
      const checkTabLoaded = (tabId, changeInfo) => {
console.log(new Date().toISOString(), "background.js", 222);
        if (tabId === tab.id && changeInfo.status === "complete") {
console.log(new Date().toISOString(), "background.js", 223);
          chrome.tabs.onUpdated.removeListener(checkTabLoaded);
console.log(new Date().toISOString(), "background.js", 224);
          chrome.scripting.executeScript({
console.log(new Date().toISOString(), "background.js", 225);
            target: { tabId: tab.id },
console.log(new Date().toISOString(), "background.js", 226);
            files: ['com_goldenthinkerextractor_injection/' + domain + '/link_extractor.js']
console.log(new Date().toISOString(), "background.js", 227);
          }, (injectionResults) => {
console.log(new Date().toISOString(), "background.js", 228);
            // Handle results, e.g., sendResponse with extracted links
console.log(new Date().toISOString(), "background.js", 229);
            chrome.tabs.remove(tab.id); // Close the tab after processing
console.log(new Date().toISOString(), "background.js", 230);
          });
console.log(new Date().toISOString(), "background.js", 231);
        }
console.log(new Date().toISOString(), "background.js", 232);
      };
console.log(new Date().toISOString(), "background.js", 233);
      chrome.tabs.onUpdated.addListener(checkTabLoaded);
console.log(new Date().toISOString(), "background.js", 234);
    });
console.log(new Date().toISOString(), "background.js", 235);
    return true; // Keep the message channel open for asynchronous response
console.log(new Date().toISOString(), "background.js", 236);
  }
console.log(new Date().toISOString(), "background.js", 237);
}); */
console.log(new Date().toISOString(), "background.js", 238);

console.log(new Date().toISOString(), "background.js", 239);

console.log(new Date().toISOString(), "background.js", 240);

console.log(new Date().toISOString(), "background.js", 241);
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
console.log(new Date().toISOString(), "background.js", 242);
  if (message.action === "extracted_links") {
console.log(new Date().toISOString(), "background.js", 243);
      console.log("Links received in background script: ", message.links);
console.log(new Date().toISOString(), "background.js", 244);
      // Process the links as needed
console.log(new Date().toISOString(), "background.js", 245);
      sendResponse({status: "Links processed"});
console.log(new Date().toISOString(), "background.js", 246);
  }
console.log(new Date().toISOString(), "background.js", 247);
});
console.log(new Date().toISOString(), "background.js", 248);

console.log(new Date().toISOString(), "background.js", 249);

console.log(new Date().toISOString(), "background.js", 250);

console.log(new Date().toISOString(), "background.js", 251);

console.log(new Date().toISOString(), "background.js", 252);
//delay
console.log(new Date().toISOString(), "background.js", 253);
async function delay(milliseconds) {
console.log(new Date().toISOString(), "background.js", 254);
  return new Promise(resolve => setTimeout(resolve, milliseconds));
console.log(new Date().toISOString(), "background.js", 255);
}
console.log(new Date().toISOString(), "background.js", 256);

console.log(new Date().toISOString(), "background.js", 257);

console.log(new Date().toISOString(), "background.js", 258);

console.log(new Date().toISOString(), "background.js", 259);

console.log(new Date().toISOString(), "background.js", 260);
//http requests listener rate limit 
console.log(new Date().toISOString(), "background.js", 261);
chrome.webRequest.onCompleted.addListener(async function(details) {
console.log(new Date().toISOString(), "background.js", 262);
  // Check for rate limiting or access denied
console.log(new Date().toISOString(), "background.js", 263);
  if (details.statusCode === 429 || details.statusCode === 403) {
console.log(new Date().toISOString(), "background.js", 264);
    const retryAfterHeader = details.responseHeaders.find(header => header.name.toLowerCase() === "retry-after");
console.log(new Date().toISOString(), "background.js", 265);
    if (retryAfterHeader) {
console.log(new Date().toISOString(), "background.js", 266);
      const retryAfterSeconds = parseInt(retryAfterHeader.value, 10) || 0; // Default to 0 if parsing fails
console.log(new Date().toISOString(), "background.js", 267);
      console.log(`Received ${details.statusCode}, retrying after:`, retryAfterSeconds, "seconds");
console.log(new Date().toISOString(), "background.js", 268);
      
console.log(new Date().toISOString(), "background.js", 269);
      // Convert seconds to milliseconds for the delay function
console.log(new Date().toISOString(), "background.js", 270);
      await delay(retryAfterSeconds * 1000);
console.log(new Date().toISOString(), "background.js", 271);
      
console.log(new Date().toISOString(), "background.js", 272);
      // After delay, you can take further action, such as retrying the request
console.log(new Date().toISOString(), "background.js", 273);
      console.log("Retrying now...");
console.log(new Date().toISOString(), "background.js", 274);
      // Implement retry logic here
console.log(new Date().toISOString(), "background.js", 275);
    } else {
console.log(new Date().toISOString(), "background.js", 276);
      // If there's no Retry-After header, you might choose to handle it differently
console.log(new Date().toISOString(), "background.js", 277);
      console.log(`Received ${details.statusCode} without a Retry-After header.`);
console.log(new Date().toISOString(), "background.js", 278);
      // Implement alternative handling here
console.log(new Date().toISOString(), "background.js", 279);
    }
console.log(new Date().toISOString(), "background.js", 280);
  }
console.log(new Date().toISOString(), "background.js", 281);
},
console.log(new Date().toISOString(), "background.js", 282);
{urls: ["<all_urls>"]},
console.log(new Date().toISOString(), "background.js", 283);
["responseHeaders"]
console.log(new Date().toISOString(), "background.js", 284);
);
console.log(new Date().toISOString(), "background.js", 285);

console.log(new Date().toISOString(), "background.js", 286);
