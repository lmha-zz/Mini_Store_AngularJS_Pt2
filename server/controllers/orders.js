var mongoose = require('mongoose'),
	Order = mongoose.model('Order'),
	Product = mongoose.model('Product');

module.exports = {
	index: function(req, res) {
		res.render('index', { title: 'Welcome to the Fruit Stand' })
	},
	index_json: function(req, res) {
		Order.find({}).sort('-order_date').exec(function(err, orders) {
			res.send(JSON.stringify(orders));
		});
	},
	create: function(req, res) {
		var err = { errors: []};
		if(req.body.new_order == undefined) {
			err = { errors: [
							{ message: 'Customer name required.'},
							{ message: 'Product quantity required.'},
							{ message: 'Product name required.'}
						]};
		} else {
			if(req.body.new_order.customer_name == undefined) {
				err.errors.push({ message: 'Customer name required.'})
			}
			if(req.body.new_order.product == undefined) {
				err.errors.push({ message: 'Product name required.'})
			}
			if(req.body.new_order.quantity == undefined) {
				err.errors.push({ message: 'Product quantity required.'})
			}
			if((err.errors).length > 0) {
				res.status(418)
				res.json(err);
			} else {
				Product.findOne({ _id: req.body.new_order.product}, function(errors, data) {
					if(req.body.new_order.quantity > data.quantity) {
						err.errors.push({ message: 'There is only '+data.quantity+" "+data.name+' available to order.'});
					}
					if(req.body.new_order.quantity < 0) {
						err.errors.push({ message: 'You cannot order any product with a negative quantity!'});
					} 
					if((err.errors).length > 0) {
						res.status(418)
						res.json(err);
					} else {
						req.body.new_order.product = data.name;
						var a = new Order(req.body.new_order);
						a.save(function(errors) {
							if(errors) {
								err = errors;
							} else {
								res.json(a);
							}
						})
					}
				});
			}
		}
	}
}