
console.log("content.js script successfully injected from the static manifest.json")

class UserSimulator {
    constructor() {}
  
    simulate_user_typing(selector, value, maxDelayMs = 2) {
      const input = document.querySelector(selector);
      if (!input) {
          console.error('Input field not found');
          return;
      }
  
      input.focus();
  
      const chars = value.split('');
      let typingPromise = Promise.resolve(); // Start with a resolved promise
  
      chars.forEach(char => {
          typingPromise = typingPromise.then(() => {
              return new Promise(resolve => {
                  setTimeout(() => {
                      // Create and dispatch the keydown event
                      const keydownEvent = new KeyboardEvent('keydown', {
                          key: char,
                          code: `Key${char.toUpperCase()}`,
                          bubbles: true
                      });
                      input.dispatchEvent(keydownEvent);
  
                      input.value += char; // Add character to input value
  
                      // Create and dispatch the keyup event
                      const keyupEvent = new KeyboardEvent('keyup', {
                          key: char,
                          code: `Key${char.toUpperCase()}`,
                          bubbles: true
                      });
                      input.dispatchEvent(keyupEvent);
  
                      // Trigger input event after keyup to simulate the input change
                      const event = new Event('input', { bubbles: true });
                      input.dispatchEvent(event);
  
                      resolve(); // Resolve the promise to allow the next iteration
                  }, Math.random() * maxDelayMs);
              });
          });
      });
    }
  
  
    listen_mouse_movement(){
        document.addEventListener('mousemove', function(event) {
            const x = event.clientX; // Get the horizontal coordinate
            const y = event.clientY; // Get the vertical coordinate
            console.log(`Mouse position: X=${x}, Y=${y}`);
        }); 
    }
}
  

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "simulate_user_typing") {
        // Implement keyboard simulation logic here
        console.log("execute: simulate_user_typing");
        user_simulator.simulate_user_typing(message.target, message.text);
        sendResponse({success: true, message: "Typing simulation complete"});
    } else if (message.action === "listen_mouse_movement") {
        // Implement mouse simulation logic here
        user_simulator.listen_mouse_movement(message.eventType, message.options);
        sendResponse({success: true, message: "Typing simulation complete"});
    }
    return true;
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
  