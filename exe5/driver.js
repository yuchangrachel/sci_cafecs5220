'use strict';


const MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

let users = [{
	_id:1,
	name: 'John',
	email: 'john@localhost'
},
	{
		_id:2,
		name: 'Jane',
		email: 'jane@localhost'
	}
];

let events = [{
	_id:1,
	name: 'Chess club',
	startTime: new Date(2018, 10, 1),
	endTime: new Date(2018, 10, 1),
	organizer: users[0]._id,
	attendees: users[1]._id
},{
	_id:2,
	name: 'Robotic lab',
	startTime: new Date(2018, 10, 1),
	endTime: new Date(2018, 10, 1),
	organizer: users[1]._id,
	attendees: users[0]._id
	
},{
	_id: 3,
	name: 'testEvent',
	startTime: new Date(2012,1,1),
	endTime: new Date(2012,2,2),
	organizer: users[1]._id,
	attendees: users[0]._id
}
];

MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
	//connect database
	let db = client.db("driver");
	console.log("Database created!");

	//create collection(table)
	let collection1 = db.collection('users');
	let collection2 = db.collection('events');

	//drop collection if already existed then insert
	collection1.deleteMany({}, (err, result) => {
		collection1.insertMany(users, (err, result) => {

			//query
			//Find all attendees of the first event (the result should include user name and email, i.e. not just user id)
			collection1.aggregate([
				{$lookup: {
					from: 'events',
					localField: '_id',
					foreignField: 'attendees',
					as: 'events'
				}
				},
				{$match: {'events._id' :1}},
				{$project: {events: false}}
			]).toArray(function(err, result){
				console.log("Find all attendees of the first event (the result should include user name and email,     i.e. not just user id)");
				console.log(result);
				console.log("\n");
			});


			collection2.deleteMany({}, (err, result) => {
				collection2.insertMany(events, (err, result) => {
					//Find all events held between 8/17/2018 and 12/21/2018
					collection2.find({
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
					}).toArray(function(err, result){
						console.log("Find all events held between 8/17/2018 and 12/21/2018");
						console.log(result);
						console.log("\n");

						client.close();
					});


					//Find all events John attended
					collection2.aggregate([
						{$lookup: {from: "users",localField: "attendees",foreignField: "_id",as: "users"}},
						{$match: {'attendees': 1}},
						{$project: {users: false}}
					]).toArray(function(err, result){
						console.log("Find all events John attended");
						console.log(result);
						//disconnect database
						client.close();
					});	


				});
			});
		});


	});



});




