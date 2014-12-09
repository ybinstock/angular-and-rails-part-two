
angular.module ('raffler.controllers', []);
angular.module ('raffler.factories', []);

var app = angular.module("raffler", [
  "rails",
  "raffler.controllers",
  "raffler.factories",
  "ngRoute"
  ]);

app.config(function($routeProvider, $locationProvider) {

  $locationProvider.html5Mode({
    enabled: true,
    requireBase:false
  });

  // routes go here
  // get '/' => 'RaffleController#index'
  $routeProvider
    .when('/',
      {
        templateUrl: '/templates/index.html',
        controller: 'RaffleController'
      })
    .when('/movie/:movie_id',
      {
        templateUrl: '/templates/movie.html',
        controller: 'MovieController'
      })
    .when('/movies',
      {
        controller: 'MoviesController',
        templateUrl: '/templates/movies.html'
      })
    .otherwise({redirectTo: '/'});

});