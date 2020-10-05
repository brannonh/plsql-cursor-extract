const { Command } = require('commander');
const version = require('./version');

const app = new Command();

app
  .name('node plsql-cursor-extract')
  .storeOptionsAsProperties(false)
  .passCommandToAction(false)
  .version(version, '-v', 'show the version')
  .arguments('<input_file> <output_file>')
  .option('-a, --awkward', 'log too much (implies -d)')
  .option('-c, --chatty', 'log more than normal')
  .option('-d, --dump', 'dump data on error and end of execution')
  .option('-i, --insane', 'log everything (implies -a)')
  .option('-l, --log-file <file>', 'assign log file for output')
  .action((inputFile, outputFile, cmdObj) => {
    console.log(`${inputFile}, ${outputFile}`);
  });

app.parse(process.argv);

// Handle implied flags
if (app.opts().insane) {
  app.opts().awkward = true;
}

if (app.opts().awkward) {
  app.opts().dump = true;
}

module.exports = app;
