console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 1);
function extractCategoriesAndSubcategories() {
console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 2);
  let categories = [];
console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 3);
  const categoryTitles = document.querySelectorAll('h2.categories__title[itemprop="name"]');
console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 4);

console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 5);
  categoryTitles.forEach((categoryTitle) => {
console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 6);
      const categoryName = categoryTitle.textContent.trim();
console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 7);
      const categoryLink = categoryTitle.querySelector('a').getAttribute('href');
console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 8);
      let subcategories = [];
console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 9);

console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 10);
      let subcategoryList = categoryTitle.nextElementSibling;
console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 11);
      if (subcategoryList && subcategoryList.tagName === 'UL') {
console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 12);
          const subcategoryItems = subcategoryList.querySelectorAll('li.categories__item[itemprop="name"]');
console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 13);
          subcategoryItems.forEach((item) => {
console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 14);
              const subcategoryName = item.querySelector('h3').textContent.trim();
console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 15);
              const subcategoryLink = item.querySelector('a').getAttribute('href');
console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 16);
              subcategories.push({ "subcategory_name": subcategoryName, "link": subcategoryLink });
console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 17);
          });
console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 18);
      }
console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 19);

console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 20);
      categories.push({ "category_name": categoryName, "link": categoryLink, "subcategories": subcategories });
console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 21);
  });
console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 22);

console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 23);
  return categories;
console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 24);
}
console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 25);

console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 26);

console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 27);

console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 28);

console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 29);
// Function to process each URL
console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 30);
function processUrl(url) {
console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 31);
    let result = {};
console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 32);
    if (url.includes("articulo.mercadolibre.com.co")) {
console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 33);
        // Product Page
console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 34);
        result.type = "product_page";
console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 35);
        result.productId = url.split("/")[4].split("-")[1];
console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 36);
        result.productName = url.split("/")[4].split("-").slice(2).join(" ").split("_")[0];
console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 37);
    } else if (url.includes("www.mercadolibre.com.co/c/")) {
console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 38);
        // Category Page
console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 39);
        result.type = "category_page";
console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 40);
        result.categoryName = url.split("/")[4].split("#")[0];
console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 41);
    } else if (url.includes("listado.mercadolibre.com.co/_Deal_")) {
console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 42);
        // Deal Page
console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 43);
        result.type = "deal_page";
console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 44);
        result.dealName = url.split("_Deal_")[1].split("#")[0];
console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 45);
    } else if (url.includes("listado.mercadolibre.com.co/") && url.includes("_")) {
console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 46);
        // Filtered Search Result
console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 47);
        result.type = "filtered_search_results";
console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 48);
        result.searchTerm = url.split(".com.co/")[1].split("_")[0];
console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 49);
        result.filters = url.split("_").slice(1).join("_").split("#")[0];
console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 50);
    } else if (url === "https://www.mercadolibre.com.co/") {
console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 51);
        // Home Page
console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 52);
        result.type = "Home Page";
console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 53);
    }
console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 54);
    // Add more conditions as needed for other patterns
console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 55);
    return result;
console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 56);
}
console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 57);

console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 58);

console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 59);

console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 60);

console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 61);

console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 62);
function downloadJSON(data, domain) {
console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 63);
  // Convert data to JSON string and create a Blob
console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 64);
  const jsonString = JSON.stringify(data, null, 2);
console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 65);
  const blob = new Blob([jsonString], { type: 'application/json' });
console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 66);
  const url = URL.createObjectURL(blob);
console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 67);

console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 68);
  // Create a link and set the URL as the href
console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 69);
  const a = document.createElement('a');
console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 70);
  a.href = url;
console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 71);
  a.download = `${domain}.json`;
console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 72);

console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 73);
  // Append the link to the body, click it, and then remove it
console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 74);
  document.body.appendChild(a);
console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 75);
  a.click();
console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 76);
  document.body.removeChild(a);
console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 77);

console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 78);
  // Revoke the blob URL
console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 79);
  URL.revokeObjectURL(url);
console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 80);
}
console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 81);

console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 82);
// Usage
console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 83);
const categoriesData = extractCategoriesAndSubcategories();
console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 84);
const domain = window.location.hostname;
console.log(new Date().toISOString(), "www.mercadolibre.com.co.js", 85);
downloadJSON(categoriesData, domain);