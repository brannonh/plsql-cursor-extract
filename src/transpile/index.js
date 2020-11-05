const fs = require('fs');
const { logBlockIn, logBlockOut, logStack, logTables } = require('../bootstrap/logger');
const { peekToken, seekToken } = require('./tokens');
const { packageBody, procedure } = require('./parse');
const store = require('../store');

function transpile() {
  logBlockIn('transpile', 'function', undefined, store.logLevels.chatty);
  
  const inputFile = fs.openSync(store.args[0], 'r');
  store.inputFile = inputFile;

  while (1) {
    if (peekToken() == 'create') {
      packageBody();
    }

    let token;
    while ((token = seekToken([ 'function', 'procedure' ])) !== false) {
      if (token == 'function') {
        // getFunction();
      } else if (token == 'procedure') {
        procedure();
      }
    }
  }

  // generateScript(); // finalize();

  if (store.opts.dump) {
    logStack();
    logTables();
  }

  logBlockOut('transpile', 'function', store.logLevels.chatty);
}

module.exports = transpile;
