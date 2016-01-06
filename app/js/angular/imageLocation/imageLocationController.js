angular.module('boilerplateApp')
	.controller('imageLocationCtrl', function($scope, $rootScope, $http, GenerateBoilerplate, $location, ImageDataFactory, ImageDataService){

		$scope.imageData = ImageDataFactory.imageData;



		$scope.setSelectedSize = function(){
			//$rootScope.selectedSize = $scope.sizes.selectedSize;
			//console.log($rootScope.selectedSize);
			console.log(ImageDataFactory.imageData.config.sizes.selectedSize);
		};
		$scope.bgScale = "cover"
		$scope.directoryType = "size";
		$scope.urlParams = $scope.bgScale + '/' + $scope.directoryType;
		$scope.imageLocation = '/Users/thibbard/Documents/repos/projects/rose-builder/images';

		$scope.submitRosetta = function(){

			$scope.rosettaData = GenerateBoilerplate.getBoilerplateElement($scope.urlParams);
			console.log('r', $scope.rosettaData);
		};

		$scope.downloadFile = function($event){
			document.getElementById('downloadFile').click();
		};
		$scope.clickFileInput = function(){
			//alert('test');
			angular.element('#src-dir-select').click();
		};

		$scope.fileNameChanged = function(e){
			console.log(e.target.files[1])
		};

		$scope.selectedSize = false;
		$scope.selectSize = function(index){
			$scope.selectedSize = $scope.sizes[index];
		}

		$scope.getImageDataFromDirectory = function(){
			ImageDataService.GetImageDataFromDirectory($scope.imageData.config.imageDirectory)
				.then(function(response, err){
					$scope.imageData.dataBySize = response.data.result;
					$location.path('/imageData/');
				}, function(response){
					console.log('error getting image data', response);
			});
		};

	}); 