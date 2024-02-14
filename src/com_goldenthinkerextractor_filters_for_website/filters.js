function extractFiltersAndValues() {
  const results = [];

  // Function to clean text and remove invisible characters
  const cleanText = (text) => text.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim();

  // Select all filter groups
  document.querySelectorAll('fieldset[data-x-search-filter]').forEach(fieldset => {
    const searchFilter = cleanText(fieldset.getAttribute('title')); // Get the filter name from the title attribute
    const filters = [];

    // Find all selected filter values within the <ul> list
    fieldset.querySelectorAll('ul li div[title]').forEach(filterElement => {
      const filterValue = cleanText(filterElement.getAttribute('title')); // Use the title attribute of the div to get the filter value
      if (filterValue) {
        filters.push(filterValue);
      }
    });

    // Add the filter group and its values to the results
    results.push({
      parent: {
        search_filter: searchFilter,
        filters: filters
      }
    });
  });

  console.log(JSON.stringify(results, null, 2));
}

extractFiltersAndValues();