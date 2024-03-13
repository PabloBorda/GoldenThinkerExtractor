console.log(new Date().toISOString(), "background.js", 1);
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
console.log(new Date().toISOString(), "background.js", 2);
  if (message.action === "check_script_injected") {
console.log(new Date().toISOString(), "background.js", 3);
    // Check for the marker
console.log(new Date().toISOString(), "background.js", 4);
    const scriptInjected = document.body.getAttribute('data-script-injected') === 'true' || window.scriptInjected === true;
console.log(new Date().toISOString(), "background.js", 5);
    sendResponse({ scriptInjected: scriptInjected });
console.log(new Date().toISOString(), "background.js", 6);
  } else if (message.action === "execute_visitor_link_tree_bfs") {
console.log(new Date().toISOString(), "background.js", 7);
    // Execute the function if requested
console.log(new Date().toISOString(), "background.js", 8);
    visitor_link_tree_bfs(rootLinks);
console.log(new Date().toISOString(), "background.js", 9);
    sendResponse({status: "executed", message: "visitor_link_tree_bfs executed."});
console.log(new Date().toISOString(), "background.js", 10);
  }
console.log(new Date().toISOString(), "background.js", 11);
});
console.log(new Date().toISOString(), "background.js", 12);

console.log(new Date().toISOString(), "background.js", 13);

console.log(new Date().toISOString(), "background.js", 14);

console.log(new Date().toISOString(), "background.js", 15);

console.log(new Date().toISOString(), "background.js", 16);

console.log(new Date().toISOString(), "background.js", 17);
// start_web_crawl_message
console.log(new Date().toISOString(), "background.js", 18);
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
console.log(new Date().toISOString(), "background.js", 19);
  if (message.action === "start_web_crawl_message") {
console.log(new Date().toISOString(), "background.js", 20);
    // Function to check if the script is already injected
console.log(new Date().toISOString(), "background.js", 21);
    function checkScriptInjected(tabId, callback) {
console.log(new Date().toISOString(), "background.js", 22);
      chrome.tabs.sendMessage(tabId, { action: "check_script_injected" }, response => {
console.log(new Date().toISOString(), "background.js", 23);
        if (response && response.scriptInjected) {
console.log(new Date().toISOString(), "background.js", 24);
          callback(true);
console.log(new Date().toISOString(), "background.js", 25);
        } else {
console.log(new Date().toISOString(), "background.js", 26);
          callback(false);
console.log(new Date().toISOString(), "background.js", 27);
        }
console.log(new Date().toISOString(), "background.js", 28);
      });
console.log(new Date().toISOString(), "background.js", 29);
    }
console.log(new Date().toISOString(), "background.js", 30);

console.log(new Date().toISOString(), "background.js", 31);
    // Determine the tabId to use
console.log(new Date().toISOString(), "background.js", 32);
    const tabId = message.current_tab_id || (sender.tab ? sender.tab.id : null);
console.log(new Date().toISOString(), "background.js", 33);

console.log(new Date().toISOString(), "background.js", 34);
    if (tabId) {
console.log(new Date().toISOString(), "background.js", 35);
      checkScriptInjected(tabId, isInjected => {
console.log(new Date().toISOString(), "background.js", 36);
        if (isInjected) {
console.log(new Date().toISOString(), "background.js", 37);
          // Script already injected, directly execute the function
console.log(new Date().toISOString(), "background.js", 38);
          chrome.tabs.sendMessage(tabId, { action: "execute_visitor_link_tree_bfs" });
console.log(new Date().toISOString(), "background.js", 39);
          console.log("Directly executing visitor_link_tree_bfs in tab:", tabId);
console.log(new Date().toISOString(), "background.js", 40);
          sendResponse({ status: "success", message: "Function executed directly." });
console.log(new Date().toISOString(), "background.js", 41);
        } else {
console.log(new Date().toISOString(), "background.js", 42);
          // Inject the script for the first time
console.log(new Date().toISOString(), "background.js", 43);
          // Ensure we have a valid URL from the sender.tab if current_tab_id was not provided
console.log(new Date().toISOString(), "background.js", 44);
          const tabUrl = sender.tab && sender.tab.url ? sender.tab.url : null;
console.log(new Date().toISOString(), "background.js", 45);
          if (!tabUrl) {
console.log(new Date().toISOString(), "background.js", 46);
            console.error("Tab URL is undefined.");
console.log(new Date().toISOString(), "background.js", 47);
            sendResponse({ status: "error", message: "Tab URL is undefined." });
console.log(new Date().toISOString(), "background.js", 48);
            return;
console.log(new Date().toISOString(), "background.js", 49);
          }
console.log(new Date().toISOString(), "background.js", 50);
          const url = new URL(tabUrl);
console.log(new Date().toISOString(), "background.js", 51);
          const domain = url.hostname;
console.log(new Date().toISOString(), "background.js", 52);

console.log(new Date().toISOString(), "background.js", 53);
          chrome.scripting.executeScript({
console.log(new Date().toISOString(), "background.js", 54);
            target: { tabId: tabId },
console.log(new Date().toISOString(), "background.js", 55);
            files: ['com_goldenthinkerextractor_injection/' + domain + '/injection.js']
console.log(new Date().toISOString(), "background.js", 56);
          }).then(() => {
console.log(new Date().toISOString(), "background.js", 57);
            console.log("Script injected into tab:", tabId);
console.log(new Date().toISOString(), "background.js", 58);
            sendResponse({ status: "success", domain: domain });
console.log(new Date().toISOString(), "background.js", 59);
          }).catch((error) => {
console.log(new Date().toISOString(), "background.js", 60);
            console.error("Error injecting script into tab:", tabId, error);
console.log(new Date().toISOString(), "background.js", 61);
            sendResponse({ status: "error", message: error.message });
console.log(new Date().toISOString(), "background.js", 62);
          });
console.log(new Date().toISOString(), "background.js", 63);
        }
console.log(new Date().toISOString(), "background.js", 64);
      });
console.log(new Date().toISOString(), "background.js", 65);
      return true; // Keep the message channel open for the asynchronous response
console.log(new Date().toISOString(), "background.js", 66);
    } else {
console.log(new Date().toISOString(), "background.js", 67);
      console.error("Tab ID is undefined.");
console.log(new Date().toISOString(), "background.js", 68);
      sendResponse({ status: "error", message: "Tab ID is undefined." });
console.log(new Date().toISOString(), "background.js", 69);
    }
console.log(new Date().toISOString(), "background.js", 70);
  }
console.log(new Date().toISOString(), "background.js", 71);
});
console.log(new Date().toISOString(), "background.js", 72);

console.log(new Date().toISOString(), "background.js", 73);

console.log(new Date().toISOString(), "background.js", 74);

console.log(new Date().toISOString(), "background.js", 75);

console.log(new Date().toISOString(), "background.js", 76);
// stop_web_crawl_message
console.log(new Date().toISOString(), "background.js", 77);
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
console.log(new Date().toISOString(), "background.js", 78);
  if (message.action === "stop_web_crawl_message") {
console.log(new Date().toISOString(), "background.js", 79);
      // Handle stop_web_crawl_message action
console.log(new Date().toISOString(), "background.js", 80);
      sendResponse({ status: "stopped" });
console.log(new Date().toISOString(), "background.js", 81);
      return true;
console.log(new Date().toISOString(), "background.js", 82);
}});
console.log(new Date().toISOString(), "background.js", 83);
    
console.log(new Date().toISOString(), "background.js", 84);

console.log(new Date().toISOString(), "background.js", 85);

console.log(new Date().toISOString(), "background.js", 86);

console.log(new Date().toISOString(), "background.js", 87);
// get_active_tab
console.log(new Date().toISOString(), "background.js", 88);
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
console.log(new Date().toISOString(), "background.js", 89);
  if (request.action === "get_active_tab") {
console.log(new Date().toISOString(), "background.js", 90);
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
console.log(new Date().toISOString(), "background.js", 91);
          if (tabs.length > 0) {
console.log(new Date().toISOString(), "background.js", 92);
              const activeTab = tabs[0];
console.log(new Date().toISOString(), "background.js", 93);
              sendResponse({tabId: activeTab.id});
console.log(new Date().toISOString(), "background.js", 94);
          } else {
console.log(new Date().toISOString(), "background.js", 95);
              sendResponse({error: "No active tab found"});
console.log(new Date().toISOString(), "background.js", 96);
          }
console.log(new Date().toISOString(), "background.js", 97);
      });
console.log(new Date().toISOString(), "background.js", 98);
      return true; // Indicates that the response is sent asynchronously
console.log(new Date().toISOString(), "background.js", 99);
  }
console.log(new Date().toISOString(), "background.js", 100);
});
console.log(new Date().toISOString(), "background.js", 101);

console.log(new Date().toISOString(), "background.js", 102);

console.log(new Date().toISOString(), "background.js", 103);

console.log(new Date().toISOString(), "background.js", 104);

console.log(new Date().toISOString(), "background.js", 105);
// open_new_tab
console.log(new Date().toISOString(), "background.js", 106);
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
console.log(new Date().toISOString(), "background.js", 107);
  if (message.action === "open_new_tab") {
console.log(new Date().toISOString(), "background.js", 108);
    chrome.tabs.create({url: message.url, active: false}, newTab => {
console.log(new Date().toISOString(), "background.js", 109);
      const checkTabLoaded = (tabId, changeInfo, tab) => {
console.log(new Date().toISOString(), "background.js", 110);
        if (tabId === newTab.id && changeInfo.status === 'complete') {
console.log(new Date().toISOString(), "background.js", 111);
          // Tab is fully loaded, now safe to inject the script
console.log(new Date().toISOString(), "background.js", 112);
          chrome.tabs.onUpdated.removeListener(checkTabLoaded); // Clean up the listener
console.log(new Date().toISOString(), "background.js", 113);
          console.log("Tab fully loaded with ID:", newTab.id);
console.log(new Date().toISOString(), "background.js", 114);
          // Proceed with any actions needed after the tab is loaded
console.log(new Date().toISOString(), "background.js", 115);
          sendResponse({status: "tab_was_opened", new_tab_id: newTab.id});
console.log(new Date().toISOString(), "background.js", 116);
        }
console.log(new Date().toISOString(), "background.js", 117);
      };
console.log(new Date().toISOString(), "background.js", 118);

console.log(new Date().toISOString(), "background.js", 119);
      chrome.tabs.onUpdated.addListener(checkTabLoaded);
console.log(new Date().toISOString(), "background.js", 120);
    });
console.log(new Date().toISOString(), "background.js", 121);
    return true; // Keep the message channel open for the sendResponse callback
console.log(new Date().toISOString(), "background.js", 122);
  }
console.log(new Date().toISOString(), "background.js", 123);
});
console.log(new Date().toISOString(), "background.js", 124);

console.log(new Date().toISOString(), "background.js", 125);

console.log(new Date().toISOString(), "background.js", 126);

console.log(new Date().toISOString(), "background.js", 127);

console.log(new Date().toISOString(), "background.js", 128);

console.log(new Date().toISOString(), "background.js", 129);

console.log(new Date().toISOString(), "background.js", 130);
// close_current_tab
console.log(new Date().toISOString(), "background.js", 131);
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
console.log(new Date().toISOString(), "background.js", 132);
  if (message.action === "close_current_tab") {
console.log(new Date().toISOString(), "background.js", 133);
      // Check if sender.tab.id is available to ensure the message comes from a content script within a tab
console.log(new Date().toISOString(), "background.js", 134);
      if (sender.tab && sender.tab.id) {
console.log(new Date().toISOString(), "background.js", 135);
          chrome.tabs.remove(sender.tab.id, () => {
console.log(new Date().toISOString(), "background.js", 136);
              // Check for any error that might have occurred during tab removal
console.log(new Date().toISOString(), "background.js", 137);
              if (chrome.runtime.lastError) {
console.log(new Date().toISOString(), "background.js", 138);
                  console.error("Error closing tab:", chrome.runtime.lastError.message);
console.log(new Date().toISOString(), "background.js", 139);
                  sendResponse({status: "error", message: chrome.runtime.lastError.message});
console.log(new Date().toISOString(), "background.js", 140);
              } else {
console.log(new Date().toISOString(), "background.js", 141);
                  console.log("Tab closed successfully");
console.log(new Date().toISOString(), "background.js", 142);
                  sendResponse({status: "success", message: "Tab closed successfully"});
console.log(new Date().toISOString(), "background.js", 143);
              }
console.log(new Date().toISOString(), "background.js", 144);
          });
console.log(new Date().toISOString(), "background.js", 145);
      } else {
console.log(new Date().toISOString(), "background.js", 146);
          console.error("Tab ID not found or message not sent from a tab.");
console.log(new Date().toISOString(), "background.js", 147);
          sendResponse({status: "error", message: "Tab ID not found or message not sent from a tab."});
console.log(new Date().toISOString(), "background.js", 148);
      }
console.log(new Date().toISOString(), "background.js", 149);
      return true; // Indicates that you wish to send a response asynchronously
console.log(new Date().toISOString(), "background.js", 150);
  }
console.log(new Date().toISOString(), "background.js", 151);
});
console.log(new Date().toISOString(), "background.js", 152);

console.log(new Date().toISOString(), "background.js", 153);

console.log(new Date().toISOString(), "background.js", 154);

console.log(new Date().toISOString(), "background.js", 155);

console.log(new Date().toISOString(), "background.js", 156);
//apply_macro_button_message
console.log(new Date().toISOString(), "background.js", 157);
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
console.log(new Date().toISOString(), "background.js", 158);
  if (message.action === "apply_macro_button_message") {
console.log(new Date().toISOString(), "background.js", 159);

console.log(new Date().toISOString(), "background.js", 160);
      try {
console.log(new Date().toISOString(), "background.js", 161);
          const jsonData = JSON.parse(message.data);
console.log(new Date().toISOString(), "background.js", 162);
          console.log("JSON data is valid", jsonData);
console.log(new Date().toISOString(), "background.js", 163);
          // Perform operations with jsonData here
console.log(new Date().toISOString(), "background.js", 164);
        
console.log(new Date().toISOString(), "background.js", 165);
          sendResponse({success: true, message: "Data processed successfully"});
console.log(new Date().toISOString(), "background.js", 166);
      } catch (error) {
console.log(new Date().toISOString(), "background.js", 167);
          console.error("Invalid JSON data", error);
console.log(new Date().toISOString(), "background.js", 168);
          sendResponse({success: false, error: "Invalid JSON data"});
console.log(new Date().toISOString(), "background.js", 169);
        }
console.log(new Date().toISOString(), "background.js", 170);
    
console.log(new Date().toISOString(), "background.js", 171);

console.log(new Date().toISOString(), "background.js", 172);
        // Use sender.tab.id if message.tab is undefined
console.log(new Date().toISOString(), "background.js", 173);
        const tabId = message.current_tab_id;
console.log(new Date().toISOString(), "background.js", 174);

console.log(new Date().toISOString(), "background.js", 175);
        if (!tabId) {
console.log(new Date().toISOString(), "background.js", 176);
            console.error("Tab ID is undefined.");
console.log(new Date().toISOString(), "background.js", 177);
            sendResponse({ status: "error", message: "Tab ID is undefined." });
console.log(new Date().toISOString(), "background.js", 178);
            return true;
console.log(new Date().toISOString(), "background.js", 179);
        }
console.log(new Date().toISOString(), "background.js", 180);
        
console.log(new Date().toISOString(), "background.js", 181);
        // Fetch the tab information to get its URL
console.log(new Date().toISOString(), "background.js", 182);
        chrome.tabs.get(tabId, function(tab) {
console.log(new Date().toISOString(), "background.js", 183);
            // Extract the domain from the tab's URL
console.log(new Date().toISOString(), "background.js", 184);
            const url = new URL(tab.url);
console.log(new Date().toISOString(), "background.js", 185);
            const domain = url.hostname;
console.log(new Date().toISOString(), "background.js", 186);
    
console.log(new Date().toISOString(), "background.js", 187);
    
console.log(new Date().toISOString(), "background.js", 188);
            console.log("Domain of the current tab:", domain);
console.log(new Date().toISOString(), "background.js", 189);
    
console.log(new Date().toISOString(), "background.js", 190);
            // Now proceed with injecting the script
console.log(new Date().toISOString(), "background.js", 191);
            chrome.scripting.executeScript({
console.log(new Date().toISOString(), "background.js", 192);
                target: { tabId: tabId },
console.log(new Date().toISOString(), "background.js", 193);
                files: ['com_goldenthinkerextractor_injection/' + domain + '/macro_injection.js']
console.log(new Date().toISOString(), "background.js", 194);
            }).then(() => {
console.log(new Date().toISOString(), "background.js", 195);
                console.log("macro_injection.js Script successfully injected into tab " + tabId);
console.log(new Date().toISOString(), "background.js", 196);
                sendResponse({ status: "success", domain: domain });
console.log(new Date().toISOString(), "background.js", 197);
            }).catch((error) => {
console.log(new Date().toISOString(), "background.js", 198);
                console.error("Error injecting script into tab " + tabId, error);
console.log(new Date().toISOString(), "background.js", 199);
                sendResponse({ status: "error", message: error.message });
console.log(new Date().toISOString(), "background.js", 200);
            });
console.log(new Date().toISOString(), "background.js", 201);
        });
console.log(new Date().toISOString(), "background.js", 202);
    
console.log(new Date().toISOString(), "background.js", 203);
        return true; // indicates an asynchronous response.
console.log(new Date().toISOString(), "background.js", 204);
        
console.log(new Date().toISOString(), "background.js", 205);
  // Example of processing data. Replace this with your actual logic.
console.log(new Date().toISOString(), "background.js", 206);

console.log(new Date().toISOString(), "background.js", 207);
  return true; // Indicates that the response is sent asynchronously
console.log(new Date().toISOString(), "background.js", 208);
  }
console.log(new Date().toISOString(), "background.js", 209);
});
console.log(new Date().toISOString(), "background.js", 210);

console.log(new Date().toISOString(), "background.js", 211);

console.log(new Date().toISOString(), "background.js", 212);

console.log(new Date().toISOString(), "background.js", 213);
// wait_for_dom_changes
console.log(new Date().toISOString(), "background.js", 214);
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
console.log(new Date().toISOString(), "background.js", 215);

console.log(new Date().toISOString(), "background.js", 216);
  function waitForDomChanges(elementSelector = 'body', timeout = 10000) {
console.log(new Date().toISOString(), "background.js", 217);
    return new Promise((resolve, reject) => {
console.log(new Date().toISOString(), "background.js", 218);
      const observer = new MutationObserver((mutations, obs) => {
console.log(new Date().toISOString(), "background.js", 219);
        resolve();
console.log(new Date().toISOString(), "background.js", 220);
        obs.disconnect(); // Stop observing after changes are detected
console.log(new Date().toISOString(), "background.js", 221);
      });
console.log(new Date().toISOString(), "background.js", 222);
  
console.log(new Date().toISOString(), "background.js", 223);
      const elem = document.querySelector(elementSelector);
console.log(new Date().toISOString(), "background.js", 224);
      if (!elem) {
console.log(new Date().toISOString(), "background.js", 225);
        reject(new Error(`Element ${elementSelector} not found`));
console.log(new Date().toISOString(), "background.js", 226);
        return;
console.log(new Date().toISOString(), "background.js", 227);
      }
console.log(new Date().toISOString(), "background.js", 228);
  
console.log(new Date().toISOString(), "background.js", 229);
      observer.observe(elem, {
console.log(new Date().toISOString(), "background.js", 230);
        childList: true, // observe direct children
console.log(new Date().toISOString(), "background.js", 231);
        subtree: true, // and lower descendants too
console.log(new Date().toISOString(), "background.js", 232);
        attributes: false, // do not listen to attribute changes
console.log(new Date().toISOString(), "background.js", 233);
        characterData: false, // do not listen to text content changes
console.log(new Date().toISOString(), "background.js", 234);
      });
console.log(new Date().toISOString(), "background.js", 235);
  
console.log(new Date().toISOString(), "background.js", 236);
      // Optional: Reject the promise if no changes are observed within the timeout period
console.log(new Date().toISOString(), "background.js", 237);
      setTimeout(() => {
console.log(new Date().toISOString(), "background.js", 238);
        observer.disconnect();
console.log(new Date().toISOString(), "background.js", 239);
        reject(new Error('Timeout waiting for DOM changes'));
console.log(new Date().toISOString(), "background.js", 240);
      }, timeout);
console.log(new Date().toISOString(), "background.js", 241);
    });
console.log(new Date().toISOString(), "background.js", 242);
  }
console.log(new Date().toISOString(), "background.js", 243);

console.log(new Date().toISOString(), "background.js", 244);
  if (message.action === "wait_for_dom_changes") {
console.log(new Date().toISOString(), "background.js", 245);
    // Define the function outside or just use it directly if not needed elsewhere
console.log(new Date().toISOString(), "background.js", 246);
    waitForDomChanges(message.elementSelector, message.timeout)
console.log(new Date().toISOString(), "background.js", 247);
      .then(() => {
console.log(new Date().toISOString(), "background.js", 248);
        sendResponse({success: true, message: "DOM changes detected"});
console.log(new Date().toISOString(), "background.js", 249);
      })
console.log(new Date().toISOString(), "background.js", 250);
      .catch(error => {
console.log(new Date().toISOString(), "background.js", 251);
        sendResponse({success: false, error: error.message});
console.log(new Date().toISOString(), "background.js", 252);
      });
console.log(new Date().toISOString(), "background.js", 253);
    return true; // Indicate an asynchronous response
console.log(new Date().toISOString(), "background.js", 254);
  }
console.log(new Date().toISOString(), "background.js", 255);
});
console.log(new Date().toISOString(), "background.js", 256);

console.log(new Date().toISOString(), "background.js", 257);

console.log(new Date().toISOString(), "background.js", 258);

console.log(new Date().toISOString(), "background.js", 259);

console.log(new Date().toISOString(), "background.js", 260);

console.log(new Date().toISOString(), "background.js", 261);
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
console.log(new Date().toISOString(), "background.js", 262);
  if (message.action === "extracted_links") {
console.log(new Date().toISOString(), "background.js", 263);
      console.log("Links received in background script: ", message.links);
console.log(new Date().toISOString(), "background.js", 264);
      // Process the links as needed
console.log(new Date().toISOString(), "background.js", 265);
      sendResponse({status: "Links processed"});
console.log(new Date().toISOString(), "background.js", 266);
  }
console.log(new Date().toISOString(), "background.js", 267);
});
console.log(new Date().toISOString(), "background.js", 268);

console.log(new Date().toISOString(), "background.js", 269);

console.log(new Date().toISOString(), "background.js", 270);

console.log(new Date().toISOString(), "background.js", 271);

console.log(new Date().toISOString(), "background.js", 272);
//delay
console.log(new Date().toISOString(), "background.js", 273);
async function delay(milliseconds) {
console.log(new Date().toISOString(), "background.js", 274);
  return new Promise(resolve => setTimeout(resolve, milliseconds));
console.log(new Date().toISOString(), "background.js", 275);
}
console.log(new Date().toISOString(), "background.js", 276);

console.log(new Date().toISOString(), "background.js", 277);

console.log(new Date().toISOString(), "background.js", 278);

console.log(new Date().toISOString(), "background.js", 279);

console.log(new Date().toISOString(), "background.js", 280);
//http requests listener rate limit 
console.log(new Date().toISOString(), "background.js", 281);
chrome.webRequest.onCompleted.addListener(async function(details) {
console.log(new Date().toISOString(), "background.js", 282);
  // Check for rate limiting or access denied
console.log(new Date().toISOString(), "background.js", 283);
  if (details.statusCode === 429 || details.statusCode === 403) {
console.log(new Date().toISOString(), "background.js", 284);
    const retryAfterHeader = details.responseHeaders.find(header => header.name.toLowerCase() === "retry-after");
console.log(new Date().toISOString(), "background.js", 285);
    if (retryAfterHeader) {
console.log(new Date().toISOString(), "background.js", 286);
      const retryAfterSeconds = parseInt(retryAfterHeader.value, 10) || 0; // Default to 0 if parsing fails
console.log(new Date().toISOString(), "background.js", 287);
      console.log(`Received ${details.statusCode}, retrying after:`, retryAfterSeconds, "seconds");
console.log(new Date().toISOString(), "background.js", 288);
      
console.log(new Date().toISOString(), "background.js", 289);
      // Convert seconds to milliseconds for the delay function
console.log(new Date().toISOString(), "background.js", 290);
      await delay(retryAfterSeconds * 1000);
console.log(new Date().toISOString(), "background.js", 291);
      
console.log(new Date().toISOString(), "background.js", 292);
      // After delay, you can take further action, such as retrying the request
console.log(new Date().toISOString(), "background.js", 293);
      console.log("Retrying now...");
console.log(new Date().toISOString(), "background.js", 294);
      // Implement retry logic here
console.log(new Date().toISOString(), "background.js", 295);
    } else {
console.log(new Date().toISOString(), "background.js", 296);
      // If there's no Retry-After header, you might choose to handle it differently
console.log(new Date().toISOString(), "background.js", 297);
      console.log(`Received ${details.statusCode} without a Retry-After header.`);
console.log(new Date().toISOString(), "background.js", 298);
      // Implement alternative handling here
console.log(new Date().toISOString(), "background.js", 299);
    }
console.log(new Date().toISOString(), "background.js", 300);
  }
console.log(new Date().toISOString(), "background.js", 301);
},
console.log(new Date().toISOString(), "background.js", 302);
{urls: ["<all_urls>"]},
console.log(new Date().toISOString(), "background.js", 303);
["responseHeaders"]
console.log(new Date().toISOString(), "background.js", 304);
);
console.log(new Date().toISOString(), "background.js", 305);

console.log(new Date().toISOString(), "background.js", 306);
// Listen for messages from the background script
console.log(new Date().toISOString(), "background.js", 307);
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
console.log(new Date().toISOString(), "background.js", 308);
  if (message.action === "execute_visitor_link_tree_bfs") {
console.log(new Date().toISOString(), "background.js", 309);
    // Execute the BFS function
console.log(new Date().toISOString(), "background.js", 310);
    const rootLinks = ["https://www.mercadolibre.com.co/categorias#menu=categories"];
console.log(new Date().toISOString(), "background.js", 311);
    visitor_link_tree_bfs(rootLinks).then(() => {
console.log(new Date().toISOString(), "background.js", 312);
      sendResponse({status: "completed"});
console.log(new Date().toISOString(), "background.js", 313);
    }).catch(error => {
console.log(new Date().toISOString(), "background.js", 314);
      console.error("Error executing visitor_link_tree_bfs:", error);
console.log(new Date().toISOString(), "background.js", 315);
      sendResponse({status: "error", message: error.toString()});
console.log(new Date().toISOString(), "background.js", 316);
    });
console.log(new Date().toISOString(), "background.js", 317);
    return true; // Return true to indicate asynchronous response
console.log(new Date().toISOString(), "background.js", 318);
  }
console.log(new Date().toISOString(), "background.js", 319);
});
console.log(new Date().toISOString(), "background.js", 320);
