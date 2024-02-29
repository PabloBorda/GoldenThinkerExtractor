const fs = require('fs');
const path = require('path');

// Object to hold the stats
const stats = {
    totalContacts: 0,
    totalSize: 0, // Total size of all files in bytes
    files: {},
    folders: {},
    totalDuplicates: 0 // Total number of duplicate contacts
};

// Function to format file size
function formatSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}


// Function to count duplicates in an array of contacts
function countDuplicates(data) {
    const uniqueIds = new Set();
    const duplicates = data.filter(contact => {
        const uniqueId = `${contact.name}|${contact.company}|${contact.jobTitle}`;
        return uniqueIds.has(uniqueId) ? true : uniqueIds.add(uniqueId);
    });
    return duplicates.length;
}


// Function to read JSON files and update stats
function processFile(filePath) {
    const content = fs.readFileSync(filePath);
    const data = JSON.parse(content);
    const contactCount = Array.isArray(data) ? data.length : 0;
    const fileSize = fs.statSync(filePath).size; // Get file size in bytes
    const duplicateCount = countDuplicates(data); // Count duplicates

    stats.totalContacts += contactCount;
    stats.totalSize += fileSize; // Update total size
    stats.totalDuplicates += duplicateCount; // Update total duplicates
    stats.files[filePath] = { contactCount, fileSize, duplicateCount };

    const folderPath = path.dirname(filePath);
    if (!stats.folders[folderPath]) {
        stats.folders[folderPath] = { contactCount, fileSize, duplicateCount };
    } else {
        stats.folders[folderPath].contactCount += contactCount;
        stats.folders[folderPath].fileSize += fileSize;
        stats.folders[folderPath].duplicateCount += duplicateCount; // Update folder-level duplicates
    }
}


// Recursive function to find JSON files
function findJsonFiles(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    entries.forEach(entry => {
        const entryPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            findJsonFiles(entryPath);
        } else if (entry.isFile() && entry.name.endsWith('.json')) {
            processFile(entryPath);
        }
    });
}

// Function to print the report in a tabulated format
function printReport() {
    // Print column names
    console.log('File/Folder', 'Contacts', 'Size', 'Duplicates'.padEnd(10), 'Path');
    console.log('-----------', '--------', '----', '----------', '----');

    // Print stats for each file
    Object.entries(stats.files).forEach(([file, { contactCount, fileSize, duplicateCount }]) => {
        console.log(
            'File',
            String(contactCount).padStart(8),
            formatSize(fileSize).padStart(4),
            String(duplicateCount).padStart(10),
            file
        );
    });

    console.log('\n'); // Add a newline for readability

    // Print stats for each folder
    Object.entries(stats.folders).forEach(([folder, { contactCount, fileSize, duplicateCount }]) => {
        console.log(
            'Folder',
            String(contactCount).padStart(8),
            formatSize(fileSize).padStart(4),
            String(duplicateCount).padStart(10),
            folder
        );
    });

    console.log('\n'); // Add a newline for readability

    // Print total stats
    console.log('Total', String(stats.totalContacts).padStart(8), formatSize(stats.totalSize).padStart(4), String(stats.totalDuplicates).padStart(10));
}


// Function to generate a CSV file with stats
function generateCSV() {
    // Define the header for the CSV file
    const header = "File,Contacts,Size (Bytes),Duplicates\n";
    let csvContent = header;

    // Iterate over each file to append its stats to the CSV content
    Object.entries(stats.files).forEach(([file, { contactCount, fileSize, duplicateCount }]) => {
        // Create a CSV row for the current file
        const row = `"${file}",${contactCount},${fileSize},${duplicateCount}\n`;
        csvContent += row;
    });

    // Write the CSV content to a file
    fs.writeFileSync('stats.csv', csvContent, 'utf8');
    console.log('Stats CSV file has been generated.');
}


// Main function to start the process
function main() {
    const startDir = '.'; // Current directory
    findJsonFiles(startDir);
    printReport();
    generateCSV(); // Generate CSV after printing the report
}

main();
