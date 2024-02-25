
async function mainScript() {
  

    var container_selector = "#search-results-container";

    // getContainer
    async function getContainer() {
        return new Promise((resolve, reject) => {
            const containerSelector = container_selector;
            const checkExist = setInterval(() => {
                const container = document.querySelector(containerSelector);
                if (container) {
                    clearInterval(checkExist);
                    resolve(container);
                }
            }, 100); // Check every 100ms
        });
    }
  
    // Extract data
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
  
    // store results
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


    // Wrap sendMessage in a function that returns a Promise
    async function waitForDomChangesAsync(elementSelector, timeout) {
        return new Promise((resolve, reject) => {
            chrome.runtime.sendMessage({
                action: "wait_for_dom_changes",
                elementSelector: elementSelector,
                timeout: timeout
            }, response => {
                if (response.success) {
                    resolve(response.message); // Resolve the promise with the success message
                } else {
                    reject(new Error(response.error)); // Reject the promise with the received error
                }
                return true;
            });
        });
    }


    // Use the function in an async context
    async function checkForDomChanges() {
        try {
            const message = await waitForDomChangesAsync("#search-results-container", 5000);
            console.log("DOM changes detected:", message);
            // Proceed with your logic here after DOM changes are detected
        } catch (error) {
            console.error("Error waiting for DOM changes:", error.message);
        }
    }



    async function navigateToNextPage() {
        const nextPageButton = document.querySelector(".artdeco-pagination__button--next:not([disabled])");
        if (nextPageButton) {
            nextPageButton.click();
            //await checkForDomChanges();
            console.log("Next page loaded.");
            return true;
        } else {
            console.log("No next page button found or it is disabled.");
            return false;
        }
    }
    
  
    async function scrollDown() {
        const container = await getContainer();
        console.log("scrollDown called for:", container);
    
        // Wait for DOM changes after scrolling
        
        console.log("DOM changes detected, attempting to extract data...");
    
        const results = await extractDataFromPage();
        if (results.length > 0) {
            await storeResultsLocally(results);
            console.log("Data sent to server.");
            // Check if there's a next page and navigate
            const nextPageExists = await navigateToNextPage();
            if (nextPageExists) {
                console.log("Navigating to next page...");
                await scrollDown(); // Recursive call for the next page
                await waitForDomChangesAsync("#search-results-container", 5000);
            }
        } else {
            console.log("No new data found.");
        }
    }
    

    
    console.log("mainScript() executing...");
    await scrollDown();
      
}

mainScript();