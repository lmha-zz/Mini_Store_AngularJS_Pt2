miniStore.controller('dashboards', ['$scope', '$http', 'OrderFactory', 'CustomerFactory', 'ProductFactory', function($scope, $http, OrderFactory, CustomerFactory, ProductFactory) {
	OrderFactory.getOrders(function(data){
		$scope.orders = data;
	});
	CustomerFactory.getCustomers(function(data) {
		$scope.customers = data;
	})
	ProductFactory.getProducts(function(data){
		$scope.products = data;
	})
}])

miniStore.controller('orders', ['$scope', '$http', 'OrderFactory', 'CustomerFactory', 'ProductFactory', function($scope, $http, OrderFactory, CustomerFactory, ProductFactory) {
	OrderFactory.getOrders(function(data){
		$scope.orders = data;
	});
	CustomerFactory.getCustomers(function(data) {
		$scope.customers = data;
	})
	ProductFactory.getProducts(function(data){
		$scope.products = data;
	})
	$scope.newOrder = function() {
		$scope.errors = '';
		OrderFactory.createOrder($scope.new_order,
			function(errs) {
				$scope.errors = errs.errors;
			},
			function() {
				ProductFactory.updateProduct(
					$scope.new_order.product,
					$scope.new_order.quantity,
					function(err) {
						$scope.errors = errs
					}
				)
				$scope.new_order = null;
			}
		);
	}
}])

miniStore.controller('products', ['$scope', '$http', 'ProductFactory', function($scope, $http, ProductFactory) {
	ProductFactory.getProducts(function(data){
		$scope.products = data;
	})
	$scope.newProduct = function() {
		$scope.errors = '';
		ProductFactory.createProduct($scope.new_product,
			function(errs){
				$scope.errors = errs;
			}
		);
		$scope.new_product = null;
	}
}])

miniStore.controller('customers', ['$scope', '$http', 'CustomerFactory', function($scope, $http, CustomerFactory) {
	CustomerFactory.getCustomers(function(data) {
		$scope.customers = data;
	})
	$scope.newCustomer = function() {
		$scope.errors = '';
		CustomerFactory.createCustomer($scope.new_customer,
			function(errs) {
				$scope.errors = errs;
			}
		);
		$scope.new_customer = null;
	}
}])