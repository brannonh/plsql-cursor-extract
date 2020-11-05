const { logAwkward, logInsane, logMessage } = require('./log-messages');
const store = require('../../store');

function logBlock(name, kind = 'block', args = {}, enter = true, level = store.logLevels.awkward) {
  let argString = '', first = true;
  for (arg in args) {
    argString += `${(first ? '' : ', ')}${arg}: ${args[arg]}`;
    first = false;
  }

  let msg = `${kind} (${enter ? 'in ' : 'out'}): ${name}${(argString ? '(' + argString + ')' : '')}`;
  if (store.logAt >= level) {
    logMessage(msg, level);
  }
}

function logBlockIn(name, kind = 'function', args = {}, level = store.logLevels.awkward) {
  logBlock(name, kind, args, true, level);
  nested();
}

function logBlockOut(name, kind = 'function', level = store.logLevels.awkward) {
  unnested();
  logBlock(name, kind, {}, false, level);
}

function logBlockInOut(name, kind = 'function', args = {}, level = store.logLevels.awkward) {
  logBlockIn(name, kind, args, true, level);
  logBlockOut(name, kind, {}, false, level);
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
