const fs = require('fs');
const { logBlockIn, logBlockOut } = require('../../bootstrap/logger');
const store = require('../../store');

function getChar(at = null) {
  const file = store.inputFile;
  const char = Buffer.alloc(1, null);
  const bytes = fs.readSync(file, char, 0, 1, at);

  // logBlockIn('getChar', 'function', { at: at });

  if (at === null && bytes) {
    store.bytesRead += bytes;
    store.bytesAt = store.bytesRead;
  }

  // logBlockOut('getChar');

  return { char: char.toString(), bytes: bytes };
}

module.exports = getChar;
