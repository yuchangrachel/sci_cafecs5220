//mongo shell script
//run it with mongo shell on command line: mongo script.js under certain directory

//Connect to a MongoDB database
db = connect('localhost/script');
print('Connected to database: script');

//Delete existing user and event data (if any)
db.users.drop();
db.events.drop();

//Insert two users John and Jane and get the generated_id
user1 = {
	_id:1,
	name: 'John',
	email: 'john@gmail.com'
};

user2 = {
	_id:2,
	name: 'Jane',
	email: 'jane@gmail.com'
};

db.users.insert(user1);
db.users.insert(user2);

//insert two events
event1 = {
	_id: 1,
	name: 'Chess club',
	startTime: new Date(2018, 10, 1),
	endTime: new Date(2018, 10, 1),
	organizer: user1._id,
	attendees: [{
		id: user2._id
	}]
};

event2 = {
	_id:2,
	name: 'Robotic lab',
	startTime: new Date(2018, 10, 1),
	endTime: new Date(2018, 10, 1),
	organizer: user2._id,
	attendees:[{

		id: user1._id
	}]
};

//test
event3 = {
	_id:3,
	name: 'testevent',
	startTime: new Date(2018,7,16),
	endTime: new Date(2018,7,16),
	organizer: user1._id,
	attendees:[{
		id: user1._id
	}]
}

db.events.insert(event1);
db.events.insert(event2);
db.events.insert(event3);

//query
//Find all events held between 8/17/2018 and 12/21/2018
result1 = db.events.find({
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

print("Find all events held between 8/17/2018 and 12/21/2018")
printAll(result1);
print("\n");

//Find all events John attended
//1way:show list of events taht John attended
result2 = db.events.aggregate([
	{$lookup: {from: "users",localField: "attendees.id",foreignField: "_id",as: "users"}},
	{$match: {'users.name': 'John'}},
	{$project: {users: false}}
]);


print("Find all events John attended")
printAll(result2);
print("\n");

//2way: show John attend what kinds of events
result22 = db.users.aggregate([
	{$match : {name : 'John'}},
	{$lookup: {from: "events",localField: "_id",foreignField: "attendees.id",as: "events"}}

]);

print("Find all events John attended")
printAll(result22);
print("\n");


//Find all attendees of the first event (the result should include user name and email, i.e. not just user id)
//1way: only show attendees 'infor
result3 = db.users.aggregate([
	{$lookup: {
		from: 'events',
		localField: '_id',
		foreignField: 'attendees.id',
		as: 'events'
	}
	}, 
	{$match: {'events._id' :1}},
	{$project: {events: false}}
]);

print("Find all attendees of the first event")
printAll(result3);
print("\n");


//2way:show first event's attendees'info
result33 = db.events.aggregate([
	{$match : {_id : 1}},
	{$lookup: {from: "users",localField: "attendees.id",foreignField: "_id",as: "attendees'info'"}}

]);

print("Find all attendees of the first event")
printAll(result33);
print("\n");


function printAll(cursor) {
	while (cursor.hasNext()) {
		printjson(cursor.next());
	}
}

//disconnect
quit();
