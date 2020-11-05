const { logBlockIn, logBlockOut } = require('../../bootstrap/logger');
const { nextToken, peekToken } = require('../tokens');
const parameter = require('./parameter');
const store = require('../../store');

function parameters(artifact, canIn = true, canOut = true) {
  logBlockIn('parameters', 'function', { artifact, canIn, canOut });
  
  store.parameters[artifact] = [];

  nextToken('(');
  if(peekToken() != ')') {
    const param = parameter(canIn, canOut);
    store.parameters[artifact].push(param);
    
    while (peekToken() == ',') {
      nextToken(',');
    
      const param = parameter(canIn, canOut);
      store.parameters[artifact].push(param);
    }
  }
  nextToken(')');

  logBlockOut('parameters');
}

module.exports = parameters;
