const { get } = require("./util");
const store = require('../store');
const walkers = require('./walkers');

function walk() {
  let token = get();

  // Handle NumberLiteral.
  if (token.type === 'number') {
    store.current++;

    return {
      type: 'NumberLiteral',
      value: token.value,
    };
  }

  // Handle StringLiteral.
  if (token.type === 'string') {
    store.current++;

    return {
      type: 'StringLiteral',
      value: token.value,
    };
  }

  // Handle NamedBlock.
  if (token.type === 'word' && ['function', 'procedure'].includes(token.value)) {
    return walkers.namedBlock();
  }

  throw new TypeError(token.type);
}

module.exports = {
  walk,
};
