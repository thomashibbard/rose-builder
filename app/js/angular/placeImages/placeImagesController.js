angular.module('boilerplateApp')
	.controller('placeImagesCtrl', function($scope, $rootScope, $http, $location, $document, ImageDataFactory, BuildRosettaService){

		//    /Users/thibbard/Documents/repos/projects/rose-builder/images

		if (ImageDataFactory.imageData.dataBySize.length > 0){
			$scope.imageData = ImageDataFactory.imageData;
			localStorage.setItem('imageData', JSON.stringify($scope.imageData));
		}else{
			$scope.imageData = ImageDataFactory.imageData = JSON.parse(localStorage.getItem('imageData'));
		}

		$scope.imageData = JSON.parse(localStorage.getItem('imageData'));
		
		$scope.imageData.dataBySize.forEach(function(datum, index){
		  if (index === 0){
		   datum.placeholderShown = true;
		   datum.currentlyMoving = true;
		  }else{
		   datum.placeholderShown = false;
		   datum.currentlyMoving = false;
		  }
		});

		$scope.backgroundImageFlag = true;
		$scope.toggleBackgroundImage = function(){
			$scope.backgroundImageFlag = !$scope.backgroundImageFlag;
		};

		//TODO should this be a toggle function?
		//for now, actually leaving it a toggle function
		$scope.showPlaceholder = function(index){
			$scope.imageData.dataBySize[index].placeholderShown = !$scope.imageData.dataBySize[index].placeholderShown;
		};
		$scope.imageHeight = 100 / $scope.imageData.dataBySize.length + '%';
		
		$scope.placeholderBorderFlag = true;
		$scope.togglePlaceholderBorder = function(){
			$scope.placeholderBorderFlag = !$scope.placeholderBorderFlag;
		};

		$scope.showFileNameFlag = true;
		$scope.toggleFileName = function(){
			$scope.showFileNameFlag = !$scope.showFileNameFlag;
		};
		
		$scope.hideSaturationFlag = true;
		$scope.toggleSaturation = function(){
			$scope.hideSaturationFlag = !$scope.hideSaturationFlag;
		};

		$scope.placeImageSelectFileName = function(index){
			$scope.showPlaceholder(index);
			ImageDataFactory.setCurrentlyMoving(index);
		};
		$scope.getCurrentlyMoving = function(){
			return $scope.imageData.dataBySize.filter(function(datum){
					return datum.currentlyMoving === true;
			})[0];		
		};
		$scope.setCurrentlyMoving = function(index){
			$scope.imageData.dataBySize.forEach(function(datum){
				datum.currentlyMoving = false;
			});
			$scope.imageData.dataBySize[index].currentlyMoving = true;
		};
		$scope.getCurrentlyMovingIndex = function(){
			return _.findIndex($scope.imageData.dataBySize, function(datum){
				return datum.currentlyMoving === true;
		});
	};


	$scope.getImageSize = function(currentlyMoving, target){
		currentlyMoving.alteredWidth = target.style.width;
		currentlyMoving.alteredHeight = target.style.height;
	};

	$scope.placeholderMouseup = function(e){
		var currentlyMoving = ImageDataFactory.getCurrentlyMovingIndex();
		$scope.getImageSize(currentlyMoving, e.target);
		//$scope._destroy(currentlyMoving);
	};

	$scope.$watch(ImageDataFactory, function(){
		$scope.imageData = ImageDataFactory.imageData;
	});

  $document.bind("keydown", function(event) {
  	var arrows = [37, 38, 39, 40];
  	if (arrows.indexOf(event.which) > -1){
  		event.preventDefault();
  		var currentlyMovingIndex = ImageDataFactory.getCurrentlyMovingIndex();
  		var increment = event.shiftKey ? 10 : 1;
  		var tempCoord; 
			switch (event.which){
				case 37: //left
					tempCoord = parseInt($scope.imageData.dataBySize[currentlyMovingIndex].left, 10);
					$scope.imageData.dataBySize[currentlyMovingIndex].left = tempCoord -= increment;
					break;
				case 38: //top
					tempCoord = parseInt($scope.imageData.dataBySize[currentlyMovingIndex].top, 10);
					$scope.imageData.dataBySize[currentlyMovingIndex].top = tempCoord -= increment;
					break;
				case 39: //right
					tempCoord = parseInt($scope.imageData.dataBySize[currentlyMovingIndex].left, 10);
					$scope.imageData.dataBySize[currentlyMovingIndex].left = tempCoord += increment;
					break;
				case 40:  //down
					tempCoord = parseInt($scope.imageData.dataBySize[currentlyMovingIndex].top, 10);
					$scope.imageData.dataBySize[currentlyMovingIndex].top = tempCoord += increment;
					break;
			}
			$scope.$apply();
  	}
  });

  $scope.startAnew = function(){
  	var c = confirm("Exit page and build new Rose?");
  	if (c){
  		$location.path('/');
  	}
  };
  $scope.downloadRosetta = function(){
  	$scope.imageData = JSON.parse(angular.toJson($scope.imageData)); //remove angular $$keys from object
  	BuildRosettaService.buildSingleObject($scope.imageData)
  		.then(function(response){
  			console.log('success', response);
  		}, function(response){
  			console.log('error!', response);
  		}
  	);
  };

});

