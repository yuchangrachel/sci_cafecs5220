const request = require("request");


const api = request.defaults({
	baseUrl: 'http://localhost:3000/api',
	json: true
});


describe("Program test", function() {
	var tokenBody;
	var programId;

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
			url: '/programs'
		}, function (err, res, body) {
			expect(res.statusCode).toBe(200);
			programId = body[0]._id;
			done();
		});
	});

	//get all programs
	it('Get all programs', function(done){
		api.get({
			url: '/programs'
		}, function(err, res, body){
			programs = JSON.parse(JSON.stringify(body));
			expect(programs[0].fullname).toBe("campusJob");
			expect(res.statusCode).toBe(200);
			done();
		});
	});

	//get program by id
	it('Get a program by id', function (done) {
		api.get({
			url: '/programs/' + programId
		}, function (err, res, body) {
			expect(body[0]._id).toBe(programId);
			expect(res.statusCode).toBe(200);
			done();
		});
	});

	//create a new program
	it('Create a new program pass', function (done) {
		api.post({
			url: '/programs',
			headers: {
				'Authorization': 'jwt ' + tokenBody
			},
			body:{
				name: "p1",
				fullname: "p1",
				description: "p1"
			}
		}, function (err, res, body) {
			expect(res.statusCode).toBe(200);
			expect(res.body).toBe("program create");
			done();
		});
	});

	it ('fail create program due to access control', function(done){
		api.post({
			url: '/programs'
		}, function (err, res, body) {
			expect(res.body).toBe("Unauthorized");
			expect(res.statusCode).toBe(401);
			done();
		});
	});

	//edit program
	it('Edit program pass', function(done){
		api.put({
			url: '/programs/' + programId,
			headers: {
				'Authorization': 'jwt ' + tokenBody
			},
			body: {
				"name": "modifyP1"
			}}, function(err, res, body){
				expect(res.body).toBe("Program update!!!");
				expect(res.statusCode).toBe(200);
				done();
			});
	});		


});
