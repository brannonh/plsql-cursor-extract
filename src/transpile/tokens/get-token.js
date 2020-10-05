const { logError, logInsane, logBlockIn, logBlockOut, logVar } = require('../../bootstrap/logger');
const store = require('../../store');
const getChar = require('./get-char');

function getToken(expected = null, peek = false) {
  const literalChars = `0123456789'"`;
  const numberChars = '0123456789';
  const wordChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789._';
  let token = '';
  let bytesStart = Math.min(store.bytesAt, store.bytesRead);

  let captured = false;
  while (!captured) {
    // logInsane(`@${store.bytesAt} R${store.bytesRead}`);
    let charData = {};
    
    if (store.bytesAt != store.bytesRead) {
      charData = getChar(store.bytesAt++);
    } else {
      charData = getChar();
    }

    if (!charData.bytes) {
      // Input ended.
      if (peek) {
        logBlockOut('getToken');
        return false;
      } else {
        logError('Input ended unexpectedly.');
      }
    } else {
      let c = charData.char;
      
      if (!token && literalChars.includes(c)) {
        // Character begins a literal. Just get the whole literal.
        if (c == "'") {
          token = c;

          do {
            charData = getChar();
            if (charData.bytes) {
              c = charData.char;
              token += c;
            } else {
              logError('Input ended unexpectedly.');
            }
          } while (c != "'")
        } else {
          while (numberChars.includes(c)) {
            token += c;

            charData = getChar();
            if (charData.bytes) {
              c = charData.char;
            } else {
              c = null;
            }
          }
        }

        captured = true;
      } else if (wordChars.includes(c)) {
        // Character is part of a word.
        token += c;
      } else if (!c.trim()) {
        // Character is a space or newline.
        if (token) {
          captured = true;
        }
      } else {
        // Character is symbol.
        if (!token) {
          token += c;
        } else {
          store.bytesAt = store.bytesRead - 1;
        }

        captured = true;
      }
    }
  }

  if (expected && token != expected) {
    logError(`Expected <${expected}>. Found <${token}>.`);
  }

  if (peek) {
    store.bytesAt = bytesStart;
  }

  return token;
}

module.exports = getToken;
