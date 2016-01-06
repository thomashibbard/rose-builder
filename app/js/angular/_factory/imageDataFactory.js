angular.module('boilerplateApp')
  .factory('ImageDataFactory', function() {
      return {
        imageData: {
          config: {
            imageDirectory: '',
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
            imageDirectory: ''  
          },
          dataBySize: [] 
        },
        setSelectedSize: function(index){

          //this.config.sizes.selectedSize = this.config.sizes.sizesArr[index];
        },
        setIsMoving: function(index) {
          this.imageData.forEach(function(datum) {
            datum.isMoving = false;
          });
          this.imageData.sizes[index].isMoving = true;
        },
        setIsUsed: function(index) {
          this.imageData.forEach(function(datum) {
            datum.isUsed = false;
          });
          this.imageData.sizes[index].isUsed = true;
        }
      };
  });

