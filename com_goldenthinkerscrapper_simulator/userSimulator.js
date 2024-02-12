function simulateTyping(selector, value, maxDelayMs = 0) {
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



function listenMouseMovement(){
    document.addEventListener('mousemove', function(event) {
        const x = event.clientX; // Get the horizontal coordinate
        const y = event.clientY; // Get the vertical coordinate
        console.log(`Mouse position: X=${x}, Y=${y}`);
    }); 
}

// Usage example: simulateTyping('#inputSelector', 'Hello World', 200);