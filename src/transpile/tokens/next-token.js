const getToken = require('./get-token');
const { logBlockIn, logBlockOut, logVar } = require('../../bootstrap/logger');

function nextToken(expected = null) {
  logBlockIn('nextToken', 'function', { expected });
  const token = getToken(expected);
  logVar('token', token);
  logBlockOut('nextToken');
  return token;
}

module.exports = nextToken;
