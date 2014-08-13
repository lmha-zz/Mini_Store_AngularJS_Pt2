miniStore.config(function($routeProvider) {
	$routeProvider
		.when('/',
		{
			title: 'Dashboard of Fruit Stand',
			templateUrl: '/partials/dashboards.html',
			controller: 'dashboards'
		})
		.when('/products',
		{
			title: 'Fruit Stand Products',
			templateUrl: '/partials/products.html',
			controller: 'products'
		})
		.when('/orders',
		{
			title: 'Fruit Stand Orders',
			templateUrl: '/partials/orders.html',
			controller: 'orders'
		})
		.when('/customers',
		{
			title: 'Fruit Stand Customers',
			templateUrl: '/partials/customers.html',
			controller: 'customers'
		})
	$routeProvider.otherwise({'redirectTo': '/'});
})

miniStore.run(['$location', '$rootScope', function($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
}]);