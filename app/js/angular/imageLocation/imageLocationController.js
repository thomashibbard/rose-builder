angular.module('boilerplateApp')
	.controller('imageLocationCtrl', function($scope, $rootScope, $http, GenerateBoilerplate, $location, ImageDataFactory, ImageDataService){

		$scope.imageData = ImageDataFactory.imageData;

		$scope.bgScale = "cover";
		$scope.directoryType = "size";
		$scope.urlParams = $scope.bgScale + '/' + $scope.directoryType;
		//$scope.imageLocation = '/Users/thibbard/Documents/repos/projects/rose-builder/images';

		$scope.selectedSize = false;
		$scope.selectSize = function(index){
			$scope.selectedSize = $scope.sizes[index];
		};

		$scope.getImageDataFromDirectory = function(){
			ImageDataService.GetImageDataFromDirectory($scope.imageData.config.imageDirectory)
				.then(function(response){
					var dataBySize = response.data.result;
					dataBySize.forEach(function(datum){
						datum.top = 0;
						datum.left = 0;
						datum.currentlyMoving = false;
					});
					$scope.imageData.dataBySize = response.data.result;
					$location.path('/imageData/');
				}, function(response){
					console.log('error getting image data', response);
			});
		};

	}); 