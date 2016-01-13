var express = require('express')
  , app = express()
  , serveindex = require('serve-index')
  , servestatic = require('serve-static')
  , bodyparser = require('body-parser')
  , cors = require('cors')
  , fs = require('fs-extra')
  , path = require('path');

var components = require('./app/js/nodeComponents/');
var PORT = 8100;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
  extended: true
}));
app.use('/images', serveindex('images', {'icons': true}));

app.use(servestatic('http://localhost:8100/app'))

var whitelist = ['http://localhost:' + PORT + '/'];
var corsOptions = {
  origin: function(origin, callback){
    var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  }
};

app.get('/', cors(corsOptions), function(req, res, next){
  // components.download('http://localhost:' + PORT + '/package.json', 'http://localhost:' + PORT + '/images', function(err){
  //   if(err){
  //     console.log(err);
  //   }else{

  //   }
  // });
  res.send('hello')
});

app.listen(PORT, function(){
  console.log('listening . . .');
});