const { expect, expectNext, get, getNext } = require('../util');

function param() {
  let node = {
    type: 'ParamDefinition',
  };

  let token = expectNext({ type: 'word' });
  node.name = token.value;

  token = getNext();
  while (token.value !== ',') {
    if (token.value === 'in') {
      node.in = true;
    } else if (token.value === 'out') {
      node.out = true;
    }

    token = getNext();
  }

  return node;
}

module.exports = param;
