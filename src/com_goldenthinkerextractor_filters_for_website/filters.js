export function extractFiltersAndValues() {
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
    return results;
  }

  export function extractFiltersAndValuesForDefault() {
    let resultString = "";

    // Function to clean text and remove invisible characters
    const cleanText = (text) => text.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim();

    // Select all filter groups
    document.querySelectorAll('fieldset[data-x-search-filter]').forEach((fieldset, index, array) => {
        const searchFilter = cleanText(fieldset.getAttribute('title')); // Get the filter name from the title attribute
        let filters = [];

        // Find all selected filter values within the <ul> list
        fieldset.querySelectorAll('ul li div[title]').forEach(filterElement => {
            const filterValue = cleanText(filterElement.getAttribute('title')); // Use the title attribute of the div to get the filter value
            if (filterValue) {
                filters.push(filterValue);
            }
        });

        // Concatenate the filter group and its values
        if (filters.length > 0) {
            // Add the current group's filters to the result string, separated by underscores
            resultString += (resultString ? "_" : "") + filters.join("_");
        }
    });

    console.log(resultString);
    return resultString;
}