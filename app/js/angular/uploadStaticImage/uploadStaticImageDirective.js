angular.module('boilerplateApp')
	.directive('uploadStaticImage', function(){
		return {
			restrict: 'E',
			templateUrl: './app/js/angular/uploadStaticImage/uploadStaticImage.html'
		};
	});