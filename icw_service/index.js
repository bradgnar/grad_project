'use strict';

var express = require('express'),
    http = require('http'),
	kraken = require('kraken-js'),
    db = require('./lib/mongodb'),
    nconf = require('nconf'),
    path = require('path');


var options, app, server;

/*
 * Create and configure application. Also exports application instance for use by tests.
 * See https://github.com/krakenjs/kraken-js#options for additional configuration options.
 */
options = {
    onconfig: function (config, next) {
        /*
         * Add any additional config setup or overrides here. `config` is an initialized
         * `confit` (https://github.com/krakenjs/confit/) configuration object.
         */
        nconf.use('file', { file: path.join(__dirname, 'config/config.json') });
        db.config(nconf.get('databaseConfig'));
        next(null, config);

    }
};

app = module.exports = express();
app.use(kraken(options));
app.on('start', function () {
    console.log('Application ready to serve requests.');
    console.log('Environment: %s', app.kraken.get('env:env'));
});


/*
 * Create and start HTTP server.
 */
if (!module.parent) {

    /*
     * This is only done when this module is run directly, e.g. `node .` to allow for the
     * application to be used in tests without binding to a port or file descriptor.
     */
    server = http.createServer(app);
    server.listen(process.env.PORT || 8001);
    server.on('listening', function () {
        console.log('Server listening on http://localhost:%d', this.address().port);
    });

}