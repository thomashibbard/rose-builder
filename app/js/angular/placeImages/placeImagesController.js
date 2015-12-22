angular.module('boilerplateApp')
	.controller('placeImagesCtrl', function($scope, $rootScope, $http, $location){

		$scope.imageID = 1; //not zero-indexed for user friendly display
		console.log($rootScope.imageData);

	});