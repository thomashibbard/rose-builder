var GetImageData = angular.module('boilerplateApp')
	.factory('GetImageData', function($rootScope, $http){

		return {
			byDirectory: function(srcDir){ /*srcDir is URIComponent encoded*/
				return $http.get('http://localhost:8888/getImageData/' + srcDir)
				.then(function namedSuccess(response){
					console.log(response);
					return response;
				});
				console.log('http://localhost:8888/getImageData/' + srcDir);
			}
		};
		return GetImageData;
	});