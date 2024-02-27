function extractCategoriesAndSubcategories() {
    let categories = [];
    const categoryTitles = document.querySelectorAll('h2.categories__title[itemprop="name"]');

    categoryTitles.forEach((categoryTitle) => {
        const categoryName = categoryTitle.textContent.trim();
        const categoryLink = categoryTitle.querySelector('a').getAttribute('href');
        let subcategories = [];

        let subcategoryList = categoryTitle.nextElementSibling;
        if (subcategoryList && subcategoryList.tagName === 'UL') {
            const subcategoryItems = subcategoryList.querySelectorAll('li.categories__item[itemprop="name"]');
            subcategoryItems.forEach((item) => {
                const subcategoryName = item.querySelector('h3').textContent.trim();
                const subcategoryLink = item.querySelector('a').getAttribute('href');
                subcategories.push({ "subcategory_name": subcategoryName, "link": subcategoryLink });
            });
        }

        categories.push({ "category_name": categoryName, "link": categoryLink, "subcategories": subcategories });
    });

    return categories;
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



function closeCurrentAndActivatePreviousTab(currentcurrent_tab_id, previouscurrent_tab_id) {
  // Close the current tab
  chrome.tabs.remove(currentcurrent_tab_id, function() {
      // Once the tab is closed, activate the previous tab
      chrome.tabs.update(previouscurrent_tab_id, {active: true}, function(tab) {
          // Optional: You might want to focus the window of the activated tab
          chrome.windows.update(tab.windowId, {focused: true});
      });
  });
}


// Function to process each URL
function processUrl(url) {
  let result = {};
  if (url.includes('articulo.mercadolibre.com.co') && url.match(/MCO-\d+/)) {
      // Product Page
      result.type = "product_page";
      result.productId = url.split("/")[4].split("-")[1];
      result.productName = url.split("/")[4].split("-").slice(2).join(" ").split("_")[0];
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



function extractLinks() {
  const links = Array.from(document.querySelectorAll('a')).map(a => a.href);
  return links;
}
function getAllLinksInCurrentTab(callback) {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    const currentcurrent_tab_id = tabs[0].id;
    chrome.scripting.executeScript({
      target: {current_tab_id: currentcurrent_tab_id},
      function: extractLinks
    }, (injectionResults) => {
      for (const frameResult of injectionResults) {
        // frameResult.result is the array of links from the executed script
        callback(frameResult.result);
      }
    });
  });
}



var tab_stack = [];
categories = extractCategoriesAndSubcategories();
var visited_links = [];
var product_links = [];
var root_link = "https://www.mercadolibre.com.co/categorias#menu=categories";
var products = [];




function hasBeenVisited(link) {
  return visited_links.includes(link);
}


async function visitor_link_tree(links, index = 0, parentTabId = null) {
  if (index >= links.length) {
      console.log("Finished processing all links.");
      // Close the parent tab if it exists and we're done processing its children
      if (parentTabId) {
          await close_tab(parentTabId);
      }
      return;
  }

  const link = links[index];
  console.log("Processing link:", link);

  const linkType = processUrl(link);
  if (linkType.type === "product_page") {
      console.log("Extracting product details from", link);
      // Assuming extractProductDetails is an async function or returns a promise
      const productDetails = await extractProductDetails(link);
      products.push(productDetails);
      console.log("Product details extracted:", productDetails);
      // Continue with the next link after a delay to respect rate limits
      setTimeout(() => visitor_link_tree(links, index + 1, parentTabId), 1000); // Adjust delay as needed
  } else if (linkType.type === "category_page") {
      console.log("Opening category page:", link);
      // Open the category page in a new tab and wait for it to be processed
      const newTabId = await open_tab(link);
      // Extract links from the opened category page
      const childLinks = await extractLinks(newTabId); // Ensure this is adapted to work asynchronously
      // Process child links, then close the tab and move to the next link
      await visitor_link_tree(childLinks, 0, newTabId);
      visitor_link_tree(links, index + 1, parentTabId);
  } else {
      console.log("Skipping link:", link);
      visitor_link_tree(links, index + 1, parentTabId);
  }
}

async function open_tab(url) {
  return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage({action: "open_new_tab", url: url}, function(response) {
          if (response.status === "tab_was_opened") {
              console.log("Tab was opened:", url);
              resolve(response.new_tab_id); // Ensure your background script sends back the new tab ID
          } else {
              reject(new Error("Failed to open tab"));
          }
      });
  });
}

async function close_tab(tabId) {
  return new Promise((resolve) => {
      chrome.runtime.sendMessage({action: "close_current_tab", tabId: tabId}, function(response) {
          if (response.status === "success") {
              console.log("Tab closed successfully:", tabId);
              resolve();
          } else {
              console.error("Failed to close tab:", tabId);
              resolve(); // Resolve anyway to continue the process
          }
      });
  });
}

async function extractLinks(tabId) {
  return new Promise((resolve, reject) => {
      try {
          chrome.scripting.executeScript({
              target: {tabId: tabId},
              function: () => {
                  // This function is executed in the context of the webpage loaded in the tab.
                  const links = Array.from(document.querySelectorAll('a')).map(a => a.href);
                  return links;
              },
          }, (injectionResults) => {
              // Check for errors
              if (chrome.runtime.lastError || !injectionResults || injectionResults.length === 0) {
                  reject(new Error('Failed to execute script or no results returned.'));
                  return;
              }
              
              // Assuming the script was injected and executed successfully
              const extractedLinks = injectionResults[0].result;
              if (extractedLinks) {
                  resolve(extractedLinks);
              } else {
                  reject(new Error('No links extracted.'));
              }
          });
      } catch (error) {
          reject(error);
      }
  });
}



// Start the process with the root link
const rootLink = "https://www.mercadolibre.com.co/categorias#menu=categories";
const initialLinks = [rootLink]; // This would be your starting set of links
visitor_link_tree(initialLinks);
