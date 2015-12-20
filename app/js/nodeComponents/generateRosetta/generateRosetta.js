var fs = require('fs-extra')
	, path = require('path')
	, async = require('async')
	, beautify = require('js-beautify').js_beautify;

		var objStr = ''
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
	var generateRosetta = function(imageData, callback){
		imageData = imageData.imageData;

		async.waterfall([
			function(callback){

				async.each(imageData, function(imageFile, cb){
					imageFile.varName = imageFile.fileName.match(/(^.*?)\..*?$/)[1];
					objStr += 'var ' + imageFile.varName + ' = R.create("div").set({css: {top: 0, left: 0, width: ' + imageFile.width + ', height: ' + imageFile.height + ', backgroundImage: "' + imageFile.fileName + '", cursor: "pointer", opacity: 1, backgroundScale: "' + bgScale + '"}, attr: {id: "' + varName + '"}, rosetta: {parentNode: stage, directoryType: "' + dirType + '"}}).render();\n\n';
					cb();
				}, function(){
					callback(null, objStr);
				});
				
			},
			function(objStr, callback){
				async.each(imageData, function(imageFile, cb){
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
				console.log(data2);
			}
		})	
	};

	module.exports = exports = generateRosetta;