'use strict';

const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
	name: String,
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
		trim: true
	}
});


module.exports = mongoose.model('User', userSchema);
