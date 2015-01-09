var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/project_db');
var db = mongoose.connection;

db.once('open', function callback() {
	var buoys = db.clean_buoys;
	buoys.find({}).max({})

})