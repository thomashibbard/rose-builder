var express = require('express')
	, jade = require('jade')
	, app = express()
	, cors = require('cors')
	, path = require('path');

	app.use(cors());

	var PORT = 5555;	

	app.set('vew engine', jade);

	app.get('/', function(req, res){
		res.send('hello world');
	});

	app.get('/expressTest', function(req, res){
		res.json({'err path?': path.dirname(require.main.filename)});
		                         
		console.log(__dirname);
	});

	app.listen(PORT);

	console.log('app listening on %s', PORT);
