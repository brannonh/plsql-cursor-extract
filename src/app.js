const app = require('./bootstrap/init');
const { logInit } = require('./bootstrap/logger');
const banner = require('./bootstrap/banner');
const transpile = require('./transpile');

logInit(app.opts().logFile ?? null);
banner(app);

transpile(app.args[0], app.opts());
