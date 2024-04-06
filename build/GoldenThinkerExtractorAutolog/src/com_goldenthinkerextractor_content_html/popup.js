console.log(new Date().toISOString(), "popup.js", 1);
// CORS: 'sha256-3woF8BZ54TeXM+czaH3aXoaJsVpiamuAKFsXDykAR/Q='
console.log(new Date().toISOString(), "popup.js", 2);

console.log(new Date().toISOString(), "popup.js", 3);
function attach_event_listeners(){
console.log(new Date().toISOString(), "popup.js", 4);
  
console.log(new Date().toISOString(), "popup.js", 5);
  
console.log(new Date().toISOString(), "popup.js", 6);
    // Start Button - execute injection script
console.log(new Date().toISOString(), "popup.js", 7);
  document.getElementById("startButton").addEventListener("click", function() {
console.log(new Date().toISOString(), "popup.js", 8);
    const button = this;
console.log(new Date().toISOString(), "popup.js", 9);
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
console.log(new Date().toISOString(), "popup.js", 10);
        const activeTab = tabs[0];
console.log(new Date().toISOString(), "popup.js", 11);
        console.log("Sending 'start_web_crawl_message' message to background script");
console.log(new Date().toISOString(), "popup.js", 12);
        chrome.runtime.sendMessage({ action: "start_web_crawl_message", current_tab_id: activeTab.id }, function(response) {
console.log(new Date().toISOString(), "popup.js", 13);
            if (chrome.runtime.lastError) {
console.log(new Date().toISOString(), "popup.js", 14);
                console.error("Error sending message:", chrome.runtime.lastError.message);
console.log(new Date().toISOString(), "popup.js", 15);
                return;
console.log(new Date().toISOString(), "popup.js", 16);
            }
console.log(new Date().toISOString(), "popup.js", 17);
            if (response.status === "success") {
console.log(new Date().toISOString(), "popup.js", 18);
                console.log("Script injection worked.");
console.log(new Date().toISOString(), "popup.js", 19);
                button.innerHTML = "Stop";
console.log(new Date().toISOString(), "popup.js", 20);
                // Handle UI changes or further actions
console.log(new Date().toISOString(), "popup.js", 21);
            } else if (response.status === "error") {
console.log(new Date().toISOString(), "popup.js", 22);
                console.error("Script failed to inject:", response.message);
console.log(new Date().toISOString(), "popup.js", 23);
                // Handle error
console.log(new Date().toISOString(), "popup.js", 24);
            }
console.log(new Date().toISOString(), "popup.js", 25);
            return true;
console.log(new Date().toISOString(), "popup.js", 26);
        });
console.log(new Date().toISOString(), "popup.js", 27);
    });
console.log(new Date().toISOString(), "popup.js", 28);
  });
console.log(new Date().toISOString(), "popup.js", 29);

console.log(new Date().toISOString(), "popup.js", 30);

console.log(new Date().toISOString(), "popup.js", 31);
  // Download button listener
console.log(new Date().toISOString(), "popup.js", 32);
  document.getElementById("downloadButton").addEventListener("click", function() {
console.log(new Date().toISOString(), "popup.js", 33);
      console.log("downloading...");
console.log(new Date().toISOString(), "popup.js", 34);
      const filenameInput = document.getElementById("filename");
console.log(new Date().toISOString(), "popup.js", 35);
      const filename = filenameInput.value.trim() || "download"; // Use a default filename if none is provided
console.log(new Date().toISOString(), "popup.js", 36);

console.log(new Date().toISOString(), "popup.js", 37);
      chrome.storage.local.get(["globalResultsArray"], function(data) {
console.log(new Date().toISOString(), "popup.js", 38);
          if (data.globalResultsArray) {
console.log(new Date().toISOString(), "popup.js", 39);
              const jsonString = JSON.stringify(data.globalResultsArray, null, 2);
console.log(new Date().toISOString(), "popup.js", 40);
              const blob = new Blob([jsonString], { type: "application/json" });
console.log(new Date().toISOString(), "popup.js", 41);
              const url = URL.createObjectURL(blob);
console.log(new Date().toISOString(), "popup.js", 42);

console.log(new Date().toISOString(), "popup.js", 43);
              const a = document.createElement("a");
console.log(new Date().toISOString(), "popup.js", 44);
              a.href = url;
console.log(new Date().toISOString(), "popup.js", 45);
              a.download = `${filename}.json`; // Use the user-specified filename
console.log(new Date().toISOString(), "popup.js", 46);
              document.body.appendChild(a);
console.log(new Date().toISOString(), "popup.js", 47);
              a.click();
console.log(new Date().toISOString(), "popup.js", 48);

console.log(new Date().toISOString(), "popup.js", 49);
              document.body.removeChild(a);
console.log(new Date().toISOString(), "popup.js", 50);
              URL.revokeObjectURL(url);
console.log(new Date().toISOString(), "popup.js", 51);
          } else {
console.log(new Date().toISOString(), "popup.js", 52);
              console.log("No data to download.");
console.log(new Date().toISOString(), "popup.js", 53);
          }
console.log(new Date().toISOString(), "popup.js", 54);
      });
console.log(new Date().toISOString(), "popup.js", 55);
  });
console.log(new Date().toISOString(), "popup.js", 56);

console.log(new Date().toISOString(), "popup.js", 57);

console.log(new Date().toISOString(), "popup.js", 58);
  // Clear selectors from cookies and text area
console.log(new Date().toISOString(), "popup.js", 59);
  document.getElementById("clearButton").addEventListener("click", function() {
console.log(new Date().toISOString(), "popup.js", 60);
    console.log("clear");
console.log(new Date().toISOString(), "popup.js", 61);
    chrome.storage.local.clear(function() {
console.log(new Date().toISOString(), "popup.js", 62);
      var error = chrome.runtime.lastError;
console.log(new Date().toISOString(), "popup.js", 63);
      if (error) {
console.log(new Date().toISOString(), "popup.js", 64);
          console.error(error);
console.log(new Date().toISOString(), "popup.js", 65);
      } else {
console.log(new Date().toISOString(), "popup.js", 66);
          console.log('Data cleared from chrome.storage.local');
console.log(new Date().toISOString(), "popup.js", 67);
      }
console.log(new Date().toISOString(), "popup.js", 68);
    });
console.log(new Date().toISOString(), "popup.js", 69);
  });
console.log(new Date().toISOString(), "popup.js", 70);

console.log(new Date().toISOString(), "popup.js", 71);

console.log(new Date().toISOString(), "popup.js", 72);
  // Add selector button
console.log(new Date().toISOString(), "popup.js", 73);
  document.getElementById("addElementButton").addEventListener("click", function() {
console.log(new Date().toISOString(), "popup.js", 74);
    const nameInput = document.getElementById("elementName");
console.log(new Date().toISOString(), "popup.js", 75);
    const selectorInput = document.getElementById("elementSelector");
console.log(new Date().toISOString(), "popup.js", 76);
    const name = nameInput.value.trim();
console.log(new Date().toISOString(), "popup.js", 77);
    const selector = selectorInput.value.trim();
console.log(new Date().toISOString(), "popup.js", 78);

console.log(new Date().toISOString(), "popup.js", 79);
    if (name && selector) {
console.log(new Date().toISOString(), "popup.js", 80);
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
console.log(new Date().toISOString(), "popup.js", 81);
            const currentcurrent_tab_id = tabs[0].id.toString(); // Convert tab ID to string for use as a key
console.log(new Date().toISOString(), "popup.js", 82);
            const newElement = {name, selector};
console.log(new Date().toISOString(), "popup.js", 83);

console.log(new Date().toISOString(), "popup.js", 84);
            // Retrieve the current list of selectors for the tab, add the new one, and save it back
console.log(new Date().toISOString(), "popup.js", 85);
            chrome.storage.local.get([currentcurrent_tab_id], function(result) {
console.log(new Date().toISOString(), "popup.js", 86);
                const currentSelectors = result[currentcurrent_tab_id] ? result[currentcurrent_tab_id] : [];
console.log(new Date().toISOString(), "popup.js", 87);
                currentSelectors.push(newElement);
console.log(new Date().toISOString(), "popup.js", 88);
                let storageObject = {};
console.log(new Date().toISOString(), "popup.js", 89);
                storageObject[currentcurrent_tab_id] = currentSelectors;
console.log(new Date().toISOString(), "popup.js", 90);

console.log(new Date().toISOString(), "popup.js", 91);
                chrome.storage.local.set(storageObject, function() {
console.log(new Date().toISOString(), "popup.js", 92);
                    console.log('Selector saved for tab ID:', currentcurrent_tab_id);
console.log(new Date().toISOString(), "popup.js", 93);
                    // Clear inputs and refresh the list of selectors
console.log(new Date().toISOString(), "popup.js", 94);
                    nameInput.value = '';
console.log(new Date().toISOString(), "popup.js", 95);
                    selectorInput.value = '';
console.log(new Date().toISOString(), "popup.js", 96);
                    loadSelectorsForCurrentTab();
console.log(new Date().toISOString(), "popup.js", 97);
                });
console.log(new Date().toISOString(), "popup.js", 98);
            });
console.log(new Date().toISOString(), "popup.js", 99);
        });
console.log(new Date().toISOString(), "popup.js", 100);
    } else {
console.log(new Date().toISOString(), "popup.js", 101);
        alert("Please fill in both name and selector fields.");
console.log(new Date().toISOString(), "popup.js", 102);
    }
console.log(new Date().toISOString(), "popup.js", 103);
  });
console.log(new Date().toISOString(), "popup.js", 104);

console.log(new Date().toISOString(), "popup.js", 105);

console.log(new Date().toISOString(), "popup.js", 106);
  // execute macro button
console.log(new Date().toISOString(), "popup.js", 107);
  document.getElementById("apply_macro_button").addEventListener("click", function() {
console.log(new Date().toISOString(), "popup.js", 108);
    const textareaData = document.getElementById("json_elements").value;
console.log(new Date().toISOString(), "popup.js", 109);
    // Query the current active tab in the current window
console.log(new Date().toISOString(), "popup.js", 110);
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
console.log(new Date().toISOString(), "popup.js", 111);
        const currentTab = tabs[0];
console.log(new Date().toISOString(), "popup.js", 112);
        if (currentTab) {
console.log(new Date().toISOString(), "popup.js", 113);
            // Send a message to your background script with the current tab's ID
console.log(new Date().toISOString(), "popup.js", 114);
            chrome.runtime.sendMessage({
console.log(new Date().toISOString(), "popup.js", 115);
                action: "apply_macro_button_message",
console.log(new Date().toISOString(), "popup.js", 116);
                data: textareaData,
console.log(new Date().toISOString(), "popup.js", 117);
                current_tab_id: currentTab.id // Include the current tab's ID in the message
console.log(new Date().toISOString(), "popup.js", 118);
            }, function(response) {
console.log(new Date().toISOString(), "popup.js", 119);
                console.log("Response from background:", response);
console.log(new Date().toISOString(), "popup.js", 120);
            });
console.log(new Date().toISOString(), "popup.js", 121);
        }
console.log(new Date().toISOString(), "popup.js", 122);
    });
console.log(new Date().toISOString(), "popup.js", 123);
  });
console.log(new Date().toISOString(), "popup.js", 124);

console.log(new Date().toISOString(), "popup.js", 125);

console.log(new Date().toISOString(), "popup.js", 126);

console.log(new Date().toISOString(), "popup.js", 127);
}
console.log(new Date().toISOString(), "popup.js", 128);

console.log(new Date().toISOString(), "popup.js", 129);

console.log(new Date().toISOString(), "popup.js", 130);

console.log(new Date().toISOString(), "popup.js", 131);
function loadSelectorsForCurrentTab() {
console.log(new Date().toISOString(), "popup.js", 132);
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
console.log(new Date().toISOString(), "popup.js", 133);
      const currentcurrent_tab_id = tabs[0].id.toString();
console.log(new Date().toISOString(), "popup.js", 134);
      chrome.storage.local.get([currentcurrent_tab_id], function(result) {
console.log(new Date().toISOString(), "popup.js", 135);
          const selectors = result[currentcurrent_tab_id] ? result[currentcurrent_tab_id] : [];
console.log(new Date().toISOString(), "popup.js", 136);
          const elementsList = document.getElementById("elementsList");
console.log(new Date().toISOString(), "popup.js", 137);
          elementsList.innerHTML = ''; // Clear existing list
console.log(new Date().toISOString(), "popup.js", 138);

console.log(new Date().toISOString(), "popup.js", 139);
          selectors.forEach((element, index) => {
console.log(new Date().toISOString(), "popup.js", 140);
              const elementItem = document.createElement("div");
console.log(new Date().toISOString(), "popup.js", 141);
              elementItem.className = "element-item";
console.log(new Date().toISOString(), "popup.js", 142);
              elementItem.innerHTML = `<td>${element.name}: ${element.selector}</td><td></td><td></td><td><button class="removeElementButton" data-index="${index}">X</button></td>`;
console.log(new Date().toISOString(), "popup.js", 143);
              elementsList.appendChild(elementItem);
console.log(new Date().toISOString(), "popup.js", 144);

console.log(new Date().toISOString(), "popup.js", 145);
              // Add remove functionality
console.log(new Date().toISOString(), "popup.js", 146);
              elementItem.querySelector(".removeElementButton").addEventListener("click", function() {
console.log(new Date().toISOString(), "popup.js", 147);
                  removeSelectorFromCurrentTab(index);
console.log(new Date().toISOString(), "popup.js", 148);
              });
console.log(new Date().toISOString(), "popup.js", 149);
          });
console.log(new Date().toISOString(), "popup.js", 150);
      });
console.log(new Date().toISOString(), "popup.js", 151);
  });
console.log(new Date().toISOString(), "popup.js", 152);
}
console.log(new Date().toISOString(), "popup.js", 153);

console.log(new Date().toISOString(), "popup.js", 154);

console.log(new Date().toISOString(), "popup.js", 155);

console.log(new Date().toISOString(), "popup.js", 156);
function removeSelectorFromCurrentTab(index) {
console.log(new Date().toISOString(), "popup.js", 157);
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
console.log(new Date().toISOString(), "popup.js", 158);
      const currentcurrent_tab_id = tabs[0].id.toString();
console.log(new Date().toISOString(), "popup.js", 159);
      chrome.storage.local.get([currentcurrent_tab_id], function(result) {
console.log(new Date().toISOString(), "popup.js", 160);
          let selectors = result[currentcurrent_tab_id];
console.log(new Date().toISOString(), "popup.js", 161);
          if (selectors) {
console.log(new Date().toISOString(), "popup.js", 162);
              selectors.splice(index, 1); // Remove the selector at the specified index
console.log(new Date().toISOString(), "popup.js", 163);
              let storageObject = {};
console.log(new Date().toISOString(), "popup.js", 164);
              storageObject[currentcurrent_tab_id] = selectors;
console.log(new Date().toISOString(), "popup.js", 165);

console.log(new Date().toISOString(), "popup.js", 166);
              chrome.storage.local.set(storageObject, function() {
console.log(new Date().toISOString(), "popup.js", 167);
                  console.log('Selector removed for tab ID:', currentcurrent_tab_id);
console.log(new Date().toISOString(), "popup.js", 168);
                  loadSelectorsForCurrentTab(); // Refresh the list of selectors
console.log(new Date().toISOString(), "popup.js", 169);
              });
console.log(new Date().toISOString(), "popup.js", 170);
          }
console.log(new Date().toISOString(), "popup.js", 171);
      });
console.log(new Date().toISOString(), "popup.js", 172);
  });
console.log(new Date().toISOString(), "popup.js", 173);
}
console.log(new Date().toISOString(), "popup.js", 174);

console.log(new Date().toISOString(), "popup.js", 175);

console.log(new Date().toISOString(), "popup.js", 176);

console.log(new Date().toISOString(), "popup.js", 177);
// open tab from popup.html
console.log(new Date().toISOString(), "popup.js", 178);
function open_tab(evt, tabName) {
console.log(new Date().toISOString(), "popup.js", 179);
  var i,tabcontent, tablinks;
console.log(new Date().toISOString(), "popup.js", 180);
  tabcontent = document.getElementsByClassName("tabcontent");
console.log(new Date().toISOString(), "popup.js", 181);
  for (i = 0; i < tabcontent.length; i++) {
console.log(new Date().toISOString(), "popup.js", 182);
    tabcontent[i].style.display = "none";
console.log(new Date().toISOString(), "popup.js", 183);
  }
console.log(new Date().toISOString(), "popup.js", 184);
  tablinks = document.getElementsByClassName("tablinks");
console.log(new Date().toISOString(), "popup.js", 185);
  for (i = 0; i < tablinks.length; i++) {
console.log(new Date().toISOString(), "popup.js", 186);
    tablinks[i].className = tablinks[i].className.replace(" active", "");
console.log(new Date().toISOString(), "popup.js", 187);
  }
console.log(new Date().toISOString(), "popup.js", 188);
  var targetTab = document.getElementById(tabName);
console.log(new Date().toISOString(), "popup.js", 189);
  if (targetTab) {
console.log(new Date().toISOString(), "popup.js", 190);
    targetTab.style.display = "block";
console.log(new Date().toISOString(), "popup.js", 191);
    evt.currentTarget.className += " active";
console.log(new Date().toISOString(), "popup.js", 192);
  } else {
console.log(new Date().toISOString(), "popup.js", 193);
    console.error("Tab not found: ", tabName);
console.log(new Date().toISOString(), "popup.js", 194);
  }
console.log(new Date().toISOString(), "popup.js", 195);
}
console.log(new Date().toISOString(), "popup.js", 196);

console.log(new Date().toISOString(), "popup.js", 197);

console.log(new Date().toISOString(), "popup.js", 198);

console.log(new Date().toISOString(), "popup.js", 199);
// Selector Parameters
console.log(new Date().toISOString(), "popup.js", 200);
document.addEventListener("DOMContentLoaded", function() {
console.log(new Date().toISOString(), "popup.js", 201);
  console.log("DOMContentLoaded");
console.log(new Date().toISOString(), "popup.js", 202);

console.log(new Date().toISOString(), "popup.js", 203);

console.log(new Date().toISOString(), "popup.js", 204);
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
console.log(new Date().toISOString(), "popup.js", 205);
    const url = new URL(tabs[0].url);
console.log(new Date().toISOString(), "popup.js", 206);
    const domain = url.hostname;
console.log(new Date().toISOString(), "popup.js", 207);
    document.getElementById("domainName").textContent = domain;
console.log(new Date().toISOString(), "popup.js", 208);
  });
console.log(new Date().toISOString(), "popup.js", 209);

console.log(new Date().toISOString(), "popup.js", 210);
  attach_event_listeners();
console.log(new Date().toISOString(), "popup.js", 211);
  loadSelectorsForCurrentTab(); // Load selectors for the current tab
console.log(new Date().toISOString(), "popup.js", 212);

console.log(new Date().toISOString(), "popup.js", 213);
  var tablinks = document.getElementsByClassName("tablinks");
console.log(new Date().toISOString(), "popup.js", 214);
  for (let i = 0; i < tablinks.length; i++) {
console.log(new Date().toISOString(), "popup.js", 215);
      tablinks[i].addEventListener('click', function(event) {
console.log(new Date().toISOString(), "popup.js", 216);
          var tabName = this.getAttribute('data-tab');
console.log(new Date().toISOString(), "popup.js", 217);
          open_tab(event,tabName);
console.log(new Date().toISOString(), "popup.js", 218);
      });
console.log(new Date().toISOString(), "popup.js", 219);

console.log(new Date().toISOString(), "popup.js", 220);
      // Automatically open the first tab or a specific tab
console.log(new Date().toISOString(), "popup.js", 221);
      if(tablinks.length > 0) {
console.log(new Date().toISOString(), "popup.js", 222);
        tablinks[0].click();
console.log(new Date().toISOString(), "popup.js", 223);
      }
console.log(new Date().toISOString(), "popup.js", 224);
  }
console.log(new Date().toISOString(), "popup.js", 225);

console.log(new Date().toISOString(), "popup.js", 226);

console.log(new Date().toISOString(), "popup.js", 227);
    function getFaviconUrl(url) {
console.log(new Date().toISOString(), "popup.js", 228);
      // Assuming favicon is at the root directory as a fallback
console.log(new Date().toISOString(), "popup.js", 229);
      let faviconUrl = `${url.protocol}//${url.hostname}/favicon.ico`;
console.log(new Date().toISOString(), "popup.js", 230);
    
console.log(new Date().toISOString(), "popup.js", 231);
      // Attempt to fetch the favicon specified in the page's link element
console.log(new Date().toISOString(), "popup.js", 232);
      function findFaviconInDocument() {
console.log(new Date().toISOString(), "popup.js", 233);
        const link = document.querySelector("link[rel~='icon']");
console.log(new Date().toISOString(), "popup.js", 234);
        if (link) {
console.log(new Date().toISOString(), "popup.js", 235);
          return link.href;
console.log(new Date().toISOString(), "popup.js", 236);
        }
console.log(new Date().toISOString(), "popup.js", 237);
        return '';
console.log(new Date().toISOString(), "popup.js", 238);
      }
console.log(new Date().toISOString(), "popup.js", 239);

console.log(new Date().toISOString(), "popup.js", 240);
      chrome.scripting.executeScript({
console.log(new Date().toISOString(), "popup.js", 241);
        target: {current_tab_id: url.id},
console.log(new Date().toISOString(), "popup.js", 242);
        function: findFaviconInDocument,
console.log(new Date().toISOString(), "popup.js", 243);
      }, (injectionResults) => {
console.log(new Date().toISOString(), "popup.js", 244);
        for (const frameResult of injectionResults)
console.log(new Date().toISOString(), "popup.js", 245);
          if (frameResult.result && frameResult.result !== '') {
console.log(new Date().toISOString(), "popup.js", 246);
            faviconUrl = frameResult.result;
console.log(new Date().toISOString(), "popup.js", 247);
            break;
console.log(new Date().toISOString(), "popup.js", 248);
          }
console.log(new Date().toISOString(), "popup.js", 249);
        document.getElementById('target_favicon').src = faviconUrl;
console.log(new Date().toISOString(), "popup.js", 250);
      });
console.log(new Date().toISOString(), "popup.js", 251);
    
console.log(new Date().toISOString(), "popup.js", 252);
      return faviconUrl; // This will return the default favicon path or the updated one if found
console.log(new Date().toISOString(), "popup.js", 253);
    }
console.log(new Date().toISOString(), "popup.js", 254);

console.log(new Date().toISOString(), "popup.js", 255);
    
console.log(new Date().toISOString(), "popup.js", 256);
    // Fetch and display the favicon and domain
console.log(new Date().toISOString(), "popup.js", 257);
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
console.log(new Date().toISOString(), "popup.js", 258);
      const url = new URL(tabs[0].url);
console.log(new Date().toISOString(), "popup.js", 259);
      document.getElementById("domainName").textContent = url.hostname;
console.log(new Date().toISOString(), "popup.js", 260);
      document.getElementById('target_favicon').src = `${url.protocol}//${url.host}/favicon.ico`;
console.log(new Date().toISOString(), "popup.js", 261);
    });
console.log(new Date().toISOString(), "popup.js", 262);

console.log(new Date().toISOString(), "popup.js", 263);
});
console.log(new Date().toISOString(), "popup.js", 264);

console.log(new Date().toISOString(), "popup.js", 265);

console.log(new Date().toISOString(), "popup.js", 266);
document.addEventListener('DOMContentLoaded', function() {
console.log(new Date().toISOString(), "popup.js", 267);
    const textarea = document.getElementById('json_elements');
console.log(new Date().toISOString(), "popup.js", 268);
    const applyButton = document.getElementById('apply_macro_button');
console.log(new Date().toISOString(), "popup.js", 269);
    const messageDiv = document.getElementById('validation_message');
console.log(new Date().toISOString(), "popup.js", 270);

console.log(new Date().toISOString(), "popup.js", 271);
    function validateAndEnableButton(jsonText) {
console.log(new Date().toISOString(), "popup.js", 272);
        try {
console.log(new Date().toISOString(), "popup.js", 273);
            const jsonData = JSON.parse(jsonText);
console.log(new Date().toISOString(), "popup.js", 274);
            if (Array.isArray(jsonData)) {
console.log(new Date().toISOString(), "popup.js", 275);
                // JSON is valid and is an array
console.log(new Date().toISOString(), "popup.js", 276);
                applyButton.disabled = false; // Enable the button
console.log(new Date().toISOString(), "popup.js", 277);
                messageDiv.innerHTML = '<span style="color: green;">✔ JSON data is correct</span>';
console.log(new Date().toISOString(), "popup.js", 278);
            } else {
console.log(new Date().toISOString(), "popup.js", 279);
                // JSON is valid but not an array
console.log(new Date().toISOString(), "popup.js", 280);
                applyButton.disabled = true; // Keep the button disabled
console.log(new Date().toISOString(), "popup.js", 281);
                messageDiv.innerHTML = '<span style="color: red;">✘ JSON array is not valid</span>';
console.log(new Date().toISOString(), "popup.js", 282);
            }
console.log(new Date().toISOString(), "popup.js", 283);
        } catch (error) {
console.log(new Date().toISOString(), "popup.js", 284);
            // JSON is invalid
console.log(new Date().toISOString(), "popup.js", 285);
            applyButton.disabled = true; // Keep the button disabled
console.log(new Date().toISOString(), "popup.js", 286);
            messageDiv.innerHTML = '<span style="color: red;">✘ JSON array is not valid</span>';
console.log(new Date().toISOString(), "popup.js", 287);
        }
console.log(new Date().toISOString(), "popup.js", 288);
    }
console.log(new Date().toISOString(), "popup.js", 289);

console.log(new Date().toISOString(), "popup.js", 290);
    textarea.addEventListener('input', function() {
console.log(new Date().toISOString(), "popup.js", 291);
        const text = textarea.value.trim();
console.log(new Date().toISOString(), "popup.js", 292);
        textarea.value = text;
console.log(new Date().toISOString(), "popup.js", 293);
        console.log(text);
console.log(new Date().toISOString(), "popup.js", 294);
        if (text) {
console.log(new Date().toISOString(), "popup.js", 295);
            validateAndEnableButton(text);
console.log(new Date().toISOString(), "popup.js", 296);
        } else {
console.log(new Date().toISOString(), "popup.js", 297);
            applyButton.disabled = true; // Keep the button disabled if textarea is empty
console.log(new Date().toISOString(), "popup.js", 298);
            messageDiv.innerHTML = ''; // Clear the message
console.log(new Date().toISOString(), "popup.js", 299);
        }
console.log(new Date().toISOString(), "popup.js", 300);
    });
console.log(new Date().toISOString(), "popup.js", 301);
});
console.log(new Date().toISOString(), "popup.js", 302);

console.log(new Date().toISOString(), "popup.js", 303);

console.log(new Date().toISOString(), "popup.js", 304);
