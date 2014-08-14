miniStore.factory('OrderFactory', function($http) {
	var title = 'Orders | Store';
	var factory = {};
	var orders = [];
	factory.getOrders = function(x) {
		$http.get('/orders.json').success(function(allOrders) {
			orders = allOrders;
			x(allOrders);
		})
	}
	factory.createOrder = function(order, y, z) {
		$http.post('/orders/create', { new_order: order })
			.success(function(data) {
				orders.push(data);
				z();
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
	factory.getCustomers = function(x) {
		$http.get('/customers.json').success(function(allCustomers) {
			customers = allCustomers;
			x(allCustomers);
		});
	}
	factory.createCustomer = function(name, y) {
		$http.post('/customers/create', { name: name })
			.success(function(data) {
				customers.push(data);
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
	factory.getProducts = function(x) {
		$http.get('/products.json').success(function(allProducts) {
			products = allProducts;
			x(allProducts)
		});
	}
	factory.createProduct = function(product, y) {
		$http.post('/products/create', { new_product: product })
			.success(function(data) {
				products.push(data);
			})
			.error(function(err){
				y(err);
			})
	}
	factory.updateProduct = function(id, quantity, x) {
		$http.post('/products/update', { id:id, quantity: quantity })
			.success(function(){
				$http.get('/products.json')
					.success(function(allProducts) {
						products = allProducts;
					});
			})
			.error(function(err) {
				x(err);
			})
	}
	return factory;
})