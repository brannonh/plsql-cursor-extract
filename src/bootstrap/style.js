const chalk = require('chalk');
const stripAnsi = require('strip-ansi');

let style = {
  title: (msg) => chalk.blue.bold(msg),
  config: (msg) => chalk.yellow(msg),
  log: {
    default: (msg) => chalk.cyan(msg),
    error: (msg) => chalk.red.bold(msg),
    chatty: (msg) => chalk.blue(msg),
    awkward: (msg) => chalk.magenta(msg),
    insane: (msg) => chalk.gray(msg),
    strip: (msg) => stripAnsi(msg),
  }
};

module.exports = style;
