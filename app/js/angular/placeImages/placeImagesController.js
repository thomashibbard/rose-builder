angular.module('boilerplateApp')
	.controller('placeImagesCtrl', function($scope, $rootScope, $http, $location){

		$rootScope.imageData = [
		  {
		    "height": 600,
		    "width": 160,
		    "type": "jpg",
		    "fileName": "bottle.jpg",
		    "inBatch": false,
		    "isRequired": false
		  },
		  {
		    "width": 160,
		    "height": 600,
		    "type": "png",
		    "fileName": "cta.png",
		    "inBatch": false,
		    "isRequired": false
		  },
		  {
		    "width": 159,
		    "height": 599,
		    "type": "png",
		    "fileName": "evergreen.png",
		    "inBatch": false,
		    "isRequired": false
		  },
		  {
		    "width": 160,
		    "height": 600,
		    "type": "png",
		    "fileName": "legal.png",
		    "inBatch": false,
		    "isRequired": false
		  },
		  {
		    "height": 600,
		    "width": 160,
		    "type": "jpg",
		    "fileName": "pic1.jpg",
		    "inBatch": false,
		    "isRequired": false
		  },
		  {
		    "width": 200,
		    "height": 600,
		    "type": "png",
		    "fileName": "pic2.png",
		    "inBatch": false,
		    "isRequired": false
		  },
		  {
		    "width": 160,
		    "height": 600,
		    "type": "png",
		    "fileName": "shadow.png",
		    "inBatch": false,
		    "isRequired": false
		  },
		  {
		    "width": 160,
		    "height": 600,
		    "type": "png",
		    "fileName": "t1.png",
		    "inBatch": false,
		    "isRequired": false
		  },
		  {
		    "width": 160,
		    "height": 600,
		    "type": "png",
		    "fileName": "t2.png",
		    "inBatch": false,
		    "isRequired": false
		  }
		];
		window.imageData = $rootScope.imageData;
	});