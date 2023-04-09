const mongoose = require('mongoose');
   
const userSchema = mongoose.Schema({
	firstName: {
		type: String,
		required:true,
		min: 2,
		max: 255
	},
	lastName: {
		type: String,
		required:true,
		min: 2,
		max: 255
	},	
	email: {
		type: String,
		required: true,
		unique: true,
		match: /^(?:(?:(?:[^@,"\[\]\x5c\x00-\x20\x7f-\xff\.]|\x5c(?=[@,"\[\]\x5c\x00-\x20\x7f-\xff]))(?:[^@,"\[\]\x5c\x00-\x20\x7f-\xff\.]|(?<=\x5c)[@,"\[\]\x5c\x00-\x20\x7f-\xff]|\x5c(?=[@,"\[\]\x5c\x00-\x20\x7f-\xff])|\.(?=[^\.])){1,62}(?:[^@,"\[\]\x5c\x00-\x20\x7f-\xff\.]|(?<=\x5c)[@,"\[\]\x5c\x00-\x20\x7f-\xff])|[^@,"\[\]\x5c\x00-\x20\x7f-\xff\.]{1,2})|"(?:[^"]|(?<=\x5c)"){1,62}")@(?:(?!.{64})(?:[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.?|[a-zA-Z0-9]\.?)+\.(?:xn--[a-zA-Z0-9]+|[a-zA-Z]{2,6})|\[(?:[0-1]?\d?\d|2[0-4]\d|25[0-5])(?:\.(?:[0-1]?\d?\d|2[0-4]\d|25[0-5])){3}\])$/,
		min: 6,
		max: 255
	},
	password: {
		type: String,
		required:true,
		min: 6,
		max: 1024
	},
	admin: {
            type: Boolean
	},
	mySession: {
        type: String
	},
	createdDate: {
		type: Date,
		required: true,
		default: Date.now
	    }
    });

     userSchema.set('toJSON', { virtuals: true });

     module.exports = mongoose.model('Detailist', userSchema);