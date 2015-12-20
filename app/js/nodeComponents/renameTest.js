var fs = require('fs-extra')
	, path = require('path');
	
var prefix = process.argv[2];
var suffix = process.argv[3];
var srcDir = process.argv[4];
var extRe = /\.\w+$/;
var visRe = /^\./;
var imgRe = /png|jpe?g$/;
var ext;
var oldName = '';
var newName = '';

fs.readdir(srcDir, function(err, files){
	files.forEach(function(file){
		if (!visRe.test(file) && imgRe.test(file)){
			oldName = path.join(srcDir, file);
			ext = file.match(extRe)[0];
			file = file.replace(ext, '')
			newName = path.join(srcDir, prefix + file + suffix + ext);
			fs.rename(oldName, newName, function(err){
				if(err){
					console.log('error renaming', err)
				}else{
					console.log('renamed from', oldName, 'to', newName);	
				}
			});			
		}
	});
});