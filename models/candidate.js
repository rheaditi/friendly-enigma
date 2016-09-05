var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CandidateSchema = new Schema({
	fb_id: 'string',
	name: 'string',
	introduction: 'string',
	c_count: 'number',
	vc_count: 'number',
	t_count: 'number',
	s_count: 'number'
})

module.exports = mongoose.model('candidate', CandidateSchema);