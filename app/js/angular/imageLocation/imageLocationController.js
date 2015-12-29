angular.module('boilerplateApp')
	.controller('imageLocationCtrl', function($scope, $rootScope, $http, GenerateBoilerplate, $location){
		$scope.sizes = {
			sizesArr:[
				{id: 0, display:'160✕600', code: '160x600'}, {id: 1, display:'300✕600', code: '300x600'}, {id: 2, display:'300✕250', code: '300x250'}, {id: 3, display:'728✕90', code: '728x90'}
			],
			selectedSize:{
				id: 0, display:'160✕600', code: '160x600'
			}
		};
		$scope.updateRootSelectedSize = function(){
			$rootScope.selectedSize = $scope.sizes.selectedSize;
			console.log($rootScope.selectedSize);
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

		$scope.getImageData = function() {
			$http.get('http://localhost:8888/GetImageData/' + encodeURIComponent($scope.imageLocation))
				.then(function(response) {
					$rootScope.imageData = response.data.result;
					//console.log(JSON.stringify($rootScope.imageData, null, '  '))
					$location.path('/imageData/');
				}, function(response) {
					console.log('error getting data!', response);
				});
		};


	}); 