'use strict';

describe('Services Test Suite', function() {
	var domainName;
	var httpBackend;

	afterEach(function() {
		httpBackend.verifyNoOutstandingExpectation();
		httpBackend.verifyNoOutstandingRequest();
	});

	beforeEach(function() {
		module('app.services');

		inject(function($httpBackend,  Artist, Domain) {
			httpBackend = $httpBackend;
			domainName = Domain.name;
		});

	});

	it('Should return the API domain name', function() {
		var expectedDomainName = 'http://ahowellem-test.nodejitsu.com';
		expect(domainName).toBe(expectedDomainName);
	});
	
	describe('Artist Resource Tests', function() {
		var artistResource;
		var artist;

		beforeEach(function() {
			inject(function(Artist) {
				artistResource = Artist;
			});

			artist = {
            	"href": "/api/v1/artists/1.json", 
            	"id": "1", 
            	"name": "Radiohead", 
            	"website": "http://radiohead.com/"
        	}
		});

		it('GET URL should include the artist id and JSON_CALLBACK parameter', function() {
			httpBackend.expectJSONP(domainName + '/api/v1/artists/1.json?callback=JSON_CALLBACK').respond(new Object());
			var expectedArtistId = 1;
			var returnedArtist = artistResource.get({artistId: expectedArtistId});

			httpBackend.flush();
		});

		it("PUT URL should include the artist id", function() {
			httpBackend.expectPUT(domainName + '/api/v1/artists/1.json').respond(200);
			artistResource.put(artist);
			httpBackend.flush();
		});

	});	

	describe('Artist List Resource Test', function() {
		var artistListResource;

		beforeEach(function() {

			inject(function(ArtistList) {
				artistListResource = ArtistList;
			});

		});

		it('GET should include the artist id and JSON_CALLBACK parameter', function() {
			httpBackend.expectJSONP(domainName + '/api/v1/artists.json?callback=JSON_CALLBACK').respond(new Object());
			var requestedArtistId = 1;
			var returnedArtist = artistListResource.get();

			httpBackend.flush();
		});

	});

	describe('Album From Artist Resource Test', function() {
		var albumsFromArtistListResource;

		beforeEach(function() {

			inject(function(AlbumsFromArtistList) {
				albumsFromArtistListResource = AlbumsFromArtistList;
			});

		});

		it('GET should include the artist id and JSON_CALLBACK parameter', function() {
			httpBackend.expectJSONP(domainName + '/api/v1/albums.json?artist_id=1&callback=JSON_CALLBACK').respond(new Object());
			var requestedArtistId = 1;
			var returnedArtist = albumsFromArtistListResource.get({artist_id: requestedArtistId});

			httpBackend.flush();
		}); 
	});
});