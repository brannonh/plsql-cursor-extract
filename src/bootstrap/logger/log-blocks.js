const { logAwkward, logInsane } = require('./log-messages');
const store = require('../../store');

function logBlock(name, kind = 'block', args = {}, enter = true) {
  let argString = '', first = true;
  for (arg in args) {
    argString += `${(first ? '' : ', ')}${arg}: ${args[arg]}`;
    first = false;
  }

  let msg = `${kind} (${enter ? 'in ' : 'out'}): ${name}${(argString ? '(' + argString + ')' : '')}`;
  logAwkward(msg);
}

function logBlockIn(name, kind = 'function', args = {}) {
  logBlock(name, kind, args);
  nested();
}

function logBlockOut(name, kind = 'function') {
  unnested();
  logBlock(name, kind, {}, false);
}

function logBlockInOut(name, kind = 'function', args = {}) {
  logBlockIn(name, kind, args);
  logBlockOut(name, kind);
}

function logVar(name, value) {
  const msg = `variable: ${name}(${value})`;
  logInsane(msg);
}

function nested() {
  store.nest++;
}

function unnested() {
  store.nest--;
}

module.exports = {
  logBlockIn,
  logBlockOut,
  logBlockInOut,
  logVar,
}
