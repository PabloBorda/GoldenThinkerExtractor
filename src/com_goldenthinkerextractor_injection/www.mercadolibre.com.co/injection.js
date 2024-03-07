function extractProductDetails() {
    const productDetails = {};

    // Product Title
    const titleElement = document.querySelector('h1.ui-pdp-title');
    productDetails.title = titleElement ? titleElement.innerText : '';

    // Image URLs
    productDetails.images = [];
    const imageElements = document.querySelectorAll('.ui-pdp-gallery img.ui-pdp-image');
    imageElements.forEach(img => {
        const src = img.getAttribute('data-zoom') || img.src; // Prefer high-res images
        if (src) {
            productDetails.images.push(src);
        }
    });

    // Price and Currency
    const priceElement = document.querySelector('span.andes-money-amount.ui-pdp-price__part');
    if (priceElement) {
        const price = priceElement.querySelector('span.andes-money-amount__fraction')?.innerText.replace('.', '') || '';
        const currencySymbol = priceElement.querySelector('span.andes-money-amount__currency-symbol')?.innerText || '';
        productDetails.price = `${currencySymbol}${price}`;
    }

    // Payment Methods
    productDetails.paymentMethods = [];
    const paymentMethodElements = document.querySelectorAll('.ui-vip-payment_methods img.ui-pdp-image');
    paymentMethodElements.forEach(method => {
        const altText = method.alt;
        if (altText) {
            productDetails.paymentMethods.push(altText);
        }
    });

    // Stock
    const stockElement = document.querySelector('span.ui-pdp-buybox__quantity__available');
    productDetails.stock = stockElement ? stockElement.innerText.match(/\d+/)[0] : 'Unknown';

    // Stock Availability Flag
    const stockAvailableElement = document.querySelector('div.ui-pdp-stock-information p.ui-pdp-color--BLACK');
    productDetails.stockAvailable = !!stockAvailableElement;

    // Shipping
    const shippingElement = document.querySelector('div.ui-pdp-media__body p.ui-pdp-color--BLACK');
    productDetails.shipping = shippingElement ? shippingElement.innerText : 'Unknown';

    // Seller Name and Link (Assuming the link is the parent element of the seller name span)
    const sellerNameElement = document.querySelector('div.ui-pdp-seller__link-trigger a.ui-pdp-action-modal__link span');
    if (sellerNameElement) {
        productDetails.seller = {
            name: sellerNameElement.innerText,
            link: sellerNameElement.closest('a')?.href || 'Unknown'
        };
    }

    // Product Returns
    const returnElement = document.querySelector('div.ui-pdp-action-modal a.ui-pdp-action-modal__link');
    productDetails.returns = returnElement ? returnElement.href : 'Unknown';

    // Seller Information
    productDetails.sellerInformation = {};
    const salesElement = document.querySelector('li.ui-pdp-seller__item-description strong.ui-pdp-seller__sales-description');
    productDetails.sellerInformation.sales = salesElement ? salesElement.innerText : 'Unknown';
    const goodServiceElement = document.querySelector('li.ui-pdp-seller__item-description p[title="Brinda buena atención"]');
    productDetails.sellerInformation.goodService = !!goodServiceElement;
    const onTimeDeliveryElement = document.querySelector('li.ui-pdp-seller__item-description p[title="Entrega sus productos a tiempo"]');
    productDetails.sellerInformation.onTimeDelivery = !!onTimeDeliveryElement;

    // Product Characteristics
    productDetails.characteristics = [];
    const characteristicsElements = document.querySelectorAll('.andes-table__column--value');
    characteristicsElements.forEach(element => {
        productDetails.characteristics.push(element.innerText.trim());
    });

    // Product Description
    const descriptionElement = document.querySelector('div.ui-pdp-description__content');
    productDetails.description = descriptionElement ? descriptionElement.innerHTML.trim() : '';

    // Product New/Used Flag, and Amount of Sales
    const subtitleElement = document.querySelector('span.ui-pdp-subtitle');
    if (subtitleElement) {
        const subtitleText = subtitleElement.innerText.split('|');
        productDetails.condition = subtitleText[0]?.trim();
        productDetails.soldQuantity = subtitleText[1]?.trim();
    }

    // Amount of Reviews
    const reviewAmountElement = document.querySelector('span.ui-pdp-review__amount');
    productDetails.reviewAmount = reviewAmountElement ? reviewAmountElement.innerText.replace(/[()]/g, '') : 'Unknown';

    // Stars
    const starsElement = document.querySelector('p.ui-review-capability__rating__average');
    productDetails.stars = starsElement ? parseFloat(starsElement.innerText) : 'Unknown';

    return productDetails;
}




// Function to process each URL
function processUrl(url) {
  let result = {};
  if (url.includes('articulo.mercadolibre.com.co') && url.match(/MCO-\d+/)) {
      // Product Page
      result.type = "product_page";
      result.productId = url.split("/")[4].split("-")[1];
      result.productName = url.split("/")[4].split("-").slice(2).join(" ").split("_")[0];
  } else if (url.includes("categories")) {
        result.type = "category_page";
        result.categoryName = "root_category"
  } else if (url.includes("www.mercadolibre.com.co/c/")) {
      // Category Page
      result.type = "category_page";
      result.categoryName = url.split("/")[4].split("#")[0];
  } else if (url.includes("listado.mercadolibre.com.co/_Deal_")) {
      // Deal Page
      result.type = "deal_page";
      result.dealName = url.split("_Deal_")[1].split("#")[0];
  } else if (url.includes("listado.mercadolibre.com.co/") && url.includes("_")) {
      // Filtered Search Result
      result.type = "filtered_search_results";
      result.searchTerm = url.split(".com.co/")[1].split("_")[0];
      result.filters = url.split("_").slice(1).join("_").split("#")[0];
  } else if (url === "https://www.mercadolibre.com.co/") {
      // Home Page
      result.type = "Home Page";
  }
  // Add more conditions as needed for other patterns
  return result;
}








// open_tab
async function open_tab(url) {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({action: "open_new_tab", url: url}, function(response) {
            if (response.status === "tab_was_opened") {
                console.log("Tab was opened:", url);
                resolve(response.new_tab_id); // Ensure your background script sends back the new tab ID
            } else {
                reject(new Error("Failed to open tab"));
            }
            return true;
        });
    });
}




// close_tab
async function close_tab() {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({action: "close_current_tab"}, function(response) {
            if (response.status === "success") {
                console.log(response.message);
                resolve();
            } else {
                console.error(response.message);
                reject(new Error(response.message));
            }
        });
    });
}



async function extractLinks(url){
    return Array.from(document.querySelectorAll('a')).map(a => a.href);
}





// Utility functions for chrome.storage
async function isLinkVisited(link) {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get(['visitedLinks'], function(result) {
            const visitedLinks = result.visitedLinks || [];
            resolve(visitedLinks.includes(link));
        });
    });
}





async function markLinkAsVisited(link) {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get(['visitedLinks'], function(result) {
            const visitedLinks = result.visitedLinks || [];
            if (!visitedLinks.includes(link)) {
                visitedLinks.push(link);
                chrome.storage.local.set({visitedLinks: visitedLinks}, () => {
                    resolve();
                });
            } else {
                resolve();
            }
        });
    });
}




// The main recursive visitor function
async function visitor_link_tree(links, index = 0, parentTabId = null, allLinks = []) {
    if (index >= links.length) {
        console.log("Finished processing all links.");
        if (parentTabId) {
            await close_tab(parentTabId);
        }
        return;
    }

    const link = links[index];
    const visited = await isLinkVisited(link);

    if (!visited) {
        await markLinkAsVisited(link);
        chrome.runtime.sendMessage({ action: "open_new_tab", url: link }, async (response) => {
            if (response && response.status === "tab_was_opened") {
                console.log("New tab was opened successfully:", response.message);
                // Extract links from the newly opened tab
                const childLinks = await extractLinks(link); // Assume this function exists
                const newLinks = childLinks.filter(l => !allLinks.includes(l) && !links.includes(l));
                const updatedLinks = [...links, ...newLinks];
                allLinks.push(...newLinks); // Update the global list of all links encountered

                // Proceed to the next link
                await visitor_link_tree(updatedLinks, index + 1, parentTabId, allLinks);
            } else {
                console.error("Failed to open new tab or no response received.");
                // Skip to the next link if the current one failed
                await visitor_link_tree(links, index + 1, parentTabId, allLinks);
            }
        });
    } else {
        console.log("Link already visited:", link);
        // Skip to the next link without opening a new tab
        await visitor_link_tree(links, index + 1, parentTabId, allLinks);
    }
}



// -------------------------------- main ----------------------------------------


var products = [];


// Start the process with the root link
const rootLink = "https://www.mercadolibre.com.co/categorias#menu=categories";
const initialLinks = [rootLink]; // This would be your starting set of links
visitor_link_tree(initialLinks,0,null);
