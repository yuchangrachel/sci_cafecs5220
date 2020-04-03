'use strict';

const mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

let userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	position: {
		type: String,
		required: true
	},
	majorOrunit: {
		type: String,
		required: true
	},
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	enabled: {
		type: Boolean
	},
	title: {
		type: String
	},
	role: {
		type: String,
		default: 'USER'
	},
	program: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Program'
	}
});


module.exports = mongoose.model('User', userSchema);
