const getToken = require('./get-token');
const { logBlockIn, logBlockOut } = require('../../bootstrap/logger');

function nextToken(expected = null) {
  logBlockIn('nextToken', 'function', { expected });
  const token = getToken(expected);
  logBlockOut('nextToken');
  return token;
}

module.exports = nextToken;
