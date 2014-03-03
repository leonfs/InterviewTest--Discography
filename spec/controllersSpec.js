'use strict';

describe('Controllers Test Suite', function() {
	var scope;
	var ctrl;
	var mockArtist;

	var mockArtistListResource = {
		get : function() {
			return {}; 
		}
	};

	beforeEach(function(){
		module("app.controllers");

		inject(function($rootScope) {
			scope = $rootScope.$new();
		});

		mockArtist = {
			id : '1'
		}

	});
	
	describe('Artist List Controller Tests', function() {
		beforeEach(inject(function($rootScope, $controller) {
			spyOn(mockArtistListResource, 'get').andReturn({ 
				artists : [
					mockArtist, 
					{id: '2'}
				] 
			});

			ctrl = $controller('ArtistListController', {
				$scope: scope, 
				ArtistList: mockArtistListResource
			});
		})); 


		it('should make a call to get() from ArtistList resource on construction', function() {
			expect(mockArtistListResource.get).toHaveBeenCalled();
		});

		it('should have 2 artists on the list', function() {
			expect(scope.artistsLookup).toBeDefined();
			expect(scope.artistsLookup.artists.length).toBe(2);
		});

	});

});