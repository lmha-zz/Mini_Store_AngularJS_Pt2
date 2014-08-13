var mongoose = require('mongoose'),
	Product = mongoose.model('Product');

module.exports = {
	index: function(req, res) {
		res.render('index', { title: 'Welcome to the Fruit Stand' })
	},
	index_json: function(req, res) {
		Product.find({}, function(err, products) {
			res.send(JSON.stringify(products));
		});
	},
	create: function(req, res) {
		var a = new Product(req.body);
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
	}
}