// CORS: 'sha256-3woF8BZ54TeXM+czaH3aXoaJsVpiamuAKFsXDykAR/Q='

function attach_event_listeners(){
  // Save selectors to cookies
  console.log("Attaching event listener to start/stopScript button");

  const startstopScriptButton = document.getElementById("startButton");
  
  startstopScriptButton.addEventListener("click", function() {
      if (this.innerHTML === "Start") {
        console.log("Start button clicked");
        this.style.backgroundColor = "#f44336";
        this.innerHTML = "stopScript";
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
          console.log("Sending 'startScript' message to background script");
          chrome.runtime.sendMessage({ action: "startScript", tab: tabs[0] }, function(response) {
            // Close the popup window after sending the message
            window.close();
          });
        });
      } else {
        console.log("stopScript button clicked");
        this.style.backgroundColor = ""; // Reset button color
        this.innerHTML = "Start";
        console.log("Sending 'stopScript' message to background script");
        chrome.runtime.sendMessage({ action: "stopScript", tab: tabs[0] }, function(response) {
          // Close the popup window after sending the message
          window.close();
        });
      }
  });


  document.getElementById("downloadButton").addEventListener("click", function() {
      console.log("downloading...");
      const filenameInput = document.getElementById("filename");
      const filename = filenameInput.value.trim() || "download"; // Use a default filename if none is provided

      chrome.storage.local.get(["globalResultsArray"], function(data) {
          if (data.globalResultsArray) {
              const jsonString = JSON.stringify(data.globalResultsArray, null, 2);
              const blob = new Blob([jsonString], { type: "application/json" });
              const url = URL.createObjectURL(blob);

              const a = document.createElement("a");
              a.href = url;
              a.download = `${filename}.json`; // Use the user-specified filename
              document.body.appendChild(a);
              a.click();

              document.body.removeChild(a);
              URL.revokeObjectURL(url);
          } else {
              console.log("No data to download.");
          }
      });
  });

  // Clear selectors from cookies and text area
  document.getElementById("clearButton").addEventListener("click", function() {
    console.log("clear");
    chrome.storage.local.clear(function() {
      var error = chrome.runtime.lastError;
      if (error) {
          console.error(error);
      } else {
          console.log('Data cleared from chrome.storage.local');
      }
    });
  });

  document.getElementById("addElementButton").addEventListener("click", function() {
    const nameInput = document.getElementById("elementName");
    const selectorInput = document.getElementById("elementSelector");
    const name = nameInput.value.trim();
    const selector = selectorInput.value.trim();

    if (name && selector) {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            const currentTabId = tabs[0].id.toString(); // Convert tab ID to string for use as a key
            const newElement = {name, selector};

            // Retrieve the current list of selectors for the tab, add the new one, and save it back
            chrome.storage.local.get([currentTabId], function(result) {
                const currentSelectors = result[currentTabId] ? result[currentTabId] : [];
                currentSelectors.push(newElement);
                let storageObject = {};
                storageObject[currentTabId] = currentSelectors;

                chrome.storage.local.set(storageObject, function() {
                    console.log('Selector saved for tab ID:', currentTabId);
                    // Clear inputs and refresh the list of selectors
                    nameInput.value = '';
                    selectorInput.value = '';
                    loadSelectorsForCurrentTab();
                });
            });
        });
    } else {
        alert("Please fill in both name and selector fields.");
    }
  });


}

document.addEventListener("DOMContentLoaded", function() {
  console.log("DOMContentLoaded");
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    const url = new URL(tabs[0].url);
    const domain = url.hostname;
    document.getElementById("domainName").textContent = domain;
  });
  attach_event_listeners();
  loadSelectorsForCurrentTab(); // Load selectors for the current tab

  var tablinks = document.getElementsByClassName("tablinks");
  for (let i = 0; i < tablinks.length; i++) {
      tablinks[i].addEventListener('click', function(event) {
          var tabName = this.getAttribute('data-tab');
          openTab(event,tabName);
      });

      // Automatically open the first tab or a specific tab
      if(tablinks.length > 0) {
        tablinks[0].click();
      }
    }

    

    function getFaviconUrl(url) {
      // Assuming favicon is at the root directory as a fallback
      let faviconUrl = `${url.protocol}//${url.hostname}/favicon.ico`;
    
      // Attempt to fetch the favicon specified in the page's link element
      function findFaviconInDocument() {
        const link = document.querySelector("link[rel~='icon']");
        if (link) {
          return link.href;
        }
        return '';
      }

      chrome.scripting.executeScript({
        target: {tabId: url.id},
        function: findFaviconInDocument,
      }, (injectionResults) => {
        for (const frameResult of injectionResults)
          if (frameResult.result && frameResult.result !== '') {
            faviconUrl = frameResult.result;
            break;
          }
        document.getElementById('target_favicon').src = faviconUrl;
      });
    
      return faviconUrl; // This will return the default favicon path or the updated one if found
    }

    
    // Fetch and display the favicon and domain
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      const url = new URL(tabs[0].url);
      document.getElementById("domainName").textContent = url.hostname;
      document.getElementById('target_favicon').src = `${url.protocol}//${url.host}/favicon.ico`;
    });

});

function loadSelectorsForCurrentTab() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      const currentTabId = tabs[0].id.toString();
      chrome.storage.local.get([currentTabId], function(result) {
          const selectors = result[currentTabId] ? result[currentTabId] : [];
          const elementsList = document.getElementById("elementsList");
          elementsList.innerHTML = ''; // Clear existing list

          selectors.forEach((element, index) => {
              const elementItem = document.createElement("div");
              elementItem.className = "element-item";
              elementItem.innerHTML = `<td>${element.name}: ${element.selector}</td><td></td><td></td><td><button class="removeElementButton" data-index="${index}">X</button></td>`;
              elementsList.appendChild(elementItem);

              // Add remove functionality
              elementItem.querySelector(".removeElementButton").addEventListener("click", function() {
                  removeSelectorFromCurrentTab(index);
              });
          });
      });
  });
}


function removeSelectorFromCurrentTab(index) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      const currentTabId = tabs[0].id.toString();
      chrome.storage.local.get([currentTabId], function(result) {
          let selectors = result[currentTabId];
          if (selectors) {
              selectors.splice(index, 1); // Remove the selector at the specified index
              let storageObject = {};
              storageObject[currentTabId] = selectors;

              chrome.storage.local.set(storageObject, function() {
                  console.log('Selector removed for tab ID:', currentTabId);
                  loadSelectorsForCurrentTab(); // Refresh the list of selectors
              });
          }
      });
  });
}


function openTab(evt, tabName) {
  var i,tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  var targetTab = document.getElementById(tabName);
  if (targetTab) {
    targetTab.style.display = "block";
    evt.currentTarget.className += " active";
  } else {
    console.error("Tab not found: ", tabName);
  }
}



