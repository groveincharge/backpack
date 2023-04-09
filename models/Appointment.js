const mongoose = require('mongoose');
   
const appointmentSchema = mongoose.Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Detailist', required: true},
	phone: {
		type: String,
		required:true,
		min: 2,
		max: 255
	   },
	 street: {
		type: String,
		required:true,
		min: 2,
		max: 255
	   },	
	 city: {
		type: String,
		required: true,
		unique: true,
		max: 255
	  },
	 state: {
		type: String,
		required:true,
		min: 6,
		max: 1024
	  },
	zipcode: {
            type: Number,
			require: true
	  },
	  appointment: {
		 type: String,
		 require: true
	  },
	createdDate: {
		type: Date,
		required: true,
		default: Date.now
	    }
    });

     appointmentSchema.set('toJSON', { virtuals: true });

     module.exports = mongoose.model('Address', appointmentSchema);