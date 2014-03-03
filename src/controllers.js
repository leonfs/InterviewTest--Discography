'use strict';

/* Controllers */

var controllersModule = angular.module('app.controllers', []);

controllersModule.controller('ArtistListController', function($scope, ArtistList) {
    
    $scope.artistsLookup = ArtistList.get();
    
});


