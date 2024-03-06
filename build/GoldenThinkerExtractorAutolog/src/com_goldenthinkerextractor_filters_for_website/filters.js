console.log(new Date().toISOString(), "filters.js", 1);
export function extractFiltersAndValues() {
console.log(new Date().toISOString(), "filters.js", 2);
    const results = [];
console.log(new Date().toISOString(), "filters.js", 3);
  
console.log(new Date().toISOString(), "filters.js", 4);
    // Function to clean text and remove invisible characters
console.log(new Date().toISOString(), "filters.js", 5);
    const cleanText = (text) => text.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim();
console.log(new Date().toISOString(), "filters.js", 6);
  
console.log(new Date().toISOString(), "filters.js", 7);
    // Select all filter groups
console.log(new Date().toISOString(), "filters.js", 8);
    document.querySelectorAll('fieldset[data-x-search-filter]').forEach(fieldset => {
console.log(new Date().toISOString(), "filters.js", 9);
      const searchFilter = cleanText(fieldset.getAttribute('title')); // Get the filter name from the title attribute
console.log(new Date().toISOString(), "filters.js", 10);
      const filters = [];
console.log(new Date().toISOString(), "filters.js", 11);
  
console.log(new Date().toISOString(), "filters.js", 12);
      // Find all selected filter values within the <ul> list
console.log(new Date().toISOString(), "filters.js", 13);
      fieldset.querySelectorAll('ul li div[title]').forEach(filterElement => {
console.log(new Date().toISOString(), "filters.js", 14);
        const filterValue = cleanText(filterElement.getAttribute('title')); // Use the title attribute of the div to get the filter value
console.log(new Date().toISOString(), "filters.js", 15);
        if (filterValue) {
console.log(new Date().toISOString(), "filters.js", 16);
          filters.push(filterValue);
console.log(new Date().toISOString(), "filters.js", 17);
        }
console.log(new Date().toISOString(), "filters.js", 18);
      });
console.log(new Date().toISOString(), "filters.js", 19);
  
console.log(new Date().toISOString(), "filters.js", 20);
      // Add the filter group and its values to the results
console.log(new Date().toISOString(), "filters.js", 21);
      results.push({
console.log(new Date().toISOString(), "filters.js", 22);
        parent: {
console.log(new Date().toISOString(), "filters.js", 23);
          search_filter: searchFilter,
console.log(new Date().toISOString(), "filters.js", 24);
          filters: filters
console.log(new Date().toISOString(), "filters.js", 25);
        }
console.log(new Date().toISOString(), "filters.js", 26);
      });
console.log(new Date().toISOString(), "filters.js", 27);
    });
console.log(new Date().toISOString(), "filters.js", 28);
  
console.log(new Date().toISOString(), "filters.js", 29);
    console.log(JSON.stringify(results, null, 2));
console.log(new Date().toISOString(), "filters.js", 30);
    return results;
console.log(new Date().toISOString(), "filters.js", 31);
  }
console.log(new Date().toISOString(), "filters.js", 32);

console.log(new Date().toISOString(), "filters.js", 33);
  export function extractFiltersAndValuesForDefault() {
console.log(new Date().toISOString(), "filters.js", 34);
    let resultString = "";
console.log(new Date().toISOString(), "filters.js", 35);

console.log(new Date().toISOString(), "filters.js", 36);
    // Function to clean text and remove invisible characters
console.log(new Date().toISOString(), "filters.js", 37);
    const cleanText = (text) => text.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim();
console.log(new Date().toISOString(), "filters.js", 38);

console.log(new Date().toISOString(), "filters.js", 39);
    // Select all filter groups
console.log(new Date().toISOString(), "filters.js", 40);
    document.querySelectorAll('fieldset[data-x-search-filter]').forEach((fieldset, index, array) => {
console.log(new Date().toISOString(), "filters.js", 41);
        const searchFilter = cleanText(fieldset.getAttribute('title')); // Get the filter name from the title attribute
console.log(new Date().toISOString(), "filters.js", 42);
        let filters = [];
console.log(new Date().toISOString(), "filters.js", 43);

console.log(new Date().toISOString(), "filters.js", 44);
        // Find all selected filter values within the <ul> list
console.log(new Date().toISOString(), "filters.js", 45);
        fieldset.querySelectorAll('ul li div[title]').forEach(filterElement => {
console.log(new Date().toISOString(), "filters.js", 46);
            const filterValue = cleanText(filterElement.getAttribute('title')); // Use the title attribute of the div to get the filter value
console.log(new Date().toISOString(), "filters.js", 47);
            if (filterValue) {
console.log(new Date().toISOString(), "filters.js", 48);
                filters.push(filterValue);
console.log(new Date().toISOString(), "filters.js", 49);
            }
console.log(new Date().toISOString(), "filters.js", 50);
        });
console.log(new Date().toISOString(), "filters.js", 51);

console.log(new Date().toISOString(), "filters.js", 52);
        // Concatenate the filter group and its values
console.log(new Date().toISOString(), "filters.js", 53);
        if (filters.length > 0) {
console.log(new Date().toISOString(), "filters.js", 54);
            // Add the current group's filters to the result string, separated by underscores
console.log(new Date().toISOString(), "filters.js", 55);
            resultString += (resultString ? "_" : "") + filters.join("_");
console.log(new Date().toISOString(), "filters.js", 56);
        }
console.log(new Date().toISOString(), "filters.js", 57);
    });
console.log(new Date().toISOString(), "filters.js", 58);

console.log(new Date().toISOString(), "filters.js", 59);
    console.log(resultString);
console.log(new Date().toISOString(), "filters.js", 60);
    return resultString;
console.log(new Date().toISOString(), "filters.js", 61);
}