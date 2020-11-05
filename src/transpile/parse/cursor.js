const { logBlockIn, logBlockOut } = require('../../bootstrap/logger');
const { nextToken, peekToken } = require('../tokens');
const parameters = require('./parameters');
const store = require('../../store');

function cursor(artifact) {
  logBlockIn('cursor', 'function', { artifact });

  nextToken('cursor');
  const name = nextToken();

  let hasParams = false;
  if (peekToken() == '(') {
    parameters(`${artifact}:${name}`, false, false);
    hasParams = true;
  }

  nextToken('is');

  let aggregate = '', last = '', next = '';
  while ((next = peekToken()) != ';') {
    aggregate += (next.match(/[,()]/) !== null || last == '(') ? `${next}` : ` ${next}`;
    last = next;
    nextToken();
  }

  aggregate += nextToken(';');

  logBlockOut('cursor');

  return { name, select: aggregate };
}

module.exports = cursor;
