const { expect, get, getNext, expectNext } = require('../util');
const declare = require('./declare');
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

  // Get parameters.
  token = getNext();
  expect(token.value, '(');

  token = getNext();
  while (token.value !== ')') {
    node.params.push(param());
    token = getNext();
  }

  // Get declaration.
  token = expectNext({ value: 'is' });
  node.declare = declare();

  // Get body.
  token = get();
  expect(token.value, 'begin');
  // TODO : Finish this.
  expectNext({ value: 'end' });
  expectNext({ value: ';' });
  expectNext({ value: '/' });

  return node;
}

module.exports = namedBlock;
