console.log(new Date().toISOString(), "injection.js", 1);

console.log(new Date().toISOString(), "injection.js", 2);
// Inject a script to set a flag indicating the script has been injected
console.log(new Date().toISOString(), "injection.js", 3);
function injectFlagScript() {
console.log(new Date().toISOString(), "injection.js", 4);
    const scriptContent = `
console.log(new Date().toISOString(), "injection.js", 5);
        if (!window.myContentScriptInjected) {
console.log(new Date().toISOString(), "injection.js", 6);
            window.myContentScriptInjected = true;
console.log(new Date().toISOString(), "injection.js", 7);
            // Your script's main logic here
console.log(new Date().toISOString(), "injection.js", 8);
        }
console.log(new Date().toISOString(), "injection.js", 9);
    `;
console.log(new Date().toISOString(), "injection.js", 10);
    const scriptElement = document.createElement('script');
console.log(new Date().toISOString(), "injection.js", 11);
    scriptElement.textContent = scriptContent;
console.log(new Date().toISOString(), "injection.js", 12);
    (document.head || document.documentElement).appendChild(scriptElement);
console.log(new Date().toISOString(), "injection.js", 13);
    scriptElement.remove(); // Optional: Remove the script element once executed
console.log(new Date().toISOString(), "injection.js", 14);
}
console.log(new Date().toISOString(), "injection.js", 15);

console.log(new Date().toISOString(), "injection.js", 16);

console.log(new Date().toISOString(), "injection.js", 17);

console.log(new Date().toISOString(), "injection.js", 18);

console.log(new Date().toISOString(), "injection.js", 19);
function logStoredLinks() {
console.log(new Date().toISOString(), "injection.js", 20);
    chrome.storage.local.get(['links'], function(result) {
console.log(new Date().toISOString(), "injection.js", 21);
        if (result.links) {
console.log(new Date().toISOString(), "injection.js", 22);
            console.log('Stored links:', result.links);
console.log(new Date().toISOString(), "injection.js", 23);
        } else {
console.log(new Date().toISOString(), "injection.js", 24);
            console.log('No links stored.');
console.log(new Date().toISOString(), "injection.js", 25);
        }
console.log(new Date().toISOString(), "injection.js", 26);
    });
console.log(new Date().toISOString(), "injection.js", 27);
}
console.log(new Date().toISOString(), "injection.js", 28);

console.log(new Date().toISOString(), "injection.js", 29);

console.log(new Date().toISOString(), "injection.js", 30);

console.log(new Date().toISOString(), "injection.js", 31);

console.log(new Date().toISOString(), "injection.js", 32);
function extractProductDetails() {
console.log(new Date().toISOString(), "injection.js", 33);
    const productDetails = {};
console.log(new Date().toISOString(), "injection.js", 34);

console.log(new Date().toISOString(), "injection.js", 35);
    // Product Title
console.log(new Date().toISOString(), "injection.js", 36);
    const titleElement = document.querySelector('h1.ui-pdp-title');
console.log(new Date().toISOString(), "injection.js", 37);
    productDetails.title = titleElement ? titleElement.innerText : '';
console.log(new Date().toISOString(), "injection.js", 38);

console.log(new Date().toISOString(), "injection.js", 39);
    // Image URLs
console.log(new Date().toISOString(), "injection.js", 40);
    productDetails.images = [];
console.log(new Date().toISOString(), "injection.js", 41);
    const imageElements = document.querySelectorAll('.ui-pdp-gallery img.ui-pdp-image');
console.log(new Date().toISOString(), "injection.js", 42);
    imageElements.forEach(img => {
console.log(new Date().toISOString(), "injection.js", 43);
        const src = img.getAttribute('data-zoom') || img.src; // Prefer high-res images
console.log(new Date().toISOString(), "injection.js", 44);
        if (src) {
console.log(new Date().toISOString(), "injection.js", 45);
            productDetails.images.push(src);
console.log(new Date().toISOString(), "injection.js", 46);
        }
console.log(new Date().toISOString(), "injection.js", 47);
    });
console.log(new Date().toISOString(), "injection.js", 48);

console.log(new Date().toISOString(), "injection.js", 49);
    // Price and Currency
console.log(new Date().toISOString(), "injection.js", 50);
    const priceElement = document.querySelector('span.andes-money-amount.ui-pdp-price__part');
console.log(new Date().toISOString(), "injection.js", 51);
    if (priceElement) {
console.log(new Date().toISOString(), "injection.js", 52);
        const price = priceElement.querySelector('span.andes-money-amount__fraction')?.innerText.replace('.', '') || '';
console.log(new Date().toISOString(), "injection.js", 53);
        const currencySymbol = priceElement.querySelector('span.andes-money-amount__currency-symbol')?.innerText || '';
console.log(new Date().toISOString(), "injection.js", 54);
        productDetails.price = `${currencySymbol}${price}`;
console.log(new Date().toISOString(), "injection.js", 55);
    }
console.log(new Date().toISOString(), "injection.js", 56);

console.log(new Date().toISOString(), "injection.js", 57);
    // Payment Methods
console.log(new Date().toISOString(), "injection.js", 58);
    productDetails.paymentMethods = [];
console.log(new Date().toISOString(), "injection.js", 59);
    const paymentMethodElements = document.querySelectorAll('.ui-vip-payment_methods img.ui-pdp-image');
console.log(new Date().toISOString(), "injection.js", 60);
    paymentMethodElements.forEach(method => {
console.log(new Date().toISOString(), "injection.js", 61);
        const altText = method.alt;
console.log(new Date().toISOString(), "injection.js", 62);
        if (altText) {
console.log(new Date().toISOString(), "injection.js", 63);
            productDetails.paymentMethods.push(altText);
console.log(new Date().toISOString(), "injection.js", 64);
        }
console.log(new Date().toISOString(), "injection.js", 65);
    });
console.log(new Date().toISOString(), "injection.js", 66);

console.log(new Date().toISOString(), "injection.js", 67);
    // Stock
console.log(new Date().toISOString(), "injection.js", 68);
    const stockElement = document.querySelector('span.ui-pdp-buybox__quantity__available');
console.log(new Date().toISOString(), "injection.js", 69);
    productDetails.stock = stockElement ? stockElement.innerText.match(/\d+/)[0] : 'Unknown';
console.log(new Date().toISOString(), "injection.js", 70);

console.log(new Date().toISOString(), "injection.js", 71);
    // Stock Availability Flag
console.log(new Date().toISOString(), "injection.js", 72);
    const stockAvailableElement = document.querySelector('div.ui-pdp-stock-information p.ui-pdp-color--BLACK');
console.log(new Date().toISOString(), "injection.js", 73);
    productDetails.stockAvailable = !!stockAvailableElement;
console.log(new Date().toISOString(), "injection.js", 74);

console.log(new Date().toISOString(), "injection.js", 75);
    // Shipping
console.log(new Date().toISOString(), "injection.js", 76);
    const shippingElement = document.querySelector('div.ui-pdp-media__body p.ui-pdp-color--BLACK');
console.log(new Date().toISOString(), "injection.js", 77);
    productDetails.shipping = shippingElement ? shippingElement.innerText : 'Unknown';
console.log(new Date().toISOString(), "injection.js", 78);

console.log(new Date().toISOString(), "injection.js", 79);
    // Seller Name and Link (Assuming the link is the parent element of the seller name span)
console.log(new Date().toISOString(), "injection.js", 80);
    const sellerNameElement = document.querySelector('div.ui-pdp-seller__link-trigger a.ui-pdp-action-modal__link span');
console.log(new Date().toISOString(), "injection.js", 81);
    if (sellerNameElement) {
console.log(new Date().toISOString(), "injection.js", 82);
        productDetails.seller = {
console.log(new Date().toISOString(), "injection.js", 83);
            name: sellerNameElement.innerText,
console.log(new Date().toISOString(), "injection.js", 84);
            link: sellerNameElement.closest('a')?.href || 'Unknown'
console.log(new Date().toISOString(), "injection.js", 85);
        };
console.log(new Date().toISOString(), "injection.js", 86);
    }
console.log(new Date().toISOString(), "injection.js", 87);

console.log(new Date().toISOString(), "injection.js", 88);
    // Product Returns
console.log(new Date().toISOString(), "injection.js", 89);
    const returnElement = document.querySelector('div.ui-pdp-action-modal a.ui-pdp-action-modal__link');
console.log(new Date().toISOString(), "injection.js", 90);
    productDetails.returns = returnElement ? returnElement.href : 'Unknown';
console.log(new Date().toISOString(), "injection.js", 91);

console.log(new Date().toISOString(), "injection.js", 92);
    // Seller Information
console.log(new Date().toISOString(), "injection.js", 93);
    productDetails.sellerInformation = {};
console.log(new Date().toISOString(), "injection.js", 94);
    const salesElement = document.querySelector('li.ui-pdp-seller__item-description strong.ui-pdp-seller__sales-description');
console.log(new Date().toISOString(), "injection.js", 95);
    productDetails.sellerInformation.sales = salesElement ? salesElement.innerText : 'Unknown';
console.log(new Date().toISOString(), "injection.js", 96);
    const goodServiceElement = document.querySelector('li.ui-pdp-seller__item-description p[title="Brinda buena atención"]');
console.log(new Date().toISOString(), "injection.js", 97);
    productDetails.sellerInformation.goodService = !!goodServiceElement;
console.log(new Date().toISOString(), "injection.js", 98);
    const onTimeDeliveryElement = document.querySelector('li.ui-pdp-seller__item-description p[title="Entrega sus productos a tiempo"]');
console.log(new Date().toISOString(), "injection.js", 99);
    productDetails.sellerInformation.onTimeDelivery = !!onTimeDeliveryElement;
console.log(new Date().toISOString(), "injection.js", 100);

console.log(new Date().toISOString(), "injection.js", 101);
    // Product Characteristics
console.log(new Date().toISOString(), "injection.js", 102);
    productDetails.characteristics = [];
console.log(new Date().toISOString(), "injection.js", 103);
    const characteristicsElements = document.querySelectorAll('.andes-table__column--value');
console.log(new Date().toISOString(), "injection.js", 104);
    characteristicsElements.forEach(element => {
console.log(new Date().toISOString(), "injection.js", 105);
        productDetails.characteristics.push(element.innerText.trim());
console.log(new Date().toISOString(), "injection.js", 106);
    });
console.log(new Date().toISOString(), "injection.js", 107);

console.log(new Date().toISOString(), "injection.js", 108);
    // Product Description
console.log(new Date().toISOString(), "injection.js", 109);
    const descriptionElement = document.querySelector('div.ui-pdp-description__content');
console.log(new Date().toISOString(), "injection.js", 110);
    productDetails.description = descriptionElement ? descriptionElement.innerHTML.trim() : '';
console.log(new Date().toISOString(), "injection.js", 111);

console.log(new Date().toISOString(), "injection.js", 112);
    // Product New/Used Flag, and Amount of Sales
console.log(new Date().toISOString(), "injection.js", 113);
    const subtitleElement = document.querySelector('span.ui-pdp-subtitle');
console.log(new Date().toISOString(), "injection.js", 114);
    if (subtitleElement) {
console.log(new Date().toISOString(), "injection.js", 115);
        const subtitleText = subtitleElement.innerText.split('|');
console.log(new Date().toISOString(), "injection.js", 116);
        productDetails.condition = subtitleText[0]?.trim();
console.log(new Date().toISOString(), "injection.js", 117);
        productDetails.soldQuantity = subtitleText[1]?.trim();
console.log(new Date().toISOString(), "injection.js", 118);
    }
console.log(new Date().toISOString(), "injection.js", 119);

console.log(new Date().toISOString(), "injection.js", 120);
    // Amount of Reviews
console.log(new Date().toISOString(), "injection.js", 121);
    const reviewAmountElement = document.querySelector('span.ui-pdp-review__amount');
console.log(new Date().toISOString(), "injection.js", 122);
    productDetails.reviewAmount = reviewAmountElement ? reviewAmountElement.innerText.replace(/[()]/g, '') : 'Unknown';
console.log(new Date().toISOString(), "injection.js", 123);

console.log(new Date().toISOString(), "injection.js", 124);
    // Stars
console.log(new Date().toISOString(), "injection.js", 125);
    const starsElement = document.querySelector('p.ui-review-capability__rating__average');
console.log(new Date().toISOString(), "injection.js", 126);
    productDetails.stars = starsElement ? parseFloat(starsElement.innerText) : 'Unknown';
console.log(new Date().toISOString(), "injection.js", 127);

console.log(new Date().toISOString(), "injection.js", 128);
    return productDetails;
console.log(new Date().toISOString(), "injection.js", 129);
}
console.log(new Date().toISOString(), "injection.js", 130);

console.log(new Date().toISOString(), "injection.js", 131);

console.log(new Date().toISOString(), "injection.js", 132);

console.log(new Date().toISOString(), "injection.js", 133);

console.log(new Date().toISOString(), "injection.js", 134);
// Function to process each URL
console.log(new Date().toISOString(), "injection.js", 135);
function processUrl(url) {
console.log(new Date().toISOString(), "injection.js", 136);
    let result = {};
console.log(new Date().toISOString(), "injection.js", 137);
    if (url.includes('articulo.mercadolibre.com.co') && url.match(/MCO-\d+/)) {
console.log(new Date().toISOString(), "injection.js", 138);
      console.log("Processing as product page:", url);
console.log(new Date().toISOString(), "injection.js", 139);
      result.type = "product_page";
console.log(new Date().toISOString(), "injection.js", 140);
      result.productId = url.split("/")[4].split("-")[1];
console.log(new Date().toISOString(), "injection.js", 141);
      result.productName = url.split("/")[4].split("-").slice(2).join(" ").split("_")[0];
console.log(new Date().toISOString(), "injection.js", 142);
    } else if (url.includes("categories")) {
console.log(new Date().toISOString(), "injection.js", 143);
      console.log("Processing as category page:", url);
console.log(new Date().toISOString(), "injection.js", 144);
      result.type = "category_page";
console.log(new Date().toISOString(), "injection.js", 145);
      result.categoryName = "root_category";
console.log(new Date().toISOString(), "injection.js", 146);
    } else {
console.log(new Date().toISOString(), "injection.js", 147);
      console.log("Processing as other type of page:", url);
console.log(new Date().toISOString(), "injection.js", 148);
      result.type = "other";
console.log(new Date().toISOString(), "injection.js", 149);
    }
console.log(new Date().toISOString(), "injection.js", 150);
    return result;
console.log(new Date().toISOString(), "injection.js", 151);
  }
console.log(new Date().toISOString(), "injection.js", 152);

console.log(new Date().toISOString(), "injection.js", 153);

console.log(new Date().toISOString(), "injection.js", 154);

console.log(new Date().toISOString(), "injection.js", 155);
// open_tab
console.log(new Date().toISOString(), "injection.js", 156);
async function open_tab(url) {
console.log(new Date().toISOString(), "injection.js", 157);
    return new Promise((resolve, reject) => {
console.log(new Date().toISOString(), "injection.js", 158);
        chrome.runtime.sendMessage({action: "open_new_tab", url: url}, (response) => {
console.log(new Date().toISOString(), "injection.js", 159);
            if (response && response.status === "tab_was_opened") {
console.log(new Date().toISOString(), "injection.js", 160);
                console.log("Tab was opened:", url, "with ID:", response.new_tab_id);
console.log(new Date().toISOString(), "injection.js", 161);
                resolve(response.new_tab_id);
console.log(new Date().toISOString(), "injection.js", 162);
            } else {
console.log(new Date().toISOString(), "injection.js", 163);
                console.error("Failed to open tab or no response received.");
console.log(new Date().toISOString(), "injection.js", 164);
                reject(new Error("Failed to open tab or no response received."));
console.log(new Date().toISOString(), "injection.js", 165);
            }
console.log(new Date().toISOString(), "injection.js", 166);
        });
console.log(new Date().toISOString(), "injection.js", 167);
    });
console.log(new Date().toISOString(), "injection.js", 168);
}
console.log(new Date().toISOString(), "injection.js", 169);

console.log(new Date().toISOString(), "injection.js", 170);

console.log(new Date().toISOString(), "injection.js", 171);

console.log(new Date().toISOString(), "injection.js", 172);

console.log(new Date().toISOString(), "injection.js", 173);
// close_tab
console.log(new Date().toISOString(), "injection.js", 174);
async function close_tab() {
console.log(new Date().toISOString(), "injection.js", 175);
    return new Promise((resolve, reject) => {
console.log(new Date().toISOString(), "injection.js", 176);
        chrome.runtime.sendMessage({action: "close_current_tab"}, function(response) {
console.log(new Date().toISOString(), "injection.js", 177);
            if (response.status === "success") {
console.log(new Date().toISOString(), "injection.js", 178);
                console.log(response.message);
console.log(new Date().toISOString(), "injection.js", 179);
                resolve();
console.log(new Date().toISOString(), "injection.js", 180);
            } else {
console.log(new Date().toISOString(), "injection.js", 181);
                console.error(response.message);
console.log(new Date().toISOString(), "injection.js", 182);
                reject(new Error(response.message));
console.log(new Date().toISOString(), "injection.js", 183);
            }
console.log(new Date().toISOString(), "injection.js", 184);
        });
console.log(new Date().toISOString(), "injection.js", 185);
    });
console.log(new Date().toISOString(), "injection.js", 186);
}
console.log(new Date().toISOString(), "injection.js", 187);

console.log(new Date().toISOString(), "injection.js", 188);

console.log(new Date().toISOString(), "injection.js", 189);

console.log(new Date().toISOString(), "injection.js", 190);

console.log(new Date().toISOString(), "injection.js", 191);
async function extractLinks(url){
console.log(new Date().toISOString(), "injection.js", 192);
    return Array.from(document.querySelectorAll('a')).map(a => a.href);
console.log(new Date().toISOString(), "injection.js", 193);
}
console.log(new Date().toISOString(), "injection.js", 194);

console.log(new Date().toISOString(), "injection.js", 195);

console.log(new Date().toISOString(), "injection.js", 196);

console.log(new Date().toISOString(), "injection.js", 197);

console.log(new Date().toISOString(), "injection.js", 198);
// Function to check if a link is visited
console.log(new Date().toISOString(), "injection.js", 199);
async function isLinkVisited(linkUrl) {
console.log(new Date().toISOString(), "injection.js", 200);
    console.log("Checking if link is visited:", linkUrl);
console.log(new Date().toISOString(), "injection.js", 201);
    return new Promise((resolve) => {
console.log(new Date().toISOString(), "injection.js", 202);
      chrome.storage.local.get(['links'], function(result) {
console.log(new Date().toISOString(), "injection.js", 203);
        const visited = result.links && result.links.some(link => link.url === linkUrl);
console.log(new Date().toISOString(), "injection.js", 204);
        console.log("Visited status for", linkUrl, ":", visited);
console.log(new Date().toISOString(), "injection.js", 205);
        resolve(visited);
console.log(new Date().toISOString(), "injection.js", 206);
      });
console.log(new Date().toISOString(), "injection.js", 207);
    });
console.log(new Date().toISOString(), "injection.js", 208);
}
console.log(new Date().toISOString(), "injection.js", 209);

console.log(new Date().toISOString(), "injection.js", 210);

console.log(new Date().toISOString(), "injection.js", 211);

console.log(new Date().toISOString(), "injection.js", 212);

console.log(new Date().toISOString(), "injection.js", 213);
// Update or add link details in the global storage
console.log(new Date().toISOString(), "injection.js", 214);
async function updateLinkDetails(link, productDetails = null) {
console.log(new Date().toISOString(), "injection.js", 215);
    console.log("Updating link details for:", link);
console.log(new Date().toISOString(), "injection.js", 216);
    return new Promise((resolve) => {
console.log(new Date().toISOString(), "injection.js", 217);
      chrome.storage.local.get(['links'], function(result) {
console.log(new Date().toISOString(), "injection.js", 218);
        let links = result.links || [];
console.log(new Date().toISOString(), "injection.js", 219);
        const existingLinkIndex = links.findIndex(l => l.url === link);
console.log(new Date().toISOString(), "injection.js", 220);
  
console.log(new Date().toISOString(), "injection.js", 221);
        if (existingLinkIndex !== -1) {
console.log(new Date().toISOString(), "injection.js", 222);
          console.log("Link exists. Updating:", link);
console.log(new Date().toISOString(), "injection.js", 223);
          links[existingLinkIndex].updated = new Date().toISOString();
console.log(new Date().toISOString(), "injection.js", 224);
          if (productDetails) {
console.log(new Date().toISOString(), "injection.js", 225);
            links[existingLinkIndex].product_data = productDetails;
console.log(new Date().toISOString(), "injection.js", 226);
          }
console.log(new Date().toISOString(), "injection.js", 227);
        } else {
console.log(new Date().toISOString(), "injection.js", 228);
          console.log("New link. Adding:", link);
console.log(new Date().toISOString(), "injection.js", 229);
          links.push({
console.log(new Date().toISOString(), "injection.js", 230);
            url: link,
console.log(new Date().toISOString(), "injection.js", 231);
            updated: new Date().toISOString(),
console.log(new Date().toISOString(), "injection.js", 232);
            product_data: productDetails,
console.log(new Date().toISOString(), "injection.js", 233);
            mirrors: []
console.log(new Date().toISOString(), "injection.js", 234);
          });
console.log(new Date().toISOString(), "injection.js", 235);
        }
console.log(new Date().toISOString(), "injection.js", 236);
  
console.log(new Date().toISOString(), "injection.js", 237);
        chrome.storage.local.set({links}, () => {
console.log(new Date().toISOString(), "injection.js", 238);
          console.log("Link details updated in storage for:", link);
console.log(new Date().toISOString(), "injection.js", 239);
          resolve();
console.log(new Date().toISOString(), "injection.js", 240);
        });
console.log(new Date().toISOString(), "injection.js", 241);
      });
console.log(new Date().toISOString(), "injection.js", 242);
    });
console.log(new Date().toISOString(), "injection.js", 243);
}
console.log(new Date().toISOString(), "injection.js", 244);

console.log(new Date().toISOString(), "injection.js", 245);

console.log(new Date().toISOString(), "injection.js", 246);

console.log(new Date().toISOString(), "injection.js", 247);

console.log(new Date().toISOString(), "injection.js", 248);

console.log(new Date().toISOString(), "injection.js", 249);
// Revised visitor_link_tree function with processUrl and extractProductDetails integration
console.log(new Date().toISOString(), "injection.js", 250);
async function visitor_link_tree(links, index = 0, parentTabId = null) {
console.log(new Date().toISOString(), "injection.js", 251);
    if (index >= links.length) {
console.log(new Date().toISOString(), "injection.js", 252);
        console.log("Finished processing all links.");
console.log(new Date().toISOString(), "injection.js", 253);
        if (parentTabId) {
console.log(new Date().toISOString(), "injection.js", 254);
            console.log("Closing parent tab id:", parentTabId);
console.log(new Date().toISOString(), "injection.js", 255);
            await close_tab(parentTabId);
console.log(new Date().toISOString(), "injection.js", 256);
        }
console.log(new Date().toISOString(), "injection.js", 257);
        return;
console.log(new Date().toISOString(), "injection.js", 258);
    }
console.log(new Date().toISOString(), "injection.js", 259);

console.log(new Date().toISOString(), "injection.js", 260);
    const link = links[index];
console.log(new Date().toISOString(), "injection.js", 261);
    console.log("Processing link:", link);
console.log(new Date().toISOString(), "injection.js", 262);
    const linkType = processUrl(link); // Determine the type of the link
console.log(new Date().toISOString(), "injection.js", 263);
    console.log("Link type determined as:", linkType.type);
console.log(new Date().toISOString(), "injection.js", 264);

console.log(new Date().toISOString(), "injection.js", 265);
    // Check if the link has already been visited
console.log(new Date().toISOString(), "injection.js", 266);
    const visited = await isLinkVisited(link);
console.log(new Date().toISOString(), "injection.js", 267);
    console.log("Visited status for", link, ":", visited);
console.log(new Date().toISOString(), "injection.js", 268);

console.log(new Date().toISOString(), "injection.js", 269);
    if (!visited) {
console.log(new Date().toISOString(), "injection.js", 270);
        let productDetails = null;
console.log(new Date().toISOString(), "injection.js", 271);
        if (linkType.type === "product_page") {
console.log(new Date().toISOString(), "injection.js", 272);
            console.log("Extracting product details for:", link);
console.log(new Date().toISOString(), "injection.js", 273);
            productDetails = extractProductDetails(); // Adjust if this needs to be done asynchronously
console.log(new Date().toISOString(), "injection.js", 274);
            console.log("Product details extracted:", productDetails);
console.log(new Date().toISOString(), "injection.js", 275);
        }
console.log(new Date().toISOString(), "injection.js", 276);
        await updateLinkDetails(link, productDetails);
console.log(new Date().toISOString(), "injection.js", 277);
        console.log("Link details updated for:", link);
console.log(new Date().toISOString(), "injection.js", 278);

console.log(new Date().toISOString(), "injection.js", 279);
        // Random delay between 1 to 3 seconds
console.log(new Date().toISOString(), "injection.js", 280);
        const delay = Math.floor(Math.random() * (3000 - 1000 + 1)) + 1000;
console.log(new Date().toISOString(), "injection.js", 281);
        console.log(`Waiting for ${delay}ms before opening the next tab for link: ${link}`);
console.log(new Date().toISOString(), "injection.js", 282);

console.log(new Date().toISOString(), "injection.js", 283);
        setTimeout(async () => {
console.log(new Date().toISOString(), "injection.js", 284);
            await open_tab(link); // Open the tab and wait for it to load
console.log(new Date().toISOString(), "injection.js", 285);
            console.log("New tab was opened successfully for:", link);
console.log(new Date().toISOString(), "injection.js", 286);

console.log(new Date().toISOString(), "injection.js", 287);
            // Extract and process new links from the opened tab's content
console.log(new Date().toISOString(), "injection.js", 288);
            const childLinks = await extractLinks(link); // Adjust if this needs to be done differently
console.log(new Date().toISOString(), "injection.js", 289);
            console.log("Extracted child links:", childLinks);
console.log(new Date().toISOString(), "injection.js", 290);

console.log(new Date().toISOString(), "injection.js", 291);
            const newLinks = childLinks.filter(l => !links.includes(l));
console.log(new Date().toISOString(), "injection.js", 292);
            links = [...links, ...newLinks]; // Update the list of links to include newly discovered ones
console.log(new Date().toISOString(), "injection.js", 293);
            console.log("Updated links list with new discoveries:", links);
console.log(new Date().toISOString(), "injection.js", 294);

console.log(new Date().toISOString(), "injection.js", 295);
            // Proceed to the next link
console.log(new Date().toISOString(), "injection.js", 296);
            await visitor_link_tree(links, index + 1, parentTabId);
console.log(new Date().toISOString(), "injection.js", 297);
        }, delay);
console.log(new Date().toISOString(), "injection.js", 298);
    } else {
console.log(new Date().toISOString(), "injection.js", 299);
        console.log("Link already visited, skipping:", link);
console.log(new Date().toISOString(), "injection.js", 300);
        // Skip to the next link without opening a new tab
console.log(new Date().toISOString(), "injection.js", 301);
        await visitor_link_tree(links, index + 1, parentTabId);
console.log(new Date().toISOString(), "injection.js", 302);
    }
console.log(new Date().toISOString(), "injection.js", 303);
}
console.log(new Date().toISOString(), "injection.js", 304);

console.log(new Date().toISOString(), "injection.js", 305);

console.log(new Date().toISOString(), "injection.js", 306);

console.log(new Date().toISOString(), "injection.js", 307);

console.log(new Date().toISOString(), "injection.js", 308);

console.log(new Date().toISOString(), "injection.js", 309);
// Revised visitor_link_tree_bfs function for BFS with tab opening for all links and random delay
console.log(new Date().toISOString(), "injection.js", 310);
async function visitor_link_tree_bfs(rootLinks) {
console.log(new Date().toISOString(), "injection.js", 311);
    let queue = [...rootLinks];
console.log(new Date().toISOString(), "injection.js", 312);
    let visited = new Set();
console.log(new Date().toISOString(), "injection.js", 313);

console.log(new Date().toISOString(), "injection.js", 314);
    while (queue.length > 0) {
console.log(new Date().toISOString(), "injection.js", 315);
        const currentLink = queue.shift();
console.log(new Date().toISOString(), "injection.js", 316);
        if (visited.has(currentLink)) continue;
console.log(new Date().toISOString(), "injection.js", 317);
        visited.add(currentLink);
console.log(new Date().toISOString(), "injection.js", 318);

console.log(new Date().toISOString(), "injection.js", 319);
        // Open the tab for every link, not just product pages
console.log(new Date().toISOString(), "injection.js", 320);
        const tabId = await open_tab(currentLink);
console.log(new Date().toISOString(), "injection.js", 321);
        console.log("Tab opened for:", currentLink, "Tab ID:", tabId);
console.log(new Date().toISOString(), "injection.js", 322);

console.log(new Date().toISOString(), "injection.js", 323);
        // Wait for the tab to fully load before proceeding
console.log(new Date().toISOString(), "injection.js", 324);
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
console.log(new Date().toISOString(), "injection.js", 325);

console.log(new Date().toISOString(), "injection.js", 326);
        // Process the link (extract product details if it's a product page, etc.)
console.log(new Date().toISOString(), "injection.js", 327);
        const linkType = processUrl(currentLink);
console.log(new Date().toISOString(), "injection.js", 328);
        let productDetails = null;
console.log(new Date().toISOString(), "injection.js", 329);
        if (linkType.type === "product_page") {
console.log(new Date().toISOString(), "injection.js", 330);
            productDetails = await extractProductDetails();
console.log(new Date().toISOString(), "injection.js", 331);
        }
console.log(new Date().toISOString(), "injection.js", 332);
        await updateLinkDetails(currentLink, productDetails);
console.log(new Date().toISOString(), "injection.js", 333);

console.log(new Date().toISOString(), "injection.js", 334);
        // Extract and process new links from the current link's content
console.log(new Date().toISOString(), "injection.js", 335);
        const childLinks = await extractLinks(currentLink);
console.log(new Date().toISOString(), "injection.js", 336);
        childLinks.forEach(link => {
console.log(new Date().toISOString(), "injection.js", 337);
            if (!visited.has(link)) {
console.log(new Date().toISOString(), "injection.js", 338);
                queue.push(link);
console.log(new Date().toISOString(), "injection.js", 339);
            }
console.log(new Date().toISOString(), "injection.js", 340);
        });
console.log(new Date().toISOString(), "injection.js", 341);

console.log(new Date().toISOString(), "injection.js", 342);
        // Close the tab after processing
console.log(new Date().toISOString(), "injection.js", 343);
        await close_tab(tabId);
console.log(new Date().toISOString(), "injection.js", 344);

console.log(new Date().toISOString(), "injection.js", 345);
        // Implement a random delay between processing each link
console.log(new Date().toISOString(), "injection.js", 346);
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
console.log(new Date().toISOString(), "injection.js", 347);
    }
console.log(new Date().toISOString(), "injection.js", 348);

console.log(new Date().toISOString(), "injection.js", 349);
    console.log("Finished visiting all links.");
console.log(new Date().toISOString(), "injection.js", 350);
}
console.log(new Date().toISOString(), "injection.js", 351);

console.log(new Date().toISOString(), "injection.js", 352);

console.log(new Date().toISOString(), "injection.js", 353);
// -------------------------------- main ----------------------------------------
console.log(new Date().toISOString(), "injection.js", 354);

console.log(new Date().toISOString(), "injection.js", 355);
injectFlagScript();
console.log(new Date().toISOString(), "injection.js", 356);

console.log(new Date().toISOString(), "injection.js", 357);
// Main script logic
console.log(new Date().toISOString(), "injection.js", 358);
if (window.myContentScriptInjected) {
console.log(new Date().toISOString(), "injection.js", 359);
    const rootLinks = ["https://www.mercadolibre.com.co/categorias#menu=categories"];
console.log(new Date().toISOString(), "injection.js", 360);
    visitor_link_tree_bfs(rootLinks);
console.log(new Date().toISOString(), "injection.js", 361);
} else {
console.log(new Date().toISOString(), "injection.js", 362);
    console.log("Script injection.js was already injected");
console.log(new Date().toISOString(), "injection.js", 363);
}
console.log(new Date().toISOString(), "injection.js", 364);

console.log(new Date().toISOString(), "injection.js", 365);
