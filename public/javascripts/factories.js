miniStore.factory('OrderFactory', function($http) {
	var factory = {};
	var orders = [];
	factory.initOrders = function(x) {
		$http.get('/orders.json').success(function(allOrders) {
			orders = allOrders;
			x(allOrders);
		})
	}
	factory.getOrders = function() {
		return orders;
	}
	factory.createOrder = function(order, x, y) {
		$http.post('/orders/create', { new_order: order })
			.success(function(data) {
				orders.push(data);
				x();
			})
			.error(function(err) {
				y(err);
			})
	}
	return factory;
})

miniStore.factory('CustomerFactory', function($http) {
	var factory = {};
	var customers = [];
	factory.initCustomers = function(x) {
		$http.get('/customers.json').success(function(allCustomers) {
			customers = allCustomers;
			x(allCustomers);
		});
	}
	factory.getCustomers = function() {
		return customers;
	}
	factory.createCustomer = function(name, x, y) {
		$http.post('/customers/create', { name: name })
			.success(function(data) {
				customers.push(data);
				x();
			})
			.error(function(err){
				y(err);
			})
	}
	return factory;
})

miniStore.factory('ProductFactory', function($http) {
	var factory = {};
	var products = [];
	factory.initProducts = function(x) {
		$http.get('/products.json').success(function(allProducts) {
			products = allProducts;
			x(allProducts)
		});
	}
	factory.getProducts = function() {
		return products;
	}
	factory.createProduct = function(name, x, y) {
		$http.post('/products/create', { name: name })
			.success(function(data) {
				products.push(data);
				x();
			})
			.error(function(err){
				y(err);
			})
	}
	return factory;
})