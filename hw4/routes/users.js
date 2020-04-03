var express = require('express');
var router = express.Router();
var User = require('../models/user');

//get all users
router.get('/', (req, res, next) => {
	console.log(req.user);
	User.find({}, (err, users) => {
		if (err) return next(err);
		res.json(users);
	});
});

//get a user by id
router.get('/:userId', (req, res, next) => {
	try{
		userId = req.params.userId;

		User.find({
			_id: userId
		}, (err, user) => {
			if(err) return next(err);
			else {
				if (!user){
					res.status(400).send("User not found!!!");
				}
				else {
					res.json(user);
				}
			}
		});
	}
	catch (err){
		res.status(500).send({
			message: 'Error finding user with id ' + userId + ': ' + err
		});
	}
});

//get user by username
router.get('/:username', (req, res, next) => {
	username = req.params.username
	User.findOne({
		username: username
	}, (err, user) => {
		if (err) return next(err);
		res.json(user);
	});
});

//add a user
router.post('/', (req, res, next) => {
	var newUser = req.body;

	if (newUser.firstName == undefined || newUser.lastName == undefined || newUser.position == undefined || newUser.majorOrunit == undefined || newUser.username == undefined || newUser.password == undefined || newUser.email == undefined){
		return res.status(400).send("Failed registration since missing part of user's information");
	}


	// Save and send the new user registration data back to the client.
	new User(newUser).save((err, user) => {
		if (err) return next(err);
		//res.send('user registration successfully'));
		res.json(user);
	})
});

module.exports = router;
