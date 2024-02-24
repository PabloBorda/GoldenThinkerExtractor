


async function mainScript() {
    console.log("Macro Injection successful.");

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        const currentTab = tabs[0];
        if (currentTab) {

            chrome.runtime.sendMessage({
                action: "simulate_user_typing",
                target: "#prompt-textarea",
                text_to_write: "Hello this is an example of what automation can do",
                tabId: currentTab.id // Include the current tab's ID in the message
            }, function(response) {
                console.log("Response from background:", response);
                return true;
            });
        }
    });

}

mainScript();