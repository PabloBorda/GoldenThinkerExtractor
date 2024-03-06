console.log(new Date().toISOString(), "injection.js", 1);
function extractProductDetails() {
console.log(new Date().toISOString(), "injection.js", 2);
    const productDetails = {};
console.log(new Date().toISOString(), "injection.js", 3);

console.log(new Date().toISOString(), "injection.js", 4);
    // Product Title
console.log(new Date().toISOString(), "injection.js", 5);
    const titleElement = document.querySelector('h1.ui-pdp-title');
console.log(new Date().toISOString(), "injection.js", 6);
    productDetails.title = titleElement ? titleElement.innerText : '';
console.log(new Date().toISOString(), "injection.js", 7);

console.log(new Date().toISOString(), "injection.js", 8);
    // Image URLs
console.log(new Date().toISOString(), "injection.js", 9);
    productDetails.images = [];
console.log(new Date().toISOString(), "injection.js", 10);
    const imageElements = document.querySelectorAll('.ui-pdp-gallery img.ui-pdp-image');
console.log(new Date().toISOString(), "injection.js", 11);
    imageElements.forEach(img => {
console.log(new Date().toISOString(), "injection.js", 12);
        const src = img.getAttribute('data-zoom') || img.src; // Prefer high-res images
console.log(new Date().toISOString(), "injection.js", 13);
        if (src) {
console.log(new Date().toISOString(), "injection.js", 14);
            productDetails.images.push(src);
console.log(new Date().toISOString(), "injection.js", 15);
        }
console.log(new Date().toISOString(), "injection.js", 16);
    });
console.log(new Date().toISOString(), "injection.js", 17);

console.log(new Date().toISOString(), "injection.js", 18);
    // Price and Currency
console.log(new Date().toISOString(), "injection.js", 19);
    const priceElement = document.querySelector('span.andes-money-amount.ui-pdp-price__part');
console.log(new Date().toISOString(), "injection.js", 20);
    if (priceElement) {
console.log(new Date().toISOString(), "injection.js", 21);
        const price = priceElement.querySelector('span.andes-money-amount__fraction')?.innerText.replace('.', '') || '';
console.log(new Date().toISOString(), "injection.js", 22);
        const currencySymbol = priceElement.querySelector('span.andes-money-amount__currency-symbol')?.innerText || '';
console.log(new Date().toISOString(), "injection.js", 23);
        productDetails.price = `${currencySymbol}${price}`;
console.log(new Date().toISOString(), "injection.js", 24);
    }
console.log(new Date().toISOString(), "injection.js", 25);

console.log(new Date().toISOString(), "injection.js", 26);
    // Payment Methods
console.log(new Date().toISOString(), "injection.js", 27);
    productDetails.paymentMethods = [];
console.log(new Date().toISOString(), "injection.js", 28);
    const paymentMethodElements = document.querySelectorAll('.ui-vip-payment_methods img.ui-pdp-image');
console.log(new Date().toISOString(), "injection.js", 29);
    paymentMethodElements.forEach(method => {
console.log(new Date().toISOString(), "injection.js", 30);
        const altText = method.alt;
console.log(new Date().toISOString(), "injection.js", 31);
        if (altText) {
console.log(new Date().toISOString(), "injection.js", 32);
            productDetails.paymentMethods.push(altText);
console.log(new Date().toISOString(), "injection.js", 33);
        }
console.log(new Date().toISOString(), "injection.js", 34);
    });
console.log(new Date().toISOString(), "injection.js", 35);

console.log(new Date().toISOString(), "injection.js", 36);
    // Stock
console.log(new Date().toISOString(), "injection.js", 37);
    const stockElement = document.querySelector('span.ui-pdp-buybox__quantity__available');
console.log(new Date().toISOString(), "injection.js", 38);
    productDetails.stock = stockElement ? stockElement.innerText.match(/\d+/)[0] : 'Unknown';
console.log(new Date().toISOString(), "injection.js", 39);

console.log(new Date().toISOString(), "injection.js", 40);
    // Stock Availability Flag
console.log(new Date().toISOString(), "injection.js", 41);
    const stockAvailableElement = document.querySelector('div.ui-pdp-stock-information p.ui-pdp-color--BLACK');
console.log(new Date().toISOString(), "injection.js", 42);
    productDetails.stockAvailable = !!stockAvailableElement;
console.log(new Date().toISOString(), "injection.js", 43);

console.log(new Date().toISOString(), "injection.js", 44);
    // Shipping
console.log(new Date().toISOString(), "injection.js", 45);
    const shippingElement = document.querySelector('div.ui-pdp-media__body p.ui-pdp-color--BLACK');
console.log(new Date().toISOString(), "injection.js", 46);
    productDetails.shipping = shippingElement ? shippingElement.innerText : 'Unknown';
console.log(new Date().toISOString(), "injection.js", 47);

console.log(new Date().toISOString(), "injection.js", 48);
    // Seller Name and Link (Assuming the link is the parent element of the seller name span)
console.log(new Date().toISOString(), "injection.js", 49);
    const sellerNameElement = document.querySelector('div.ui-pdp-seller__link-trigger a.ui-pdp-action-modal__link span');
console.log(new Date().toISOString(), "injection.js", 50);
    if (sellerNameElement) {
console.log(new Date().toISOString(), "injection.js", 51);
        productDetails.seller = {
console.log(new Date().toISOString(), "injection.js", 52);
            name: sellerNameElement.innerText,
console.log(new Date().toISOString(), "injection.js", 53);
            link: sellerNameElement.closest('a')?.href || 'Unknown'
console.log(new Date().toISOString(), "injection.js", 54);
        };
console.log(new Date().toISOString(), "injection.js", 55);
    }
console.log(new Date().toISOString(), "injection.js", 56);

console.log(new Date().toISOString(), "injection.js", 57);
    // Product Returns
console.log(new Date().toISOString(), "injection.js", 58);
    const returnElement = document.querySelector('div.ui-pdp-action-modal a.ui-pdp-action-modal__link');
console.log(new Date().toISOString(), "injection.js", 59);
    productDetails.returns = returnElement ? returnElement.href : 'Unknown';
console.log(new Date().toISOString(), "injection.js", 60);

console.log(new Date().toISOString(), "injection.js", 61);
    // Seller Information
console.log(new Date().toISOString(), "injection.js", 62);
    productDetails.sellerInformation = {};
console.log(new Date().toISOString(), "injection.js", 63);
    const salesElement = document.querySelector('li.ui-pdp-seller__item-description strong.ui-pdp-seller__sales-description');
console.log(new Date().toISOString(), "injection.js", 64);
    productDetails.sellerInformation.sales = salesElement ? salesElement.innerText : 'Unknown';
console.log(new Date().toISOString(), "injection.js", 65);
    const goodServiceElement = document.querySelector('li.ui-pdp-seller__item-description p[title="Brinda buena atención"]');
console.log(new Date().toISOString(), "injection.js", 66);
    productDetails.sellerInformation.goodService = !!goodServiceElement;
console.log(new Date().toISOString(), "injection.js", 67);
    const onTimeDeliveryElement = document.querySelector('li.ui-pdp-seller__item-description p[title="Entrega sus productos a tiempo"]');
console.log(new Date().toISOString(), "injection.js", 68);
    productDetails.sellerInformation.onTimeDelivery = !!onTimeDeliveryElement;
console.log(new Date().toISOString(), "injection.js", 69);

console.log(new Date().toISOString(), "injection.js", 70);
    // Product Characteristics
console.log(new Date().toISOString(), "injection.js", 71);
    productDetails.characteristics = [];
console.log(new Date().toISOString(), "injection.js", 72);
    const characteristicsElements = document.querySelectorAll('.andes-table__column--value');
console.log(new Date().toISOString(), "injection.js", 73);
    characteristicsElements.forEach(element => {
console.log(new Date().toISOString(), "injection.js", 74);
        productDetails.characteristics.push(element.innerText.trim());
console.log(new Date().toISOString(), "injection.js", 75);
    });
console.log(new Date().toISOString(), "injection.js", 76);

console.log(new Date().toISOString(), "injection.js", 77);
    // Product Description
console.log(new Date().toISOString(), "injection.js", 78);
    const descriptionElement = document.querySelector('div.ui-pdp-description__content');
console.log(new Date().toISOString(), "injection.js", 79);
    productDetails.description = descriptionElement ? descriptionElement.innerHTML.trim() : '';
console.log(new Date().toISOString(), "injection.js", 80);

console.log(new Date().toISOString(), "injection.js", 81);
    // Product New/Used Flag, and Amount of Sales
console.log(new Date().toISOString(), "injection.js", 82);
    const subtitleElement = document.querySelector('span.ui-pdp-subtitle');
console.log(new Date().toISOString(), "injection.js", 83);
    if (subtitleElement) {
console.log(new Date().toISOString(), "injection.js", 84);
        const subtitleText = subtitleElement.innerText.split('|');
console.log(new Date().toISOString(), "injection.js", 85);
        productDetails.condition = subtitleText[0]?.trim();
console.log(new Date().toISOString(), "injection.js", 86);
        productDetails.soldQuantity = subtitleText[1]?.trim();
console.log(new Date().toISOString(), "injection.js", 87);
    }
console.log(new Date().toISOString(), "injection.js", 88);

console.log(new Date().toISOString(), "injection.js", 89);
    // Amount of Reviews
console.log(new Date().toISOString(), "injection.js", 90);
    const reviewAmountElement = document.querySelector('span.ui-pdp-review__amount');
console.log(new Date().toISOString(), "injection.js", 91);
    productDetails.reviewAmount = reviewAmountElement ? reviewAmountElement.innerText.replace(/[()]/g, '') : 'Unknown';
console.log(new Date().toISOString(), "injection.js", 92);

console.log(new Date().toISOString(), "injection.js", 93);
    // Stars
console.log(new Date().toISOString(), "injection.js", 94);
    const starsElement = document.querySelector('p.ui-review-capability__rating__average');
console.log(new Date().toISOString(), "injection.js", 95);
    productDetails.stars = starsElement ? parseFloat(starsElement.innerText) : 'Unknown';
console.log(new Date().toISOString(), "injection.js", 96);

console.log(new Date().toISOString(), "injection.js", 97);
    return productDetails;
console.log(new Date().toISOString(), "injection.js", 98);
}
console.log(new Date().toISOString(), "injection.js", 99);

console.log(new Date().toISOString(), "injection.js", 100);

console.log(new Date().toISOString(), "injection.js", 101);

console.log(new Date().toISOString(), "injection.js", 102);

console.log(new Date().toISOString(), "injection.js", 103);
// Function to process each URL
console.log(new Date().toISOString(), "injection.js", 104);
function processUrl(url) {
console.log(new Date().toISOString(), "injection.js", 105);
  let result = {};
console.log(new Date().toISOString(), "injection.js", 106);
  if (url.includes('articulo.mercadolibre.com.co') && url.match(/MCO-\d+/)) {
console.log(new Date().toISOString(), "injection.js", 107);
      // Product Page
console.log(new Date().toISOString(), "injection.js", 108);
      result.type = "product_page";
console.log(new Date().toISOString(), "injection.js", 109);
      result.productId = url.split("/")[4].split("-")[1];
console.log(new Date().toISOString(), "injection.js", 110);
      result.productName = url.split("/")[4].split("-").slice(2).join(" ").split("_")[0];
console.log(new Date().toISOString(), "injection.js", 111);
  } else if (url.includes("categories")) {
console.log(new Date().toISOString(), "injection.js", 112);
        result.type = "category_page";
console.log(new Date().toISOString(), "injection.js", 113);
        result.categoryName = "root_category"
console.log(new Date().toISOString(), "injection.js", 114);
  } else if (url.includes("www.mercadolibre.com.co/c/")) {
console.log(new Date().toISOString(), "injection.js", 115);
      // Category Page
console.log(new Date().toISOString(), "injection.js", 116);
      result.type = "category_page";
console.log(new Date().toISOString(), "injection.js", 117);
      result.categoryName = url.split("/")[4].split("#")[0];
console.log(new Date().toISOString(), "injection.js", 118);
  } else if (url.includes("listado.mercadolibre.com.co/_Deal_")) {
console.log(new Date().toISOString(), "injection.js", 119);
      // Deal Page
console.log(new Date().toISOString(), "injection.js", 120);
      result.type = "deal_page";
console.log(new Date().toISOString(), "injection.js", 121);
      result.dealName = url.split("_Deal_")[1].split("#")[0];
console.log(new Date().toISOString(), "injection.js", 122);
  } else if (url.includes("listado.mercadolibre.com.co/") && url.includes("_")) {
console.log(new Date().toISOString(), "injection.js", 123);
      // Filtered Search Result
console.log(new Date().toISOString(), "injection.js", 124);
      result.type = "filtered_search_results";
console.log(new Date().toISOString(), "injection.js", 125);
      result.searchTerm = url.split(".com.co/")[1].split("_")[0];
console.log(new Date().toISOString(), "injection.js", 126);
      result.filters = url.split("_").slice(1).join("_").split("#")[0];
console.log(new Date().toISOString(), "injection.js", 127);
  } else if (url === "https://www.mercadolibre.com.co/") {
console.log(new Date().toISOString(), "injection.js", 128);
      // Home Page
console.log(new Date().toISOString(), "injection.js", 129);
      result.type = "Home Page";
console.log(new Date().toISOString(), "injection.js", 130);
  }
console.log(new Date().toISOString(), "injection.js", 131);
  // Add more conditions as needed for other patterns
console.log(new Date().toISOString(), "injection.js", 132);
  return result;
console.log(new Date().toISOString(), "injection.js", 133);
}
console.log(new Date().toISOString(), "injection.js", 134);

console.log(new Date().toISOString(), "injection.js", 135);

console.log(new Date().toISOString(), "injection.js", 136);

console.log(new Date().toISOString(), "injection.js", 137);

console.log(new Date().toISOString(), "injection.js", 138);
// open_tab
console.log(new Date().toISOString(), "injection.js", 139);
async function open_tab(url) {
console.log(new Date().toISOString(), "injection.js", 140);
    return new Promise((resolve, reject) => {
console.log(new Date().toISOString(), "injection.js", 141);
        chrome.runtime.sendMessage({action: "open_new_tab", url: url}, function(response) {
console.log(new Date().toISOString(), "injection.js", 142);
            if (response.status === "tab_was_opened") {
console.log(new Date().toISOString(), "injection.js", 143);
                console.log("Tab was opened:", url);
console.log(new Date().toISOString(), "injection.js", 144);
                resolve(response.new_tab_id); // Ensure your background script sends back the new tab ID
console.log(new Date().toISOString(), "injection.js", 145);
            } else {
console.log(new Date().toISOString(), "injection.js", 146);
                reject(new Error("Failed to open tab"));
console.log(new Date().toISOString(), "injection.js", 147);
            }
console.log(new Date().toISOString(), "injection.js", 148);
            return true;
console.log(new Date().toISOString(), "injection.js", 149);
        });
console.log(new Date().toISOString(), "injection.js", 150);
    });
console.log(new Date().toISOString(), "injection.js", 151);
}
console.log(new Date().toISOString(), "injection.js", 152);

console.log(new Date().toISOString(), "injection.js", 153);

console.log(new Date().toISOString(), "injection.js", 154);

console.log(new Date().toISOString(), "injection.js", 155);

console.log(new Date().toISOString(), "injection.js", 156);
// close_tab
console.log(new Date().toISOString(), "injection.js", 157);
async function close_tab() {
console.log(new Date().toISOString(), "injection.js", 158);
    return new Promise((resolve, reject) => {
console.log(new Date().toISOString(), "injection.js", 159);
        chrome.runtime.sendMessage({action: "close_current_tab"}, function(response) {
console.log(new Date().toISOString(), "injection.js", 160);
            if (response.status === "success") {
console.log(new Date().toISOString(), "injection.js", 161);
                console.log(response.message);
console.log(new Date().toISOString(), "injection.js", 162);
                resolve();
console.log(new Date().toISOString(), "injection.js", 163);
            } else {
console.log(new Date().toISOString(), "injection.js", 164);
                console.error(response.message);
console.log(new Date().toISOString(), "injection.js", 165);
                reject(new Error(response.message));
console.log(new Date().toISOString(), "injection.js", 166);
            }
console.log(new Date().toISOString(), "injection.js", 167);
        });
console.log(new Date().toISOString(), "injection.js", 168);
    });
console.log(new Date().toISOString(), "injection.js", 169);
}
console.log(new Date().toISOString(), "injection.js", 170);

console.log(new Date().toISOString(), "injection.js", 171);

console.log(new Date().toISOString(), "injection.js", 172);

console.log(new Date().toISOString(), "injection.js", 173);

console.log(new Date().toISOString(), "injection.js", 174);
// Extract links
console.log(new Date().toISOString(), "injection.js", 175);
/* function extractLinks(url) {
console.log(new Date().toISOString(), "injection.js", 176);
    return new Promise((resolve, reject) => {
console.log(new Date().toISOString(), "injection.js", 177);
        chrome.runtime.sendMessage({
console.log(new Date().toISOString(), "injection.js", 178);
            action: "open_new_tab_and_extract_links",
console.log(new Date().toISOString(), "injection.js", 179);
            url: url
console.log(new Date().toISOString(), "injection.js", 180);
        }, response => {
console.log(new Date().toISOString(), "injection.js", 181);
            if (response.links) {
console.log(new Date().toISOString(), "injection.js", 182);
                resolve(response.links);
console.log(new Date().toISOString(), "injection.js", 183);
            } else {
console.log(new Date().toISOString(), "injection.js", 184);
                reject(new Error(response.error || "Unknown error extracting links"));
console.log(new Date().toISOString(), "injection.js", 185);
            }
console.log(new Date().toISOString(), "injection.js", 186);
        });
console.log(new Date().toISOString(), "injection.js", 187);
    });
console.log(new Date().toISOString(), "injection.js", 188);
}  */
console.log(new Date().toISOString(), "injection.js", 189);

console.log(new Date().toISOString(), "injection.js", 190);
async function extractLinks(url){
console.log(new Date().toISOString(), "injection.js", 191);
    return Array.from(document.querySelectorAll('a')).map(a => a.href);
console.log(new Date().toISOString(), "injection.js", 192);
}
console.log(new Date().toISOString(), "injection.js", 193);

console.log(new Date().toISOString(), "injection.js", 194);

console.log(new Date().toISOString(), "injection.js", 195);

console.log(new Date().toISOString(), "injection.js", 196);

console.log(new Date().toISOString(), "injection.js", 197);
// visitor recursive function
console.log(new Date().toISOString(), "injection.js", 198);
async function visitor_link_tree(links, index = 0, parentTabId = null) {
console.log(new Date().toISOString(), "injection.js", 199);
    if (links.length>0){
console.log(new Date().toISOString(), "injection.js", 200);
        if (index >= links.length) {
console.log(new Date().toISOString(), "injection.js", 201);
            console.log("Finished processing all links.");
console.log(new Date().toISOString(), "injection.js", 202);
            // Close the parent tab if it exists and we're done processing its children
console.log(new Date().toISOString(), "injection.js", 203);
            if (parentTabId) {
console.log(new Date().toISOString(), "injection.js", 204);
                await close_tab(parentTabId);
console.log(new Date().toISOString(), "injection.js", 205);
            }
console.log(new Date().toISOString(), "injection.js", 206);
            return;
console.log(new Date().toISOString(), "injection.js", 207);
        } else {            
console.log(new Date().toISOString(), "injection.js", 208);
            // Send a message to the background script to open a new tab with the specified URL
console.log(new Date().toISOString(), "injection.js", 209);
            chrome.runtime.sendMessage({
console.log(new Date().toISOString(), "injection.js", 210);
                action: "open_new_tab",
console.log(new Date().toISOString(), "injection.js", 211);
                url: links[index]
console.log(new Date().toISOString(), "injection.js", 212);
            }, async response => {
console.log(new Date().toISOString(), "injection.js", 213);
                if (response.status === "tab_was_opened") {
console.log(new Date().toISOString(), "injection.js", 214);
                    console.log("New tab was opened successfully:", response.message);
console.log(new Date().toISOString(), "injection.js", 215);
                    const link = links[index];
console.log(new Date().toISOString(), "injection.js", 216);
                    console.log("Processing link:", link);
console.log(new Date().toISOString(), "injection.js", 217);
                    const linkType = processUrl(link);
console.log(new Date().toISOString(), "injection.js", 218);
                    if (linkType.type === "product_page") {
console.log(new Date().toISOString(), "injection.js", 219);
                        console.log("Extracting product details from", link);
console.log(new Date().toISOString(), "injection.js", 220);
                        // Assuming extractProductDetails is an async function or returns a promise
console.log(new Date().toISOString(), "injection.js", 221);
                        const productDetails = await extractProductDetails(link);
console.log(new Date().toISOString(), "injection.js", 222);
                        products.push(productDetails);
console.log(new Date().toISOString(), "injection.js", 223);
                        console.log("Product details extracted:", productDetails);
console.log(new Date().toISOString(), "injection.js", 224);
                        // Continue with the next link after a delay to respect rate limits
console.log(new Date().toISOString(), "injection.js", 225);
                        setTimeout(() => visitor_link_tree(links, index + 1, parentTabId), 1000); // Adjust delay as needed
console.log(new Date().toISOString(), "injection.js", 226);
                    } else if (linkType.type === "category_page") {
console.log(new Date().toISOString(), "injection.js", 227);
                        console.log("Processing category page:", link);
console.log(new Date().toISOString(), "injection.js", 228);
                        // Adjusted to directly use extractLinks without opening a new tab here
console.log(new Date().toISOString(), "injection.js", 229);
                        // Assuming link is the URL from which you want to extract links
console.log(new Date().toISOString(), "injection.js", 230);
                        const childLinks = await extractLinks(link);
console.log(new Date().toISOString(), "injection.js", 231);
                        console.log("Extracted child links:", childLinks);
console.log(new Date().toISOString(), "injection.js", 232);
                        // Recursively process the extracted links before moving to the next main link
console.log(new Date().toISOString(), "injection.js", 233);
                        await visitor_link_tree(links, index + 1, parentTabId);
console.log(new Date().toISOString(), "injection.js", 234);
                    } else {
console.log(new Date().toISOString(), "injection.js", 235);
                        console.error("Failed to open new tab:", response.message);
console.log(new Date().toISOString(), "injection.js", 236);
                    }
console.log(new Date().toISOString(), "injection.js", 237);
                }
console.log(new Date().toISOString(), "injection.js", 238);

console.log(new Date().toISOString(), "injection.js", 239);
            });
console.log(new Date().toISOString(), "injection.js", 240);
        }
console.log(new Date().toISOString(), "injection.js", 241);
    } else {
console.log(new Date().toISOString(), "injection.js", 242);
        console.log("No more links snanned...")
console.log(new Date().toISOString(), "injection.js", 243);
    }
console.log(new Date().toISOString(), "injection.js", 244);
}
console.log(new Date().toISOString(), "injection.js", 245);

console.log(new Date().toISOString(), "injection.js", 246);

console.log(new Date().toISOString(), "injection.js", 247);

console.log(new Date().toISOString(), "injection.js", 248);

console.log(new Date().toISOString(), "injection.js", 249);
// -------------------------------- main ----------------------------------------
console.log(new Date().toISOString(), "injection.js", 250);

console.log(new Date().toISOString(), "injection.js", 251);

console.log(new Date().toISOString(), "injection.js", 252);
var products = [];
console.log(new Date().toISOString(), "injection.js", 253);

console.log(new Date().toISOString(), "injection.js", 254);

console.log(new Date().toISOString(), "injection.js", 255);
// Start the process with the root link
console.log(new Date().toISOString(), "injection.js", 256);
const rootLink = "https://www.mercadolibre.com.co/categorias#menu=categories";
console.log(new Date().toISOString(), "injection.js", 257);
const initialLinks = [rootLink]; // This would be your starting set of links
console.log(new Date().toISOString(), "injection.js", 258);
visitor_link_tree(initialLinks,0,null);
console.log(new Date().toISOString(), "injection.js", 259);
