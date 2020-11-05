const app = require('./bootstrap/init');
const { logInit } = require('./bootstrap/logger');
const banner = require('./bootstrap/banner');
const transpile = require('./transpile');
const store = require('./store');

store.args = app.args;
store.opts = app.opts();

logInit();
banner();

transpile();
