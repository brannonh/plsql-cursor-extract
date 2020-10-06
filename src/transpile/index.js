const fs = require('fs');
const { logBlockIn, logBlockOut } = require('../bootstrap/logger');
const store = require('../store');
const { nextToken, peekToken, seekToken } = require('./tokens');

function transpile(input, opts) {
  logBlockIn('transpile', 'function', { input: input, opts: opts });
  
  const inputFile = fs.openSync(input, 'r');
  store.inputFile = inputFile;

  while (1) {
    if (peekToken() == 'create') {
      // getPackageBody();
    }

    let token;
    while (token = seekToken([ 'function', 'procedure' ]) !== false) {
      if (token == 'function') {
        // getFunction();
      } else if (token == 'procedure') {
        // getProcedure();
      }
    }
  }

  // generateScript(); // finalize();

  if (opts.dump) {
    // logStack();
    // logTables();
  }

  logBlockOut('transpile');
}

module.exports = transpile;
