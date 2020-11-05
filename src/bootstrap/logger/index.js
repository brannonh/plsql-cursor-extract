const fs = require('fs');
const opts = require('../init').opts();
const { logBlockIn, logBlockOut, logBlockInOut, logVar } = require('./log-blocks');
const { logError } = require('./log-error');
const { logMessage, logChatty, logAwkward, logInsane } = require('./log-messages');
const { logStack, logTables } = require('./log-debug');
const store = require('../../store');

if (opts.chatty) {
  store.logAt = store.logLevels.chatty;
}
if (opts.awkward) {
  store.logAt = store.logLevels.awkward;
}
if (opts.insane) {
  store.logAt = store.logLevels.insane;
}

function logInit() {
  store.logToFile = store.opts.logFile ? true : false;
  if (store.opts.logFile) {
    store.logFileName = store.opts.logFile;
    store.logFile = fs.openSync(store.opts.logFile, 'w');
  }
}

function getLogFile() {
  return store.logFileName ?? false;
}

module.exports = {
  logInit,
  getLogFile,
  logError,
  logMessage,
  logChatty,
  logAwkward,
  logInsane,
  logBlockIn,
  logBlockOut,
  logBlockInOut,
  logVar,
  logStack,
  logTables,
};
