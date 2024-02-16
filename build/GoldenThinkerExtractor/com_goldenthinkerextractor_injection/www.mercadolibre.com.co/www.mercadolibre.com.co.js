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