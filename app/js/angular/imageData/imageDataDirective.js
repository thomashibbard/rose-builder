angular.module('boilerplateApp')
	.directive('imageData', function(){
		return {
			restrict: 'E',
			templateUrl: './app/js/angular/imageData/imageData.html'
		};
	});