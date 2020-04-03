require('dotenv').config();
//mongoose init data
//before run project, should node js.file
const mongoose = require('mongoose');


const User = require('../models/user');
const Event = require('../models/event');
const Program = require('../models/program');

var programs = [
	{
		_id: new mongoose.Types.ObjectId(),
		name: 'CAPJ',
		fullname: 'campusJob',
		description: 'senior student register'
	}
];


var users = [
	{
		_id: new mongoose.Types.ObjectId(),
		firstName: 'John',
		lastName: 'Smith',
		position: 'STUDENT',
		majorOrunit: 'CS',
		username: 'Johnerer',
		password: '1234',
		email: 'joph@gamil.com',
		title: 'Director of LSAMP',
		role: 'ADMIN',
		enable: true,
		program: programs[0]._id
	},
	{
		_id: new mongoose.Types.ObjectId(),
		firstName: 'Jane',
		lastName: 'Kaierf',
		position: 'Staff',
		majorOrunit: 'Fine Art department',
		username: 'Jr',
		password: '6666',
		email: 'jan@gmail.com',
		role: 'USER',
		enable: true
	}
];

var events = [
	{
		_id: new mongoose.Types.ObjectId(),
		name: 'Chess club',
		location: 'ES102',
		startTime: new Date(2018, 10, 1),
		endTime: new Date(2018, 10, 1),
		status: 'POSTED',
		organizer: users[0]._id,
		attendees: [users[1]._id]
	},
	{
		_id: new mongoose.Types.ObjectId(),
		name : 'MockInterview',
		location: 'Kinghall',
		startTime: new Date(2018, 10, 1),
		endTime: new Date(2018, 10, 1),
		status: 'SUBMITTED',
		organizer: users[1]._id,
		attendees:[users[0]._id]
	}
];

async function run(){
	await mongoose.connect('mongodb://localhost/mongooseDB');

	await User.deleteMany({});
	await Event.deleteMany({});
	await Program.deleteMany({});

	for (var program of programs){
		await new Program(program).save();
	}

	for (var user of users){
		await new User(user).save();
	}

	for (var event of events){
		await new Event(event).save();
	}

	await mongoose.disconnect();
}

//drop databse: use db-->db.dropDatabse() 
run();
