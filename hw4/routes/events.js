var express = require('express');
var passport = require('passport');
var router = express.Router();
var Event = require('../models/event');
var User = require('../models/user');
var jwt = require('jsonwebtoken');


//add a new event only authenticated user has authorization
router.post('/', passport.authenticate('jwt', {session: false}), function(req, res) {
	var token = getToken(req.headers);
	var newEvent = req.body;

	if(token) {
		if (newEvent.name == undefined || newEvent.description == undefined || newEvent.location == undefined || newEvent.startTime == undefined || newEvent.endTime == undefined || newEvent.status == undefined){
			return res.status(401).send("Failed since missing part of event's information");
		}
		new Event(newEvent).save((err, event) =>  {
			if (err) {
				return res.json({message: "Create Event failed"});
			}
			res.json("Created new Event successfully!!!");
		});
	} 
	else {
		return res.status(403).send("Unauthenticated User");
	}
});

//approve/reject event only administrator has authorization
router.put('/:eventId/approve', passport.authenticate('jwt', { session: false}), function(req, res) {
	var token = getToken(req.headers);
	var eventId = req.params.eventId;

	if(token) {
		if (checkAccess(token,"ADMIN")) {
			Event.findByIdAndUpdate(eventId, {$set: {status: req.body.status}}, err => {
				if (err) return res.json({message: "cannot approve/reject event!!!"});

				res.json("Approve/Reject");
			});
		} else {
			return res.status(401).send("Unauthorized");
		}
	} else {
		return res.status(401).send("Unauthorized");
	}
});

//add an attendee to an event only administrator has authorization
router.put('/:eventId/attendee', passport.authenticate('jwt', { session: false}), function(req, res) {
	var token = getToken(req.headers);
	var eventId = req.params.eventId;

	if(token) {
		if (checkAccess(token,"ADMIN")) {
			Event.findByIdAndUpdate({_id: eventId}, {$addToSet: {attendees: [req.body.attendees]}}, err => {
				if (err) return res.json({message: "err"});
				res.json("add an attendee to this event successfully!!!");
			});
		} else {
			return res.status(401).send("Unauthorized");
		}
	} else {
		return res.status(401).send("Unauthorized");
	}
});

//get all attendees of an event
router.get('/:eventId/attendees', passport.authenticate('jwt', { session: false}), function(req, res) {
	var token = getToken(req.headers);
	var eventId = req.params.eventId;

	if(token) {
		if (checkAccess(token,"ADMIN")) {
			Event.findById(eventId, (err, event) => {
				if (err) {
					res.status(400).send({
						message: 'Invalid event id ' + eventId + ': ' + err
					});
				} else if (!event) {
					res.status(404).send({
						message: 'Event with id ' + eventId + ' not found'
					});
				} else {
					User.find({
						_id: {
							$in: event.attendees
						}
					}, (err, users) => {
						if (err) {
							res.status(500).send({
								message: 'Error finding event with id ' + eventId + ': ' + err
							});
						} else {
							res.json(users);
						}
					});
				}
			});
		} else {
			return res.status(403).send({message: "User Unauthorized"});
		}
	} else {
		return res.status(403).send("Token Unauthorized");
	}
});



//get all events
router.get('/', (req, res, next) => {
	Event.find({}, (err, events) => {
		if (err) return next(err);
		res.json(events);
	});
});

//get a event by id
router.get('/:eventId', (req, res, next) => {
	try{
		eventId = req.params.eventId;

		Event.find({
			_id: eventId
		}, (err, event) => {
			if(err) return next(err);
			else {
				if (!event){
					res.status(400).send("Event not found!!!");
				}
				else {
					res.json(event);
				}
			}
		});
	}
	catch (err){
		res.status(500).send({
			message: 'Error finding event with id ' + eventId + ': ' + err
		});
	}
});

//helper function
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

/*
 * postman add event:
 * {
	"name": "event1",
	"description": "event1",
	"location": "event1",
	"startTime": "2018-03-29",
	"endTime": "2018-10-12",
	"status": "SUBMITTED",
	"attendees": "5bf8770e0c2f3b31306b13cc"
}
*/
