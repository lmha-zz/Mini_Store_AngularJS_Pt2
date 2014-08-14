miniStore.factory('OrderFactory', function($http) {
	var title = 'Orders | Store';
	var factory = {};
	var orders = [];
	factory.getOrders = function(callback) {
		$http.get('/orders.json').success(function(allOrders) {
			orders = allOrders;
			callback(allOrders);
		})
	}
	factory.createOrder = function(order, errCallback, succsCallback) {
		$http.post('/orders/create', { new_order: order })
			.success(function(data) {
				orders.unshift(data);
				succsCallback();
			})
			.error(function(err) {
				errCallback(err);
			})
	}
	return factory;
})

miniStore.factory('CustomerFactory', function($http) {
	var factory = {};
	var customers = [];
	factory.getCustomers = function(callback) {
		$http.get('/customers.json').success(function(allCustomers) {
			customers = allCustomers;
			callback(allCustomers);
		});
	}
	factory.createCustomer = function(name, errCallback, succsCallback) {
		$http.post('/customers/create', { name: name })
			.success(function(data) {
				customers.unshift(data);
				succsCallback(customers)
			})
			.error(function(err){
				errCallback(err);
			})
	}
	factory.deleteCustomer = function(id, succsCallback, errCallback) {
		$http.post('/customers/'+id+'/delete')
			.success(function() {
				$http.get('/customers.json').success(function(allCustomers) {
					customers = allCustomers;
					succsCallback(allCustomers);
				});
			})
			.error(function(err) {
				errCallback(err);
			})
	}
	return factory;
})

miniStore.factory('ProductFactory', function($http) {
	var factory = {};
	var products = [];
	factory.getProducts = function(callback) {
		$http.get('/products.json').success(function(allProducts) {
			products = allProducts;
			callback(allProducts);
		});
	}
	factory.createProduct = function(product, errCallback, succsCallback) {
		$http.post('/products/create', { new_product: product })
			.success(function(data) {
				products.unshift(data);
				succsCallback(products)
			})
			.error(function(err){
				errCallback(err);
			})
	}
	factory.updateProduct = function(id, quantity, errCallback, succsCallback) {
		$http.post('/products/update', { id:id, quantity: quantity })
			.success(function(){
				$http.get('/products.json')
					.success(function(allProducts) {
						products = allProducts;
						succsCallback(products);
					});
			})
			.error(function(err) {
				errCallback(err);
			})
	}
	return factory;
})