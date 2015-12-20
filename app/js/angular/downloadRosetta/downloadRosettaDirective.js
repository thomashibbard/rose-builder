angular.module('boilerplateApp')
	.directive('downloadRosetta', function(){
		return {
			restrict: 'E',
			templateUrl: './app/js/angular/downloadRosetta/downloadRosetta.html'
		};
	});