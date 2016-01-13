var fs = require('fs-extra')
	, path = require('path')
	, async = require('async')
	, beautify = require('js-beautify').js_beautify
	, util = require('util');

		var writeFileFullPath =  'http://localhost:8888/rosettaFiles/test.js'
			, objStr = ''
			, batch = {}
			, finalBatchStr
			, varNameRe = /(^.*?)\..*?$/
			, varName
			, dirType = 'size'
			, bgScale	= 'cover';

			batch.baseStart = 'var newBatch = R.create("batch")';
			batch.addStart = '.add(';
			batch.addEnd = ')';
			batch.reqStart = '.require(';
			batch.reqEnd = ')';
			batch.add = [];
			batch.req = [];
			batch.success = '.success(function(){/*success callback*/})';
			batch.fail = '.fail(function(){/*error callback*/})';
			batch.render = '.render();';
	var buildSingleObject = function(imageData, callback){
		//imageData = JSON.parse(imageData);
		//var dataBySize = imageData.dataBySize;
		objStr += '/* ROSETTA OBJECTS FOR ' + imageData.config.sizes.selectedSize.plainText + ' BANNER*/\n\n';
		async.waterfall([
			function(callback){
				//filter out unused images
				async.filter(imageData.dataBySize, function(datum, cb){
					cb(datum.useImage);
				}, function(filteredDataBySize){
						imageData.dataBySize = filteredDataBySize;
						callback(null, imageData);
				})
			},
			function(imageData, callback){
				//build R.create strings
				async.each(imageData.dataBySize, function(imageFile, cb){
					imageFile.varName = imageFile.fileName.match(/(^.*?)\..*?$/)[1].replace(/-/g, '_');
					console.log(imageFile.varName);
					objStr += 'var ' + imageFile.varName + ' = R.create("div").set({css: {top: ' + imageFile.top + ', left: ' + imageFile.left + ', width: ' + imageFile.width + ', height: ' + imageFile.height + ', backgroundImage: "' + imageFile.fileName + '", cursor: "pointer", opacity: 1, backgroundScale: "' + bgScale + '"}, attr: {id: "' + imageFile.varName + '"}, rosetta: {parentNode: stage, directoryType: "' + dirType + '"}}).render();\n\n';
					console.log('var ' + imageFile.varName + ' = R.create("div").set({css: {top: ')
					cb();
				}, function(){
					callback(null, objStr);
				});
				
			},
			function(objStr, callback){
				//build R.add("batch") strings
				async.each(imageData.dataBySize, function(imageFile, cb){
					if (imageFile.inBatch){
						batch.add.push(imageFile.varName);
					}
					if (imageFile.isRequired){
						batch.req.push(imageFile.varName);
					}
					cb();
				}, function(){
					finalBatchStr = batch.baseStart + '\n' + batch.addStart + JSON.stringify(batch.add) + batch.addEnd + '\n' + batch.reqStart + JSON.stringify(batch.req) + '\n' + batch.reqEnd + '\n' + batch.success + '\n' + batch.fail + '\n' + batch.render;
					callback(null, objStr, finalBatchStr);
				});
			}
		], function(err, data1, data2){
			if (err){
				console.log('error', err);
			}else{

				data1 = beautify(data1, { 
					indent_size: 4,
					preserve_newlines: true 
				});
				data2 = beautify(data2, { 
					indent_size: 2,
					preserve_newlines: true 
				});
				var writePath = path.join('/' + path.relative('/', '.'), 'public/rosettaFiles/rosettaFile.js');
				var hardcodedPath = '/Users/thibbard/Documents/repos/projects/rose-builder/public/rosettaFiles/rosettaFile.js';
				fs.writeFile(writePath, data1 + '\n\n' + data2, function(err){
					console.log('DIR', writePath);
					if (err){
						console.log('write file error', err);
					}else{
						console.log('file written at', writeFileFullPath);
					}
				})
			}
		});
	};

	module.exports = exports = buildSingleObject;