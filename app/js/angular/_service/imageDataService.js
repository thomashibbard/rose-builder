angular.module('boilerplateApp')
  .service('ImageDataService', function($http){
    this.GetImageDataFromDirectory = function(imageDirectory){
     return  $http.post('./getImageData/', {directory: imageDirectory})
        .then(function(response){
          return response;
        }, function(response){
          return response;
        }
      );
    };
  });