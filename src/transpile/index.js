const fs = require('fs');
const { logBlockIn, logBlockOut } = require('../bootstrap/logger');
const store = require('../store');
const { nextToken, peekToken, seekToken } = require('./tokens');

function transpile(input, logFile) {
  logBlockIn('transpile', 'function', { input: input, logFile: logFile });
  
  const inputFile = fs.openSync(input, 'r');
  store.inputFile = inputFile;

  while (1) {
    peekToken();
    seekToken('in_pickedlp');
  }

  logBlockOut('transpile');
}

module.exports = transpile;
