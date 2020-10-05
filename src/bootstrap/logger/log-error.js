const style = require('../style');
const store = require('../../store');

function logError(msg) {
  const prefix = style.log.error('  [error]');
  console.log(`${prefix}${'  '.repeat(store.nest)}${msg}`);

  process.exit();
}

module.exports = { logError };
