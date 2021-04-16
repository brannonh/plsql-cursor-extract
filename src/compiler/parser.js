const { walk } = require('./walk');
const store = require('../store');

function parser() {
  store.current = -1;

  store.ast = {
    type: 'Script',
    content: [],
  };

  while (store.current < store.tokens.length) {
    store.ast.content.push(walk());
  }
}

module.exports = {
  parser,
};
