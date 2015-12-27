angular.module('boilerplateApp')
	.controller('mainCtrl', function($scope, $rootScope, $http, $location){

		$scope.mainMenu = ['imageLocation', 'imageData'];
		$scope.activeMenuIndex = 0;
		$scope.incrementActiveMenu = function(){
			$scope.activeMenuIndex++;
		};
		$scope.srcDir = '/Users/thibbard/Documents/repos/projects/rose-builder/images';
/*		$scope.getIt = function(){
			console.log('hello', $scope.srcDir);
			$http.get('http://localhost:8888/GetImageData/' + encodeURIComponent($scope.srcDir))
			.then(function(response){
				console.log('got data', response);
			}, function(response){
				console.log('error getting data!', response);
			})
		};*/
		
		//go back to entry-level route if user has no imageData loaded
/*		if(!$rootScope.imageData){
			$location.path( '/' );
		}*/





		$rootScope.helpers = {};
		$rootScope.helpers.resetHeight = function(){
/*			var containerHeight = parseInt(jQuery(".container").css("height"), 10);
			var rows = jQuery(".image-data-row");
			var newHeight = containerHeight + parseInt(rows.eq(0).css("height"), 10) * rows.size() + 50;
			jQuery(".container").css("height", newHeight)
			console.log('resized')*/
		};

	});