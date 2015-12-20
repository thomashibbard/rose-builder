angular.module('boilerplateApp')
	.directive('imageLocation', function(){
		return {
			restrict: 'EA',
			templateUrl: './app/js/angular/imageLocation/imageLocation.html'
		};
	});