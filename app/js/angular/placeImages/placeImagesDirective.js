angular.module('boilerplateApp')
	.directive('placeImages', function(){
		return {
			restrict: 'E',
			templateUrl: './app/js/angular/placeImages/placeImages.html'
		};
	});