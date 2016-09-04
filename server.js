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


var CONFIG = require('./config');
var Admin = require('./models/admin');
var port = 1337;

var url = CONFIG.mongodb_url + 'votr';
console.log(url);

mongoose.connect(url);


app.listen(port, function() {
	console.log('Server running on port ' + port);
})


app.post('/auth_admin', function(request, response) {
	var user = {};
	user.username = request.body.username;
	user.password = request.body.password;

	Admin.find({username: user.username}, function(err, admin){
		if (err) {
			response.status(400).json({success: false, message: "Mongo Error"});
		} 
		else if (admin.length){
			if (admin[0].password === user.password) {
				var token = jwt.sign({username: user.username, expiresIn: "1h"}, CONFIG.secret);
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