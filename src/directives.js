'use strict';

/* Directives */

var directivesModule = angular.module('app.directives', []);


directivesModule.directive('artist', function() {
	return {
		restrict: 'E',
		templateUrl: 'templates/artist.html',
		scope: {
			artist: '='
		},
		controller: function($scope, Artist) {
			$scope.update = function() {
		    	Artist.put(scope.artist);
    		}
		}

	};
});

directivesModule.directive('wikis', function() {
	var urlRegex = new RegExp('^(https?)://.+$');

	return {
		restrict: 'E', 
		templateUrl: 'templates/wiki-list.html',
		scope: {
			wikis: '='
		},
		link: function(scope, element, attrs) {
			scope.$watch('wikis', function() {
				if (scope.wikis == undefined || scope.wikis.length === 0) {
					scope.class = 'hide';
				} else {
					scope.class = 'show';
				}
			}, false);

		},
		controller: function($scope, $element) {
			$scope.newWikiURL = '';

			$scope.addWiki = function() {
				if ($scope.wikis == undefined) {
			        $scope.wikis = [];
			    }

			    var nw = $scope.newWikiURL;
			    if (nw != undefined && nw.trim() != '' && urlRegex.exec(nw)) { 
			    	$scope.wikis.push(nw);
			        $scope.newWikiURL = '';
			    }
			}

		}

	};

});

directivesModule.directive('albums', function(AlbumsFromArtistList) {
	return {
		restrict: 'E',
		templateUrl: 'templates/albums.html',
		link: function (scope, element, attrs) {
			scope.showArtistAlbums = function() {
				scope.albumsLookup = AlbumsFromArtistList.get({artist_id: scope.artist.id});
				element.removeClass('hide');
			};
		}
    }
});



