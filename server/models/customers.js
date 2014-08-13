var mongoose = require('mongoose');

var CustomerSchema = new mongoose.Schema ({
	name: {type:String, required: 'Customer name is required.', unique: true},
	created_at: { type: Date, default: new Date().getTime() },
	hidden: Boolean,
});

mongoose.model('Customer', CustomerSchema);