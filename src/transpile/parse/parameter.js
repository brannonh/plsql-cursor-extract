const { logBlockIn, logBlockOut } = require('../../bootstrap/logger');
const { nextToken, peekToken } = require('../tokens');

function parameter(canIn = true, canOut = true) {
  logBlockIn('parameter', 'function', { canIn, canOut });

  const token = nextToken();

  if (canIn && peekToken() == 'in') {
    nextToken('in');
  }

  if (canOut && peekToken() == 'out') {
    nextToken('out');
  }

  nextToken();

  logBlockOut('parameter');

  return token;
}

module.exports = parameter;
