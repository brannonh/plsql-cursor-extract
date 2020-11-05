const { logBlockIn, logBlockOut, logVar } = require('../../bootstrap/logger');
const peekToken = require('./peek-token');
const nextToken = require('./next-token');

function seekToken(expected) {
  logBlockIn('seekToken', 'function', { expected });

  if (!Array.isArray(expected)) {
    expected = [ expected ];
  }
  
  let token = peekToken();
  while (!expected.includes(token) && token !== false) {
    nextToken();
    token = peekToken();
  }

  logVar('token', token);
  logBlockOut('seekToken');

  return token;
}

module.exports = seekToken;
