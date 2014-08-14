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
			var flag = true;
			if(req.body.new_order.customer_name == undefined) {
				err.errors.push({ message: 'Customer name required.'})
				flag = false;
			}
			if(req.body.new_order.product == undefined) {
				err.errors.push({ message: 'Product name required.'})
				flag = false;
			}
			if(req.body.new_order.quantity == undefined) {
				err.errors.push({ message: 'Product quantity required.'})
				flag = false;
			}
			if(flag) {
				Product.findOne({ _id: req.body.new_order.product}, function(err, data) {
					var buyProd = data;
					if((req.body.new_order.quantity <= buyProd.quantity) && (req.body.new_order.quantity > 0)) {
						req.body.new_order.product = buyProd.name;
						var a = new Order(req.body.new_order);
						a.save(function(errs) {
							if(errs) {
								err = errs;
							} else {
								// console.log('success!')
								res.json(a);
							}
						})
					} else if(req.body.new_order.quantity == 0) {
						err.errors.push({ message: 'You cannot order any product by the quantity of 0.'});
					} else if(req.body.new_order.quantity < 0) {
						err.errors.push({ message: 'You cannot order any product with a negative quantity!'});
					} else {
						err.errors.push({ message: 'There is only '+buyProd.quantity+" "+buyProd.name+' available to order.'});
					}
				});
			}
		}
		if((err.errors).length > 0) {
			res.status(418)
			res.json(err);
		}
	}
}