var sizeOf = require('image-size')
	, path = require('path')
	, fs = require('fs-extra')
	, async = require('async')
	, beautify = require('js-beautify').js_beautify;

var imageData = {};
var getImageData = function(srcDir, cb){

async.waterfall([
	function(callback){

		var imageRe = /^(.*?)\.(jpg|png|bmp|gif)$/
		fs.readdir(srcDir, function(err, files){
			if (err){
				console.log('error reading directory', err);
			}else{
				files = files.filter(function(file){
					return imageRe.test(file);
				});
				callback(null, files);
			}
		});
		
	},
	function(files, callback){
		var imageData = [];
		var filePath = ''
		async.each(files, function(file, cb){
			filePath = path.join(srcDir, file);
			sizeOf(filePath, function(err, imageDatum){
				if (err){
					console.log('sizeOf error', err);
				}else{
					imageDatum.fileName = file;
					imageDatum.inBatch = false; 	//TODO move to angular controller
					imageDatum.isRequired = false; 	//TODO move to angular controller
					imageDatum.useImage = true; 	//TODO move to angular controller
					imageData.push(imageDatum);
					cb();
				}
			});
		},
		function(err){
			if(err){
				console.log('async each error', err);
			}else{
				callback(null, imageData);
			}
		})
	}], cb);
};


module.exports = exports = getImageData;