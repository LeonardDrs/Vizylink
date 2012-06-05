jQuery(document).ready(function($) {

	$('body, #content').height(window.innerHeight);

	$('#legende').hide();
	
	$('.legende').click(function(){
		$('#legende').show();
		$('.legende').css({"background":"#f1f1f1","color":"#333"});
	});
	
	$('#close').click(function(){
		$('#legende').hide();
		$('.legende').css({"background":"#86888a","color":"#151a20"});
	});
	
	
});