angular.module('boilerplateApp')
	.controller('placeImagesCtrl', function($scope, $rootScope, $http, $location){

		$rootScope.imageData = [
		  {
		    "height": 308,
		    "width": 78,
		    "type": "jpg",
		    "fileName": "bottle.jpg",
		    "inBatch": false,
		    "isRequired": false,
		    "useImage": true,
				"placeholderShown": true
		  },
		  {
		    "width": 107,
		    "height": 36,
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
		    "type": "png",
		    "fileName": "t2.png",
		    "inBatch": false,
		    "isRequired": false,
		    "useImage": true,
				"placeholderShown": false,
				"currentlyMoving": false
		  }
		];
		$scope.backgroundImageFlag = true;
		$scope.toggleBackgroundImage = function(){
			$scope.backgroundImageFlag = !$scope.backgroundImageFlag;
		};

		//TODO should this be a toggle function?
		//for now, actually leaving it a toggle function
		$scope.showPlaceholder = function(index){
			$rootScope.imageData[index].placeholderShown = !$rootScope.imageData[index].placeholderShown;
		};
		$scope.imageHeight = 100 / $rootScope.imageData.length + '%';





	var selected = null, // Object of the element to be moved
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
		$rootScope.imageData.forEach(function(datum){
			datum.currentlyMoving = false;
		});
		$rootScope.imageData[index].currentlyMoving = true;
    _drag_init(el.target);
    return false;
	};

	// Will be called when user dragging an element
	$scope._move_elem = function(e) {
	  x_pos = document.all ? window.event.clientX : e.pageX;
	  y_pos = document.all ? window.event.clientY : e.pageY;

	  if (selected !== null) {
	    selected.style.left = (x_pos - x_elem) + 'px';
	    selected.style.top = (y_pos - y_elem) + 'px';
	    //document.getElementById("code-block-pos").innerHTML = "<code>top: " + (y_pos - y_elem) + "px;<br> left: " + (x_pos - x_elem) + "px;</code>";
	  }
	}

	// Destroy the object when we are done
	$scope._destroy = function() {
		//set final position properties to $rootScope.imageData
		var currentlyMoving = $rootScope.imageData.filter(function(datum){
			return datum.currentlyMoving === true;
		})[0];
		currentlyMoving.top = selected.style.top;
		currentlyMoving.left = selected.style.left;

		console.log(currentlyMoving);
		//console.log(selected.style.left, selected.style.top)
	  selected = null;
	}



















	});