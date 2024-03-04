const fs = require('fs');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const t = require('@babel/types');

const inputFile = 'input.js'; // Your input file
const outputFile = 'output.js'; // The instrumented output file

// Read the input file
const code = fs.readFileSync(inputFile, 'utf-8');

// Parse the code into an AST
const ast = parser.parse(code, {
  sourceType: 'module',
  plugins: ['jsx'] // if you're dealing with React JSX
});

// Traverse the AST to find functions
traverse(ast, {
  enter(path) {
    if (path.isFunction()) {
      const { line, column } = path.node.loc.start;
      const functionName = path.node.id ? path.node.id.name : 'anonymous';
      const beforeLog = t.expressionStatement(t.callExpression(t.memberExpression(t.identifier('console'), t.identifier('log')), [t.stringLiteral(`Entering function ${functionName} at ${line}:${column} [before]`)]));
      const afterLog = t.expressionStatement(t.callExpression(t.memberExpression(t.identifier('console'), t.identifier('log')), [t.stringLiteral(`Exiting function ${functionName} at ${line}:${column} [after]`)]));

      // Add logging at the beginning of the function body
      path.get('body').unshiftContainer('body', beforeLog);

      // Add logging at the end of the function body
      path.get('body').pushContainer('body', afterLog);
    }
  }
});

// Generate the modified code
const output = generate(ast, {}, code);

// Write the modified code to the output file
fs.writeFileSync(outputFile, output.code);
