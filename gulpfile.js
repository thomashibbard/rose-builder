	var gulp = require('gulp')
		, plugins = require('gulp-load-plugins')
		, fs = require('fs-extra')
		, colors = require('colors')
		, inject = require('gulp-inject')
		, sass = require('gulp-ruby-sass')
		, cssmin = require('gulp-minify-css')
		, sequence = require('run-sequence')
		, wiredep = require('wiredep').stream
		, shell = require('gulp-shell')
		, open = require('gulp-open')
		, connect = require('gulp-connect')
		, concat = require('gulp-concat')
		, uglify = require('gulp-uglify')
		, rename = require('gulp-rename')
		//, webpack = require('webpack');
		, angularFilesort = require('gulp-angular-filesort')
		//, exec = require('child_process').exec
		, jshint = require('jshint');

	var filesToInject = [
		'./app/**/*.js', 
		'./app/**/*.css'
	];

	gulp.task('default', function(){
		console.log('ROSETTA BOILERPLATE'.red.bold);
	});

	/*gulp.task('wiredep', function(cb){
	  gulp.src('./index.html')
	    .pipe(wiredep())
	    .pipe(gulp.dest('.'));
	    //console.log('done running wire'.green.bold)
	});*/

	//custom JavaScript and CSS
	/*gulp.task('inject', function (){
	  var target = gulp.src('./index.html');
	  var sources = gulp.src(filesToInject, {read: false});
	  return target.pipe(inject(sources))
	    .pipe(gulp.dest('.'));
	});
	*/
	/*gulp.task('wire',  function(callback){
		sequence('wiredep', 'inject', callback);
	});*/


	gulp.task('wire', function(){
	  gulp.src('./index.html')
	    .pipe(wiredep())
	    .pipe(gulp.dest('.'));
	});

	var filesToInject = ['./app/**/*.js', './app/**/*.css'];
	//i've replaced this task with angularFilesort below
	//I think that the syntax is much clearer
	//TODO remove this and fix the wire-inject task to use `sort`
	gulp.task('inject', function (){
	  var target = gulp.src('./index.html');
	  var sources = gulp.src(filesToInject, {read: false});
	  return target.pipe(inject(sources))
	    .pipe(gulp.dest('.'));
	});

	gulp.task('wire-inject',  function(callback){
	    sequence('wire', 'inject', callback);
	});

	gulp.task('sort', function(){
		gulp.src('./index.html')
	  	.pipe(inject(
	    	gulp.src(['./app/**/*.js']).pipe(angularFilesort())
	  	))
	  	.pipe(gulp.dest('.'));
	});


	gulp.task('sass', function() {
	    return sass('./app/styles/sass/**/*.scss', { style: 'expanded' })
	        .pipe(gulp.dest('./app/styles/css/'));
	});



	gulp.task('watch-sass', function () {
	    gulp.watch('./app/styles/sass/*.scss', ['sass']);
	});







	gulp.task('start-server', false, function(callback){
		exec('node server.js', function(){
			callback();
		});
	});

	/* opens the chrome browser to the location of the static server */
	gulp.task('browser-open', false, function () {
	    var options = {
	        url : "localhost:8888/",
	        app : "Google Chrome"
	    };
	    return gulp.src('localhost:8888/index.html')
	        .pipe(open("", options));
	});

	gulp.task('connect', function () {
	    return connect.server({
	        root: ".server.js",
	        port: '8888'
	    });
	});

	gulp.task('launch', function(callback){
		sequence('connect', 'browser-open', callback);
	});











