const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

function listJsFilesSync(dirPath, fileList = [], ignoreDirs = ['node_modules','build','com_goldenthinkerextractor_data']) {
    const files = fs.readdirSync(dirPath, { withFileTypes: true });
    files.forEach(file => {
        const filePath = path.join(dirPath, file.name);
        if (file.isDirectory()) {
            if (!ignoreDirs.includes(file.name)) { // Check if the directory should be ignored
                listJsFilesSync(filePath, fileList, ignoreDirs);
            }
        } else if (file.name.endsWith('.js')) {
            fileList.push(filePath);
        }
    });
    return fileList;
}

function executeScriptForFiles(files) {
    files.forEach(file => {
        console.log(`Executing autolog.js for: ${file}`);
        const result = spawnSync('node', ['autolog.js', file], { stdio: 'inherit' });
        if (result.error) {
            console.error(`Error executing autolog.js for ${file}:`, result.error);
        }
    });
}

// Example usage:
const startPath = __dirname;
const jsFiles = listJsFilesSync(startPath);
executeScriptForFiles(jsFiles);
