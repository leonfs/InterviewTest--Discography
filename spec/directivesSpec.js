'use strict';

describe('Directives Test Suite', function() {
	var scope;

	beforeEach(function() {
		module('app.directives');
	});

	/*
		If I would have been using Karma to run the tests I would have been able to load the 
		template from the URL by using module(urlTemplate). I'm using this hack of using an
		XMLHttpRequest object instead.
		*/
		beforeEach(inject(function($templateCache) {
		    var directiveTemplate = null;
		    var req = new XMLHttpRequest();
		    req.onload = function() {
		        directiveTemplate = this.responseText;
		    };
	    	req.open("GET", "templates/wiki-list.html", false);
	    	req.send();
	    	$templateCache.put("templates/wiki-list.html", directiveTemplate);
		}));

	describe('Wikis Directive Test Suite', function() {
		var $scope, scope, elem, linkFn, html;

		var expectedUrl = 'http://es.wikipedia.org/wiki/Arctic_Monkeys/';

		beforeEach(function() {
			html = '<wikis wikis="wikis"></wikis>';

			inject(function($compile, $rootScope) {

				$scope = $rootScope.$new();
				$scope.wikis = [expectedUrl];
				
				elem = angular.element(html);

				$compile(elem)($scope); 

				scope = elem.scope();

				scope.$apply();
			});

		});


		
		it('should have one valid wiki URL to artist', function() {
			var wikiLinks = elem.find('a');
			expect(wikiLinks.eq(0).text()).toBe(expectedUrl);
			expect(wikiLinks.eq(0).attr('href')).toBe(expectedUrl);
		});

		it('add Wiki should add a wiki URL to artist', function() {
			expect(scope.wikis.length).toBe(1);
			scope.newWikiURL = 'http://en.wikipedia.org/something';
			scope.addWiki();

			expect(scope.wikis.length).toBe(2);
		});


		it('addWiki should not add an empty Wiki URL to artist', function() {
			expect(scope.wikis.length).toBe(1);
			scope.newWikiURL = ''; //emtpy
			scope.addWiki();

			expect(scope.wikis.length).toBe(1);
		});

		it('AddWiki should not add an undefined Wiki URL to artist', function() {
			expect(scope.wikis.length).toBe(1);
			scope.newWikiURL = undefined;
			scope.addWiki();

			expect(scope.wikis.length).toBe(1);
		});

		it('addWiki should not add an string with only empty spaces', function() {
			expect(scope.wikis.length).toBe(1);
			scope.newWikiURL = '   ';
			scope.addWiki();

			expect(scope.wikis.length).toBe(1);
		});

		//another test should be that the URL is from wikipedia.org
		it('addWiki should not add a malformed URL address', function() {
			expect(scope.wikis.length).toBe(1);
			scope.newWikiURL = 'thisisnotanURL';
			scope.addWiki();

			expect(scope.wikis.length).toBe(1);
		});

	});

});