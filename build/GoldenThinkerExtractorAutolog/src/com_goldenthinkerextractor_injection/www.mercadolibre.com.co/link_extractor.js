console.log(new Date().toISOString(), "link_extractor.js", 1);
(function() {
console.log(new Date().toISOString(), "link_extractor.js", 2);
    console.log("Injecting extractLinks function script");
console.log(new Date().toISOString(), "link_extractor.js", 3);
    let links = Array.from(document.querySelectorAll('a')).map(a => a.href);
console.log(new Date().toISOString(), "link_extractor.js", 4);
    console.log("The links extracted are: ", JSON.stringify(links));
console.log(new Date().toISOString(), "link_extractor.js", 5);

console.log(new Date().toISOString(), "link_extractor.js", 6);
    // Send the links back to the background script
console.log(new Date().toISOString(), "link_extractor.js", 7);
    chrome.runtime.sendMessage({action: "extracted_links", links: links}, (response) => {
console.log(new Date().toISOString(), "link_extractor.js", 8);
        console.log("Message sent from link_extractor.js", response);
console.log(new Date().toISOString(), "link_extractor.js", 9);
    });
console.log(new Date().toISOString(), "link_extractor.js", 10);
})();
console.log(new Date().toISOString(), "link_extractor.js", 11);
