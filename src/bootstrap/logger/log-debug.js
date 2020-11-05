const style = require('../style');
const store = require('../../store');
const chalk = require('chalk');

function logStack() {
  console.log(style.config('Stack Trace'));
  for (const level of store.stack) {
    console.log(style.configItem(`${level.artifact}: ${level.name}`));
  }
}

function logTables() {
  console.log(style.config('Parameters Table'));
  for (const level of Object.keys(store.parameters)) {
    let params = store.parameters[level].join(', ');
    console.log(style.configItem(`${level}: ${chalk.gray(params)}`));
  }

  console.log(style.config('Locals Table'));
  for (const level of Object.keys(store.locals)) {
    let variables = store.locals[level].join(', ');
    console.log(style.configItem(`${level}: ${chalk.gray(variables)}`));
  }

  console.log(style.config('Cursors Table'));
  for (const level of Object.keys(store.cursors)) {
    console.log(style.configItem(`  ${level}:`));
    for (const cursor of Object.keys(store.cursors[level])) {
      console.log(style.configItem(`    ${cursor}: ${chalk.gray(store.cursors[level][cursor])}`));
    }
  }
}

module.exports = { logStack, logTables };
