const { logBlockIn, logBlockOut } = require('../../bootstrap/logger');
const { nextToken, peekToken } = require('../tokens');

function local() {
  logBlockIn('local');

  const variable = nextToken();
  while (peekToken() != ';') {
    nextToken();
  }
  nextToken(';');

  logBlockOut('local');
  return variable;
}

module.exports = local;
