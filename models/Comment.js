const mongoose = require('mongoose');
const commentSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},

        comment: {type: String,
               required: true
        },
        date: {type:Date,
               default: Date.now
            }                   
});

module.exports = mongoose.model('Comment', commentSchema);