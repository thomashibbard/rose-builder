angular.module('boilerplateApp')
.directive('draggableImage', ['$document', 'ImageDataFactory', function($document, ImageDataFactory) {
  /*thanks to angular API for this draggable logic!*/
  return {
    restrict: 'A',
    link: function(scope, element, attr) {
      var startX = 0, startY = 0, x = 0, y = 0;

      element.on('mousedown', function(event) {
        // Prevent default dragging of selected content
        event.preventDefault();
        var currentlyMovingIndex = ImageDataFactory.getCurrentlyMovingIndex();
        console.log(ImageDataFactory.imageData.dataBySize[currentlyMovingIndex].left,
                    ImageDataFactory.imageData.dataBySize[currentlyMovingIndex].top );
        startX = event.pageX - ImageDataFactory.imageData.dataBySize[currentlyMovingIndex].left;
        startY = event.pageY - ImageDataFactory.imageData.dataBySize[currentlyMovingIndex].top;
        console.log(event.pageX);
        $document.on('mousemove', mousemove);
        $document.on('mouseup', mouseup);
      });

      function mousemove(event) {
        y = event.pageY - startY;
        x = event.pageX - startX;
        element.css({
          top: y + 'px',
          left:  x + 'px'
        });
      }

      function mouseup() {
        var top = parseInt(window.getComputedStyle(element[0]).top, 10);
        var left = parseInt(window.getComputedStyle(element[0]).left, 10);
        ImageDataFactory.setImagePosition(scope.$index, top, left);
        console.log(top, left);
        ImageDataFactory.setCurrentlyMoving(scope.$index);

        $document.off('mousemove', mousemove);
        $document.off('mouseup', mouseup);
        scope.$apply();
      }
    }

  };
}]);
 