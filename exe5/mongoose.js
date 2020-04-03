const mongoose = require('mongoose');
const User = require('./user');
const Event = require('./event');


async function add(){
	await mongoose.connect('mongodb://localhost/mongooseDB', {useCreateIndex: true, useNewUrlParser: true });

	//delete all user data
	await User.deleteMany({});

	//insert user one by one
	var user1 = new User({
		_id: new mongoose.Types.ObjectId(),
		name: 'John',
		email: 'joph@gamil.com'
	});
	user1 = await user1.save();

	var user2 = new User({
		_id: new mongoose.Types.ObjectId(),
		name: 'Jane',
		email: 'jan@gmail.com'
	});
	user2 = await user2.save();

	//delete all event data
	await Event.deleteMany({});

	//insert event one by one
	var event1 = new Event({
		_id: new mongoose.Types.ObjectId(),
		name: 'Chess club',
		startTime: new Date(2018, 10, 1),
		endTime: new Date(2018, 10, 1),
		organizer:{
			o_id: user1._id
		},
		attendees: [{
			a_id: user2._id
		}]
	});
	event1 = await event1.save();

	var event2 = new Event({
		_id: new mongoose.Types.ObjectId(),
		name : 'MockInterview',
		startTime: new Date(2018, 10, 1),
		endTime: new Date(2018, 10, 1),
		organizer:{o_id:user2._id},
		attendees:[{
			a_id: user1._id
		}]
	});
	event2 = await event2.save();

	await mongoose.disconnect();
}

async function query(){
	await mongoose.connect('mongodb://localhost/mongooseDB', {useCreateIndex: true, useNewUrlParser: true });

	//Find all events held between 8/17/2018 and 12/21/2018
	let events = await Event.find({
		'$and':[{
			'$and':[{
				'startTime':{$gte: new Date(2018,7,17)}
			},{
				'startTime':{$lte: new Date(2018,11,21)}
			}]
		},{
			'$and':[{
				'endTime':{$gte: new Date(2018,7,17)}
			},{
				'endTime':{$lte: new Date(2018,11,21)}
			}]
		}]
	});
	console.log("Find all events held between 8/17/2018 and 12/21/2018");
	events.forEach(event => console.log(event));
	console.log("\n")


	// Find all events John attended
	events = await Event.aggregate([{
		$lookup: {
			from: 'users',
			localField: 'attendees.a_id',
			foreignField: '_id',
			as: 'users'
		}
	}, {$match: {'users.name' :'John'}}, 
		{$project: {users: false}
		}]);
	console.log("Find all events John attended");
	events.forEach(event => console.log(event));
	console.log("\n")


	//Find all attendees of the first event (the result should include user name and email, i.e. not just user id)
	users = await User.aggregate([{
		$lookup: {
			from: 'events',
			localField: '_id',
			foreignField: 'attendees.a_id',
			as: 'events'
		}
	}, {$match: {'events.name': 'Chess club'}},
		{$project: {events: false}
	}]);
	console.log("Find all attendees of the first event");
	users.forEach(user => console.log(user));

	await mongoose.disconnect();
}

async function run(){
	await add();
	await query();
}
run();
