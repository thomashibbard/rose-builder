angular.module('boilerplateApp')
	.controller('fileRenameCtrl', function($scope, $rootScope, $location){
		$rootScope.goToImageData = function(){
			$location.path( '/imageData' );
		};
	});