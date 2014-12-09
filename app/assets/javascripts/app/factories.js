// A place for all my factories

// A factory that wraps the rails resource, compliments to railsResourceFactory service.
// The returned resource is available under the name 'Player'. Examples:
//
// Player.query({ name: "Cartman"})
//
// var newPlayer = new Player({ name: "Jack"})
// newPlayer.create()
//
// newPlayer.delete()
//
// newPlayer.name = "Eric Cartman"
// newPlayer.update()
//
// Make sure to inject 'Player' where needed.

angular.module('raffler.factories')
  .factory('Player',
	function (railsResourceFactory) {
		var resource = railsResourceFactory({
			url: '/players',
			name: 'player'});
		return resource;
});

angular.module('raffler.factories')
  .factory('YouTube', function ($http, $q) {
    var api = {};

      api.getTop25Movies = function() {
          var d = $q.defer();

    $http.jsonp('http://gdata.youtube.com/feeds/api/charts/movies/most_popular?v=2&max-results=25&paid-content=true&hl=en&region=us&alt=json&callback=JSON_CALLBACK')
      .then(function(response) {
        var movies = response.data.feed.entry.map(function(movie) {
          return {
            youtubeId: movie["media$group"]["yt$videoid"]["$t"],
            title: movie["media$group"]["media$title"]["$t"]
          };
        });
        console.log("made request!");
        d.resolve(movies);
      });

      return d.promise;

    };
       return api;
});
