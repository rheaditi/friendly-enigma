var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	fb_id: 'string',
	type: 'string'
})

module.exports = mongoose.model('user', UserSchema);