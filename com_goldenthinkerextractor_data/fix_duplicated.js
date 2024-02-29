const fs = require('fs');
const path = require('path');

// Function to remove duplicates from an array of contacts
function removeDuplicates(data) {
    const uniqueContacts = new Map();

    data.forEach(contact => {
        // Create a composite key for each contact
        const compositeKey = `${contact.name}|${contact.company}|${contact.jobTitle}`;
        // Only add the contact if the composite key hasn't been seen before
        if (!uniqueContacts.has(compositeKey)) {
            uniqueContacts.set(compositeKey, contact);
        }
    });

    // Return an array of the unique contacts
    return Array.from(uniqueContacts.values());
}

// Function to process a single JSON file
function processFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(content);
    if (!Array.isArray(data)) {
        console.error(`Skipping ${filePath}: Not an array.`);
        return;
    }

    const deduplicatedData = removeDuplicates(data);
    fs.writeFileSync(filePath, JSON.stringify(deduplicatedData, null, 2), 'utf8');
    console.log(`Processed ${filePath}: Reduced from ${data.length} to ${deduplicatedData.length} contacts.`);
}

// Recursive function to find and process JSON files in a directory
function findAndProcessJsonFiles(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    entries.forEach(entry => {
        const entryPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            findAndProcessJsonFiles(entryPath);
        } else if (entry.isFile() && entry.name.endsWith('.json')) {
            processFile(entryPath);
        }
    });
}

// Main function to start the process
function main() {
    const startDir = '.'; // Specify the directory to start from
    findAndProcessJsonFiles(startDir);
}

main();
