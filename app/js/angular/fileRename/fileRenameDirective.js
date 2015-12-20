angular.module('boilerplateApp')
	.directive('fileRename', function(){
		return {
			restrict: 'EA',
			templateUrl: './app/js/angular/fileRename/fileRename.html'
		};
	})