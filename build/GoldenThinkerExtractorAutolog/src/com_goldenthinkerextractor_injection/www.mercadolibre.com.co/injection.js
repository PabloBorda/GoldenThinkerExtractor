console.log(new Date().toISOString(), "injection.js", 1);
function logStoredLinks() {
console.log(new Date().toISOString(), "injection.js", 2);
    chrome.storage.local.get(['links'], function(result) {
console.log(new Date().toISOString(), "injection.js", 3);
        if (result.links) {
console.log(new Date().toISOString(), "injection.js", 4);
            console.log('Stored links:', result.links);
console.log(new Date().toISOString(), "injection.js", 5);
        } else {
console.log(new Date().toISOString(), "injection.js", 6);
            console.log('No links stored.');
console.log(new Date().toISOString(), "injection.js", 7);
        }
console.log(new Date().toISOString(), "injection.js", 8);
    });
console.log(new Date().toISOString(), "injection.js", 9);
}
console.log(new Date().toISOString(), "injection.js", 10);

console.log(new Date().toISOString(), "injection.js", 11);

console.log(new Date().toISOString(), "injection.js", 12);

console.log(new Date().toISOString(), "injection.js", 13);

console.log(new Date().toISOString(), "injection.js", 14);
function extractProductDetails() {
console.log(new Date().toISOString(), "injection.js", 15);
    const productDetails = {};
console.log(new Date().toISOString(), "injection.js", 16);

console.log(new Date().toISOString(), "injection.js", 17);
    // Product Title
console.log(new Date().toISOString(), "injection.js", 18);
    const titleElement = document.querySelector('h1.ui-pdp-title');
console.log(new Date().toISOString(), "injection.js", 19);
    productDetails.title = titleElement ? titleElement.innerText : '';
console.log(new Date().toISOString(), "injection.js", 20);

console.log(new Date().toISOString(), "injection.js", 21);
    // Image URLs
console.log(new Date().toISOString(), "injection.js", 22);
    productDetails.images = [];
console.log(new Date().toISOString(), "injection.js", 23);
    const imageElements = document.querySelectorAll('.ui-pdp-gallery img.ui-pdp-image');
console.log(new Date().toISOString(), "injection.js", 24);
    imageElements.forEach(img => {
console.log(new Date().toISOString(), "injection.js", 25);
        const src = img.getAttribute('data-zoom') || img.src; // Prefer high-res images
console.log(new Date().toISOString(), "injection.js", 26);
        if (src) {
console.log(new Date().toISOString(), "injection.js", 27);
            productDetails.images.push(src);
console.log(new Date().toISOString(), "injection.js", 28);
        }
console.log(new Date().toISOString(), "injection.js", 29);
    });
console.log(new Date().toISOString(), "injection.js", 30);

console.log(new Date().toISOString(), "injection.js", 31);
    // Price and Currency
console.log(new Date().toISOString(), "injection.js", 32);
    const priceElement = document.querySelector('span.andes-money-amount.ui-pdp-price__part');
console.log(new Date().toISOString(), "injection.js", 33);
    if (priceElement) {
console.log(new Date().toISOString(), "injection.js", 34);
        const price = priceElement.querySelector('span.andes-money-amount__fraction')?.innerText.replace('.', '') || '';
console.log(new Date().toISOString(), "injection.js", 35);
        const currencySymbol = priceElement.querySelector('span.andes-money-amount__currency-symbol')?.innerText || '';
console.log(new Date().toISOString(), "injection.js", 36);
        productDetails.price = `${currencySymbol}${price}`;
console.log(new Date().toISOString(), "injection.js", 37);
    }
console.log(new Date().toISOString(), "injection.js", 38);

console.log(new Date().toISOString(), "injection.js", 39);
    // Payment Methods
console.log(new Date().toISOString(), "injection.js", 40);
    productDetails.paymentMethods = [];
console.log(new Date().toISOString(), "injection.js", 41);
    const paymentMethodElements = document.querySelectorAll('.ui-vip-payment_methods img.ui-pdp-image');
console.log(new Date().toISOString(), "injection.js", 42);
    paymentMethodElements.forEach(method => {
console.log(new Date().toISOString(), "injection.js", 43);
        const altText = method.alt;
console.log(new Date().toISOString(), "injection.js", 44);
        if (altText) {
console.log(new Date().toISOString(), "injection.js", 45);
            productDetails.paymentMethods.push(altText);
console.log(new Date().toISOString(), "injection.js", 46);
        }
console.log(new Date().toISOString(), "injection.js", 47);
    });
console.log(new Date().toISOString(), "injection.js", 48);

console.log(new Date().toISOString(), "injection.js", 49);
    // Stock
console.log(new Date().toISOString(), "injection.js", 50);
    const stockElement = document.querySelector('span.ui-pdp-buybox__quantity__available');
console.log(new Date().toISOString(), "injection.js", 51);
    productDetails.stock = stockElement ? stockElement.innerText.match(/\d+/)[0] : 'Unknown';
console.log(new Date().toISOString(), "injection.js", 52);

console.log(new Date().toISOString(), "injection.js", 53);
    // Stock Availability Flag
console.log(new Date().toISOString(), "injection.js", 54);
    const stockAvailableElement = document.querySelector('div.ui-pdp-stock-information p.ui-pdp-color--BLACK');
console.log(new Date().toISOString(), "injection.js", 55);
    productDetails.stockAvailable = !!stockAvailableElement;
console.log(new Date().toISOString(), "injection.js", 56);

console.log(new Date().toISOString(), "injection.js", 57);
    // Shipping
console.log(new Date().toISOString(), "injection.js", 58);
    const shippingElement = document.querySelector('div.ui-pdp-media__body p.ui-pdp-color--BLACK');
console.log(new Date().toISOString(), "injection.js", 59);
    productDetails.shipping = shippingElement ? shippingElement.innerText : 'Unknown';
console.log(new Date().toISOString(), "injection.js", 60);

console.log(new Date().toISOString(), "injection.js", 61);
    // Seller Name and Link (Assuming the link is the parent element of the seller name span)
console.log(new Date().toISOString(), "injection.js", 62);
    const sellerNameElement = document.querySelector('div.ui-pdp-seller__link-trigger a.ui-pdp-action-modal__link span');
console.log(new Date().toISOString(), "injection.js", 63);
    if (sellerNameElement) {
console.log(new Date().toISOString(), "injection.js", 64);
        productDetails.seller = {
console.log(new Date().toISOString(), "injection.js", 65);
            name: sellerNameElement.innerText,
console.log(new Date().toISOString(), "injection.js", 66);
            link: sellerNameElement.closest('a')?.href || 'Unknown'
console.log(new Date().toISOString(), "injection.js", 67);
        };
console.log(new Date().toISOString(), "injection.js", 68);
    }
console.log(new Date().toISOString(), "injection.js", 69);

console.log(new Date().toISOString(), "injection.js", 70);
    // Product Returns
console.log(new Date().toISOString(), "injection.js", 71);
    const returnElement = document.querySelector('div.ui-pdp-action-modal a.ui-pdp-action-modal__link');
console.log(new Date().toISOString(), "injection.js", 72);
    productDetails.returns = returnElement ? returnElement.href : 'Unknown';
console.log(new Date().toISOString(), "injection.js", 73);

console.log(new Date().toISOString(), "injection.js", 74);
    // Seller Information
console.log(new Date().toISOString(), "injection.js", 75);
    productDetails.sellerInformation = {};
console.log(new Date().toISOString(), "injection.js", 76);
    const salesElement = document.querySelector('li.ui-pdp-seller__item-description strong.ui-pdp-seller__sales-description');
console.log(new Date().toISOString(), "injection.js", 77);
    productDetails.sellerInformation.sales = salesElement ? salesElement.innerText : 'Unknown';
console.log(new Date().toISOString(), "injection.js", 78);
    const goodServiceElement = document.querySelector('li.ui-pdp-seller__item-description p[title="Brinda buena atención"]');
console.log(new Date().toISOString(), "injection.js", 79);
    productDetails.sellerInformation.goodService = !!goodServiceElement;
console.log(new Date().toISOString(), "injection.js", 80);
    const onTimeDeliveryElement = document.querySelector('li.ui-pdp-seller__item-description p[title="Entrega sus productos a tiempo"]');
console.log(new Date().toISOString(), "injection.js", 81);
    productDetails.sellerInformation.onTimeDelivery = !!onTimeDeliveryElement;
console.log(new Date().toISOString(), "injection.js", 82);

console.log(new Date().toISOString(), "injection.js", 83);
    // Product Characteristics
console.log(new Date().toISOString(), "injection.js", 84);
    productDetails.characteristics = [];
console.log(new Date().toISOString(), "injection.js", 85);
    const characteristicsElements = document.querySelectorAll('.andes-table__column--value');
console.log(new Date().toISOString(), "injection.js", 86);
    characteristicsElements.forEach(element => {
console.log(new Date().toISOString(), "injection.js", 87);
        productDetails.characteristics.push(element.innerText.trim());
console.log(new Date().toISOString(), "injection.js", 88);
    });
console.log(new Date().toISOString(), "injection.js", 89);

console.log(new Date().toISOString(), "injection.js", 90);
    // Product Description
console.log(new Date().toISOString(), "injection.js", 91);
    const descriptionElement = document.querySelector('div.ui-pdp-description__content');
console.log(new Date().toISOString(), "injection.js", 92);
    productDetails.description = descriptionElement ? descriptionElement.innerHTML.trim() : '';
console.log(new Date().toISOString(), "injection.js", 93);

console.log(new Date().toISOString(), "injection.js", 94);
    // Product New/Used Flag, and Amount of Sales
console.log(new Date().toISOString(), "injection.js", 95);
    const subtitleElement = document.querySelector('span.ui-pdp-subtitle');
console.log(new Date().toISOString(), "injection.js", 96);
    if (subtitleElement) {
console.log(new Date().toISOString(), "injection.js", 97);
        const subtitleText = subtitleElement.innerText.split('|');
console.log(new Date().toISOString(), "injection.js", 98);
        productDetails.condition = subtitleText[0]?.trim();
console.log(new Date().toISOString(), "injection.js", 99);
        productDetails.soldQuantity = subtitleText[1]?.trim();
console.log(new Date().toISOString(), "injection.js", 100);
    }
console.log(new Date().toISOString(), "injection.js", 101);

console.log(new Date().toISOString(), "injection.js", 102);
    // Amount of Reviews
console.log(new Date().toISOString(), "injection.js", 103);
    const reviewAmountElement = document.querySelector('span.ui-pdp-review__amount');
console.log(new Date().toISOString(), "injection.js", 104);
    productDetails.reviewAmount = reviewAmountElement ? reviewAmountElement.innerText.replace(/[()]/g, '') : 'Unknown';
console.log(new Date().toISOString(), "injection.js", 105);

console.log(new Date().toISOString(), "injection.js", 106);
    // Stars
console.log(new Date().toISOString(), "injection.js", 107);
    const starsElement = document.querySelector('p.ui-review-capability__rating__average');
console.log(new Date().toISOString(), "injection.js", 108);
    productDetails.stars = starsElement ? parseFloat(starsElement.innerText) : 'Unknown';
console.log(new Date().toISOString(), "injection.js", 109);

console.log(new Date().toISOString(), "injection.js", 110);
    return productDetails;
console.log(new Date().toISOString(), "injection.js", 111);
}
console.log(new Date().toISOString(), "injection.js", 112);

console.log(new Date().toISOString(), "injection.js", 113);

console.log(new Date().toISOString(), "injection.js", 114);

console.log(new Date().toISOString(), "injection.js", 115);

console.log(new Date().toISOString(), "injection.js", 116);
// Function to process each URL
console.log(new Date().toISOString(), "injection.js", 117);
function processUrl(url) {
console.log(new Date().toISOString(), "injection.js", 118);
    let result = {};
console.log(new Date().toISOString(), "injection.js", 119);
    if (url.includes('articulo.mercadolibre.com.co') && url.match(/MCO-\d+/)) {
console.log(new Date().toISOString(), "injection.js", 120);
      console.log("Processing as product page:", url);
console.log(new Date().toISOString(), "injection.js", 121);
      result.type = "product_page";
console.log(new Date().toISOString(), "injection.js", 122);
      result.productId = url.split("/")[4].split("-")[1];
console.log(new Date().toISOString(), "injection.js", 123);
      result.productName = url.split("/")[4].split("-").slice(2).join(" ").split("_")[0];
console.log(new Date().toISOString(), "injection.js", 124);
    } else if (url.includes("categories")) {
console.log(new Date().toISOString(), "injection.js", 125);
      console.log("Processing as category page:", url);
console.log(new Date().toISOString(), "injection.js", 126);
      result.type = "category_page";
console.log(new Date().toISOString(), "injection.js", 127);
      result.categoryName = "root_category";
console.log(new Date().toISOString(), "injection.js", 128);
    } else {
console.log(new Date().toISOString(), "injection.js", 129);
      console.log("Processing as other type of page:", url);
console.log(new Date().toISOString(), "injection.js", 130);
      result.type = "other";
console.log(new Date().toISOString(), "injection.js", 131);
    }
console.log(new Date().toISOString(), "injection.js", 132);
    return result;
console.log(new Date().toISOString(), "injection.js", 133);
  }
console.log(new Date().toISOString(), "injection.js", 134);

console.log(new Date().toISOString(), "injection.js", 135);

console.log(new Date().toISOString(), "injection.js", 136);

console.log(new Date().toISOString(), "injection.js", 137);
// open_tab
console.log(new Date().toISOString(), "injection.js", 138);
async function open_tab(url) {
console.log(new Date().toISOString(), "injection.js", 139);
    return new Promise((resolve, reject) => {
console.log(new Date().toISOString(), "injection.js", 140);
        chrome.runtime.sendMessage({action: "open_new_tab", url: url}, (response) => {
console.log(new Date().toISOString(), "injection.js", 141);
            if (response && response.status === "tab_was_opened") {
console.log(new Date().toISOString(), "injection.js", 142);
                console.log("Tab was opened:", url, "with ID:", response.new_tab_id);
console.log(new Date().toISOString(), "injection.js", 143);
                resolve(response.new_tab_id);
console.log(new Date().toISOString(), "injection.js", 144);
            } else {
console.log(new Date().toISOString(), "injection.js", 145);
                console.error("Failed to open tab or no response received.");
console.log(new Date().toISOString(), "injection.js", 146);
                reject(new Error("Failed to open tab or no response received."));
console.log(new Date().toISOString(), "injection.js", 147);
            }
console.log(new Date().toISOString(), "injection.js", 148);
        });
console.log(new Date().toISOString(), "injection.js", 149);
    });
console.log(new Date().toISOString(), "injection.js", 150);
}
console.log(new Date().toISOString(), "injection.js", 151);

console.log(new Date().toISOString(), "injection.js", 152);

console.log(new Date().toISOString(), "injection.js", 153);

console.log(new Date().toISOString(), "injection.js", 154);

console.log(new Date().toISOString(), "injection.js", 155);
// close_tab
console.log(new Date().toISOString(), "injection.js", 156);
async function close_tab() {
console.log(new Date().toISOString(), "injection.js", 157);
    return new Promise((resolve, reject) => {
console.log(new Date().toISOString(), "injection.js", 158);
        chrome.runtime.sendMessage({action: "close_current_tab"}, function(response) {
console.log(new Date().toISOString(), "injection.js", 159);
            if (response.status === "success") {
console.log(new Date().toISOString(), "injection.js", 160);
                console.log(response.message);
console.log(new Date().toISOString(), "injection.js", 161);
                resolve();
console.log(new Date().toISOString(), "injection.js", 162);
            } else {
console.log(new Date().toISOString(), "injection.js", 163);
                console.error(response.message);
console.log(new Date().toISOString(), "injection.js", 164);
                reject(new Error(response.message));
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
async function extractLinks(url){
console.log(new Date().toISOString(), "injection.js", 174);
    return Array.from(document.querySelectorAll('a')).map(a => a.href);
console.log(new Date().toISOString(), "injection.js", 175);
}
console.log(new Date().toISOString(), "injection.js", 176);

console.log(new Date().toISOString(), "injection.js", 177);

console.log(new Date().toISOString(), "injection.js", 178);

console.log(new Date().toISOString(), "injection.js", 179);

console.log(new Date().toISOString(), "injection.js", 180);
// Function to check if a link is visited
console.log(new Date().toISOString(), "injection.js", 181);
async function isLinkVisited(linkUrl) {
console.log(new Date().toISOString(), "injection.js", 182);
    console.log("Checking if link is visited:", linkUrl);
console.log(new Date().toISOString(), "injection.js", 183);
    return new Promise((resolve) => {
console.log(new Date().toISOString(), "injection.js", 184);
      chrome.storage.local.get(['links'], function(result) {
console.log(new Date().toISOString(), "injection.js", 185);
        const visited = result.links && result.links.some(link => link.url === linkUrl);
console.log(new Date().toISOString(), "injection.js", 186);
        console.log("Visited status for", linkUrl, ":", visited);
console.log(new Date().toISOString(), "injection.js", 187);
        resolve(visited);
console.log(new Date().toISOString(), "injection.js", 188);
      });
console.log(new Date().toISOString(), "injection.js", 189);
    });
console.log(new Date().toISOString(), "injection.js", 190);
  }
console.log(new Date().toISOString(), "injection.js", 191);

console.log(new Date().toISOString(), "injection.js", 192);

console.log(new Date().toISOString(), "injection.js", 193);

console.log(new Date().toISOString(), "injection.js", 194);

console.log(new Date().toISOString(), "injection.js", 195);
// Update or add link details in the global storage
console.log(new Date().toISOString(), "injection.js", 196);
async function updateLinkDetails(link, productDetails = null) {
console.log(new Date().toISOString(), "injection.js", 197);
    console.log("Updating link details for:", link);
console.log(new Date().toISOString(), "injection.js", 198);
    return new Promise((resolve) => {
console.log(new Date().toISOString(), "injection.js", 199);
      chrome.storage.local.get(['links'], function(result) {
console.log(new Date().toISOString(), "injection.js", 200);
        let links = result.links || [];
console.log(new Date().toISOString(), "injection.js", 201);
        const existingLinkIndex = links.findIndex(l => l.url === link);
console.log(new Date().toISOString(), "injection.js", 202);
  
console.log(new Date().toISOString(), "injection.js", 203);
        if (existingLinkIndex !== -1) {
console.log(new Date().toISOString(), "injection.js", 204);
          console.log("Link exists. Updating:", link);
console.log(new Date().toISOString(), "injection.js", 205);
          links[existingLinkIndex].updated = new Date().toISOString();
console.log(new Date().toISOString(), "injection.js", 206);
          if (productDetails) {
console.log(new Date().toISOString(), "injection.js", 207);
            links[existingLinkIndex].product_data = productDetails;
console.log(new Date().toISOString(), "injection.js", 208);
          }
console.log(new Date().toISOString(), "injection.js", 209);
        } else {
console.log(new Date().toISOString(), "injection.js", 210);
          console.log("New link. Adding:", link);
console.log(new Date().toISOString(), "injection.js", 211);
          links.push({
console.log(new Date().toISOString(), "injection.js", 212);
            url: link,
console.log(new Date().toISOString(), "injection.js", 213);
            updated: new Date().toISOString(),
console.log(new Date().toISOString(), "injection.js", 214);
            product_data: productDetails,
console.log(new Date().toISOString(), "injection.js", 215);
            mirrors: []
console.log(new Date().toISOString(), "injection.js", 216);
          });
console.log(new Date().toISOString(), "injection.js", 217);
        }
console.log(new Date().toISOString(), "injection.js", 218);
  
console.log(new Date().toISOString(), "injection.js", 219);
        chrome.storage.local.set({links}, () => {
console.log(new Date().toISOString(), "injection.js", 220);
          console.log("Link details updated in storage for:", link);
console.log(new Date().toISOString(), "injection.js", 221);
          resolve();
console.log(new Date().toISOString(), "injection.js", 222);
        });
console.log(new Date().toISOString(), "injection.js", 223);
      });
console.log(new Date().toISOString(), "injection.js", 224);
    });
console.log(new Date().toISOString(), "injection.js", 225);
  }
console.log(new Date().toISOString(), "injection.js", 226);

console.log(new Date().toISOString(), "injection.js", 227);

console.log(new Date().toISOString(), "injection.js", 228);

console.log(new Date().toISOString(), "injection.js", 229);

console.log(new Date().toISOString(), "injection.js", 230);

console.log(new Date().toISOString(), "injection.js", 231);
// Revised visitor_link_tree function with processUrl and extractProductDetails integration
console.log(new Date().toISOString(), "injection.js", 232);
async function visitor_link_tree(links, index = 0, parentTabId = null) {
console.log(new Date().toISOString(), "injection.js", 233);
    if (index >= links.length) {
console.log(new Date().toISOString(), "injection.js", 234);
        console.log("Finished processing all links.");
console.log(new Date().toISOString(), "injection.js", 235);
        if (parentTabId) {
console.log(new Date().toISOString(), "injection.js", 236);
            console.log("Closing parent tab id:", parentTabId);
console.log(new Date().toISOString(), "injection.js", 237);
            await close_tab(parentTabId);
console.log(new Date().toISOString(), "injection.js", 238);
        }
console.log(new Date().toISOString(), "injection.js", 239);
        return;
console.log(new Date().toISOString(), "injection.js", 240);
    }
console.log(new Date().toISOString(), "injection.js", 241);

console.log(new Date().toISOString(), "injection.js", 242);
    const link = links[index];
console.log(new Date().toISOString(), "injection.js", 243);
    console.log("Processing link:", link);
console.log(new Date().toISOString(), "injection.js", 244);
    const linkType = processUrl(link); // Determine the type of the link
console.log(new Date().toISOString(), "injection.js", 245);
    console.log("Link type determined as:", linkType.type);
console.log(new Date().toISOString(), "injection.js", 246);

console.log(new Date().toISOString(), "injection.js", 247);
    // Check if the link has already been visited
console.log(new Date().toISOString(), "injection.js", 248);
    const visited = await isLinkVisited(link);
console.log(new Date().toISOString(), "injection.js", 249);
    console.log("Visited status for", link, ":", visited);
console.log(new Date().toISOString(), "injection.js", 250);

console.log(new Date().toISOString(), "injection.js", 251);
    if (!visited) {
console.log(new Date().toISOString(), "injection.js", 252);
        let productDetails = null;
console.log(new Date().toISOString(), "injection.js", 253);
        if (linkType.type === "product_page") {
console.log(new Date().toISOString(), "injection.js", 254);
            console.log("Extracting product details for:", link);
console.log(new Date().toISOString(), "injection.js", 255);
            productDetails = extractProductDetails(); // Adjust if this needs to be done asynchronously
console.log(new Date().toISOString(), "injection.js", 256);
            console.log("Product details extracted:", productDetails);
console.log(new Date().toISOString(), "injection.js", 257);
        }
console.log(new Date().toISOString(), "injection.js", 258);
        await updateLinkDetails(link, productDetails);
console.log(new Date().toISOString(), "injection.js", 259);
        console.log("Link details updated for:", link);
console.log(new Date().toISOString(), "injection.js", 260);

console.log(new Date().toISOString(), "injection.js", 261);
        // Random delay between 1 to 3 seconds
console.log(new Date().toISOString(), "injection.js", 262);
        const delay = Math.floor(Math.random() * (3000 - 1000 + 1)) + 1000;
console.log(new Date().toISOString(), "injection.js", 263);
        console.log(`Waiting for ${delay}ms before opening the next tab for link: ${link}`);
console.log(new Date().toISOString(), "injection.js", 264);

console.log(new Date().toISOString(), "injection.js", 265);
        setTimeout(async () => {
console.log(new Date().toISOString(), "injection.js", 266);
            await open_tab(link); // Open the tab and wait for it to load
console.log(new Date().toISOString(), "injection.js", 267);
            console.log("New tab was opened successfully for:", link);
console.log(new Date().toISOString(), "injection.js", 268);

console.log(new Date().toISOString(), "injection.js", 269);
            // Extract and process new links from the opened tab's content
console.log(new Date().toISOString(), "injection.js", 270);
            const childLinks = await extractLinks(link); // Adjust if this needs to be done differently
console.log(new Date().toISOString(), "injection.js", 271);
            console.log("Extracted child links:", childLinks);
console.log(new Date().toISOString(), "injection.js", 272);

console.log(new Date().toISOString(), "injection.js", 273);
            const newLinks = childLinks.filter(l => !links.includes(l));
console.log(new Date().toISOString(), "injection.js", 274);
            links = [...links, ...newLinks]; // Update the list of links to include newly discovered ones
console.log(new Date().toISOString(), "injection.js", 275);
            console.log("Updated links list with new discoveries:", links);
console.log(new Date().toISOString(), "injection.js", 276);

console.log(new Date().toISOString(), "injection.js", 277);
            // Proceed to the next link
console.log(new Date().toISOString(), "injection.js", 278);
            await visitor_link_tree(links, index + 1, parentTabId);
console.log(new Date().toISOString(), "injection.js", 279);
        }, delay);
console.log(new Date().toISOString(), "injection.js", 280);
    } else {
console.log(new Date().toISOString(), "injection.js", 281);
        console.log("Link already visited, skipping:", link);
console.log(new Date().toISOString(), "injection.js", 282);
        // Skip to the next link without opening a new tab
console.log(new Date().toISOString(), "injection.js", 283);
        await visitor_link_tree(links, index + 1, parentTabId);
console.log(new Date().toISOString(), "injection.js", 284);
    }
console.log(new Date().toISOString(), "injection.js", 285);
}
console.log(new Date().toISOString(), "injection.js", 286);

console.log(new Date().toISOString(), "injection.js", 287);

console.log(new Date().toISOString(), "injection.js", 288);
// Revised visitor_link_tree function for BFS with tab opening for all links and random delay
console.log(new Date().toISOString(), "injection.js", 289);
async function visitor_link_tree_bfs(rootLinks) {
console.log(new Date().toISOString(), "injection.js", 290);
    let queue = [...rootLinks]; // Initialize the queue with root links
console.log(new Date().toISOString(), "injection.js", 291);
    let visited = new Set(); // Keep track of visited links to avoid revisits
console.log(new Date().toISOString(), "injection.js", 292);

console.log(new Date().toISOString(), "injection.js", 293);
    while (queue.length > 0) {
console.log(new Date().toISOString(), "injection.js", 294);
        const currentLink = queue.shift(); // Dequeue the next link to visit
console.log(new Date().toISOString(), "injection.js", 295);

console.log(new Date().toISOString(), "injection.js", 296);
        if (visited.has(currentLink)) {
console.log(new Date().toISOString(), "injection.js", 297);
            continue; // Skip if already visited
console.log(new Date().toISOString(), "injection.js", 298);
        }
console.log(new Date().toISOString(), "injection.js", 299);
        visited.add(currentLink); // Mark this link as visited
console.log(new Date().toISOString(), "injection.js", 300);

console.log(new Date().toISOString(), "injection.js", 301);
        // Determine the type of the current link
console.log(new Date().toISOString(), "injection.js", 302);
        const linkType = processUrl(currentLink);
console.log(new Date().toISOString(), "injection.js", 303);
        console.log("Visiting link:", currentLink, "Type:", linkType.type);
console.log(new Date().toISOString(), "injection.js", 304);

console.log(new Date().toISOString(), "injection.js", 305);
        // Open the tab and wait for it to be ready
console.log(new Date().toISOString(), "injection.js", 306);
        try {
console.log(new Date().toISOString(), "injection.js", 307);
            const tabId = await open_tab(currentLink);
console.log(new Date().toISOString(), "injection.js", 308);
            console.log("Tab opened successfully for:", currentLink, "Tab ID:", tabId);
console.log(new Date().toISOString(), "injection.js", 309);

console.log(new Date().toISOString(), "injection.js", 310);
            // Here, you would extract links or product details from the tab.
console.log(new Date().toISOString(), "injection.js", 311);
            // Since we're simulating, let's assume you have a function to do this:
console.log(new Date().toISOString(), "injection.js", 312);
            // For product pages, extract product details
console.log(new Date().toISOString(), "injection.js", 313);
            let productDetails = null;
console.log(new Date().toISOString(), "injection.js", 314);
            if (linkType.type === "product_page") {
console.log(new Date().toISOString(), "injection.js", 315);
                productDetails = await extractProductDetails(); // Simulated function
console.log(new Date().toISOString(), "injection.js", 316);
                await updateLinkDetails(currentLink, productDetails);
console.log(new Date().toISOString(), "injection.js", 317);
            }
console.log(new Date().toISOString(), "injection.js", 318);

console.log(new Date().toISOString(), "injection.js", 319);
            // For all pages, extract links and add them to the queue
console.log(new Date().toISOString(), "injection.js", 320);
            const childLinks = await extractLinks(currentLink); // Simulated function
console.log(new Date().toISOString(), "injection.js", 321);
            childLinks.forEach(link => {
console.log(new Date().toISOString(), "injection.js", 322);
                if (!visited.has(link)) {
console.log(new Date().toISOString(), "injection.js", 323);
                    queue.push(link);
console.log(new Date().toISOString(), "injection.js", 324);
                }
console.log(new Date().toISOString(), "injection.js", 325);
            });
console.log(new Date().toISOString(), "injection.js", 326);

console.log(new Date().toISOString(), "injection.js", 327);
            // Close the tab if necessary
console.log(new Date().toISOString(), "injection.js", 328);
            await close_tab(tabId);
console.log(new Date().toISOString(), "injection.js", 329);
        } catch (error) {
console.log(new Date().toISOString(), "injection.js", 330);
            console.error("Error processing link:", currentLink, error);
console.log(new Date().toISOString(), "injection.js", 331);
        }
console.log(new Date().toISOString(), "injection.js", 332);

console.log(new Date().toISOString(), "injection.js", 333);
        // Implement a delay between processing each link
console.log(new Date().toISOString(), "injection.js", 334);
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
console.log(new Date().toISOString(), "injection.js", 335);
    }
console.log(new Date().toISOString(), "injection.js", 336);

console.log(new Date().toISOString(), "injection.js", 337);
    console.log("Finished visiting all links");
console.log(new Date().toISOString(), "injection.js", 338);
}
console.log(new Date().toISOString(), "injection.js", 339);

console.log(new Date().toISOString(), "injection.js", 340);
// -------------------------------- main ----------------------------------------
console.log(new Date().toISOString(), "injection.js", 341);

console.log(new Date().toISOString(), "injection.js", 342);

console.log(new Date().toISOString(), "injection.js", 343);

console.log(new Date().toISOString(), "injection.js", 344);
const rootLinks = ["https://www.mercadolibre.com.co/categorias#menu=categories"];
console.log(new Date().toISOString(), "injection.js", 345);
visitor_link_tree_bfs(rootLinks);
console.log(new Date().toISOString(), "injection.js", 346);
