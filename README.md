
##AngularJS and Rails - Part 2

####Goals:


* Extend Raffler app from last week
* Refactor app as it grows
* Add more pages, controllers, factories
* Understand Angular routing
* Integrate external APIs


####1) Getting started - same as last time:

Clone [this repo](https://github.com/wdi-sf-fall/angular-and-rails-part-two) and explore application.

	bundle exec bundle
	bundle exec rake db:create
	bundle exec rake db:migrate
	bundle exec rake db:seed
	rails s

[open app in browser](http://localhost:3000)


####1) Refactoring

Take a quick look at the new folder strcuture under `app/assets/javascripts`

* app.js
* controllers directory
* factories.js

**Exercise**: Rename `app.js` to `zapp.js`, reload - what happens?

The order of javascript files in the rails assest pipeline is significant. 

	var app = angular.module("raffler", ["rails"]);
	
Needs to be the first line of code, because everything hangs off `app` module.

Solution: Define order in wich asset pipeline processes javascripts in `application.js`
 	
	//= require app/zapp
	//= require_tree .

(Now that we made that point, rename `zapp.js` to `app.js`)


Create a *box* for Angular modules, one for controllers, one for factories etc. 
 
```
angular.module('raffler.controllers',[]);
angular.module('raffler.factories',[]);
```

And inject them in the app module:

```
var app = angular.module("raffler", [
	"rails",
	'raffler.controllers',
	'raffler.factories'
]);
```
	
This way, modules dependencies are resolved from the get go and we don't have to worry about the order in which javascript files are processed from here on.

Note that the function `angular.module` is a getter **and** a setter. 

Now we need to change factory and controller code to reference the modules. Creating the `Player` factory changes from (in `factories.js`):


```
app.factory('Player',
	function (railsResourceFactory) {
```

to:
	
```	
angular.module('raffler.factories')
	.factory('Player',
	function (railsResourceFactory) {
```

The same applies for raffler controller.

**Exercise**: Go ahead an make the corresponding change in `raffler.js` - reload page to verify your changes.






####2) Turn Rails into api server



####4) Create a RaffleController


####5) Make raffler app talk to "players api"


####6) POSTing from Angular - Adding players

	


  
  

	
	


 