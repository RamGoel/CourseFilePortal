(function($) {

	"use strict";

	var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	$('#sidebarCollapse').on('click', function () {
      $('#sidebar').toggleClass('active');
  });

})(jQuery);



//Function for File Inputs View

function openInputDrop(a){
    var html=document.getElementById(`inputDrop${a}`).innerHTML;
  
    
    document.getElementById('uploadSection').innerHTML=html;
    
}