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




// Function to process each URL
function processUrl(url) {
    let result = {};
    if (url.includes("articulo.mercadolibre.com.co")) {
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





function downloadJSON(data, domain) {
  // Convert data to JSON string and create a Blob
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  // Create a link and set the URL as the href
  const a = document.createElement('a');
  a.href = url;
  a.download = `${domain}.json`;

  // Append the link to the body, click it, and then remove it
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  // Revoke the blob URL
  URL.revokeObjectURL(url);
}

// Usage
const categoriesData = extractCategoriesAndSubcategories();
const domain = window.location.hostname;
downloadJSON(categoriesData, domain);