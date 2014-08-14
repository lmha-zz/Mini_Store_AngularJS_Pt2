var mongoose = require('mongoose'),
	Product = mongoose.model('Product');

module.exports = {
	index: function(req, res) {
		res.render('index', { title: 'Welcome to the Fruit Stand' })
	},
	index_json: function(req, res) {
		Product.find({}).sort('-created_at').exec(function(err, orders) {
			res.send(JSON.stringify(orders));
		});
	},
	create: function(req, res) {
		var a = new Product(req.body.new_product);
		a.save(function(err) {
			if(err) {
				res.status(418);
				if(11000 === err.code || 11001 === err.code) {
					err.err = "That product already exists in our database.";
				}
				res.json(err);
			} else {
				res.json(a)
			}
		})
	},
	update: function(req, res) {
		Product.update({ _id: req.body.id}, { $inc: { quantity: -req.body.quantity } }, function(err, data) {
			if(err) {
				res.status(418);
				res.json(err);
			} else {
				res.json(data)
			}
		})
	}
}