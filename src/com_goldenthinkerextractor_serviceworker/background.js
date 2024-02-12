chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message.action === "startScript") {
        let tab = message.tab.id;
        try {
            await chrome.scripting.executeScript({
                target: {tabId: tab},
                function: mainScript
            });
            console.log("Script injected into tab " + tab);
            sendResponse({status: "success"});
        } catch (error) {
            console.error("Error injecting script into tab " + tab, error);
            sendResponse({status: "error", message: error.message});
        }
    } else if (message.action === "stopScript") {
        console.log("Script stopped.");
        // Implement stopping logic if necessary
        sendResponse({status: "stopped"});
    }
    return true; // Keep the message channel open for the response
});
  

async function mainScript() {
  

    async function getContainer() {
        return new Promise((resolve, reject) => {
            const containerSelector = "#search-results-container";
            const checkExist = setInterval(() => {
                const container = document.querySelector(containerSelector);
                if (container) {
                    clearInterval(checkExist);
                    resolve(container);
                }
            }, 100); // Check every 100ms
        });
    }
  
/*     async function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    } */

    async function waitForDomChanges(selector, timeout = 30000) {
        return new Promise(async (resolve, reject) => { // Note the async keyword here
            const container = await getContainer(); // Properly await the container
            if (!container) {
                reject(new Error(`Container with selector "${selector}" not found.`));
                return;
            }
    
            // Options for the observer (which mutations to observe)
            const config = { childList: true, subtree: true };
    
            // Callback function to execute when mutations are observed
            const callback = function(mutationsList, observer) {
                observer.disconnect(); // Stop observing
                resolve(); // Resolve the promise as changes are detected
            };
    
            // Create an instance of the observer with the callback function
            const observer = new MutationObserver(callback);
    
            // Start observing the target node for configured mutations
            observer.observe(container, config);
    
            // Set a timeout to reject the promise if no changes are detected within the specified time
            setTimeout(() => {
                observer.disconnect(); // Stop observing
                reject(new Error(`Timeout reached. No changes detected in the container within ${timeout} ms.`));
            }, timeout);
        });
    }
  
    async function extractDataFromPage() {

        let results = [];
  
        function addObjectIfUnique(newObj) {
          // Busca en el arreglo si ya existe un objeto con el mismo nombre
          const exists = results.find(obj => obj.name === newObj.name);
          // Si no existe, inserta el nuevo objeto
          if (!exists) {
              results.push(newObj);
              console.log(`Objeto con nombre ${newObj.name} agregado.`);
          } else {
              console.log(`Objeto con nombre ${newObj.name} ya existe.`);
          }
        }

        function sanitizeString(str) {
            return str.replace(/[^\x20-\x7E]+/g, ""); // Removes non-printable characters
            // Add more sanitization rules as needed
        }

        console.log("extractDataFromPage..");
        // Directly mapping to the attributes for photos and lead panels
        let photos = Array.from(document.querySelectorAll("[data-anonymize='headshot-photo']")).map(el => el.getAttribute("src"));
        let leadPanels = Array.from(document.querySelectorAll("[data-control-name='view_lead_panel_via_search_lead_name']")).map(el => el.getAttribute("href"));
        // Mapping to text content for other fields
        let personNames = Array.from(document.querySelectorAll("span[data-anonymize='person-name']")).map(el => el.textContent.trim());
        let titles = Array.from(document.querySelectorAll("[data-anonymize='title']")).map(el => el.textContent.trim());
        let jobTitles = Array.from(document.querySelectorAll("[data-anonymize='job-title']")).map(el => el.textContent.trim());
        let locations = Array.from(document.querySelectorAll("[data-anonymize='location']")).map(el => el.textContent.trim());
        let companies = Array.from(document.querySelectorAll('a[data-anonymize="company-name"]')).map(el => el.textContent.trim());
        let abouts = Array.from(document.querySelectorAll('.flex.flex-column.justify-space-between')).map(el => el.textContent.trim());
    
        // Assuming all arrays are of the same length. If not, additional checks are needed.
        for (let i = 0; i < personNames.length; i++) {
            let result = {
                photo: photos[i], // Directly using the mapped src attribute
                leadPanel: sanitizeString(leadPanels[i]), // Directly using the mapped href attribute
                name: sanitizeString(personNames[i]),
                title: sanitizeString(titles[i]),
                jobTitle: sanitizeString(jobTitles[i]),
                location: sanitizeString(locations[i]),
                company: sanitizeString(companies[i]), // Directly using the mapped text content
                about: sanitizeString(abouts[i])
            };
            addObjectIfUnique(result);
        }
        console.log("Data Obtained");
        console.log(JSON.stringify(results, null, 2)); // Pretty print the results
        return results;
    } 
  
/*     async function sendResultsToServer(results) {
        console.log("Sending results to server...");
        try {
            // Validate JSON before sending
            const jsonData = JSON.stringify(results);
            const response = await fetch("http://127.0.0.1:8080/index", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: jsonData
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const jsonResponse = await response.json();
            console.log("Results sent successfully", jsonResponse);
        } catch (error) {
            console.error("Error sending results to server:", error);
        }
    }
   */

    async function storeResultsLocally(newResults) {
        // Retrieve the existing results array from storage
        chrome.storage.local.get(["globalResultsArray"], function(data) {
            let existingResults = data.globalResultsArray || [];
            
            // Append new results to the existing array
            existingResults.push(...newResults);
            
            // Store the updated array back into chrome.storage
            chrome.storage.local.set({ "globalResultsArray": existingResults }, function() {
                console.log("New results have been added to the global array.");
            });
        });
    }


    async function navigateToNextPage() {
        const nextPageButton = document.querySelector(".artdeco-pagination__button--next:not([disabled])");
        if (nextPageButton) {
            nextPageButton.click();
            waitForDomChanges("#search-results-container")
                .then(() => {
                    console.log("New DOM data loaded in the container.");
                    scrollDown();
                })
                .catch(error => console.error(error.message));
            return true;
        } else {
            console.log("No next page button found or it is disabled.");
            return false;
        }
    }
  
// Simplified scrollDown logic
async function scrollDown() {
    const container = await getContainer();
    console.log("scrollDown called for:", container);

    // Simplified logic to trigger a scroll and wait for changes
    let attempts = 0;
    const maxAttempts = 5; // Adjust based on your needs

    do {
        container.scrollBy(0, 1000); // Adjust scroll step size as needed
        try {
            await waitForDomChanges("#search-results-container", 5000); // Adjust timeout as needed
            console.log("DOM changes detected, attempting to extract data...");
            const results = await extractDataFromPage();
            if (results.length > 0) {
                await storeResultsLocally(results);
                console.log("Data sent to server.");
                attempts = 0; // Reset attempts if data was successfully processed
            } else {
                console.log("No new data found, increasing attempt count.");
                attempts++;
            }
        } catch (error) {
            console.error("Error waiting for DOM changes:", error.message);
            attempts++;
        }
    } while (attempts < maxAttempts);

    if (attempts >= maxAttempts) {
        console.log("Max attempts reached, checking for next page...");
        const nextPageSuccess = await navigateToNextPage();
        if (nextPageSuccess) {
            console.log("Navigated to next page, continuing data extraction...");
            await scrollDown(); // Recursively call scrollDown for the next page
        } else {
            console.log("No further pages or unable to navigate, stopping script.");
        }
    }
}

    
    console.log("mainScript() executing...");
    await scrollDown();
      
}

chrome.webRequest.onCompleted.addListener(
    function(details) {
      // Check if the request was rate-limited
      if (details.statusCode === 429) {
        console.log("Rate limit hit:", details);
        // Optionally, extract the Retry-After header if present
        const retryAfterHeader = details.responseHeaders.find(header => header.name.toLowerCase() === "retry-after");
        if (retryAfterHeader) {
          console.log("Retry after (seconds):", retryAfterHeader.value);
          // Here you could broadcast a message to your content scripts or take other actions
        }
      }
    },
    {urls: ["*://www.example.com/*"]}, // Adjust the pattern to match the URLs you're interested in
    ["responseHeaders"]
  );
  