
##AngularJS and Rails - Part 2

####Goals:


* Extend Raffler app from last week
* Refactor app as it grows
* Add more pages, controllers, factories
* Understand Angular routing
* Integrate external APIs

Quick overview of what we are going to build.

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

Catch up:

	git checkout one


####2) Multiple pages: Angular routing

Angular provides a powerful client-side router called ngRoute. (See [Angular](https://docs.angularjs.org/tutorial/step_07) tutorial)

ngRoute plays a similar role to the router in Rails, with one key difference: the routing happens in the client's browser rather than on the server.

ngRoute provides a powerful way to map URLs to a specific controller and then render a view alongside that controller.

To use ngRoute, the first thing we need to do is load the angular-route javascript file.

	//= require angular-route

Next, we need to require the `ngRoute` library. We do that by adding it as the last argument of the app module function like this:

```
var app = angular.module("raffler", [
	"rails",
	'raffler.controllers',
	'raffler.factories',
	'ngRoute'
	]);
```	

We would like to is a total of three routes/pages in our app:

`/` -> renders raffler

`/movies` -> goes to a page that lists top 25 movies on YouTube

`/movie/:movie_id` -> goes to page that plays requested movie trailer

**Exercise**: Let's create a new folder `templates` in the public directory:

`/public/templates`

Inside, create three html files and add some placholer content:

* index.html
* movies.html
* movie.html

Copy content of `app/views/raffler/index.html` to the new index.html file under templates. Replace content of `app/views/raffler/index.html` with text: *I used to be the home page, now I'm gone ...* - reload.

Let's fix this and create routes in angular.

In `app.js`, create a new `config` module and inject `$routeProvider` and `$locationProvider`:

	app.config(function($routeProvider, $locationProvider) {
	
	}

About Angular's [$location](https://docs.angularjs.org/guide/$location) service: 

When should I use `$location`? Any time your application needs to react to a change in the current URL or if you want to change the current URL in the browser.

**It does not cause a full page reload when the browser URL is changed. **

*The $location service parses the URL in the browser address bar (based on the window.location) and makes the URL available to your application. Changes to the URL in the address bar are reflected into $location service and changes to $location are reflected into the browser address bar.*


Use html5 URL mode - [Here's why](http://html5demos.com/history/third). Add this inside the config function:

	$locationProvider.html5Mode({
		enabled: true
	});

*In HTML5 mode, the $location service getters and setters interact with the browser URL address through the HTML5 history API. This allows for use of regular URL path and search segments, instead of their hashbang equivalents.*	
	
Now let's finally do the routes using `$routeProvider`:

```
$routeProvider
  	.when('/',
      {
        templateUrl: '/templates/index.html',
        controller: 'RaffleController'
      })
    .when('/trailer/:movie_id',
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
```    

Let's try it out - reload home page.

Hmmm. this didn't work, Why not? Let's take a look at the layout file.
    
Replace:

	<%= yield %>
	
With:

	<div ng-view></div>
	
	
That's better, the real page shows up again. What about '/movies'?

	http://localhost:3000/movies

No luck. Our router isn't sticking. Why is that happening?

It's because in our routes we're using HTML5 mode, but when we send a request to /movies Rails is trying to handle a request to that page and it can't find the page.

If we want to use the Angular router, we have to tell Rails to send missing URLs to us. This needs to be the very last route

	match '*path' => "popcorn#index", :via => [:get, :post]

Try again, now it should work. Let's add a link on 

Catch up:

	git checkout two

####3) Create controllers and factory with dummy data and test

**Exercise:**
 
* Create `MovieController` and `MoviesController` and test with dummy $scope variable in corresponding pages.
* Create a `YouTube` factory that has a function returning the string "Jaws". Use new factory in MoviesController to set your dummy scoped variable to the return value of the function.
* Add a link to the bottom of the home page that goes to the movies page.  

Catch up:

	git checkout three


####5) Make raffler app talk to "players api"


####6) POSTing from Angular - Adding players

	


  
  

	
	


 