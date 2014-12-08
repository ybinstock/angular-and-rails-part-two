// This needs to happen first!

// Create name spaces for all modules
angular.module('raffler.controllers',[]);
angular.module('raffler.factories',[]);

// And inject in app module
var app = angular.module("raffler", [
	"rails",
	'raffler.controllers',
	'raffler.factories'
]);

