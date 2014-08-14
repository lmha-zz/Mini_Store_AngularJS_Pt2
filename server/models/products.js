var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema ({
	name: {type: String, required: 'Product name is required.', unique: true},
	image: {type: String, required: 'Product image is required.'},
	description: {type: String},
	quantity: {type: Number, required: 'Product quantity is required.'},
	created_at: { type: Date, default: new Date().getTime() },
	hidden: Boolean,
});

mongoose.model('Product', ProductSchema);