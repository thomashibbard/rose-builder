angular.module('boilerplateApp')
	.controller('imageDataCtrl', function($scope, $rootScope, $http, $location, GetImageData, ImageDataFactory){

		$scope.imageData = ImageDataFactory.imageData;
		console.log('image data ctrl', $scope.imageData.dataBySize)

		$scope.toggleUseImage = function(index){
			$scope.imageData.dataBySize[index].useImage = !$scope.imageData.dataBySize[index].useImage;
		};
		$scope.toggleImageBatch = function(index){
			$scope.imageData.dataBySize[index].inBatch = !$scope.imageData.dataBySize[index].inBatch;
		};
		$scope.toggleImageRequired = function(index){
			$scope.imageData.dataBySize[index].isRequired = !$scope.imageData.dataBySize[index].isRequired;
		};

		$scope.allInBatch = false;
		$scope.toggleImageBatchAll = function(){
			var allBatchOn = $scope.imageData.dataBySize.every(function(image){
				return image.inBatch;
			})
			if (allBatchOn){
				$scope.imageData.dataBySize.forEach(function(image){
					image.inBatch = false;
				});
				$scope.allInBatch = false;
			}else{
				$scope.imageData.dataBySize.forEach(function(image){
					image.inBatch = true;
				});
				$scope.allInBatch = true;				
			}
		};

		$scope.allRequired = false;
		$scope.toggleImageRequiredAll = function(){
			var allImageRequired = $scope.imageData.dataBySize.every(function(image){
				return image.isRequired;
			});
			if (allImageRequired){
				$scope.imageData.dataBySize.forEach(function(image){
					image.isRequired = false;
				});
				$scope.allRequired = false;
			}else{
				$scope.imageData.dataBySize.forEach(function(image){
					image.isRequired = true;
				});
				$scope.allRequired = true;
			}
		};

		$scope.goToImageLocation = function(){
			$location.path( '/' );
		};
		$scope.fileRename = function(){
			$location.path( '/fileRename' );			
		};
		$scope.uploadAlignToImage = function(){
			$location.path( '/upload' );
		};

	});