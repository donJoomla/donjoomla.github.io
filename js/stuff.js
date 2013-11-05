// stuff for the things...

  $(function() {
    var toc = $("#toc").tocify({ selectors: "h2, h3", scrollTo:70, highlightOffset:70 }).data("toc-tocify");
    prettyPrint();
    $(".optionName").popover({ trigger: "hover" });
  });
	
	$('#main').waypoint(function(direction) {
	  if(direction == 'down') {
		  $('#navbar').fadeOut(0).removeClass('navbar-static-top').addClass('navbar-fixed-top').fadeIn("slow");
		  $('#sidebar').addClass('affix');
	  }
	  else if(direction == 'up') {
		  $('#navbar').fadeOut("fast", function(){ $(this).removeClass('navbar-fixed-top').addClass('navbar-static-top').fadeIn(0) });
		  $('#sidebar').removeClass('affix');
	  }
	}, { offset: 70 });
	$('#base').waypoint(function(direction) {
	  if(direction == 'down') {
		  $('footer').addClass('affix');
		  $('base').css('margin-top', 201);
	  }
	  else if(direction == 'up') {
		  $('footer').removeClass('affix');
		  $('base').css('margin-top', 0);
	  }
	}, { offset: 'bottom-in-view' });
