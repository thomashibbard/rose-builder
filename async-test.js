var async = require('async')
  , chalk = require('chalk')
  , arr = [0,1,2,3,4,5,6,7,8,9];

var build = function(arr, callback){
  console.log(chalk.red(callback.toString()));
  console.log('\n\n');
  async.waterfall([
    function(callback){
      async.each(arr, function(i, callback){
        console.log(i*2);
        callback();
      }, function(err){
        if (err){
          console.log('error with function 1', err);
        }
        console.log('\n\n');
        callback(null, arr);
      });
    },
    function(arr, callback){
      async.each(arr, function(c, callback){
        console.log(c*c);
        callback();
      },
      function(err){
        if (err){
          console.log('error with function 2', err);
        }
        console.log('\n\n');
        callback(null, arr);
      }); 
    }], 
    function(err, results){
      if (err){
        console.log('error with waterfall', err);
      }
      console.log(chalk.red(callback.toString()));
      callback(results);
    });
};

build(arr, function(results){
  console.log(results);
});