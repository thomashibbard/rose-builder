var express = require('express')
  , cors = require('cors')
  , app = express()
  , q = require('q')
  , fs = require('fs-extra')
  , multer = require('multer');
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
//app.set('view engine', 'jade');

//custom modules
var components = require('./app/js/nodeComponents/');

var PORT = process.env.PORT || 8888;
app.use(cors());

var whitelist = ['http://localhost:8888/'];
var corsOptions = {
  origin: function(origin, callback){
    var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  }
};


app.use(express.static(__dirname));


app.get('/process/:bgScale/:dirType/', cors(corsOptions), function(req, res, next){
	components.boilerplateRosettaObj(req.params, function(err, data){
		if (err){
			console.log('error with route', err);
		}else{		
			res.json({result: data});
		}
	});			
});

app.get('/getImageData/:srcDir/', cors(corsOptions), function(req, res, next){
	components.getImageData(req.params.srcDir, function(err, data){
		if (err){
			console.log('error with route', err);
		}else{
			res.json({result: data});
		}
	});
});

app.post('/generateRosetta/', cors(corsOptions), function(req, res, next){
	var imageData = req.body;
	components.generateRosetta(imageData, function(err, data){
		console.log(data);
	});
	//res.json({data: res});
});

var upload = multer({ dest: 'http://localhost:8888/uploadStaticImage/'});
var type = upload.any();

app.post('/uploadStaticImage', type, function(req, res){
	console.log('FILES', req.files[0].originalname)
	res.json(req.files.file);

  var tmp_path = req.files[0].path;

  /** The original name of the uploaded file
      stored in the variable "originalname". **/
  var target_path = 'uploadedImages/' + req.files[0].originalname;
  console.log('temp_path', tmp_path);
  console.log('target_path', target_path);
  /** A better way to copy the uploaded file. **/
  var src = fs.createReadStream(tmp_path);
  var dest = fs.createWriteStream(target_path);
  src.pipe(dest);
  src.on('end', function() { console.log({status: 'complete'}); });
  src.on('error', function(err) { console.log({status: 'error', error: err}); });

});

app.get('/', function(req, res){
	res.send('index.html');
});

app.listen(PORT, function(){
  console.log('CORS-enabled web server listening on port, %d', PORT);
});
