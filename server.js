var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var jwt = require('jsonwebtoken')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use morgan to log requests to the console
app.use(morgan('dev'));
app.use('/', express.static(__dirname + '/public'));

app.use('/bower_components', express.static(__dirname + '/bower_components'));

var CONFIG = require('./config');
var Admin = require('./models/admin');
var Nominee = require('./models/nominee');
var Candidate = require('./models/candidate');
var Vote = require('./models/vote');
var User = require('./models/user');
var Mode = require('./models/mode');



var url = CONFIG.mongodb_url + 'votr';
console.log(url);

mongoose.connect(url);

var port = 1337;
app.listen(port, function() {
	console.log('Server running on port ' + port);
});

app.get('/mode', function(request, response) {
	Mode.findOne({}, function(err, mode) {
		if (err) {
			response.status(400).json({success: false, message: "Mongo Error", error: err})
		}
		else {
			response.status(200).json({success: true, mode:mode.mode});
		}
	})
})

app.get('/nominee_list', function(request, response) {
	var token = request.query.token;

	jwt.verify(token, CONFIG.secret, function(err, decoded) {
		if (err) {
			response.status(400).send({success:false, message: "Not Logged In"});
		}
		else if (decoded.admin === true){
			Nominee.find({}, function(err, nominees) {
				if (err) {
					response.status(400).json({success: false, message: "Mongo Error", error: err});
				}
				else {
					response.status(200).json({success: true, nominees: nominees});
				}
			})
		}
		else {
			response.status(400).json({success: false, message: "Not Authorized"});
		}
	})
})

app.post('/nominate', function(request, response) {
	var nominee = {};
	nominee.usn = request.body.usn;
	nominee.name = request.body.name;

	var token = request.body.token;
	jwt.verify(token, CONFIG.secret, function(err, decoded) {
		if (err) {
			response.status(400).send({success:false, message: "Not Logged In"});
		}
		else {
			Nominee.findOne({usn: nominee.usn}, function(err, foundNominee){
				if (err) {
					response.status(400).json({success: false, message: "Mongo Error", error: err});
				}
				else if (foundNominee) {
					foundNominee.count = foundNominee.count + 1;
					foundNominee.save(function(err, updatedNominee) {
						if (err) {
							response.status(400).json({success:false,message:"Mongo Error", error: err});
						}
						else {
							response.status(200).json({success: true, messsage: "Vote Updated"});
						}
					})
				}
				else {
					var newNominee = new Nominee({
						usn: nominee.usn,
						name: nominee.name,
						count: 1
					});

					newNominee.save(function(err, newNominee) {
						if (err) {
							response.status(400).json({success: false, message: "Mongo Error", error: err});
						} 
						else {
							response.status(200).json({success: true, message: "Added New Nominee"});
						}
					})
				}
			})	
		}
	})
});

app.get('/candidates', function(request, response) {
	var token = request.query.token;

	jwt.verify(token, CONFIG.secret, function(err, decoded) {
		if (err) {
			response.status(400).json({success: false, message: 'Not Logged In'});
		}
		else {
			Mode.findOne({}, function(err, mode) {
				if (err) {
					response.status(400).json({success: false, message: "Mongo Error", error: err});
				}
				else if (mode.mode === 'voting') {
					Candidate.find({}, {fb_id:1, name:1, introduction:1}, function(err, candidates) {
						if (err) {
							response.status(400).json({success: false, message: "Mongo Error", error: err});
						}
						else {
							response.status(200).json({success: true, candidates: candidates});
						}
					})
				}
				else {
					response.status(400).json({success: false, message: "Not Voting Time!"});
				}
			})
		}
	})
})

app.post('/vote', function(request, response) {
	var token = request.body.token;
	var c_id = request.body.c_id;
	var vc_id = request.body.vc_id;
	var t_id = request.body.t_id;
	var s_id = request.body.s_id;

	jwt.verify(token, CONFIG.secret, function(err, decoded) {
		if (err) {
			response.status(400).json({success: false, message: 'Not Logged In'});	
		}
		else {
			Mode.findOne({}, function(err, currentMode){
				if (currentMode === 'voting') {
					var vote = new Vote({
						fb_id: decoded.fb_id,
						c_id: c_id,
						vc_id: vc_id,
						t_id: t_id,
						s_id: s_id
					});

					vote.save(function(err, mode) {
						if (err) {
							response.status(400).json({success: false, message: "Mongo Error", error: err});

						}
						else {
							response.status(200).json({success: true, message: 'Vote Cast'});
						};
					})
				}
				else {
					response.status(400).json({success: false, message: 'Not Voting Time!'});	
				}
			})
		}
	})
})

app.post('/change_mode', function(request, response) {
	var token = request.body.token;
	var newMode = request.body.mode;

	jwt.verify(token, CONFIG.secret, function(err, decoded) {
		if (err) {
			response.status(400).json({success: false, message: 'Not Logged In'});
		}
		else if (decoded.admin === true) {
			Mode.findOne({}, function(err, mode) {
				if (err) {
					response.status(400).json({success: false, message: "Mongo Error", error: err});
				}
				else {
					mode.mode = newMode;
					mode.save(function(err, updatedMode) {
						if (err) {
							response.status(400).json({success: false, message: "Mongo Error", error: err});
						}
						else {
							response.status(200).json({success: true, message: "Mode Changed"});
						}
					})
				}
			})
		}
		else {
			response.status(400).json({success:false, message: "Not Authorized"});
		}
	})
})

app.get('/results', function(request, response) {
	var token = request.query.token;
	var candidates;
	var votes;

	jwt.verify(token, CONFIG.secret, function(err, decoded) {
		if (err) {
			response.status(400).json({success: false, message: 'Not Logged In'});
		}
		else if (decoded.admin === true){
			Mode.findOne({}, function(err, mode) {
				if (err) {
					response.status(400).json({success: false, message: "Mongo Error", error: err});
				}
				else if (mode === 'crunching'){
					Vote.find({}, function(err, votes) {
						if (err) {
							response.status(400).json({success: false, message: "Mongo Error", error: err});
						}
					})
				}
				else {
					response.status(400).json({success: false, message: 'Can not do that yet'});					
				}
			})
		}
		else {
			response.status(400).json({success: false, message: 'Not Authenticated!'});
		}
	})
})

app.post('/user', function(request, response) {
	var user = {};
	user.username = request.body.user.username;
	user.password = request.body.user.password;

	User.findOne({username: user.username}, function(err, users) {
		if (err) {
			response.status(400).json({success: false, message: "Mongo Error", error: err});
		}
		else if (users) {
			if (users.password === user.password) {
				var token = jwt.sign({username: user.username, expiresIn: "1h", admin: false, mode:mode.mode},
					CONFIG.secret);
				response.status(200).json({success:true, token:token, username: user.username});
			} else {
				response.status(400).json({success:false, message: "Password Mismatch"});
			}
		}
		else {
			response.status(400).json({success:false, message: "No User Found"});
		}
	})
})


app.post('/auth_admin', function(request, response) {
	var user = {};
	user.username = request.body.username;
	user.password = request.body.password;

	Admin.findOne({username: user.username}, function(err, admin){
		if (err) {
			response.status(400).json({success: false, message: "Mongo Error", error: err});
		} 
		else if (admin){
			var token = jwt.sign({username: user.username, expiresIn: "1h", admin: true},
				CONFIG.secret);
			response.status(200).json({success:true, token:token, username: user.username});
		}
		else {
			response.status(400).json({success:false, message: "No User Found"});
		}
	})
})