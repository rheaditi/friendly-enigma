var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	username: 'string',
	password: 'string',
	type: 'string'
})

module.exports = mongoose.model('user', UserSchema);