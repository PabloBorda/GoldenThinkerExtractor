console.log(new Date().toISOString(), "postBuildProcess.js", 1);
const fs = require('fs');
console.log(new Date().toISOString(), "postBuildProcess.js", 2);
const path = require('path');
console.log(new Date().toISOString(), "postBuildProcess.js", 3);
const { spawnSync } = require('child_process');
console.log(new Date().toISOString(), "postBuildProcess.js", 4);

console.log(new Date().toISOString(), "postBuildProcess.js", 5);
function listJsFilesSync(dirPath, fileList = [], ignoreDirs = ['node_modules','build','com_goldenthinkerextractor_data']) {
console.log(new Date().toISOString(), "postBuildProcess.js", 6);
    const files = fs.readdirSync(dirPath, { withFileTypes: true });
console.log(new Date().toISOString(), "postBuildProcess.js", 7);
    files.forEach(file => {
console.log(new Date().toISOString(), "postBuildProcess.js", 8);
        const filePath = path.join(dirPath, file.name);
console.log(new Date().toISOString(), "postBuildProcess.js", 9);
        if (file.isDirectory()) {
console.log(new Date().toISOString(), "postBuildProcess.js", 10);
            if (!ignoreDirs.includes(file.name)) { // Check if the directory should be ignored
console.log(new Date().toISOString(), "postBuildProcess.js", 11);
                listJsFilesSync(filePath, fileList, ignoreDirs);
console.log(new Date().toISOString(), "postBuildProcess.js", 12);
            }
console.log(new Date().toISOString(), "postBuildProcess.js", 13);
        } else if (file.name.endsWith('.js')) {
console.log(new Date().toISOString(), "postBuildProcess.js", 14);
            fileList.push(filePath);
console.log(new Date().toISOString(), "postBuildProcess.js", 15);
        }
console.log(new Date().toISOString(), "postBuildProcess.js", 16);
    });
console.log(new Date().toISOString(), "postBuildProcess.js", 17);
    return fileList;
console.log(new Date().toISOString(), "postBuildProcess.js", 18);
}
console.log(new Date().toISOString(), "postBuildProcess.js", 19);

console.log(new Date().toISOString(), "postBuildProcess.js", 20);
function executeScriptForFiles(files) {
console.log(new Date().toISOString(), "postBuildProcess.js", 21);
    files.forEach(file => {
console.log(new Date().toISOString(), "postBuildProcess.js", 22);
        console.log(`Executing autolog.js for: ${file}`);
console.log(new Date().toISOString(), "postBuildProcess.js", 23);
        const result = spawnSync('node', ['autolog.js', file], { stdio: 'inherit' });
console.log(new Date().toISOString(), "postBuildProcess.js", 24);
        if (result.error) {
console.log(new Date().toISOString(), "postBuildProcess.js", 25);
            console.error(`Error executing autolog.js for ${file}:`, result.error);
console.log(new Date().toISOString(), "postBuildProcess.js", 26);
        }
console.log(new Date().toISOString(), "postBuildProcess.js", 27);
    });
console.log(new Date().toISOString(), "postBuildProcess.js", 28);
}
console.log(new Date().toISOString(), "postBuildProcess.js", 29);

console.log(new Date().toISOString(), "postBuildProcess.js", 30);
// Example usage:
console.log(new Date().toISOString(), "postBuildProcess.js", 31);
const startPath = __dirname;
console.log(new Date().toISOString(), "postBuildProcess.js", 32);
const jsFiles = listJsFilesSync(startPath);
console.log(new Date().toISOString(), "postBuildProcess.js", 33);
executeScriptForFiles(jsFiles);
console.log(new Date().toISOString(), "postBuildProcess.js", 34);
