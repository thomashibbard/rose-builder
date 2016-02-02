var express = require('express')
  , serveindex = require('serve-index')
  , servestatic = require('serve-static')
  , bodyParser = require('body-parser')
  , cors = require('cors')
  , app = express()
  , q = require('q')
  , fs = require('fs-extra')
  , multer = require('multer')
  , path = require('path');

//custom modules
var components = require('./app/js/nodeComponents/');

var PORT = process.env.PORT || 8888;
__dirname = process.env.PWD || __dirname;


app.use(cors());
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

var whitelist = ['https://localhost:8888/'];
var corsOptions = {
  origin: function(origin, callback){
    var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  }
};




app.use(express.static(__dirname));

app.use(servestatic(__dirname + '/public'));
app.use('/rosettaFiles', serveindex('./public/rosettaFiles', {'icons': true}));

app.get('/process/:bgScale/:dirType/', cors(corsOptions), function(req, res, next){
	components.boilerplateRosettaObj(req.params, function(err, data){
		if (err){
			console.log('error with route', err);
		}else{		
			res.json({result: data});
		}
	});			
});


app.post('/getImageData/', cors(corsOptions), function(req, res, next){
  components.getImageData(req.body.directory, function(err, data){
    if (err){
      console.log('error with route', err);
    }else{
      res.json({result: data});
    }
  });
});

app.post('/buildRosetta/', cors(corsOptions), function(req, res, next){
  //console.log(req.body)
	var imageData = req.body;
	components.generateRosetta(imageData, function(writeFileFullPath){
/*    console.log('writeFilePath from component:', writeFileFullPath);
		components.download(writeFileFullPath, '/Users/thibbard/Downloads/rosettaFile.js', function(err){
      if(err){
        console.log('error downloading file', err);
      }else{
        console.log('downloaded. Have a Nice Day.');
      }
    })*/
    res.json({status: 'complete'});
	});
});


app.use('/userUploadedImages', serveindex('userUploadedImages', {'icons': true}));
//app.use('/port', serveindex('userUploadedImages', {'icons': true}));



var upload = multer({ dest: '/uploadStaticImage/'});
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
