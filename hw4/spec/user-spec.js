const request = require("request");

const api = request.defaults({
	baseUrl: 'http://localhost:3000/api',
	json: true
});

describe('User Tests:', function () {
	//user registration
	it('User registration pass', function (done) {
		api.post({
			url: '/users',
			body: {
				username: "wa",
				password: "wa",
				firstName: "1",
				lastName: "1",
				position: "staff",
				majorOrunit: "cs",
				email: "2221"
			}
		}, function (err, res, body) {
			expect(res.statusCode).toBe(200);
			done();
		});
	});

	it('User registration fail', function (done) {
		api.post({
			url: '/users',
			body: {
				username: 'Johnson'
			}
		}, function (err, res, body) {
			expect(res.statusCode).toBe(400);
			expect(res.body).toBe("Failed registration since missing part of user's information");
			done();
		});
	});


	//user login
	it('User login pass', function (done){
		api.post({
			url: '/login',
			body: {
				username: 'Johnerer',
				password: '1234'
			}}, function (err, res, body){
				expect(res.statusCode).toBe(200);
				done();
			});
	});

	it('User login fail', function(done){
		api.post({
			url: '/login',
			body:{
				username: 'Johnerer',
				password: '1111'
			}}, function(err, res, body){
				expect(res.statusCode).toBe(401);
				expect(res.body).toBe("Invalid password");
				done();
			});
	});

});
