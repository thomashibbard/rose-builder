angular.module('boilerplateApp')
	.controller('mainCtrl', function($scope, $rootScope, $http, $location, $routeParams/*, $timeout*/){

		$scope.mainMenu = ['imageLocation', 'imageData'];
		$scope.activeMenuIndex = 0;
		$scope.incrementActiveMenu = function(){
			$scope.activeMenuIndex++;
		};
		$scope.srcDir = '/Users/thibbard/Documents/repos/projects/rose-builder/images';

		$rootScope.helpers = {};
		$rootScope.helpers.resetHeight = function(){

		};

    $scope.$on(
      "$locationChangeSuccess",
      function handleLocationChangeEvent( event ) {
      	$scope.resizeContainerAfterXHR();
      }
    );	

		//incredibly hacky function to resize .container after AJAX
		//i can't find any better way to do this honestly: .container
		//would always end up shorter than the content it contained.
		//at least i was able to do it without the $timeout thank god.
		$scope.resizeContainerAfterXHR = function(){
			var pathsToResize = ['/placeImages', '/imageData'];
			if (pathsToResize.indexOf($location.path()) > -1){
			    var $container = jQuery('.container')
			    	, $main = jQuery('#main')
			    	, containerHeight = parseInt($container.css('height'), 10)
			    	, mainHeight = parseInt($main.css('height'), 10);
			    $container.css('height', containerHeight + 350 + 'px');
			}
			jQuery('body, html, .container').scrollTop(-100);
		};

	});

