const { expect, expectNext, get, getNext } = require('../util');
const cursor = require('./cursor');
const variable = require('./variable');

function declare() {
  let node = {
    type: 'DeclarationBlock',
    variables: [],
    cursors: [],
  };

  // Skip triggering "declare" or "is".
  let token = getNext();
  while (token.value !== 'begin') {
    if (token.value === 'cursor') {
      node.cursors.push(cursor());
    } else if (token.type === 'word') {
      node.variables.push(variable());
    }

    token = getNext();
  }

  // Back up one token to end on the last declaration.
  return node;
}

module.exports = declare;
