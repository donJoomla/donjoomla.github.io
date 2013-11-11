// stuff for the things...

// tocify
if($(".toc").length>0) {
	$(function() {
		var toc = $("#sidebar.toc").tocify({ selectors: "h2, h3", scrollTo:50, highlightOffset:50 }).data("toc-tocify");
		$(".optionName").popover({ trigger: "hover" });
	});
}

// sticky header	
$('#main').waypoint(function(direction) {
	if(direction == 'down') {
		$('#sidebar').addClass('affix');
	}
	else if(direction == 'up') {
		$('#sidebar').removeClass('affix');
	}
}, { offset: 70 });

// iframe auto-height
if($(".demoFrame").length>0) {
	$(".demoFrame").iframeHeight();
	
	/* should it be like this? I don't know...
	$(".demoFrame").each(function(index, element) {
		$(element).iframeHeight();
	}); */
}
