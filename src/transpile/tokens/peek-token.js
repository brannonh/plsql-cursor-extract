const getToken = require('./get-token');
const { logBlockIn, logBlockOut, logVar } = require('../../bootstrap/logger');

function peekToken() {
  logBlockIn('peekToken');
  const token = getToken(null, true);
  logVar('token', token);
  logBlockOut('peekToken');
  return token;
}

module.exports = peekToken;
