const style = require('../style');
const store = require('../../store');
const { logStack, logTables } = require('./log-debug');

function logError(msg) {
  const prefix = style.log.error('  [error]');
  console.log(`${prefix}${'  '.repeat(store.nest)}${msg}`);

  if (store.opts.dump) {
    logStack();
    logTables();
  }

  process.exit();
}

module.exports = { logError };
