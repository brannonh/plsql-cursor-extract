const style = require('./style');
const { logMessage, logAwkward, getLogFile } = require('./logger');
const store = require('../store');

function banner() {
  logMessage(style.title('PL/SQL Cursor Extract'));

  logAwkward(style.config('Arguments'));
  for (arg in store.args) {
    logAwkward(style.configItem(`${Number(arg) + 1}: ${store.args[arg]}`));
  }

  logAwkward(style.config('Options'));
  for (opt in store.opts) {
    logAwkward(style.configItem(`${opt}: ${store.opts[opt]}`));
  }

  const logFile = getLogFile();
  if (logFile) {
    logMessage(style.config(`Logging to '${logFile}'.`));
  }

  console.log();
}

module.exports = banner;
