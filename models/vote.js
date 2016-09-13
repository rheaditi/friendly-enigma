var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VoteSchema = new Schema({
	fb_id: 'string',
	c_id: 'string',
	vc_id: 'string',
	t_id: 'string',
	s_id: 'string'
})

module.exports = mongoose.model('vote', VoteSchema);