var mongoose = require('mongoose'),
	Order = mongoose.model('Order'),
	Customer = mongoose.model('Customer'),
	Product = mongoose.model('Product');

module.exports = {
	index: function(req, res) {
		res.render('index', { title: 'Welcome to the Fruit Stand' })
	},
	index_json: function(req, res) {
		Order.find({}, function(err, orders) {
			res.send(JSON.stringify(orders));
		});
	},
	create: function(req, res) {
		var a = new Order(req.body.new_order);
		a.save(function(err) {
			if(err) {
				res.status(418)
				res.json(err);
			} else {
				res.json(a);
			}
		})
	}
}