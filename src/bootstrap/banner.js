const style = require('./style');
const { logMessage, logAwkward, getLogFile } = require('./logger');

function banner(app) {
  logMessage(style.title('PL/SQL Cursor Extract'));

  logAwkward(style.config('» Arguments'));
  for (arg in app.args) {
    logAwkward(style.config(`  ${Number(arg) + 1}: ${app.args[arg]}`));
  }

  logAwkward(style.config('» Options'));
  for (opt in app.opts()) {
    logAwkward(style.config(`  ${opt}: ${app.opts()[opt]}`));
  }

  const logFile = getLogFile();
  if (logFile) {
    logMessage(style.config(`Logging to '${logFile}'.`));
  }

  console.log();
}

module.exports = banner;
