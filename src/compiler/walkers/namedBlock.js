const { expect, get, getNext } = require('../util');
const param = require('./param');

function namedBlock() {
  // We got here, because "function" or "procedure" was encountered.
  // We don't care about the actual words "function" and "procedure".
  token = getNext();

  let node = {
    type: 'NamedBlock',
    name: token.value,
    params: [],
  }

  token = getNext();
  expect(token.value, '(');

  token = getNext();
  while (token.type !== 'symbol' || (token.type === 'symbol' && token.value !== ')')) {
    node.params.push(param());
    token = getNext();
  }
  expect(token.value, ')');

  // token = getNext();
  return node;
}

module.exports = namedBlock;
