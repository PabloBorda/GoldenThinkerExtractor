const fs = require('fs');
const path = require('path');

// Object to hold the stats
const stats = {
    totalContacts: 0,
    totalSize: 0, // Total size of all files in bytes
    files: {},
    folders: {}
};

// Function to format file size
function formatSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

// Function to read JSON files and update stats
function processFile(filePath) {
    const content = fs.readFileSync(filePath);
    const data = JSON.parse(content);
    const contactCount = Array.isArray(data) ? data.length : 0;
    const fileSize = fs.statSync(filePath).size; // Get file size in bytes

    stats.totalContacts += contactCount;
    stats.totalSize += fileSize; // Update total size
    stats.files[filePath] = { contactCount, fileSize };

    const folderPath = path.dirname(filePath);
    if (!stats.folders[folderPath]) {
        stats.folders[folderPath] = { contactCount, fileSize };
    } else {
        stats.folders[folderPath].contactCount += contactCount;
        stats.folders[folderPath].fileSize += fileSize;
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

// Function to print the report
function printReport() {
    console.log('Contacts and file size per file:');
    Object.entries(stats.files).forEach(([file, { contactCount, fileSize }]) => {
        console.log(`${file}: Contacts = ${contactCount}, Size = ${formatSize(fileSize)}`);
    });

    console.log('\nContacts and total file size per folder:');
    Object.entries(stats.folders).forEach(([folder, { contactCount, fileSize }]) => {
        console.log(`${folder}: Contacts = ${contactCount}, Total Size = ${formatSize(fileSize)}`);
    });

    console.log(`\nTotal contacts: ${stats.totalContacts}`);
    console.log(`Total size of all files: ${formatSize(stats.totalSize)}`);
}

// Main function to start the process
function main() {
    const startDir = '.'; // Current directory
    findJsonFiles(startDir);
    printReport();
}

main();
