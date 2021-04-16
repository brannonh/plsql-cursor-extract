const store = require('../store');

function expect(actual, expected) {
  if (actual !== expected) {
    throw new TypeError(`Invalid token '${actual}', expected '${expected}'`);
  }
}

function expectNext(options = {}) {
  let token = getNext();

  if (options.value) {
    expect(token.value, options.value);
  }

  if (options.type) {
    expect(token.type, options.type);
  }

  return token;
}

function get(i = store.current) {
  if (store.tokens[i]) {
    return store.tokens[i];
  }

  throw new SyntaxError(`Unexpected end of input`);
}

function getNext() {
  return get(++store.current);
}

module.exports = {
  expect,
  expectNext,
  get,
  getNext,
};
