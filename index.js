var sizeOf = require('image-size')
	, path = require('path')
	, fs = require('fs-extra')
	, async = require('async')
	, beautify = require('js-beautify').js_beautify;


var sourceDir = './images/'
	, imageRe = /^(.*?)\.(jpg|png|bmp|gif)$/
	, imageFiles
	, imageDir
	, rosettaStr
	, writePath = path.join('exportedRosetta', 'file.js')
	, rosettaStr = '';

//user supplied params
var dirType
	, bgScale;
if (process.argv[2] && /size|shared/.test(process.argv[2])){
	dirType = process.argv[2];
}else{
	dirType = 'size';
}
if (process.argv[3] && /cover|contain/.test(process.argv[3])){
	var bgScale = process.argv[3];
}else{
	bgScale = 'contain';
}


async.waterfall([
	function(callback){

		fs.readdir(sourceDir, function(err, files){
			imageFiles = files.filter(function(file){
				return imageRe.test(file);
			});
			callback(null, imageFiles);
		});
		
	}, 
	function(imageFiles, callback){
		var i = 0
		async.each(imageFiles, function(imageFile, cb){
			imageDir = path.join(sourceDir, imageFile);
			
			sizeOf(imageDir, function(err, dimensions){

				if (err){
					console.log('image size error', err);
				}else{
					var filename = imageFiles[i];
					var name = imageFiles[i].replace(imageRe, '$1');
					imageFiles[i] = {
						filename: filename,
						name: name,
						width: dimensions.width,
						height: dimensions.height
					};
					i++;
					cb();
				}
			});
		}, function(){
			callback(null, imageFiles);
		})

	},
	function(imageFiles, callback){
		

		async.each(imageFiles, function(imageFile, cb){
			rosettaStr += 'var ' + imageFile.name  + ' = R.create("div").set({css: {top: 0, left: 0, width: ' + imageFile.width + ', height: ' + imageFile.height + ', backgroundImage: "' + imageFile.filename + '", cursor: "pointer", opacity: 1, backgroundScale: "' + bgScale + '"}, attr: {id: "' + imageFile.name + '"}, rosetta: {parentNode: stage, directoryType: "' + dirType + '"}}).render();\n\n';
			cb();
		}, function(err){
			if (err){
				console.log('rosetta build error', err);
			}else{
				callback(null, rosettaStr);
			}
		});

	},
	function(rosettaStr, callback){
		rosettaStr = beautify(rosettaStr, { 
			indent_size: 4,
			preserve_newlines: true 
		});
		console.log(rosettaStr);
		fs.writeFile(writePath,rosettaStr);
	}], 
	function(err, result){
		if (err){
			console.log('waterfall error', err);
		}else{
			console.log('complete');
		}
});







