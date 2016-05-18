/* 
	JANDI Component Generator - Component Handler
	last-update : 2016/04/28
	
	@author : ted.kim@tosslab.com
*/



function componentClick() {
  
  if(currentComponent == 'jui-button') {
	
	/* after click the button in preview area, focus states will be force removed.
       in order to prevent focus state remains on clicked button. */
	$('#preview-components').blur();
    
  }
  
  else if (currentComponent == 'jui-nav--tab') {
	//alert('tab clicked!');
	
    if( $(this).hasClass('is_active') ){
	  //do nothing
    }
    else {
	
	  $('#preview-components> ul > li > a').removeClass('is_active');
	  $(this).addClass('is_active');
	
    }
  }
}



/*
$('#preview-components').mouseup(function () {
  
});



$('#preview-components.jui-nav--tab > ul > li > a').click(function() {
  
  
});*/
