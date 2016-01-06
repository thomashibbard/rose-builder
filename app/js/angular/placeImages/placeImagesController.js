angular.module('boilerplateApp')
	.controller('placeImagesCtrl', function($scope, $rootScope, $http, $location, $document, ImageDataFactory){

/*		$scope.imageData.dataBySize = [
		  {
		    "height": 308,
		    "width": 78,
		    "top": 0,
		    "left": 0,
		    "type": "jpg",
		    "fileName": "bottle.png",
		    "inBatch": false,
		    "isRequired": false,
		    "useImage": true,
				"placeholderShown": true,
				"currentlyMoving": true
		  },
		  {
		    "width": 107,
		    "height": 36,
		    "top": 0,
		    "left": 0,
		    "type": "png",
		    "fileName": "cta.png",
		    "inBatch": false,
		    "isRequired": false,
		    "useImage": true,
				"placeholderShown": false,
				"currentlyMoving": false
		  },
		  {
		    "width": 160,
		    "height": 600,
		    "top": 0,
		    "left": 0,
		    "type": "png",
		    "fileName": "evergreen.png",
		    "inBatch": false,
		    "isRequired": false,
		    "useImage": true,
				"placeholderShown": false,
				"currentlyMoving": false
		  },
		  {
		    "width": 160,
		    "height": 600,
		    "top": 0,
		    "left": 0,
		    "type": "png",
		    "fileName": "final.png",
		    "inBatch": false,
		    "isRequired": false,
		    "useImage": true,
				"placeholderShown": false,
				"currentlyMoving": false
		  },
		  {
		    "width": 159,
		    "height": 24,
		    "top": 0,
		    "left": 0,
		    "type": "png",
		    "fileName": "legal.png",
		    "inBatch": false,
		    "isRequired": false,
		    "useImage": true,
				"placeholderShown": false,
				"currentlyMoving": false
		  },
		  {
		    "height": 600,
		    "width": 160,
		    "top": 0,
		    "left": 0,
		    "type": "jpg",
		    "fileName": "pic1.jpg",
		    "inBatch": false,
		    "isRequired": false,
		    "useImage": true,
				"placeholderShown": false,
				"currentlyMoving": false
		  },
		  {
		    "width": 200,
		    "height": 232,
		    "top": 0,
		    "left": 0,
		    "type": "png",
		    "fileName": "pic2.png",
		    "inBatch": false,
		    "isRequired": false,
		    "useImage": true,
				"placeholderShown": false,
				"currentlyMoving": false
		  },
		  {
		    "width": 160,
		    "height": 600,
		    "top": 0,
		    "left": 0,
		    "type": "png",
		    "fileName": "shadow.png",
		    "inBatch": false,
		    "isRequired": false,
		    "useImage": true,
				"placeholderShown": false,
				"currentlyMoving": false
		  },
		  {
		    "width": 104,
		    "height": 52,
		    "top": 0,
		    "left": 0,
		    "type": "png",
		    "fileName": "t1.png",
		    "inBatch": false,
		    "isRequired": false,
		    "useImage": true,
				"placeholderShown": false,
				"currentlyMoving": false
		  },
		  {
		    "width": 139,
		    "height": 43,
		    "top": 0,
		    "left": 0,
		    "type": "png",
		    "fileName": "t2.png",
		    "inBatch": false,
		    "isRequired": false,
		    "useImage": true,
				"placeholderShown": false,
				"currentlyMoving": false
		  }
		];*/
		//     /Users/thibbard/Documents/repos/projects/rose-builder/images
		$scope.imageData = ImageDataFactory.imageData;
		
		$scope.imageData.dataBySize.forEach(function(datum, index){
		  if (index === 0){
		   datum.placeholderShown = true;
		   datum.currentlyMoving = true;
		  }else{
		   datum.placeholderShown = false;
		   datum.currentlyMoving = false;
		  }
		});
		console.log('new', $scope.imageData.dataBySize);

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
			$scope.setCurrentlyMoving(index);
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
	};
	$scope.getImageSize = function(currentlyMoving, target){
		currentlyMoving.alteredWidth = target.style.width;
		currentlyMoving.alteredHeight = target.style.height;
	};

	$scope.placeholderMouseup = function(e){
		var currentlyMoving = $scope.getCurrentlyMoving();
		$scope.getImageSize(currentlyMoving, e.target);
		$scope._destroy(currentlyMoving);
	};

  $document.bind("keydown", function(event) {
  	// left: 37, top: 38, right: 39, down: 40
  	//console.log(event.which);
  	var arrows = [37, 38, 39, 40];
  	if (arrows.indexOf(event.which) > -1){
  		event.preventDefault();
  		var currentlyMoving = $scope.getCurrentlyMoving();
  		var currentlyMovingIndex = $scope.getCurrentlyMovingIndex();
  		var increment = event.shiftKey ? 10 : 1;
			switch (event.which){
				case 37:
					$scope.imageData.dataBySize[currentlyMovingIndex].left -= increment;
					break;
				case 38:
					$scope.imageData.dataBySize[currentlyMovingIndex].top -= increment;
					break;
				case 39:
					$scope.imageData.dataBySize[currentlyMovingIndex].left += increment;
					break;
				case 40:
					$scope.imageData.dataBySize[currentlyMovingIndex].top += increment;
					break;
				default:
					console.log($scope.imageData.dataBySize[currentlyMovingIndex]);
					break;
			}
			$scope.$apply();
			console.log($scope.imageData)

  	}
  });


  $scope.test = function(){
  	console.log($scope.imageData);
  };

});

