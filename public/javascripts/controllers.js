miniStore.controller('orders', ['$scope', '$http', 'OrderFactory', 'CustomerFactory', 'ProductFactory', function($scope, $http, OrderFactory, CustomerFactory, ProductFactory) {
	OrderFactory.initOrders(function(data){
		$scope.orders = data;
	});
	CustomerFactory.initCustomers(function(data) {
		$scope.customers = data;
	})
	ProductFactory.initProducts(function(data){
		$scope.products = data;
	})
	$scope.newOrder = function() {
		$scope.errors = '';
		OrderFactory.createOrder($scope.new_order,
			function(){
				$scope.orders = OrderFactory.getOrders();
			},
			function(errs) {
				$scope.errors = errs.errors;
			}
		);
	}
}])

miniStore.controller('customers', ['$scope', '$http', 'CustomerFactory', function($scope, $http, CustomerFactory) {
	CustomerFactory.initCustomers(function(data) {
		$scope.customers = data;
	})
	$scope.newCustomer = function() {
		$scope.errors = '';
		CustomerFactory.createCustomer($scope.new_customer,
			function(){
				$scope.customers = CustomerFactory.getCustomers(); 
			},
			function(errs) {
				$scope.errors = errs;
			}
		);
	}
}])

miniStore.controller('products', ['$scope', '$http', 'ProductFactory', function($scope, $http, ProductFactory) {
	ProductFactory.initProducts(function(data){
		$scope.products = data;
	})
	$scope.newProduct = function() {
		$scope.errors = '';
		ProductFactory.createProduct($scope.new_product,
			function(){
				$scope.products = ProductFactory.getProducts();
			},
			function(errs){
				$scope.errors = errs;
			}
		);
	}
}])