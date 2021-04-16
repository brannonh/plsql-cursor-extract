const { expect, get, getNext, getPrevious } = require('../util');

function param() {
  let node = {
    type: 'ParamDefinition',
  };

  let token = get();
  expect(token.type, 'word');
  node.name = token.value;

  token = getNext();
  while (![',', ')'].includes(token.value)) {
    if (token.value === 'in') {
      node.in = true;
    } else if (token.value === 'out') {
      node.out = true;
    }

    token = getNext();
  }

  // Back up one token to end on the last parameter.
  if (token.value === ')') {
    getPrevious();
  }

  return node;
}

module.exports = param;
