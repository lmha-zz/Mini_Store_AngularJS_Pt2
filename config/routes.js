var orders = require('./../server/controllers/orders.js');
var customers = require('./../server/controllers/customers.js');
var products = require('./../server/controllers/products.js');

module.exports = function Routes(app) {
	app.get('/', function(req,res) { orders.index(req,res) });
	app.get('/orders.json', function(req,res) { orders.index_json(req,res) });
	app.get('/orders', function(req,res) { orders.index(req,res) });
	app.get('/orders/new', function(req,res) {orders.new(req,res) });
	app.post('/orders/create', function(req,res) { orders.create(req,res) });
	app.get('/customers', function(req,res) { customers.index(req,res) });
	app.get('/customers.json', function(req,res) { customers.index_json(req,res) });
	app.get('/customers/new', function(req,res) {customers.new(req,res) });
	app.post('/customers/create', function(req,res) { customers.create(req,res) });
	app.get('/products', function(req,res) { products.index(req,res) });
	app.get('/products.json', function(req,res) { products.index_json(req,res) });
	app.get('/products/new', function(req,res) {products.new(req,res) });
	app.post('/products/create', function(req,res) { products.create(req,res) });
}