angular.module('raffler.controllers')
	.controller('MoviesController', [
	"$scope",
	"YouTube",
	function($scope, YouTube) {
		
		$scope.testTrailer = YouTube.testFunction();

	}]);