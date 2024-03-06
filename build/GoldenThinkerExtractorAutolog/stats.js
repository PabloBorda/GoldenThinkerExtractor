console.log(new Date().toISOString(), "stats.js", 1);
const fs = require('fs');
console.log(new Date().toISOString(), "stats.js", 2);
const path = require('path');
console.log(new Date().toISOString(), "stats.js", 3);

console.log(new Date().toISOString(), "stats.js", 4);
// Object to hold the stats
console.log(new Date().toISOString(), "stats.js", 5);
const stats = {
console.log(new Date().toISOString(), "stats.js", 6);
    totalContacts: 0,
console.log(new Date().toISOString(), "stats.js", 7);
    totalSize: 0, // Total size of all files in bytes
console.log(new Date().toISOString(), "stats.js", 8);
    files: {},
console.log(new Date().toISOString(), "stats.js", 9);
    folders: {},
console.log(new Date().toISOString(), "stats.js", 10);
    totalDuplicates: 0 // Total number of duplicate contacts
console.log(new Date().toISOString(), "stats.js", 11);
};
console.log(new Date().toISOString(), "stats.js", 12);

console.log(new Date().toISOString(), "stats.js", 13);
// Function to format file size
console.log(new Date().toISOString(), "stats.js", 14);
function formatSize(bytes) {
console.log(new Date().toISOString(), "stats.js", 15);
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
console.log(new Date().toISOString(), "stats.js", 16);
    if (bytes === 0) return '0 Byte';
console.log(new Date().toISOString(), "stats.js", 17);
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
console.log(new Date().toISOString(), "stats.js", 18);
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
console.log(new Date().toISOString(), "stats.js", 19);
}
console.log(new Date().toISOString(), "stats.js", 20);

console.log(new Date().toISOString(), "stats.js", 21);
// Function to count duplicates in an array of contacts
console.log(new Date().toISOString(), "stats.js", 22);
function countDuplicates(data) {
console.log(new Date().toISOString(), "stats.js", 23);
    const uniqueContacts = new Set();
console.log(new Date().toISOString(), "stats.js", 24);
    let duplicatesCount = 0;
console.log(new Date().toISOString(), "stats.js", 25);

console.log(new Date().toISOString(), "stats.js", 26);
    data.forEach(contact => {
console.log(new Date().toISOString(), "stats.js", 27);
        const compositeKey = `${contact.name}|${contact.company}|${contact.jobTitle}`;
console.log(new Date().toISOString(), "stats.js", 28);
        if (uniqueContacts.has(compositeKey)) {
console.log(new Date().toISOString(), "stats.js", 29);
            duplicatesCount++;
console.log(new Date().toISOString(), "stats.js", 30);
        } else {
console.log(new Date().toISOString(), "stats.js", 31);
            uniqueContacts.add(compositeKey);
console.log(new Date().toISOString(), "stats.js", 32);
        }
console.log(new Date().toISOString(), "stats.js", 33);
    });
console.log(new Date().toISOString(), "stats.js", 34);

console.log(new Date().toISOString(), "stats.js", 35);
    return duplicatesCount; // Return the count of detected duplicates.
console.log(new Date().toISOString(), "stats.js", 36);
}
console.log(new Date().toISOString(), "stats.js", 37);

console.log(new Date().toISOString(), "stats.js", 38);
// Modified processFile function to use the updated duplicate counting logic
console.log(new Date().toISOString(), "stats.js", 39);
function processFile(filePath) {
console.log(new Date().toISOString(), "stats.js", 40);
    const content = fs.readFileSync(filePath, 'utf8');
console.log(new Date().toISOString(), "stats.js", 41);
    const data = JSON.parse(content);
console.log(new Date().toISOString(), "stats.js", 42);
    const contactCount = Array.isArray(data) ? data.length : 0;
console.log(new Date().toISOString(), "stats.js", 43);
    const fileSize = fs.statSync(filePath).size;
console.log(new Date().toISOString(), "stats.js", 44);
    const duplicateCount = countDuplicates(data);
console.log(new Date().toISOString(), "stats.js", 45);

console.log(new Date().toISOString(), "stats.js", 46);
    stats.totalContacts += contactCount;
console.log(new Date().toISOString(), "stats.js", 47);
    stats.totalSize += fileSize;
console.log(new Date().toISOString(), "stats.js", 48);
    stats.totalDuplicates += duplicateCount;
console.log(new Date().toISOString(), "stats.js", 49);
    stats.files[filePath] = { contactCount, fileSize, duplicateCount };
console.log(new Date().toISOString(), "stats.js", 50);

console.log(new Date().toISOString(), "stats.js", 51);
    const folderPath = path.dirname(filePath);
console.log(new Date().toISOString(), "stats.js", 52);
    if (!stats.folders[folderPath]) {
console.log(new Date().toISOString(), "stats.js", 53);
        stats.folders[folderPath] = { totalContacts: contactCount, totalFileSize: fileSize, totalDuplicateCount: duplicateCount };
console.log(new Date().toISOString(), "stats.js", 54);
    } else {
console.log(new Date().toISOString(), "stats.js", 55);
        stats.folders[folderPath].totalContacts += contactCount;
console.log(new Date().toISOString(), "stats.js", 56);
        stats.folders[folderPath].totalFileSize += fileSize;
console.log(new Date().toISOString(), "stats.js", 57);
        stats.folders[folderPath].totalDuplicateCount += duplicateCount;
console.log(new Date().toISOString(), "stats.js", 58);
    }
console.log(new Date().toISOString(), "stats.js", 59);
}
console.log(new Date().toISOString(), "stats.js", 60);

console.log(new Date().toISOString(), "stats.js", 61);
// Recursive function to find JSON files
console.log(new Date().toISOString(), "stats.js", 62);
function findJsonFiles(dir) {
console.log(new Date().toISOString(), "stats.js", 63);
    const entries = fs.readdirSync(dir, { withFileTypes: true });
console.log(new Date().toISOString(), "stats.js", 64);
    entries.forEach(entry => {
console.log(new Date().toISOString(), "stats.js", 65);
        const entryPath = path.join(dir, entry.name);
console.log(new Date().toISOString(), "stats.js", 66);
        if (entry.isDirectory()) {
console.log(new Date().toISOString(), "stats.js", 67);
            findJsonFiles(entryPath);
console.log(new Date().toISOString(), "stats.js", 68);
        } else if (entry.isFile() && entry.name.endsWith('.json')) {
console.log(new Date().toISOString(), "stats.js", 69);
            processFile(entryPath);
console.log(new Date().toISOString(), "stats.js", 70);
        }
console.log(new Date().toISOString(), "stats.js", 71);
    });
console.log(new Date().toISOString(), "stats.js", 72);
}
console.log(new Date().toISOString(), "stats.js", 73);

console.log(new Date().toISOString(), "stats.js", 74);
// Function to print the report in a tabulated format
console.log(new Date().toISOString(), "stats.js", 75);
function printReport() {
console.log(new Date().toISOString(), "stats.js", 76);
    console.log('File/Folder, Contacts, Size, Duplicates, Path');
console.log(new Date().toISOString(), "stats.js", 77);
    Object.entries(stats.files).forEach(([file, { contactCount, fileSize, duplicateCount }]) => {
console.log(new Date().toISOString(), "stats.js", 78);
        console.log(`File, ${contactCount}, ${formatSize(fileSize)}, ${duplicateCount}, ${file}`);
console.log(new Date().toISOString(), "stats.js", 79);
    });
console.log(new Date().toISOString(), "stats.js", 80);

console.log(new Date().toISOString(), "stats.js", 81);
    Object.entries(stats.folders).forEach(([folder, { totalContacts, totalFileSize, totalDuplicateCount }]) => {
console.log(new Date().toISOString(), "stats.js", 82);
        console.log(`Folder, ${totalContacts}, ${formatSize(totalFileSize)}, ${totalDuplicateCount}, ${folder}`);
console.log(new Date().toISOString(), "stats.js", 83);
    });
console.log(new Date().toISOString(), "stats.js", 84);

console.log(new Date().toISOString(), "stats.js", 85);
    console.log(`Total, ${stats.totalContacts}, ${formatSize(stats.totalSize)}, ${stats.totalDuplicates}`);
console.log(new Date().toISOString(), "stats.js", 86);
}
console.log(new Date().toISOString(), "stats.js", 87);

console.log(new Date().toISOString(), "stats.js", 88);
// Function to generate a CSV file with stats
console.log(new Date().toISOString(), "stats.js", 89);
function generateCSV() {
console.log(new Date().toISOString(), "stats.js", 90);
    const header = "Type,Contacts,Size (Bytes),Duplicates,Path\n";
console.log(new Date().toISOString(), "stats.js", 91);
    let csvContent = header;
console.log(new Date().toISOString(), "stats.js", 92);

console.log(new Date().toISOString(), "stats.js", 93);
    Object.entries(stats.files).forEach(([file, { contactCount, fileSize, duplicateCount }]) => {
console.log(new Date().toISOString(), "stats.js", 94);
        csvContent += `File,${contactCount},${fileSize},${duplicateCount},"${file}"\n`;
console.log(new Date().toISOString(), "stats.js", 95);
    });
console.log(new Date().toISOString(), "stats.js", 96);

console.log(new Date().toISOString(), "stats.js", 97);
    Object.entries(stats.folders).forEach(([folder, { totalContacts, totalFileSize, totalDuplicateCount }]) => {
console.log(new Date().toISOString(), "stats.js", 98);
        csvContent += `Folder,${totalContacts},${totalFileSize},${totalDuplicateCount},"${folder}"\n`;
console.log(new Date().toISOString(), "stats.js", 99);
    });
console.log(new Date().toISOString(), "stats.js", 100);

console.log(new Date().toISOString(), "stats.js", 101);
    fs.writeFileSync('stats.csv', csvContent, 'utf8');
console.log(new Date().toISOString(), "stats.js", 102);
    console.log('Stats CSV file has been generated.');
console.log(new Date().toISOString(), "stats.js", 103);
}
console.log(new Date().toISOString(), "stats.js", 104);

console.log(new Date().toISOString(), "stats.js", 105);
// Main function to start the process
console.log(new Date().toISOString(), "stats.js", 106);
function main() {
console.log(new Date().toISOString(), "stats.js", 107);
    const startDir = 'com_goldenthinkerextractor_data'; // Specify the directory to start from
console.log(new Date().toISOString(), "stats.js", 108);
    findJsonFiles(startDir);
console.log(new Date().toISOString(), "stats.js", 109);
    printReport();
console.log(new Date().toISOString(), "stats.js", 110);
    generateCSV();
console.log(new Date().toISOString(), "stats.js", 111);
}
console.log(new Date().toISOString(), "stats.js", 112);

console.log(new Date().toISOString(), "stats.js", 113);
main();
console.log(new Date().toISOString(), "stats.js", 114);
