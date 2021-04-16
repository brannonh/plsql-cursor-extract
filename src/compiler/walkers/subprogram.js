const { expect, get, getNext, expectNext } = require('../util');
const declare = require('./declare');
const param = require('./param');

function subprogram() {
  token = get();
  let node = {
    type: `Subprogram${token.value[0].toUpperCase()}${token.value.slice(1)}`,
    name: getNext().value,
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
  token = getNext();
  while (token.value !== 'end') {
    token = getNext();
  }
  expectNext({ value: ';' });

  return node;
}

module.exports = subprogram;
