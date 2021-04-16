const { tokenizer } = require('./compiler/tokenizer');
const { parser } = require('./compiler/parser');
const fs = require('fs');
const yaml = require('js-yaml');
const store = require('./store');

let paths = {
  ast: 'output/ast.yaml',
  script: 'examples/script.sql',
  tokens: 'output/tokens.yaml',
};

fs.truncateSync(paths.ast);
fs.truncateSync(paths.tokens);

const script = fs.readFileSync(paths.script, 'utf-8');

try {
  tokenizer(script);
  parser();
} finally {
  fs.writeFileSync(paths.tokens, yaml.dump(store.tokens));
  fs.writeFileSync(paths.ast, yaml.dump(store.ast));
}
