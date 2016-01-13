var async = require('async');

var arr = [
  {name: '1', a: true},
  {name: '2', a: false},
  {name: '3', a: true},
  {name: '4', a: true},
  {name: '5', a: false}
];

async.filter(arr, function(obj, callback){
  return callback(!obj.a);
}, function(result){
  console.log(result);
})