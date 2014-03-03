'use strict';

/* Services */

var servicesModule = angular.module('app.services', ['ngResource']);

servicesModule.factory('Domain', function() {
	return {
		name : 'http://ahowellem-test.nodejitsu.com'
	}
});

servicesModule.factory('ArtistList', function($resource, Domain){
	return $resource(Domain.name + '/api/:version/artists.json', {version: 'v1'}, {
		get: {method: 'JSONP', params: {callback:'JSON_CALLBACK'}, headers: { 'Accept': 'application/javascript'}}
	});
});


servicesModule.factory('AlbumsFromArtistList', function($resource, Domain) {
	var listResource = $resource(Domain.name + '/api/:version/albums.json', {version: 'v1'}, {
		get: {method: 'JSONP', params: {artist_id:'', callback: 'JSON_CALLBACK'}, headers: { 'Accept': 'application/javascript'}}
	});
	
	return listResource;
});

servicesModule.factory('Artist', function($resource, Domain) {
	return $resource(Domain.name + '/api/:version/artists/:artistId.json', {version:'v1', artistId:'@id'}, {
		put: {method:'PUT', headers: { 'Content-Type': 'application/json'}},
		get: {method:'JSONP', params: {callback: 'JSON_CALLBACK'}, headers: { 'Accept': 'application/javascript'}}
	});
});


	
