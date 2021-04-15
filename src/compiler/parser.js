const { walk } = require('./walk');
const store = require('../store');

function parser() {
  store.current = 0;

  store.ast = {
    type: 'Program',
    body: [],
  };

  while (store.current < store.tokens.length) {
    store.ast.body.push(walk());
  }
}

module.exports = {
  parser,
};
