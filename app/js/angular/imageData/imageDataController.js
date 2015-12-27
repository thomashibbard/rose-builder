angular.module('boilerplateApp')
	.controller('imageDataCtrl', function($scope, $rootScope, $http, $location, GetImageData){

		$scope.message = 'image data message';

		$scope.toggleUseImage = function(index){
			$rootScope.imageData[index].useImage = !$rootScope.imageData[index].useImage;
		};
		$scope.toggleImageBatch = function(index){
			$rootScope.imageData[index].inBatch = !$rootScope.imageData[index].inBatch;
		};
		$scope.toggleImageRequired = function(index){
			$rootScope.imageData[index].isRequired = !$rootScope.imageData[index].isRequired;
		};

		$scope.allInBatch = false;
		$scope.toggleImageBatchAll = function(){
			var allBatchOn = $rootScope.imageData.every(function(image){
				return image.inBatch;
			})
			if (allBatchOn){
				$rootScope.imageData.forEach(function(image){
					image.inBatch = false;
				});
				$scope.allInBatch = false;
			}else{
				$rootScope.imageData.forEach(function(image){
					image.inBatch = true;
				});
				$scope.allInBatch = true;				
			}
		};

		$scope.allRequired = false;
		$scope.toggleImageRequiredAll = function(){
			var allImageRequired = $rootScope.imageData.every(function(image){
				return image.isRequired;
			});
			if (allImageRequired){
				$rootScope.imageData.forEach(function(image){
					image.isRequired = false;
				});
				$scope.allRequired = false;
			}else{
				$rootScope.imageData.forEach(function(image){
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
		}
		$scope.generateRosetta = function(){
			console.log('generating rosetta')
			//build rosetta object from $rootScope.imageData
			$http.post('http://localhost:8888/generateRosetta/', {
				imageData: $rootScope.imageData
			})
			.then(function(response){
				console.log('rosetta obj', response.data);
			}, function(response){
				console.log('error generating rosetta', response);
			});
		};

	});