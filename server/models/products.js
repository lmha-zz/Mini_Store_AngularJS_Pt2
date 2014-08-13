var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema ({
	name: {type: String, required: 'Product name is required.', unique: true},
	created_at: { type: Date, default: new Date().getTime() },
	hidden: Boolean,
});

mongoose.model('Product', ProductSchema);