angular.module('boilerplateApp')
  .service('BuildRosettaService', function($http){
    this.buildSingleObject = function(imageData){
      return $http.post('./buildRosetta', imageData, function(response){
        console.log('success generating rosetta', response);
      }, function(response){
        console.log('error generating rosetta', response);
      });
    };
  });