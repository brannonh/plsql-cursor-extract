const { expect, expectNext, get, getNext } = require('../util');

function variable() {
  let node = {
    type: 'VariableDeclaration',
  };

  // Get triggering variable name.
  let token = get();
  expect(token.type, 'word');
  node.name = token.value;

  token = getNext();
  while (token.value !== ';') {
    token = getNext();
  }

  return node;
}

module.exports = variable;
