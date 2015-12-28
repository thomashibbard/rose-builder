angular.module('boilerplateApp')
	.controller('placeImagesCtrl', function($scope, $rootScope, $http, $location){

		$rootScope.imageData = [
		  {
		    "height": 308,
		    "width": 78,
		    "type": "jpg",
		    "fileName": "bottle.jpg",
		    "inBatch": false,
		    "isRequired": false,
		    "useImage": true,
			"placeholderShown": true
		  },
		  {
		    "width": 107,
		    "height": 36,
		    "type": "png",
		    "fileName": "cta.png",
		    "inBatch": false,
		    "isRequired": false,
		    "useImage": true,
			"placeholderShown": false
		  },
		  {
		    "width": 160,
		    "height": 600,
		    "type": "png",
		    "fileName": "evergreen.png",
		    "inBatch": false,
		    "isRequired": false,
		    "useImage": true,
			"placeholderShown": false
		  },
		  {
		    "width": 160,
		    "height": 600,
		    "type": "png",
		    "fileName": "final.png",
		    "inBatch": false,
		    "isRequired": false,
		    "useImage": true,
			"placeholderShown": false
		  },
		  {
		    "width": 159,
		    "height": 24,
		    "type": "png",
		    "fileName": "legal.png",
		    "inBatch": false,
		    "isRequired": false,
		    "useImage": true,
			"placeholderShown": false
		  },
		  {
		    "height": 600,
		    "width": 160,
		    "type": "jpg",
		    "fileName": "pic1.jpg",
		    "inBatch": false,
		    "isRequired": false,
		    "useImage": true,
			"placeholderShown": false
		  },
		  {
		    "width": 200,
		    "height": 232,
		    "type": "png",
		    "fileName": "pic2.png",
		    "inBatch": false,
		    "isRequired": false,
		    "useImage": true,
			"placeholderShown": false
		  },
		  {
		    "width": 160,
		    "height": 600,
		    "type": "png",
		    "fileName": "shadow.png",
		    "inBatch": false,
		    "isRequired": false,
		    "useImage": true,
			"placeholderShown": false
		  },
		  {
		    "width": 104,
		    "height": 52,
		    "type": "png",
		    "fileName": "t1.png",
		    "inBatch": false,
		    "isRequired": false,
		    "useImage": true,
			"placeholderShown": false
		  },
		  {
		    "width": 139,
		    "height": 43,
		    "type": "png",
		    "fileName": "t2.png",
		    "inBatch": false,
		    "isRequired": false,
		    "useImage": true,
			"placeholderShown": false
		  }
		];
		$scope.backgroundImageFlag = true;
		$scope.toggleBackgroundImage = function(){
			$scope.backgroundImageFlag = !$scope.backgroundImageFlag;
			console.log($scope.backgroundImageFlag);
		};

		//TODO should this be a toggle function?
		//for now, actually leaving it a toggle function
		$scope.showPlaceholder = function(index){
			$rootScope.imageData[index].placeholderShown = !$rootScope.imageData[index].placeholderShown;
		};
		$scope.imageHeight = 100 / $rootScope.imageData.length + '%';


		window.imageData = $rootScope.imageData;
	});