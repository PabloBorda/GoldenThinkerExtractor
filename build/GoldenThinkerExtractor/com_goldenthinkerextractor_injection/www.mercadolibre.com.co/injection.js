function logStoredLinks() {
    chrome.storage.local.get(['links'], function(result) {
        if (result.links) {
            console.log('Stored links:', result.links);
        } else {
            console.log('No links stored.');
        }
    });
}




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
      console.log("Processing as product page:", url);
      result.type = "product_page";
      result.productId = url.split("/")[4].split("-")[1];
      result.productName = url.split("/")[4].split("-").slice(2).join(" ").split("_")[0];
    } else if (url.includes("categories")) {
      console.log("Processing as category page:", url);
      result.type = "category_page";
      result.categoryName = "root_category";
    } else {
      console.log("Processing as other type of page:", url);
      result.type = "other";
    }
    return result;
  }



// open_tab
async function open_tab(url) {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({action: "open_new_tab", url: url}, (response) => {
            if (response && response.status === "tab_was_opened") {
                console.log("Tab was opened:", url, "with ID:", response.new_tab_id);
                resolve(response.new_tab_id);
            } else {
                console.error("Failed to open tab or no response received.");
                reject(new Error("Failed to open tab or no response received."));
            }
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




// Function to check if a link is visited
async function isLinkVisited(linkUrl) {
    console.log("Checking if link is visited:", linkUrl);
    return new Promise((resolve) => {
      chrome.storage.local.get(['links'], function(result) {
        const visited = result.links && result.links.some(link => link.url === linkUrl);
        console.log("Visited status for", linkUrl, ":", visited);
        resolve(visited);
      });
    });
  }




// Update or add link details in the global storage
async function updateLinkDetails(link, productDetails = null) {
    console.log("Updating link details for:", link);
    return new Promise((resolve) => {
      chrome.storage.local.get(['links'], function(result) {
        let links = result.links || [];
        const existingLinkIndex = links.findIndex(l => l.url === link);
  
        if (existingLinkIndex !== -1) {
          console.log("Link exists. Updating:", link);
          links[existingLinkIndex].updated = new Date().toISOString();
          if (productDetails) {
            links[existingLinkIndex].product_data = productDetails;
          }
        } else {
          console.log("New link. Adding:", link);
          links.push({
            url: link,
            updated: new Date().toISOString(),
            product_data: productDetails,
            mirrors: []
          });
        }
  
        chrome.storage.local.set({links}, () => {
          console.log("Link details updated in storage for:", link);
          resolve();
        });
      });
    });
  }





// Revised visitor_link_tree function with processUrl and extractProductDetails integration
async function visitor_link_tree(links, index = 0, parentTabId = null) {
    if (index >= links.length) {
        console.log("Finished processing all links.");
        if (parentTabId) {
            console.log("Closing parent tab id:", parentTabId);
            await close_tab(parentTabId);
        }
        return;
    }

    const link = links[index];
    console.log("Processing link:", link);
    const linkType = processUrl(link); // Determine the type of the link
    console.log("Link type determined as:", linkType.type);

    // Check if the link has already been visited
    const visited = await isLinkVisited(link);
    console.log("Visited status for", link, ":", visited);

    if (!visited) {
        let productDetails = null;
        if (linkType.type === "product_page") {
            console.log("Extracting product details for:", link);
            productDetails = extractProductDetails(); // Adjust if this needs to be done asynchronously
            console.log("Product details extracted:", productDetails);
        }
        await updateLinkDetails(link, productDetails);
        console.log("Link details updated for:", link);

        // Random delay between 1 to 3 seconds
        const delay = Math.floor(Math.random() * (3000 - 1000 + 1)) + 1000;
        console.log(`Waiting for ${delay}ms before opening the next tab for link: ${link}`);

        setTimeout(async () => {
            await open_tab(link); // Open the tab and wait for it to load
            console.log("New tab was opened successfully for:", link);

            // Extract and process new links from the opened tab's content
            const childLinks = await extractLinks(link); // Adjust if this needs to be done differently
            console.log("Extracted child links:", childLinks);

            const newLinks = childLinks.filter(l => !links.includes(l));
            links = [...links, ...newLinks]; // Update the list of links to include newly discovered ones
            console.log("Updated links list with new discoveries:", links);

            // Proceed to the next link
            await visitor_link_tree(links, index + 1, parentTabId);
        }, delay);
    } else {
        console.log("Link already visited, skipping:", link);
        // Skip to the next link without opening a new tab
        await visitor_link_tree(links, index + 1, parentTabId);
    }
}


// Revised visitor_link_tree function for BFS with tab opening for all links and random delay
async function visitor_link_tree_bfs(rootLinks) {
    let queue = [...rootLinks]; // Initialize the queue with root links
    let visited = new Set(); // Keep track of visited links to avoid revisits

    while (queue.length > 0) {
        const currentLink = queue.shift(); // Dequeue the next link to visit

        if (visited.has(currentLink)) {
            continue; // Skip if already visited
        }
        visited.add(currentLink); // Mark this link as visited

        // Determine the type of the current link
        const linkType = processUrl(currentLink);
        console.log("Visiting link:", currentLink, "Type:", linkType.type);

        // Open the tab and wait for it to be ready
        try {
            const tabId = await open_tab(currentLink);
            console.log("Tab opened successfully for:", currentLink, "Tab ID:", tabId);

            // Here, you would extract links or product details from the tab.
            // Since we're simulating, let's assume you have a function to do this:
            // For product pages, extract product details
            let productDetails = null;
            if (linkType.type === "product_page") {
                productDetails = await extractProductDetails(); // Simulated function
                await updateLinkDetails(currentLink, productDetails);
            }

            // For all pages, extract links and add them to the queue
            const childLinks = await extractLinks(currentLink); // Simulated function
            childLinks.forEach(link => {
                if (!visited.has(link)) {
                    queue.push(link);
                }
            });

            // Close the tab if necessary
            await close_tab(tabId);
        } catch (error) {
            console.error("Error processing link:", currentLink, error);
        }

        // Implement a delay between processing each link
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    }

    console.log("Finished visiting all links");
}

// -------------------------------- main ----------------------------------------



const rootLinks = ["https://www.mercadolibre.com.co/categorias#menu=categories"];
visitor_link_tree_bfs(rootLinks);
