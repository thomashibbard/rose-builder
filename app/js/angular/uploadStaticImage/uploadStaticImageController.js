angular.module('boilerplateApp')
  .controller('uploadStaticImageCtrl', ['$scope', '$rootScope', 'Upload', '$timeout', '$location', 'ImageDataFactory', function($scope, $rootScope, Upload, $timeout, $location, ImageDataFactory) {
    $scope.imageData = ImageDataFactory.imageData;
    $scope.uploadFiles = function(file, errFiles) {
      var host = '';
      var uploadRoutePath = 'uploadStaticImage';
      var uploadDestPath = 'uploadedImages';

      $scope.f = file;
      $scope.errFile = errFiles && errFiles[0];
      if (file) {
        file.upload = Upload.upload({
          url: host + '/' + uploadRoutePath,
          data: {
            file: file
          }
        });

        file.upload.then(function(response) {
          $timeout(function() {
            file.result = response.data;
            $scope.imageData.config.staticImageName = $scope.f.name;
            $scope.imageData.config.staticImagePath = uploadDestPath + '/' + $scope.f.name;
            $location.path('/placeImages');
          });
        }, function(response) {
          if (response.status > 0)
            $scope.errorMsg = response.status + ': ' + response.data;
        }, function(evt) {
          file.progress = Math.min(100, parseInt(100.0 *
            evt.loaded / evt.total));
        });
      }
    }
  }]);