angular.module('raffler.controllers')
	.controller('MoviesController', [
	"$scope",
	"YouTube",
	function($scope, YouTube) {
		
		YouTube.getTop25Movies().then(function(result){
			$scope.movies = result;
		});

	}]);