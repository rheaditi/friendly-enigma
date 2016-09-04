var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AdminSchema = new Schema({
	username : 'string',
	password: 'string'
});

module.exports = mongoose.model('admin', AdminSchema);