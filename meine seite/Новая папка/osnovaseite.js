$(function(){
	let layoutContainer=$('.layout-container');
	$('button').on('click',function(){
		layoutContainer.css('display','flex');
	});
	layoutContainer.on('click',function(e){
		if(this===e.target){
			layoutContainer.css('display','none');
			}
	});
  });