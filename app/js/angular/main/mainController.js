angular.module('boilerplateApp')
	.controller('mainCtrl', function($scope, $rootScope, $http, $location){

		$scope.mainMenu = ['imageLocation', 'imageData'];
		$scope.activeMenuIndex = 0;
		$scope.incrementActiveMenu = function(){
			$scope.activeMenuIndex++;
		};
		$scope.srcDir = '/Users/thibbard/Documents/desktop backup/dev/nodeTest1/images';
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
			$("html, body, .container").css("width", "100%");
		};

	});