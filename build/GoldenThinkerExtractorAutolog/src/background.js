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
    chrome.tabs.create({url: message.url, active: false}, newTab => {
console.log(new Date().toISOString(), "background.js", 76);
      const checkTabLoaded = (tabId, changeInfo, tab) => {
console.log(new Date().toISOString(), "background.js", 77);
        if (tabId === newTab.id && changeInfo.status === 'complete') {
console.log(new Date().toISOString(), "background.js", 78);
          // Tab is fully loaded, now safe to inject the script
console.log(new Date().toISOString(), "background.js", 79);
          chrome.tabs.onUpdated.removeListener(checkTabLoaded); // Clean up the listener
console.log(new Date().toISOString(), "background.js", 80);
          console.log("Tab fully loaded with ID:", newTab.id);
console.log(new Date().toISOString(), "background.js", 81);
          // Proceed with any actions needed after the tab is loaded
console.log(new Date().toISOString(), "background.js", 82);
          sendResponse({status: "tab_was_opened", new_tab_id: newTab.id});
console.log(new Date().toISOString(), "background.js", 83);
        }
console.log(new Date().toISOString(), "background.js", 84);
      };
console.log(new Date().toISOString(), "background.js", 85);

console.log(new Date().toISOString(), "background.js", 86);
      chrome.tabs.onUpdated.addListener(checkTabLoaded);
console.log(new Date().toISOString(), "background.js", 87);
    });
console.log(new Date().toISOString(), "background.js", 88);
    return true; // Keep the message channel open for the sendResponse callback
console.log(new Date().toISOString(), "background.js", 89);
  }
console.log(new Date().toISOString(), "background.js", 90);
});
console.log(new Date().toISOString(), "background.js", 91);

console.log(new Date().toISOString(), "background.js", 92);

console.log(new Date().toISOString(), "background.js", 93);

console.log(new Date().toISOString(), "background.js", 94);

console.log(new Date().toISOString(), "background.js", 95);

console.log(new Date().toISOString(), "background.js", 96);

console.log(new Date().toISOString(), "background.js", 97);

console.log(new Date().toISOString(), "background.js", 98);
// close_current_tab
console.log(new Date().toISOString(), "background.js", 99);
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
console.log(new Date().toISOString(), "background.js", 100);
  if (message.action === "close_current_tab") {
console.log(new Date().toISOString(), "background.js", 101);
      // Check if sender.tab.id is available to ensure the message comes from a content script within a tab
console.log(new Date().toISOString(), "background.js", 102);
      if (sender.tab && sender.tab.id) {
console.log(new Date().toISOString(), "background.js", 103);
          chrome.tabs.remove(sender.tab.id, () => {
console.log(new Date().toISOString(), "background.js", 104);
              // Check for any error that might have occurred during tab removal
console.log(new Date().toISOString(), "background.js", 105);
              if (chrome.runtime.lastError) {
console.log(new Date().toISOString(), "background.js", 106);
                  console.error("Error closing tab:", chrome.runtime.lastError.message);
console.log(new Date().toISOString(), "background.js", 107);
                  sendResponse({status: "error", message: chrome.runtime.lastError.message});
console.log(new Date().toISOString(), "background.js", 108);
              } else {
console.log(new Date().toISOString(), "background.js", 109);
                  console.log("Tab closed successfully");
console.log(new Date().toISOString(), "background.js", 110);
                  sendResponse({status: "success", message: "Tab closed successfully"});
console.log(new Date().toISOString(), "background.js", 111);
              }
console.log(new Date().toISOString(), "background.js", 112);
          });
console.log(new Date().toISOString(), "background.js", 113);
      } else {
console.log(new Date().toISOString(), "background.js", 114);
          console.error("Tab ID not found or message not sent from a tab.");
console.log(new Date().toISOString(), "background.js", 115);
          sendResponse({status: "error", message: "Tab ID not found or message not sent from a tab."});
console.log(new Date().toISOString(), "background.js", 116);
      }
console.log(new Date().toISOString(), "background.js", 117);
      return true; // Indicates that you wish to send a response asynchronously
console.log(new Date().toISOString(), "background.js", 118);
  }
console.log(new Date().toISOString(), "background.js", 119);
});
console.log(new Date().toISOString(), "background.js", 120);

console.log(new Date().toISOString(), "background.js", 121);

console.log(new Date().toISOString(), "background.js", 122);

console.log(new Date().toISOString(), "background.js", 123);

console.log(new Date().toISOString(), "background.js", 124);
//apply_macro_button_message
console.log(new Date().toISOString(), "background.js", 125);
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
console.log(new Date().toISOString(), "background.js", 126);
  if (message.action === "apply_macro_button_message") {
console.log(new Date().toISOString(), "background.js", 127);

console.log(new Date().toISOString(), "background.js", 128);
      try {
console.log(new Date().toISOString(), "background.js", 129);
          const jsonData = JSON.parse(message.data);
console.log(new Date().toISOString(), "background.js", 130);
          console.log("JSON data is valid", jsonData);
console.log(new Date().toISOString(), "background.js", 131);
          // Perform operations with jsonData here
console.log(new Date().toISOString(), "background.js", 132);
        
console.log(new Date().toISOString(), "background.js", 133);
          sendResponse({success: true, message: "Data processed successfully"});
console.log(new Date().toISOString(), "background.js", 134);
      } catch (error) {
console.log(new Date().toISOString(), "background.js", 135);
          console.error("Invalid JSON data", error);
console.log(new Date().toISOString(), "background.js", 136);
          sendResponse({success: false, error: "Invalid JSON data"});
console.log(new Date().toISOString(), "background.js", 137);
        }
console.log(new Date().toISOString(), "background.js", 138);
    
console.log(new Date().toISOString(), "background.js", 139);

console.log(new Date().toISOString(), "background.js", 140);
        // Use sender.tab.id if message.tab is undefined
console.log(new Date().toISOString(), "background.js", 141);
        const tabId = message.current_tab_id;
console.log(new Date().toISOString(), "background.js", 142);

console.log(new Date().toISOString(), "background.js", 143);
        if (!tabId) {
console.log(new Date().toISOString(), "background.js", 144);
            console.error("Tab ID is undefined.");
console.log(new Date().toISOString(), "background.js", 145);
            sendResponse({ status: "error", message: "Tab ID is undefined." });
console.log(new Date().toISOString(), "background.js", 146);
            return true;
console.log(new Date().toISOString(), "background.js", 147);
        }
console.log(new Date().toISOString(), "background.js", 148);
        
console.log(new Date().toISOString(), "background.js", 149);
        // Fetch the tab information to get its URL
console.log(new Date().toISOString(), "background.js", 150);
        chrome.tabs.get(tabId, function(tab) {
console.log(new Date().toISOString(), "background.js", 151);
            // Extract the domain from the tab's URL
console.log(new Date().toISOString(), "background.js", 152);
            const url = new URL(tab.url);
console.log(new Date().toISOString(), "background.js", 153);
            const domain = url.hostname;
console.log(new Date().toISOString(), "background.js", 154);
    
console.log(new Date().toISOString(), "background.js", 155);
    
console.log(new Date().toISOString(), "background.js", 156);
            console.log("Domain of the current tab:", domain);
console.log(new Date().toISOString(), "background.js", 157);
    
console.log(new Date().toISOString(), "background.js", 158);
            // Now proceed with injecting the script
console.log(new Date().toISOString(), "background.js", 159);
            chrome.scripting.executeScript({
console.log(new Date().toISOString(), "background.js", 160);
                target: { tabId: tabId },
console.log(new Date().toISOString(), "background.js", 161);
                files: ['com_goldenthinkerextractor_injection/' + domain + '/macro_injection.js']
console.log(new Date().toISOString(), "background.js", 162);
            }).then(() => {
console.log(new Date().toISOString(), "background.js", 163);
                console.log("macro_injection.js Script successfully injected into tab " + tabId);
console.log(new Date().toISOString(), "background.js", 164);
                sendResponse({ status: "success", domain: domain });
console.log(new Date().toISOString(), "background.js", 165);
            }).catch((error) => {
console.log(new Date().toISOString(), "background.js", 166);
                console.error("Error injecting script into tab " + tabId, error);
console.log(new Date().toISOString(), "background.js", 167);
                sendResponse({ status: "error", message: error.message });
console.log(new Date().toISOString(), "background.js", 168);
            });
console.log(new Date().toISOString(), "background.js", 169);
        });
console.log(new Date().toISOString(), "background.js", 170);
    
console.log(new Date().toISOString(), "background.js", 171);
        return true; // indicates an asynchronous response.
console.log(new Date().toISOString(), "background.js", 172);
        
console.log(new Date().toISOString(), "background.js", 173);
  // Example of processing data. Replace this with your actual logic.
console.log(new Date().toISOString(), "background.js", 174);

console.log(new Date().toISOString(), "background.js", 175);
  return true; // Indicates that the response is sent asynchronously
console.log(new Date().toISOString(), "background.js", 176);
  }
console.log(new Date().toISOString(), "background.js", 177);
});
console.log(new Date().toISOString(), "background.js", 178);

console.log(new Date().toISOString(), "background.js", 179);

console.log(new Date().toISOString(), "background.js", 180);

console.log(new Date().toISOString(), "background.js", 181);

console.log(new Date().toISOString(), "background.js", 182);
// wait_for_dom_changes
console.log(new Date().toISOString(), "background.js", 183);
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
console.log(new Date().toISOString(), "background.js", 184);

console.log(new Date().toISOString(), "background.js", 185);
  function waitForDomChanges(elementSelector = 'body', timeout = 10000) {
console.log(new Date().toISOString(), "background.js", 186);
    return new Promise((resolve, reject) => {
console.log(new Date().toISOString(), "background.js", 187);
      const observer = new MutationObserver((mutations, obs) => {
console.log(new Date().toISOString(), "background.js", 188);
        resolve();
console.log(new Date().toISOString(), "background.js", 189);
        obs.disconnect(); // Stop observing after changes are detected
console.log(new Date().toISOString(), "background.js", 190);
      });
console.log(new Date().toISOString(), "background.js", 191);
  
console.log(new Date().toISOString(), "background.js", 192);
      const elem = document.querySelector(elementSelector);
console.log(new Date().toISOString(), "background.js", 193);
      if (!elem) {
console.log(new Date().toISOString(), "background.js", 194);
        reject(new Error(`Element ${elementSelector} not found`));
console.log(new Date().toISOString(), "background.js", 195);
        return;
console.log(new Date().toISOString(), "background.js", 196);
      }
console.log(new Date().toISOString(), "background.js", 197);
  
console.log(new Date().toISOString(), "background.js", 198);
      observer.observe(elem, {
console.log(new Date().toISOString(), "background.js", 199);
        childList: true, // observe direct children
console.log(new Date().toISOString(), "background.js", 200);
        subtree: true, // and lower descendants too
console.log(new Date().toISOString(), "background.js", 201);
        attributes: false, // do not listen to attribute changes
console.log(new Date().toISOString(), "background.js", 202);
        characterData: false, // do not listen to text content changes
console.log(new Date().toISOString(), "background.js", 203);
      });
console.log(new Date().toISOString(), "background.js", 204);
  
console.log(new Date().toISOString(), "background.js", 205);
      // Optional: Reject the promise if no changes are observed within the timeout period
console.log(new Date().toISOString(), "background.js", 206);
      setTimeout(() => {
console.log(new Date().toISOString(), "background.js", 207);
        observer.disconnect();
console.log(new Date().toISOString(), "background.js", 208);
        reject(new Error('Timeout waiting for DOM changes'));
console.log(new Date().toISOString(), "background.js", 209);
      }, timeout);
console.log(new Date().toISOString(), "background.js", 210);
    });
console.log(new Date().toISOString(), "background.js", 211);
  }
console.log(new Date().toISOString(), "background.js", 212);

console.log(new Date().toISOString(), "background.js", 213);
  if (message.action === "wait_for_dom_changes") {
console.log(new Date().toISOString(), "background.js", 214);
    // Define the function outside or just use it directly if not needed elsewhere
console.log(new Date().toISOString(), "background.js", 215);
    waitForDomChanges(message.elementSelector, message.timeout)
console.log(new Date().toISOString(), "background.js", 216);
      .then(() => {
console.log(new Date().toISOString(), "background.js", 217);
        sendResponse({success: true, message: "DOM changes detected"});
console.log(new Date().toISOString(), "background.js", 218);
      })
console.log(new Date().toISOString(), "background.js", 219);
      .catch(error => {
console.log(new Date().toISOString(), "background.js", 220);
        sendResponse({success: false, error: error.message});
console.log(new Date().toISOString(), "background.js", 221);
      });
console.log(new Date().toISOString(), "background.js", 222);
    return true; // Indicate an asynchronous response
console.log(new Date().toISOString(), "background.js", 223);
  }
console.log(new Date().toISOString(), "background.js", 224);
});
console.log(new Date().toISOString(), "background.js", 225);

console.log(new Date().toISOString(), "background.js", 226);

console.log(new Date().toISOString(), "background.js", 227);

console.log(new Date().toISOString(), "background.js", 228);

console.log(new Date().toISOString(), "background.js", 229);
//open_new_tab_and_extract_links
console.log(new Date().toISOString(), "background.js", 230);
/* chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
console.log(new Date().toISOString(), "background.js", 231);
  if (message.action === "open_new_tab_and_extract_links") {
console.log(new Date().toISOString(), "background.js", 232);
    chrome.tabs.create({ url: message.url, active: false }, (tab) => {
console.log(new Date().toISOString(), "background.js", 233);
      const checkTabLoaded = (tabId, changeInfo) => {
console.log(new Date().toISOString(), "background.js", 234);
        if (tabId === tab.id && changeInfo.status === "complete") {
console.log(new Date().toISOString(), "background.js", 235);
          chrome.tabs.onUpdated.removeListener(checkTabLoaded);
console.log(new Date().toISOString(), "background.js", 236);
          chrome.scripting.executeScript({
console.log(new Date().toISOString(), "background.js", 237);
            target: { tabId: tab.id },
console.log(new Date().toISOString(), "background.js", 238);
            files: ['com_goldenthinkerextractor_injection/' + domain + '/link_extractor.js']
console.log(new Date().toISOString(), "background.js", 239);
          }, (injectionResults) => {
console.log(new Date().toISOString(), "background.js", 240);
            // Handle results, e.g., sendResponse with extracted links
console.log(new Date().toISOString(), "background.js", 241);
            chrome.tabs.remove(tab.id); // Close the tab after processing
console.log(new Date().toISOString(), "background.js", 242);
          });
console.log(new Date().toISOString(), "background.js", 243);
        }
console.log(new Date().toISOString(), "background.js", 244);
      };
console.log(new Date().toISOString(), "background.js", 245);
      chrome.tabs.onUpdated.addListener(checkTabLoaded);
console.log(new Date().toISOString(), "background.js", 246);
    });
console.log(new Date().toISOString(), "background.js", 247);
    return true; // Keep the message channel open for asynchronous response
console.log(new Date().toISOString(), "background.js", 248);
  }
console.log(new Date().toISOString(), "background.js", 249);
}); */
console.log(new Date().toISOString(), "background.js", 250);

console.log(new Date().toISOString(), "background.js", 251);

console.log(new Date().toISOString(), "background.js", 252);

console.log(new Date().toISOString(), "background.js", 253);
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
console.log(new Date().toISOString(), "background.js", 254);
  if (message.action === "extracted_links") {
console.log(new Date().toISOString(), "background.js", 255);
      console.log("Links received in background script: ", message.links);
console.log(new Date().toISOString(), "background.js", 256);
      // Process the links as needed
console.log(new Date().toISOString(), "background.js", 257);
      sendResponse({status: "Links processed"});
console.log(new Date().toISOString(), "background.js", 258);
  }
console.log(new Date().toISOString(), "background.js", 259);
});
console.log(new Date().toISOString(), "background.js", 260);

console.log(new Date().toISOString(), "background.js", 261);

console.log(new Date().toISOString(), "background.js", 262);

console.log(new Date().toISOString(), "background.js", 263);

console.log(new Date().toISOString(), "background.js", 264);
//delay
console.log(new Date().toISOString(), "background.js", 265);
async function delay(milliseconds) {
console.log(new Date().toISOString(), "background.js", 266);
  return new Promise(resolve => setTimeout(resolve, milliseconds));
console.log(new Date().toISOString(), "background.js", 267);
}
console.log(new Date().toISOString(), "background.js", 268);

console.log(new Date().toISOString(), "background.js", 269);

console.log(new Date().toISOString(), "background.js", 270);

console.log(new Date().toISOString(), "background.js", 271);

console.log(new Date().toISOString(), "background.js", 272);
//http requests listener rate limit 
console.log(new Date().toISOString(), "background.js", 273);
chrome.webRequest.onCompleted.addListener(async function(details) {
console.log(new Date().toISOString(), "background.js", 274);
  // Check for rate limiting or access denied
console.log(new Date().toISOString(), "background.js", 275);
  if (details.statusCode === 429 || details.statusCode === 403) {
console.log(new Date().toISOString(), "background.js", 276);
    const retryAfterHeader = details.responseHeaders.find(header => header.name.toLowerCase() === "retry-after");
console.log(new Date().toISOString(), "background.js", 277);
    if (retryAfterHeader) {
console.log(new Date().toISOString(), "background.js", 278);
      const retryAfterSeconds = parseInt(retryAfterHeader.value, 10) || 0; // Default to 0 if parsing fails
console.log(new Date().toISOString(), "background.js", 279);
      console.log(`Received ${details.statusCode}, retrying after:`, retryAfterSeconds, "seconds");
console.log(new Date().toISOString(), "background.js", 280);
      
console.log(new Date().toISOString(), "background.js", 281);
      // Convert seconds to milliseconds for the delay function
console.log(new Date().toISOString(), "background.js", 282);
      await delay(retryAfterSeconds * 1000);
console.log(new Date().toISOString(), "background.js", 283);
      
console.log(new Date().toISOString(), "background.js", 284);
      // After delay, you can take further action, such as retrying the request
console.log(new Date().toISOString(), "background.js", 285);
      console.log("Retrying now...");
console.log(new Date().toISOString(), "background.js", 286);
      // Implement retry logic here
console.log(new Date().toISOString(), "background.js", 287);
    } else {
console.log(new Date().toISOString(), "background.js", 288);
      // If there's no Retry-After header, you might choose to handle it differently
console.log(new Date().toISOString(), "background.js", 289);
      console.log(`Received ${details.statusCode} without a Retry-After header.`);
console.log(new Date().toISOString(), "background.js", 290);
      // Implement alternative handling here
console.log(new Date().toISOString(), "background.js", 291);
    }
console.log(new Date().toISOString(), "background.js", 292);
  }
console.log(new Date().toISOString(), "background.js", 293);
},
console.log(new Date().toISOString(), "background.js", 294);
{urls: ["<all_urls>"]},
console.log(new Date().toISOString(), "background.js", 295);
["responseHeaders"]
console.log(new Date().toISOString(), "background.js", 296);
);
console.log(new Date().toISOString(), "background.js", 297);

console.log(new Date().toISOString(), "background.js", 298);
