'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let eventSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	startTime: {
		type: Date,
		default: new Date()
	},
	endTime: {
		type: Date,
		default: new Date()
	},
	organizer: {
		o_id: Schema.Types.ObjectId
	},
	attendees: [{
		a_id: Schema.Types.ObjectId
	}]
});

module.exports = mongoose.model('Event', eventSchema);
