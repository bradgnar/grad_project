var mongoose = require('mongoose');

var db = function () {
    return {
        config: function (conf) {
            mongoose.connect(conf.connectionString);
            var db = mongoose.connection;

            db.on('error', console.error.bind(console, 'connection error:'));
            db.once('open', function callback() {
                console.log('db connection open woot woot get dem thangs');
                console.log('available collections');
                mongoose.connection.db.collectionNames(function (err, names) {
                    console.log(names);
                });
            });
        }
    };
};
module.exports = db();