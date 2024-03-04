async function mainScript() {
    
    async function getContainer() {
        const containerSelector = "#search-results-container";
        let container = document.querySelector(containerSelector);
        while (!container) {
            await new Promise(resolve => setTimeout(resolve, 100)); // Wait 100ms before checking again
            container = document.querySelector(containerSelector);
        }
        return container;
    }

    async function waitForDomChanges(selector, timeout = 30000) {
        let resolveFn, rejectFn;
        const promise = new Promise((resolve, reject) => {
            resolveFn = resolve;
            rejectFn = reject;
        });

        const container = await getContainer();
        let timeoutId = setTimeout(() => {
            observer.disconnect();
            rejectFn(new Error(`Timeout reached. No changes detected in the container within ${timeout} ms.`));
        }, timeout);

        const observer = new MutationObserver((mutations, obs) => {
            clearTimeout(timeoutId);
            observer.disconnect();
            resolveFn();
        });

        observer.observe(container, { childList: true, subtree: true });
        return promise;
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
            return waitForDomChanges("#search-results-container");
        }
        throw new Error("No next page button found or it is disabled.");
    }
  
    async function scrollAndExtract() {
        const container = await getContainer();
        let attempts = 0;
        const maxAttempts = 5;

        while (attempts < maxAttempts) {
            container.scrollBy(0, window.innerHeight); // Scroll one viewport height
            try {
                await waitForDomChanges("#search-results-container", 5000);
                const results = await extractDataFromPage();
                if (results && results.length > 0) {
                    await storeResultsLocally(results);
                    attempts = 0; // Reset attempts after successful data extraction
                } else {
                    attempts++;
                }
            } catch (error) {
                console.error("Error during scroll and extract:", error);
                attempts++;
            }
        }

        try {
            await navigateToNextPage();
            await scrollAndExtract(); // Recursively handle the next page
        } catch (error) {
            console.log("Finished all pages or encountered an error navigating:", error);
        }
    }

    console.log("Starting main script...");
    await scrollAndExtract();
}


mainScript().then(() => console.log("Script completed."));