console.log(new Date().toISOString(), "content.js", 1);

console.log(new Date().toISOString(), "content.js", 2);
console.log("content.js script successfully injected from the static manifest.json")
console.log(new Date().toISOString(), "content.js", 3);

console.log(new Date().toISOString(), "content.js", 4);
class UserSimulator {
console.log(new Date().toISOString(), "content.js", 5);
    constructor() {}
console.log(new Date().toISOString(), "content.js", 6);
  
console.log(new Date().toISOString(), "content.js", 7);
    simulate_user_typing(selector, value, maxDelayMs = 2) {
console.log(new Date().toISOString(), "content.js", 8);
      const input = document.querySelector(selector);
console.log(new Date().toISOString(), "content.js", 9);
      if (!input) {
console.log(new Date().toISOString(), "content.js", 10);
          console.error('Input field not found');
console.log(new Date().toISOString(), "content.js", 11);
          return;
console.log(new Date().toISOString(), "content.js", 12);
      }
console.log(new Date().toISOString(), "content.js", 13);
  
console.log(new Date().toISOString(), "content.js", 14);
      input.focus();
console.log(new Date().toISOString(), "content.js", 15);
  
console.log(new Date().toISOString(), "content.js", 16);
      const chars = value.split('');
console.log(new Date().toISOString(), "content.js", 17);
      let typingPromise = Promise.resolve(); // Start with a resolved promise
console.log(new Date().toISOString(), "content.js", 18);
  
console.log(new Date().toISOString(), "content.js", 19);
      chars.forEach(char => {
console.log(new Date().toISOString(), "content.js", 20);
          typingPromise = typingPromise.then(() => {
console.log(new Date().toISOString(), "content.js", 21);
              return new Promise(resolve => {
console.log(new Date().toISOString(), "content.js", 22);
                  setTimeout(() => {
console.log(new Date().toISOString(), "content.js", 23);
                      // Create and dispatch the keydown event
console.log(new Date().toISOString(), "content.js", 24);
                      const keydownEvent = new KeyboardEvent('keydown', {
console.log(new Date().toISOString(), "content.js", 25);
                          key: char,
console.log(new Date().toISOString(), "content.js", 26);
                          code: `Key${char.toUpperCase()}`,
console.log(new Date().toISOString(), "content.js", 27);
                          bubbles: true
console.log(new Date().toISOString(), "content.js", 28);
                      });
console.log(new Date().toISOString(), "content.js", 29);
                      input.dispatchEvent(keydownEvent);
console.log(new Date().toISOString(), "content.js", 30);
  
console.log(new Date().toISOString(), "content.js", 31);
                      input.value += char; // Add character to input value
console.log(new Date().toISOString(), "content.js", 32);
  
console.log(new Date().toISOString(), "content.js", 33);
                      // Create and dispatch the keyup event
console.log(new Date().toISOString(), "content.js", 34);
                      const keyupEvent = new KeyboardEvent('keyup', {
console.log(new Date().toISOString(), "content.js", 35);
                          key: char,
console.log(new Date().toISOString(), "content.js", 36);
                          code: `Key${char.toUpperCase()}`,
console.log(new Date().toISOString(), "content.js", 37);
                          bubbles: true
console.log(new Date().toISOString(), "content.js", 38);
                      });
console.log(new Date().toISOString(), "content.js", 39);
                      input.dispatchEvent(keyupEvent);
console.log(new Date().toISOString(), "content.js", 40);
  
console.log(new Date().toISOString(), "content.js", 41);
                      // Trigger input event after keyup to simulate the input change
console.log(new Date().toISOString(), "content.js", 42);
                      const event = new Event('input', { bubbles: true });
console.log(new Date().toISOString(), "content.js", 43);
                      input.dispatchEvent(event);
console.log(new Date().toISOString(), "content.js", 44);
  
console.log(new Date().toISOString(), "content.js", 45);
                      resolve(); // Resolve the promise to allow the next iteration
console.log(new Date().toISOString(), "content.js", 46);
                  }, Math.random() * maxDelayMs);
console.log(new Date().toISOString(), "content.js", 47);
              });
console.log(new Date().toISOString(), "content.js", 48);
          });
console.log(new Date().toISOString(), "content.js", 49);
      });
console.log(new Date().toISOString(), "content.js", 50);
    }
console.log(new Date().toISOString(), "content.js", 51);
  
console.log(new Date().toISOString(), "content.js", 52);
  
console.log(new Date().toISOString(), "content.js", 53);
    listen_mouse_movement(){
console.log(new Date().toISOString(), "content.js", 54);
        document.addEventListener('mousemove', function(event) {
console.log(new Date().toISOString(), "content.js", 55);
            const x = event.clientX; // Get the horizontal coordinate
console.log(new Date().toISOString(), "content.js", 56);
            const y = event.clientY; // Get the vertical coordinate
console.log(new Date().toISOString(), "content.js", 57);
            console.log(`Mouse position: X=${x}, Y=${y}`);
console.log(new Date().toISOString(), "content.js", 58);
        }); 
console.log(new Date().toISOString(), "content.js", 59);
    }
console.log(new Date().toISOString(), "content.js", 60);
}
console.log(new Date().toISOString(), "content.js", 61);
  
console.log(new Date().toISOString(), "content.js", 62);

console.log(new Date().toISOString(), "content.js", 63);
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
console.log(new Date().toISOString(), "content.js", 64);
    if (message.action === "simulate_user_typing") {
console.log(new Date().toISOString(), "content.js", 65);
        // Implement keyboard simulation logic here
console.log(new Date().toISOString(), "content.js", 66);
        console.log("execute: simulate_user_typing");
console.log(new Date().toISOString(), "content.js", 67);
        user_simulator.simulate_user_typing(message.target, message.text);
console.log(new Date().toISOString(), "content.js", 68);
        sendResponse({success: true, message: "Typing simulation complete"});
console.log(new Date().toISOString(), "content.js", 69);
    } else if (message.action === "listen_mouse_movement") {
console.log(new Date().toISOString(), "content.js", 70);
        // Implement mouse simulation logic here
console.log(new Date().toISOString(), "content.js", 71);
        user_simulator.listen_mouse_movement(message.eventType, message.options);
console.log(new Date().toISOString(), "content.js", 72);
        sendResponse({success: true, message: "Typing simulation complete"});
console.log(new Date().toISOString(), "content.js", 73);
    }
console.log(new Date().toISOString(), "content.js", 74);
    return true;
console.log(new Date().toISOString(), "content.js", 75);
  });
console.log(new Date().toISOString(), "content.js", 76);
  
console.log(new Date().toISOString(), "content.js", 77);

console.log(new Date().toISOString(), "content.js", 78);
  