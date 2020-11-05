const { logBlockIn, logBlockOut } = require('../../bootstrap/logger');
const { nextToken, peekToken } = require('../tokens');
const parameters = require('./parameters');
const locals = require('./locals');
const store = require('../../store');

function procedure() {
  logBlockIn('procedure');

  nextToken('procedure');
  const proc = nextToken();

  store.stack.push({
    artifact: 'procedure',
    name: proc,
  });

  if (peekToken() == '(') {
    parameters(proc);
  }

  nextToken('is');

  if (peekToken() != 'begin') {
    locals(proc);
  }

  nextToken('begin');
  // procedureBody();
  nextToken('end');

  if (peekToken() != ';')
    nextToken(proc);
  nextToken(';');

  store.stack.pop();

  logBlockOut('procedure');
}

module.exports = procedure;
