miniStore.controller('dashboards', ['$scope', '$http', 'OrderFactory', 'CustomerFactory', 'ProductFactory', function($scope, $http, OrderFactory, CustomerFactory, ProductFactory) {
	$scope.incProdLim = function() {
		$scope.prodLim+=5;
	}
	$scope.removeLim = function(x) {
		if(x == 'orders') {
			$scope.orderLim = $scope.orders.length;
		} else {
			$scope.custLim = $scope.customers.length;
		}
	}
	$scope.prodLim = 5;
	$scope.orderLim = 3;
	$scope.custLim = 3;
	$scope.predicate = 'order_date';
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

miniStore.controller('products', ['$scope', '$http', 'ProductFactory', function($scope, $http, ProductFactory) {
	$scope.incLimit = function() {
		$scope.limits+=5;
	}
	$scope.newProduct = function() {
		$scope.errors = '';
		ProductFactory.createProduct($scope.new_product,
			function(errs){
				$scope.errors = errs;
			}
		);
		$scope.new_product = null;
	}
	$scope.limits = 15;
	ProductFactory.getProducts(function(data){
		$scope.products = data;
	})
}])

miniStore.controller('customers', ['$scope', '$http', 'CustomerFactory', function($scope, $http, CustomerFactory) {
	$scope.newCustomer = function() {
		$scope.errors = '';
		CustomerFactory.createCustomer($scope.new_customer,
			function(errs) {
				$scope.errors = errs;
			}
		);
		$scope.new_customer = null;
	}
	CustomerFactory.getCustomers(function(data) {
		$scope.customers = data;
	})
}])