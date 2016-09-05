var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ModeSchema = new Schema({
	mode: 'string'
})

module.exports = mongoose.model('mode', ModeSchema);	