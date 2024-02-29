(function() {
    console.log("Injecting extractLinks function script");
    let links = Array.from(document.querySelectorAll('a')).map(a => a.href);
    console.log("The links extracted are: ", JSON.stringify(links));

    // Send the links back to the background script
    chrome.runtime.sendMessage({action: "extracted_links", links: links}, (response) => {
        console.log("Message sent from link_extractor.js", response);
    });
})();
