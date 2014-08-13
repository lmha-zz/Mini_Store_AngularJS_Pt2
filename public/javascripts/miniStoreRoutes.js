miniStore.config(function($routeProvider) {
	$routeProvider
		.when('/',
		{
			templateUrl: '/partials/orders.html',
			controller: 'orders'
		})
		.when('/customers',
		{
			templateUrl: '/partials/customers.html',
			controller: 'customers'
		})
		.when('/products',
		{
			templateUrl: '/partials/products.html',
			controller: 'products'
		})
	$routeProvider.otherwise({'redirectTo': '/'});
})