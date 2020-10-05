const getToken = require('./get-token');
const { logBlockIn, logBlockOut } = require('../../bootstrap/logger');

function peekToken() {
  logBlockIn('peekToken');
  const token = getToken(null, true);
  logBlockOut('peekToken');
  return token;
}

module.exports = peekToken;
