var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NomineeSchema = new Schema({
	usn: 'string',
	name: 'string',
	count: 'number'
});

module.exports = mongoose.model('nominee', NomineeSchema);