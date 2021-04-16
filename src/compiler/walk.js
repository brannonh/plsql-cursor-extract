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

  // Handle Symbol.
  if (token.type === 'symbol') {
    store.current++;

    return {
      type: 'Symbol',
      value: token.value,
    };
  }

  // Handle NamedBlock.
  if (token.type === 'word' && ['function', 'procedure'].includes(token.value)) {
    return walkers.namedBlock();
  }

  throw new TypeError(`${token.type} (${token.value})`);
}

module.exports = {
  walk,
};
