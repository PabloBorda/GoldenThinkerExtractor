const fs = require('fs');
const path = require('path');

function enhanceLogging(code, filename) {
    // Split the code by lines to insert logging with line numbers
    const lines = code.split('\n');
    let enhancedLines = [];
    let lineNumber = 1;

    for (let line of lines) {
        // Insert a log statement before every line for demonstration purposes
        // In a real scenario, you might want to filter where to add these
        const logStatement = `console.log(new Date().toISOString(), "${filename}", ${lineNumber});`;
        enhancedLines.push(logStatement);
        enhancedLines.push(line);
        lineNumber++;
    }

    return enhancedLines.join('\n');
}

function addLogging(filePath, baseDir) {
    const code = fs.readFileSync(filePath, 'utf8');
    const output = enhanceLogging(code, path.basename(filePath)); // Use basename for filename in logs
    const relativeFilePath = path.relative(baseDir, filePath);
    const newFilePath = path.join(__dirname, 'build/GoldenThinkerExtractorAutolog', relativeFilePath);

    fs.mkdirSync(path.dirname(newFilePath), { recursive: true });
    fs.writeFileSync(newFilePath, output, 'utf8'); // Make sure to pass the modified code as a string
}

const baseDir = __dirname;
const filePath = process.argv[2];
if (!filePath) {
    console.error('Usage: node autolog.js <file-path>');
    process.exit(1);
}

addLogging(filePath, baseDir);
