const { expect, expectNext, get, getNext } = require('../util');
const param = require('./param');

function cursor() {
  let node = {
    type: 'CursorDeclaration',
    params: [],
  };

  // Skip triggering "cursor".
  let token = getNext();
  expect(token.type, 'word');
  node.name = token.value;

  token = getNext();
  if (token.value === '(') {
    token = getNext();
    while (token.value !== ')') {
      node.params.push(param());
      token = getNext();
    }
    token = getNext();
  }

  expect(token.value, 'is');

  token = getNext();
  let select = '';
  while (token.value !== ';') {
    if (token.type === 'word') {
      select += ` ${token.value}`;
    } else {
      select += token.value;
    }

    token = getNext();
  }

  node.select = select;

  return node;
}

module.exports = cursor;
