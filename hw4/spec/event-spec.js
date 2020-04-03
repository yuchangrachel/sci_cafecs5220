const request = require("request");


const api = request.defaults({
	baseUrl: 'http://localhost:3000/api',
	json: true
});


describe("Event test", function() {
	var tokenBody;
	var eventId;
	var userId;

	beforeAll(function (done) {
		api.post({
			url: '/login',
			body: {
				username: 'Johnerer',
				password: '1234'
			}
		}, function (err, res, body) {
			expect(res.statusCode).toBe(200);
			tokenBody = res.body;
		});

		api.get({
			url: '/events'
		}, function (err, res, body) {
			expect(res.statusCode).toBe(200);
			eventId = body[0]._id;
		});

		api.get({
			url: '/users'
		}, function (err, res, body) {
			expect(res.statusCode).toBe(200);
			userId = body[0]._id;
			done();
		});

	});


	//create a new event
	it('Create a new event pass', function (done) {
		api.post({
			url: '/events',
			headers: {
				'Authorization': 'jwt ' + tokenBody
			},
			body:{
				name: "robitic club",
				description: "1111111111111111111",
				location: "event1",
				startTime: "2018-03-29",
				endTime: "2018-10-12",
				status: "SUBMITTED"
			}
		}, function (err, res, body) {
			expect(res.statusCode).toBe(200);
			expect(res.body).toBe("Created new Event successfully!!!");
			done();
		});
	});

	it ('fail create event due to missing fields', function(done){
		api.post({
			url: '/events',
			headers: {
				'Authorization': 'jwt ' + tokenBody
			},
			body: {
				name: "eventmissing"
			}
		}, function (err, res, body) {
			expect(res.statusCode).toBe(401);
			expect(res.body).toBe("Failed since missing part of event's information");
			done();
		});
	});

	//approve/reject event
	it('approve/reject event pass', function(done){
		api.put({
			url: '/events/' + eventId + '/approve',
			headers: {
				'Authorization': 'jwt ' + tokenBody
			},
			body: {
				"status": "POSTED"
			}}, function(err, res, body){
				expect(res.statusCode).toBe(200);
				expect(res.body).toBe("Approve/Reject");
				done();
			});
	});

	it('Approve/reject an event fail since access control', function (done) {
		api.put({
			url: '/events/'+ eventId + '/approve',
			body:{
				"status": "POSTED"
			}
		}, function (err, res, body) {
			expect(res.statusCode).toBe(401);
			expect(res.body).toBe("Unauthorized");
			done();
		});
	});


	//add a attendee to an event
	it('Add an attendee to an event', function (done) {
		api.put({
			url: '/events/'+ eventId + '/attendee',
			headers: {
				'Authorization': 'jwt ' + tokenBody
			},
			body:{
				"attendees": userId
			}
		}, function (err, res, body) {
			expect(res.statusCode).toBe(200);
			done();
		});
	});	


	//get all attendees from a event
	it('Get all attendees from one event', function(done){
		api.get({
			url: '/events/' + eventId + '/attendees',
			headers: {
				'Authorization': 'jwt ' + tokenBody
			}
		}, function(err, res, body){
			people = JSON.parse(JSON.stringify(body));
			expect(res.statusCode).toBe(200);
			//database diff from postman
			//expect(people[0].firstName).toBe("Jane");
			done();

		}
		);
	});	


});
