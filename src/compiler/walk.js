const { getNext } = require("./util");
const store = require('../store');
const walkers = require('./walkers');

function walk() {
  let token = getNext();

  // Handle Symbol.
  if (token.type === 'symbol') {
    store.current++;

    return {
      type: 'Symbol',
      value: token.value,
    };
  }

  // Handle Subprogram.
  if (token.type === 'word' && ['function', 'procedure'].includes(token.value)) {
    return walkers.subprogram();
  }

  throw new TypeError(`${token.type} (${token.value})`);
}

module.exports = {
  walk,
};
