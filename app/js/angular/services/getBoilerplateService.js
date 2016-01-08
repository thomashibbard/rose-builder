angular.module('boilerplateApp')
	.service('GenerateBoilerplate', function($rootScope, $http){

		this.getBoilerplateElement = function(urlParams){
			$http({
				method: 'GET',
				url: 'http://localhost:8888/process/' + urlParams

			}).then(function namedSuccess(response){
				console.log('service', response);
				return response;
			}, function namedError(response){
				console.log('error', response);
			});
		};
	});