var mongoose = require('mongoose');

var OrderSchema = new mongoose.Schema ({
	customer_name: {type: String, required: "A customer name is required."},
	product: {type: String, required: "A product is required to place an order."},
	quantity: {type: Number, required: "Quanity is required for your order.", min: [1, 'A quantity of at least 1 is required.']},
	order_date: { type: Date, default: new Date().getTime() },
	hidden: Boolean,
});

mongoose.model('Order', OrderSchema);