const { logBlockIn, logBlockOut } = require('../../bootstrap/logger');
const { peekToken } = require('../tokens');
const cursor = require('./cursor');
const local = require('./local');
const store = require('../../store');

function locals(artifact) {
  logBlockIn('locals', 'function', { artifact });

  store.locals[artifact] = [];
  store.cursors[artifact] = [];

  let token;
  while ((token = peekToken()) != 'begin') {
    if (token == 'cursor') {
      const cur = cursor(artifact);
      store.cursors[artifact][cur.name] = cur.select;
    } else {
      store.locals[artifact].push(local());
    }
  }

  logBlockOut('locals');
}

module.exports = locals;
