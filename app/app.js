angular.module('boilerplateApp', ['ngRoute', 'ngAnimate', 'ngFileUpload'])

	.config(function($routeProvider, $locationProvider) {
		$routeProvider
		// select directory of images
		.when('/', {
			templateUrl : '/app/js/angular/imageLocation/imageLocation.html',
			controller	: 'imageLocationCtrl'
		})

		// add to batch /require
		.when('/imageData', {
			templateUrl : '/app/js/angular/imageData/imageData.html',
			controller	: 'imageDataCtrl'
		})

		//download page
		.when('/download', {
			templateUrl : '/app/js/angular/downloadRosetta/downloadRosetta.html',
			controller	: 'imageDataCtrl'
		})

		//upload static image
		.when('/upload', {
			templateUrl : '/app/js/angular/uploadStaticImage/uploadStaticImage.html',
			controller:  'uploadStaticImageCtrl'
		})

		.when('/placeImages', {
			templateUrl: '/app/js/angular/placeImages/placeImages.html',
			controller: 'placeImagesCtrl'
		});

/*		.when('/fileRename', {
			templateUrl: '/app/js/angular/fileRename/fileRename.html',
			controller: 'fileRenameCtrl'
		})*/
		// $locationProvider.html5Mode(true);
	});
