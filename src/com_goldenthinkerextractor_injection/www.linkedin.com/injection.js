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

    async function waitForDomChanges(selector, timeout = 30000) {
        return new Promise(async (resolve, reject) => {
            const container = await getContainer();
            if (!container) {
                reject(new Error(`Container with selector "${selector}" not found.`));
                return;
            }

            const config = { childList: true, subtree: true };

            const callback = function(mutationsList, observer) {
                observer.disconnect();
                resolve();
            };

            const observer = new MutationObserver(callback);

            observer.observe(container, config);

            setTimeout(() => {
                observer.disconnect();
                reject(new Error(`Timeout reached. No changes detected in the container within ${timeout} ms.`));
            }, timeout);
        });
    }

    async function extractDataFromPage() {
        // Retrieve the existing results array from storage first
        chrome.storage.local.get(["globalResultsArray"], async function(data) {
            let results = data.globalResultsArray || [];
            let completeObject = {
                filters: [],
                leads: results
            };

            function addObjectIfUnique(newObj) {
                // Create a unique identifier by concatenating name, company, and jobTitle
                const uniqueId = `${newObj.name}|${newObj.company}|${newObj.jobTitle}`;
            
                // Check if an object with the same unique identifier already exists in the leads array
                const exists = completeObject.leads.some(obj => {
                    const objUniqueId = `${obj.name}|${obj.company}|${obj.jobTitle}`;
                    return objUniqueId === uniqueId;
                });
            
                if (!exists) {
                    completeObject.leads.push(newObj);
                    console.log(`Objeto con identificador único ${uniqueId} agregado.`);
                } else {
                    console.log(`Objeto con identificador único ${uniqueId} ya existe.`);
                }
            }
            

            function sanitizeString(str) {
                if (typeof str !== 'string') {
                    // Return an empty string or some default value if str is not a string
                    return '';
                }
                return str.replace(/[^\x20-\x7E]+/g, ""); // Removes non-printable characters
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
            console.log(JSON.stringify(completeObject.leads, null, 2));

            // Store the updated results back into chrome.storage
            chrome.storage.local.set({ "globalResultsArray": completeObject.leads }, function() {
                console.log("New results have been added to the global array.");
            });

            return completeObject.leads;
        });
    }
  

    async function storeResultsLocally(newResults) {


        // Retrieve the existing results array from storage
        chrome.storage.local.get(["globalResultsArray"], function(data) {
            let completeObject = {
                filters: [],
                leads: []
            };
            if (!completeObject.filters){
                completeObject.filter = extractFiltersAndValues();
            }
            completeObject.leads = data.globalResultsArray || [];
            // Append new results to the existing array
            completeObject.leads.push(...newResults);
            
            // Store the updated array back into chrome.storage
            chrome.storage.local.set({ "globalResultsArray": completeObject.leads }, function() {
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

mainScript();