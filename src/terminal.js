const { Command } = require('commander');
const version = require('./version');

const app = new Command();

app
  .name('node plsql-cursor-extract')
  .storeOptionsAsProperties(false)
  .passCommandToAction(false)
  .version(version, '-v', 'show the version')
  .arguments('<input_file> <output_file>')
  .option('-d, --dump', 'dump data on error and end of execution')
  .option('-l, --log-file <file>', 'assign log file for output')
  .option('-t, --trace', 'log everything (implies -d)')
  .option('-v, --verbose', 'log more than normal')
  .action((inputFile, outputFile, cmdObj) => {
    console.log(`${inputFile}, ${outputFile}`);
  });

app.parse(process.argv);

console.log(app.opts());
