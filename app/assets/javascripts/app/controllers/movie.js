angular.module('raffler.controllers')
	.controller('MovieController', [
	"$scope",
	"$routeParams",
	"$sce",
	"YouTube",
	function($scope, $routeParams, $sce, YouTube) {
	
	console.log($routeParams);

	YouTube.getTop25Movies().then(function(result){
		var movies = result;
		console.log(result);
		$scope.movie = _.find(movies, function(v){ 
			return v.youtubeId == $routeParams.movie_id; 
		});
  	
  	// $scope.movie.youtubeUrl = "http://www.youtube.com/embed/" + $scope.movie.youtubeId + "?rel=0"

  	$scope.movie.youtubeUrl = $sce.trustAsResourceUrl("http://www.youtube.com/embed/" + $scope.movie.youtubeId + "?rel=0"); 
		
	});

	}]);		
