const fs = require('fs');
const style = require('../style');
const store = require('../../store');

function logMessage(msg, level = store.logLevels.default) {
  logLog(msg, level);
}

function logChatty(msg) {
  if (store.logAt >= store.logLevels.chatty) {
    logMessage(msg, store.logLevels.chatty);
  }
}

function logAwkward(msg) {
  if (store.logAt >= store.logLevels.awkward) {
    logMessage(msg, store.logLevels.awkward);
  }
}

function logInsane(msg) {
  if (store.logAt >= store.logLevels.insane) {
    logMessage(msg, store.logLevels.insane);
  }
}

function logLog(msg, level) {
  let prefix = style.log.default('[default]');
  if (level == store.logLevels.chatty) {
    prefix = style.log.chatty(' [chatty]');
  } else if (level == store.logLevels.awkward) {
    prefix = style.log.awkward('[awkward]');
  } else if (level == store.logLevels.insane) {
    prefix = style.log.insane(' [insane]');
  }

  msg = `${prefix}${'  '.repeat(store.nest)}${msg}`;
  console.log(msg);
  if (store.logToFile) {
    fs.writeSync(store.logFile, style.log.strip(`${msg}\n`));
  }
}

module.exports = { 
  logMessage,
  logChatty,
  logAwkward,
  logInsane,
};
