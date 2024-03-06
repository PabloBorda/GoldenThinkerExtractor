console.log(new Date().toISOString(), "macro_injection.js", 1);

console.log(new Date().toISOString(), "macro_injection.js", 2);

console.log(new Date().toISOString(), "macro_injection.js", 3);

console.log(new Date().toISOString(), "macro_injection.js", 4);
async function mainScript() {
console.log(new Date().toISOString(), "macro_injection.js", 5);
    console.log("Macro Injection successful.");
console.log(new Date().toISOString(), "macro_injection.js", 6);

console.log(new Date().toISOString(), "macro_injection.js", 7);
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
console.log(new Date().toISOString(), "macro_injection.js", 8);
        const currentTab = tabs[0];
console.log(new Date().toISOString(), "macro_injection.js", 9);
        if (currentTab) {
console.log(new Date().toISOString(), "macro_injection.js", 10);

console.log(new Date().toISOString(), "macro_injection.js", 11);
            chrome.runtime.sendMessage({
console.log(new Date().toISOString(), "macro_injection.js", 12);
                action: "simulate_user_typing",
console.log(new Date().toISOString(), "macro_injection.js", 13);
                target: "#prompt-textarea",
console.log(new Date().toISOString(), "macro_injection.js", 14);
                text_to_write: "Hello this is an example of what automation can do",
console.log(new Date().toISOString(), "macro_injection.js", 15);
                tabId: currentTab.id // Include the current tab's ID in the message
console.log(new Date().toISOString(), "macro_injection.js", 16);
            }, function(response) {
console.log(new Date().toISOString(), "macro_injection.js", 17);
                console.log("Response from background:", response);
console.log(new Date().toISOString(), "macro_injection.js", 18);
                return true;
console.log(new Date().toISOString(), "macro_injection.js", 19);
            });
console.log(new Date().toISOString(), "macro_injection.js", 20);
        }
console.log(new Date().toISOString(), "macro_injection.js", 21);
    });
console.log(new Date().toISOString(), "macro_injection.js", 22);

console.log(new Date().toISOString(), "macro_injection.js", 23);
}
console.log(new Date().toISOString(), "macro_injection.js", 24);

console.log(new Date().toISOString(), "macro_injection.js", 25);
mainScript();