const { logBlockIn, logBlockOut } = require('../../bootstrap/logger');
const { nextToken } = require('../tokens');
const store = require('../../store');

function packageBody() {
  logBlockIn('packageBody');
  store.stack.push({
    artifact: 'package',
    name: package,
  });

  nextToken('create');
  nextToken('or');
  nextToken('replace');
  nextToken('package');
  nextToken('body');
  const package = nextToken();
  nextToken('as');

  store.stack.pop();
  logBlockOut('packageBody');
}

module.exports = packageBody;
