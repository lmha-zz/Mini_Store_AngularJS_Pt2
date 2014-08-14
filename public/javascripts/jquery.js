$(document).ready(function(){
	$('a').click(function() {
		$('.active').attr('class', '');
		$(this).parent().attr('class', 'active');
	})
})