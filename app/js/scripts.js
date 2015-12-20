
$(function(){

	$('body').on('click', '#btn', function(){
		$.ajax({
			type: 'get',
			url: 'http://localhost:8888/products/123/thomas/loren/hibbard',
			dataType: 'json',
			data: {
				name: 'thomas'
			}
		}).done(function(data){
			console.log('data', data);
		}).fail(function(err){
			console.log('faile', err)
		});
	});

	$("body").on("click", "#submit-rosetta", function(){
		var str = "";
		var paramStr = $("#rosetta-form").serialize();
		var paramRe = /=([a-z]+)&?/g;
		var arr;
		while ((arr = paramRe.exec(paramStr)) !== null) {
			str += arr[1] + "/";
		}

	return $.ajax({
			type: 'get',
			url: 'http://localhost:8888/process/' + str,
			dataType: 'json'
		}).done(function(data){
			console.log('data', data);
		}).fail(function(jqXHR, textStatus, errorThrown){
			console.log('jqXHR', jqXHR);
			console.log('textStatus', textStatus);
			console.log('errorThrown', errorThrown);
		});

	});

});