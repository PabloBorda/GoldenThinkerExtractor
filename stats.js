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
    const uniqueContacts = new Set();
    let duplicatesCount = 0;

    data.forEach(contact => {
        const compositeKey = `${contact.name}|${contact.company}|${contact.jobTitle}`;
        if (uniqueContacts.has(compositeKey)) {
            duplicatesCount++;
        } else {
            uniqueContacts.add(compositeKey);
        }
    });

    return duplicatesCount; // Return the count of detected duplicates.
}

// Modified processFile function to use the updated duplicate counting logic
function processFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(content);
    const contactCount = Array.isArray(data) ? data.length : 0;
    const fileSize = fs.statSync(filePath).size;
    const duplicateCount = countDuplicates(data);

    stats.totalContacts += contactCount;
    stats.totalSize += fileSize;
    stats.totalDuplicates += duplicateCount;
    stats.files[filePath] = { contactCount, fileSize, duplicateCount };

    const folderPath = path.dirname(filePath);
    if (!stats.folders[folderPath]) {
        stats.folders[folderPath] = { totalContacts: contactCount, totalFileSize: fileSize, totalDuplicateCount: duplicateCount };
    } else {
        stats.folders[folderPath].totalContacts += contactCount;
        stats.folders[folderPath].totalFileSize += fileSize;
        stats.folders[folderPath].totalDuplicateCount += duplicateCount;
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
    console.log('File/Folder, Contacts, Size, Duplicates, Path');
    Object.entries(stats.files).forEach(([file, { contactCount, fileSize, duplicateCount }]) => {
        console.log(`File, ${contactCount}, ${formatSize(fileSize)}, ${duplicateCount}, ${file}`);
    });

    Object.entries(stats.folders).forEach(([folder, { totalContacts, totalFileSize, totalDuplicateCount }]) => {
        console.log(`Folder, ${totalContacts}, ${formatSize(totalFileSize)}, ${totalDuplicateCount}, ${folder}`);
    });

    console.log(`Total, ${stats.totalContacts}, ${formatSize(stats.totalSize)}, ${stats.totalDuplicates}`);
}

// Function to generate a CSV file with stats
function generateCSV() {
    const header = "Type,Contacts,Size (Bytes),Duplicates,Path\n";
    let csvContent = header;

    Object.entries(stats.files).forEach(([file, { contactCount, fileSize, duplicateCount }]) => {
        csvContent += `File,${contactCount},${fileSize},${duplicateCount},"${file}"\n`;
    });

    Object.entries(stats.folders).forEach(([folder, { totalContacts, totalFileSize, totalDuplicateCount }]) => {
        csvContent += `Folder,${totalContacts},${totalFileSize},${totalDuplicateCount},"${folder}"\n`;
    });

    fs.writeFileSync('stats.csv', csvContent, 'utf8');
    console.log('Stats CSV file has been generated.');
}

// Main function to start the process
function main() {
    const startDir = 'com_goldenthinkerextractor_data'; // Specify the directory to start from
    findJsonFiles(startDir);
    printReport();
    generateCSV();
}

main();
