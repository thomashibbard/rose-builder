angular.module('boilerplateApp')
	.controller('placeImagesCtrl', function($scope, $rootScope, $http, $location, $document, ImageDataFactory){

		//    /Users/thibbard/Documents/repos/projects/rose-builder/images

		if (ImageDataFactory.imageData.dataBySize.length > 0){
			$scope.imageData = ImageDataFactory.imageData;
			localStorage.setItem('imageData', JSON.stringify($scope.imageData));
		}else{
			$scope.imageData = ImageDataFactory.imageData = JSON.parse(localStorage.getItem('imageData'));
		}

		$scope.imageData = JSON.parse(localStorage.getItem('imageData'))
		
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
		}
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
				return datum.currentlyMoving == true;
		});
	};

/*
	var selected = null, formerSelected = null// Object of the element to be moved
	  x_pos = 0,
	  y_pos = 0, // Stores x & y coordinates of the mouse pointer
	  x_elem = 0,
	  y_elem = 0; // Stores top, left values (edge) of the element

	// Will be called when user starts dragging an element
	function _drag_init(elem) {
	  // Store the object of the element which needs to be moved
	  selected = elem;

	  x_elem = x_pos - selected.offsetLeft;
	  y_elem = y_pos - selected.offsetTop;
	}
	$scope.downInit = function(el, index){
		$scope.setCurrentlyMoving(index);
    _drag_init(el.target);
    return false;
	};

	// Will be called when user dragging an element
	$scope._move_elem = function(e) {
		//console.log(e.target)
	  x_pos = document.all ? window.event.clientX : e.pageX;
	  y_pos = document.all ? window.event.clientY : e.pageY;

	  if (selected !== null) {
	    selected.style.left = (x_pos - x_elem) + 'px';
	    selected.style.top = (y_pos - y_elem) + 'px';
	  }
	};

	// Destroy the object when we are done
	$scope._destroy = function(currentlyMoving) {
		if (selected) {
			//set  position properties to $scope.imageData.dataBySize
			//do this on destroy so that _move_elem only sets the one property
			//as of now, it is not throttled, so it could potentially get too
			//heavy and laggy if to much is done there
			currentlyMoving.top = parseInt(selected.style.top, 10);
			currentlyMoving.left = parseInt(selected.style.left, 10);
			//TODO use this for undos/arrow keypresses etc.
			formerSelected = selected;
		  selected = null;
		}
	};*/
	$scope.getImageSize = function(currentlyMoving, target){
		currentlyMoving.alteredWidth = target.style.width;
		currentlyMoving.alteredHeight = target.style.height;
	};

	$scope.placeholderMouseup = function(e){
		var currentlyMoving = $scope.getCurrentlyMoving();
		$scope.getImageSize(currentlyMoving, e.target);
		//$scope._destroy(currentlyMoving);
	};

  $document.bind("keydown", function(event) {

  	// left: 37, top: 38, right: 39, down: 40
  	var arrows = [37, 38, 39, 40];
  	if (arrows.indexOf(event.which) > -1){
  		event.preventDefault();
  		var currentlyMovingIndex = ImageDataFactory.getCurrentlyMovingIndex();
  		console.log(currentlyMovingIndex);
  		var increment = event.shiftKey ? 10 : 1;
  		var tempCoord; 
			switch (event.which){
				case 37: //left
					tempCoord = parseInt($scope.imageData.dataBySize[currentlyMovingIndex].left, 10);
					console.log(tempCoord -= increment)
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
				default:
					console.log($scope.imageData.dataBySize[currentlyMovingIndex]);
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
  $scope.downloadRoseString = function(){
  	console.log($scope.imageData);
  };

/*  $scope.test = function(){
  	console.log($scope.imageData);
  };*/

});

