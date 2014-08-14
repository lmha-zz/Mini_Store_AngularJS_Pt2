var mongoose = require('mongoose'),
	Customer = mongoose.model('Customer');

module.exports = {
	index: function(req, res) {
		res.render('partials/customers', { title: 'Welcome to the Fruit Stand' })
	},
	index_json: function(req, res) {
		Customer.find({}).sort('-created_at').exec(function(err, orders) {
			res.send(JSON.stringify(orders));
		});
	},
	create: function(req, res) {
		var a = new Customer(req.body);
		a.save(function(err) {
			if(err) {
				res.status(418);
				if(11000 === err.code || 11001 === err.code) {
					err.err = "A customer with that name already exists";
				}
				res.json(err);
			} else {
				res.json(a)
			}
		})
	},
	delete: function(req, res) {
		Customer.remove({ _id: req.params.id }, function(err, win) {
			if(err) {
				res.status(418);
				res.json(err)
			} else {
				res.json(win)
			}
		})
	}
}