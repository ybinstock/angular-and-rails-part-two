angular.module('raffler.controllers')
  .controller('MovieController', [
    "$scope",
    "$routeParams",
    "$sce",
    function ($scope, $routeParams, $sce) {
      var youtubeId = $routeParams.movie_id;

      $scope.youtubeUrl = $sce.trustAsResourceUrl("http://www.youtube.com/embed/" + youtubeId + "?rel=0");

    }]);