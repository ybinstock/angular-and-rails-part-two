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

app.factory('Player',
	function (railsResourceFactory) {
		var resource = railsResourceFactory({
			url: '/players',
			name: 'player'});
		return resource;
});

