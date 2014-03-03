'use strict';


// Declare app level module which depends on filters, and services
angular.module('app', ['app.filters', 'app.services', 'app.directives', 'app.controllers']).
  config(['$routeProvider', function($routeProvider) {
  		$routeProvider
	      .when('/', { 
	      	templateUrl: 'partials/artist-list.html', 
	      	controller: 'ArtistListController'
	      })
	      .otherwise({redirectTo: '/'});
  }]);
