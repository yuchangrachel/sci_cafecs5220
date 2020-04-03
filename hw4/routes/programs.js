var express = require('express');
var passport = require('passport');
var router = express.Router();
var Program = require('../models/program');
var User = require('../models/user');
var jwt = require('jsonwebtoken');

//get all programs
router.get('/', (req, res, next) => {
	Program.find({}, (err, programs) => {
		if (err) return next(err);
		res.json(programs);
	});
});

//get a program by id
router.get('/:programId', (req, res, next) => {
	try{
		programId = req.params.programId;

		Program.find({
			_id: programId
		}, (err, program) => {
			if(err) return next(err);
			else {
				if (!program){
					res.status(400).send("Program not found!!!");
				}
				else {
					res.json(program);
				}
			}
		});
	}
	catch (err){
		res.status(500).send({
			message: 'Error finding program with id ' + programId + ': ' + err
		});
	}
});


//create a new program only admin has authorization
router.post('/', passport.authenticate('jwt', {session: false}), function(req, res) {
	var token = getToken(req.headers);
	if(token) {
		if (checkAccess(token,"ADMIN")) {
			var newProgram = new Program({
				name: req.body.name,
				fullname: req.body.fullname,
				description: req.body.description
			});
			newProgram.save(function(err) {
				if (err) {
					return res.json({message: "Create Program failed"});
				}
				
				res.json("program create");
			});
		} 
		else {
			return res.status(401).send({message: "Unauthorized"});
		}
	} 
	else {
		return res.status(401).send("Unauthorized");
	}
});

//edit program only admin has authorization
//refer function(req, res) from app.js
router.put('/:programId', passport.authenticate('jwt', { session: false}), function(req, res){
	var token = getToken(req.headers);
	if(token) {
		if (checkAccess(token,"ADMIN")) {
			var programId = req.params.programId;
			Program.findByIdAndUpdate(programId, {$set: req.body}, (err, program) => {
				if (err) return res.json({message: "err"});
				res.json("Program update!!!");
			});
		} else {
			return res.status(403).send({message: "User Unauthorized"});
		}
	} else {
		return res.status(403).send("Token Unauthorized");
	}
});

getToken = function (headers) {
	if (headers && headers.authorization) {
		var parted = headers.authorization.split(' ');
		if (parted.length === 2) {
			return parted[1];
		} else {
			return null;
		}
	} else {
		return null;
	}
};

function checkAccess (jsonwebtoken,role){
	decoded = jwt.decode(jsonwebtoken)
	if(decoded['role']==role)
		return true;
}

module.exports = router;
