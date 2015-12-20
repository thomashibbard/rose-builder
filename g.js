var express = require('express')
  , cors = require('cors')
  , app = express();
var PORT = 8888;
app.use(cors());
 
app.get('/products/:id/:fname/:mname/:lname', function(req, res, next){
	var data = processRequest(req.params);	
  res.json(data);
});
 
app.listen(PORT, function(){
  console.log('CORS-enabled web server listening on port, %d', PORT);
});


function processRequest(params){
	return params;
}