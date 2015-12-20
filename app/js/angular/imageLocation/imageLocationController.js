angular.module('boilerplateApp')
	.controller('imageLocationCtrl', function($scope, $rootScope, $http, GenerateBoilerplate, $location){

		$scope.bgScale = "cover"
		$scope.directoryType = "size";
		$scope.urlParams = $scope.bgScale + '/' + $scope.directoryType;
		$scope.imageLocation = '/Users/thibbard/Documents/desktop backup/dev/nodeTest1/images';

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


		$scope.getImageData = function() {
			$http.get('http://localhost:8888/GetImageData/' + encodeURIComponent($scope.srcDir))
				.then(function(response) {
					$rootScope.imageData = response.data.result;
					$location.path('/imageData/');
					$rootScope.helpers.resetHeight();
				}, function(response) {
					console.log('error getting data!', response);
				});
		};


	}); 