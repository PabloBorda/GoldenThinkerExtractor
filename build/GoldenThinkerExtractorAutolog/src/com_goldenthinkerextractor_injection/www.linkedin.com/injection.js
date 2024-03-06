console.log(new Date().toISOString(), "injection.js", 1);
async function mainScript() {
console.log(new Date().toISOString(), "injection.js", 2);
    
console.log(new Date().toISOString(), "injection.js", 3);
    async function getContainer() {
console.log(new Date().toISOString(), "injection.js", 4);
        const containerSelector = "#search-results-container";
console.log(new Date().toISOString(), "injection.js", 5);
        let container = document.querySelector(containerSelector);
console.log(new Date().toISOString(), "injection.js", 6);
        while (!container) {
console.log(new Date().toISOString(), "injection.js", 7);
            await new Promise(resolve => setTimeout(resolve, 100)); // Wait 100ms before checking again
console.log(new Date().toISOString(), "injection.js", 8);
            container = document.querySelector(containerSelector);
console.log(new Date().toISOString(), "injection.js", 9);
        }
console.log(new Date().toISOString(), "injection.js", 10);
        return container;
console.log(new Date().toISOString(), "injection.js", 11);
    }
console.log(new Date().toISOString(), "injection.js", 12);

console.log(new Date().toISOString(), "injection.js", 13);
    async function waitForDomChanges(selector, timeout = 30000) {
console.log(new Date().toISOString(), "injection.js", 14);
        let resolveFn, rejectFn;
console.log(new Date().toISOString(), "injection.js", 15);
        const promise = new Promise((resolve, reject) => {
console.log(new Date().toISOString(), "injection.js", 16);
            resolveFn = resolve;
console.log(new Date().toISOString(), "injection.js", 17);
            rejectFn = reject;
console.log(new Date().toISOString(), "injection.js", 18);
        });
console.log(new Date().toISOString(), "injection.js", 19);

console.log(new Date().toISOString(), "injection.js", 20);
        const container = await getContainer();
console.log(new Date().toISOString(), "injection.js", 21);
        let timeoutId = setTimeout(() => {
console.log(new Date().toISOString(), "injection.js", 22);
            observer.disconnect();
console.log(new Date().toISOString(), "injection.js", 23);
            rejectFn(new Error(`Timeout reached. No changes detected in the container within ${timeout} ms.`));
console.log(new Date().toISOString(), "injection.js", 24);
        }, timeout);
console.log(new Date().toISOString(), "injection.js", 25);

console.log(new Date().toISOString(), "injection.js", 26);
        const observer = new MutationObserver((mutations, obs) => {
console.log(new Date().toISOString(), "injection.js", 27);
            clearTimeout(timeoutId);
console.log(new Date().toISOString(), "injection.js", 28);
            observer.disconnect();
console.log(new Date().toISOString(), "injection.js", 29);
            resolveFn();
console.log(new Date().toISOString(), "injection.js", 30);
        });
console.log(new Date().toISOString(), "injection.js", 31);

console.log(new Date().toISOString(), "injection.js", 32);
        observer.observe(container, { childList: true, subtree: true });
console.log(new Date().toISOString(), "injection.js", 33);
        return promise;
console.log(new Date().toISOString(), "injection.js", 34);
    }
console.log(new Date().toISOString(), "injection.js", 35);
    
console.log(new Date().toISOString(), "injection.js", 36);

console.log(new Date().toISOString(), "injection.js", 37);
    async function extractDataFromPage() {
console.log(new Date().toISOString(), "injection.js", 38);
        // Retrieve the existing results array from storage first
console.log(new Date().toISOString(), "injection.js", 39);
        chrome.storage.local.get(["globalResultsArray"], async function(data) {
console.log(new Date().toISOString(), "injection.js", 40);
            let results = data.globalResultsArray || [];
console.log(new Date().toISOString(), "injection.js", 41);
            let completeObject = {
console.log(new Date().toISOString(), "injection.js", 42);
                filters: [],
console.log(new Date().toISOString(), "injection.js", 43);
                leads: results
console.log(new Date().toISOString(), "injection.js", 44);
            };
console.log(new Date().toISOString(), "injection.js", 45);

console.log(new Date().toISOString(), "injection.js", 46);
            function addObjectIfUnique(newObj) {
console.log(new Date().toISOString(), "injection.js", 47);
                // Create a unique identifier by concatenating name, company, and jobTitle
console.log(new Date().toISOString(), "injection.js", 48);
                const uniqueId = `${newObj.name}|${newObj.company}|${newObj.jobTitle}`;
console.log(new Date().toISOString(), "injection.js", 49);
            
console.log(new Date().toISOString(), "injection.js", 50);
                // Check if an object with the same unique identifier already exists in the leads array
console.log(new Date().toISOString(), "injection.js", 51);
                const exists = completeObject.leads.some(obj => {
console.log(new Date().toISOString(), "injection.js", 52);
                    const objUniqueId = `${obj.name}|${obj.company}|${obj.jobTitle}`;
console.log(new Date().toISOString(), "injection.js", 53);
                    return objUniqueId === uniqueId;
console.log(new Date().toISOString(), "injection.js", 54);
                });
console.log(new Date().toISOString(), "injection.js", 55);
            
console.log(new Date().toISOString(), "injection.js", 56);
                if (!exists) {
console.log(new Date().toISOString(), "injection.js", 57);
                    completeObject.leads.push(newObj);
console.log(new Date().toISOString(), "injection.js", 58);
                    console.log(`Objeto con identificador único ${uniqueId} agregado.`);
console.log(new Date().toISOString(), "injection.js", 59);
                } else {
console.log(new Date().toISOString(), "injection.js", 60);
                    console.log(`Objeto con identificador único ${uniqueId} ya existe.`);
console.log(new Date().toISOString(), "injection.js", 61);
                }
console.log(new Date().toISOString(), "injection.js", 62);
            }
console.log(new Date().toISOString(), "injection.js", 63);
            
console.log(new Date().toISOString(), "injection.js", 64);

console.log(new Date().toISOString(), "injection.js", 65);
            function sanitizeString(str) {
console.log(new Date().toISOString(), "injection.js", 66);
                if (typeof str !== 'string') {
console.log(new Date().toISOString(), "injection.js", 67);
                    // Return an empty string or some default value if str is not a string
console.log(new Date().toISOString(), "injection.js", 68);
                    return '';
console.log(new Date().toISOString(), "injection.js", 69);
                }
console.log(new Date().toISOString(), "injection.js", 70);
                return str.replace(/[^\x20-\x7E]+/g, ""); // Removes non-printable characters
console.log(new Date().toISOString(), "injection.js", 71);
            }
console.log(new Date().toISOString(), "injection.js", 72);
            
console.log(new Date().toISOString(), "injection.js", 73);

console.log(new Date().toISOString(), "injection.js", 74);
            console.log("extractDataFromPage..");
console.log(new Date().toISOString(), "injection.js", 75);
            // Directly mapping to the attributes for photos and lead panels
console.log(new Date().toISOString(), "injection.js", 76);
            let photos = Array.from(document.querySelectorAll("[data-anonymize='headshot-photo']")).map(el => el.getAttribute("src"));
console.log(new Date().toISOString(), "injection.js", 77);
            let leadPanels = Array.from(document.querySelectorAll("[data-control-name='view_lead_panel_via_search_lead_name']")).map(el => el.getAttribute("href"));
console.log(new Date().toISOString(), "injection.js", 78);
            // Mapping to text content for other fields
console.log(new Date().toISOString(), "injection.js", 79);
            let personNames = Array.from(document.querySelectorAll("span[data-anonymize='person-name']")).map(el => el.textContent.trim());
console.log(new Date().toISOString(), "injection.js", 80);
            let titles = Array.from(document.querySelectorAll("[data-anonymize='title']")).map(el => el.textContent.trim());
console.log(new Date().toISOString(), "injection.js", 81);
            let jobTitles = Array.from(document.querySelectorAll("[data-anonymize='job-title']")).map(el => el.textContent.trim());
console.log(new Date().toISOString(), "injection.js", 82);
            let locations = Array.from(document.querySelectorAll("[data-anonymize='location']")).map(el => el.textContent.trim());
console.log(new Date().toISOString(), "injection.js", 83);
            let companies = Array.from(document.querySelectorAll('a[data-anonymize="company-name"]')).map(el => el.textContent.trim());
console.log(new Date().toISOString(), "injection.js", 84);
            let abouts = Array.from(document.querySelectorAll('.flex.flex-column.justify-space-between')).map(el => el.textContent.trim());
console.log(new Date().toISOString(), "injection.js", 85);
        
console.log(new Date().toISOString(), "injection.js", 86);
            // Assuming all arrays are of the same length. If not, additional checks are needed.
console.log(new Date().toISOString(), "injection.js", 87);
            for (let i = 0; i < personNames.length; i++) {
console.log(new Date().toISOString(), "injection.js", 88);
                let result = {
console.log(new Date().toISOString(), "injection.js", 89);
                    photo: photos[i], // Directly using the mapped src attribute
console.log(new Date().toISOString(), "injection.js", 90);
                    leadPanel: sanitizeString(leadPanels[i]), // Directly using the mapped href attribute
console.log(new Date().toISOString(), "injection.js", 91);
                    name: sanitizeString(personNames[i]),
console.log(new Date().toISOString(), "injection.js", 92);
                    title: sanitizeString(titles[i]),
console.log(new Date().toISOString(), "injection.js", 93);
                    jobTitle: sanitizeString(jobTitles[i]),
console.log(new Date().toISOString(), "injection.js", 94);
                    location: sanitizeString(locations[i]),
console.log(new Date().toISOString(), "injection.js", 95);
                    company: sanitizeString(companies[i]), // Directly using the mapped text content
console.log(new Date().toISOString(), "injection.js", 96);
                    about: sanitizeString(abouts[i])
console.log(new Date().toISOString(), "injection.js", 97);
                };
console.log(new Date().toISOString(), "injection.js", 98);
                addObjectIfUnique(result);
console.log(new Date().toISOString(), "injection.js", 99);
            }
console.log(new Date().toISOString(), "injection.js", 100);
            console.log("Data Obtained");
console.log(new Date().toISOString(), "injection.js", 101);
            console.log(JSON.stringify(completeObject.leads, null, 2));
console.log(new Date().toISOString(), "injection.js", 102);

console.log(new Date().toISOString(), "injection.js", 103);
            // Store the updated results back into chrome.storage
console.log(new Date().toISOString(), "injection.js", 104);
            chrome.storage.local.set({ "globalResultsArray": completeObject.leads }, function() {
console.log(new Date().toISOString(), "injection.js", 105);
                console.log("New results have been added to the global array.");
console.log(new Date().toISOString(), "injection.js", 106);
            });
console.log(new Date().toISOString(), "injection.js", 107);

console.log(new Date().toISOString(), "injection.js", 108);
            return completeObject.leads;
console.log(new Date().toISOString(), "injection.js", 109);
        });
console.log(new Date().toISOString(), "injection.js", 110);
    }
console.log(new Date().toISOString(), "injection.js", 111);
  
console.log(new Date().toISOString(), "injection.js", 112);

console.log(new Date().toISOString(), "injection.js", 113);
    async function storeResultsLocally(newResults) {
console.log(new Date().toISOString(), "injection.js", 114);

console.log(new Date().toISOString(), "injection.js", 115);

console.log(new Date().toISOString(), "injection.js", 116);
        // Retrieve the existing results array from storage
console.log(new Date().toISOString(), "injection.js", 117);
        chrome.storage.local.get(["globalResultsArray"], function(data) {
console.log(new Date().toISOString(), "injection.js", 118);
            let completeObject = {
console.log(new Date().toISOString(), "injection.js", 119);
                filters: [],
console.log(new Date().toISOString(), "injection.js", 120);
                leads: []
console.log(new Date().toISOString(), "injection.js", 121);
            };
console.log(new Date().toISOString(), "injection.js", 122);
            if (!completeObject.filters){
console.log(new Date().toISOString(), "injection.js", 123);
                completeObject.filter = extractFiltersAndValues();
console.log(new Date().toISOString(), "injection.js", 124);
            }
console.log(new Date().toISOString(), "injection.js", 125);
            completeObject.leads = data.globalResultsArray || [];
console.log(new Date().toISOString(), "injection.js", 126);
            // Append new results to the existing array
console.log(new Date().toISOString(), "injection.js", 127);
            completeObject.leads.push(...newResults);
console.log(new Date().toISOString(), "injection.js", 128);
            
console.log(new Date().toISOString(), "injection.js", 129);
            // Store the updated array back into chrome.storage
console.log(new Date().toISOString(), "injection.js", 130);
            chrome.storage.local.set({ "globalResultsArray": completeObject.leads }, function() {
console.log(new Date().toISOString(), "injection.js", 131);
                console.log("New results have been added to the global array.");
console.log(new Date().toISOString(), "injection.js", 132);
            });
console.log(new Date().toISOString(), "injection.js", 133);
        });
console.log(new Date().toISOString(), "injection.js", 134);
    }
console.log(new Date().toISOString(), "injection.js", 135);

console.log(new Date().toISOString(), "injection.js", 136);

console.log(new Date().toISOString(), "injection.js", 137);
    async function navigateToNextPage() {
console.log(new Date().toISOString(), "injection.js", 138);
        const nextPageButton = document.querySelector(".artdeco-pagination__button--next:not([disabled])");
console.log(new Date().toISOString(), "injection.js", 139);
        if (nextPageButton) {
console.log(new Date().toISOString(), "injection.js", 140);
            nextPageButton.click();
console.log(new Date().toISOString(), "injection.js", 141);
            return waitForDomChanges("#search-results-container");
console.log(new Date().toISOString(), "injection.js", 142);
        }
console.log(new Date().toISOString(), "injection.js", 143);
        throw new Error("No next page button found or it is disabled.");
console.log(new Date().toISOString(), "injection.js", 144);
    }
console.log(new Date().toISOString(), "injection.js", 145);
  
console.log(new Date().toISOString(), "injection.js", 146);
    async function scrollAndExtract() {
console.log(new Date().toISOString(), "injection.js", 147);
        const container = await getContainer();
console.log(new Date().toISOString(), "injection.js", 148);
        let attempts = 0;
console.log(new Date().toISOString(), "injection.js", 149);
        const maxAttempts = 5;
console.log(new Date().toISOString(), "injection.js", 150);

console.log(new Date().toISOString(), "injection.js", 151);
        while (attempts < maxAttempts) {
console.log(new Date().toISOString(), "injection.js", 152);
            container.scrollBy(0, window.innerHeight); // Scroll one viewport height
console.log(new Date().toISOString(), "injection.js", 153);
            try {
console.log(new Date().toISOString(), "injection.js", 154);
                await waitForDomChanges("#search-results-container", 5000);
console.log(new Date().toISOString(), "injection.js", 155);
                const results = await extractDataFromPage();
console.log(new Date().toISOString(), "injection.js", 156);
                if (results && results.length > 0) {
console.log(new Date().toISOString(), "injection.js", 157);
                    await storeResultsLocally(results);
console.log(new Date().toISOString(), "injection.js", 158);
                    attempts = 0; // Reset attempts after successful data extraction
console.log(new Date().toISOString(), "injection.js", 159);
                } else {
console.log(new Date().toISOString(), "injection.js", 160);
                    attempts++;
console.log(new Date().toISOString(), "injection.js", 161);
                }
console.log(new Date().toISOString(), "injection.js", 162);
            } catch (error) {
console.log(new Date().toISOString(), "injection.js", 163);
                console.error("Error during scroll and extract:", error);
console.log(new Date().toISOString(), "injection.js", 164);
                attempts++;
console.log(new Date().toISOString(), "injection.js", 165);
            }
console.log(new Date().toISOString(), "injection.js", 166);
        }
console.log(new Date().toISOString(), "injection.js", 167);

console.log(new Date().toISOString(), "injection.js", 168);
        try {
console.log(new Date().toISOString(), "injection.js", 169);
            await navigateToNextPage();
console.log(new Date().toISOString(), "injection.js", 170);
            await scrollAndExtract(); // Recursively handle the next page
console.log(new Date().toISOString(), "injection.js", 171);
        } catch (error) {
console.log(new Date().toISOString(), "injection.js", 172);
            console.log("Finished all pages or encountered an error navigating:", error);
console.log(new Date().toISOString(), "injection.js", 173);
        }
console.log(new Date().toISOString(), "injection.js", 174);
    }
console.log(new Date().toISOString(), "injection.js", 175);

console.log(new Date().toISOString(), "injection.js", 176);
    console.log("Starting main script...");
console.log(new Date().toISOString(), "injection.js", 177);
    await scrollAndExtract();
console.log(new Date().toISOString(), "injection.js", 178);
}
console.log(new Date().toISOString(), "injection.js", 179);

console.log(new Date().toISOString(), "injection.js", 180);

console.log(new Date().toISOString(), "injection.js", 181);
mainScript().then(() => console.log("Script completed."));