angular.module('boilerplateApp')
  .factory('ImageDataFactory', function() {
      return {
        imageData: {
          config: {
            imageDirectory: '',
            staticImagePath: '',
            sizes: {
              sizesArr: [{
                id: 0,
                display: '160✕600',
                plainText: '160x600'
              }, {
                id: 1,
                display: '300✕600',
                plainText: '300x600'
              }, {
                id: 2,
                display: '300✕250',
                plainText: '300x250'
              }, {
                id: 3,
                display: '728✕90',
                plainText: '728x90'
              }],
              selectedSize: {
                id: 0,
                display: '160✕600',
                plainText: '160x600'
              }
            },
          },
          dataBySize: [] 
        },
        setImagePosition: function(index, top, left){

          if (top){
            this.imageData.dataBySize[index].top = top;
          }
          if (left){
            this.imageData.dataBySize[index].left = left;
          }
          console.log(this.imageData);
         // $scope.$apply();
        },
        setCurrentlyMoving: function(index){
          this.imageData.dataBySize.forEach(function(datum){
            datum.currentlyMoving = false;
          });
          this.imageData.dataBySize[index].currentlyMoving = true;
        },
        getCurrentlyMovingIndex: function(){
          return _.findIndex(this.imageData.dataBySize, function(datum){
            return datum.currentlyMoving === true;
          });
        }
      };
  });
