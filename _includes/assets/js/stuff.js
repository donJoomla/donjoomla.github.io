// sticky header
if ($("#sidebar").length > 0) {
	$('#main').waypoint(function(direction) {
		if (direction == 'down') {
			$('#sidebar').addClass('affix');
		} else if (direction == 'up') {
			$('#sidebar').removeClass('affix');
		}
	}, {
		offset: 90
	});
}

// search autocomplete
var partnerid = '014812861817308790526:-rrfwxely2g';
$('#search_control').typeahead({
	prefetch: "/search.json",
	remote: {
		url: "http://clients1.google.com/complete/search?q=%QUERY&hl=en&client=partner&source=gcsc&partnerid=" + partnerid + "&ds=cse&nocache=" + Math.random().toString(),
		dataType: 'jsonp',
		filter: function(resp) {
			return $.map(resp[1], function(item) {
				return {
					value: item,
					tokens: item
				};
			});
		}
	}
}).on('typeahead:selected', function(e) {
	e.target.form.submit();
});


// jQuery $_GET plugin
(function($) {
	$.QueryString = (function(a) {
		if (a == "") return {};
		var b = {};
		for (var i = 0; i < a.length; ++i) {
			var p = a[i].split('=');
			if (p.length != 2) continue;
			b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
		}
		return b;
	})(window.location.search.substr(1).split('&'))
})(jQuery);

// change search urls
function pushState(path) {
	if (typeof(window.history.pushState) == 'function') {
		window.history.pushState(null, path, path);
	} else {
		window.location.hash = '#!' + path;
	}
}
// stuff for the things...
$('.tip').tooltip({
	selector: "[data-toggle=tooltip]",
	container: "body"
});

// equal heights
$(window).resize(function() {
	var $col = $('.equal>*'),
		maxHeight = [],
		rows = [],
		rowTop = 0,
		rowIndex = 0;

	$col.each(function() {
        $el = $(this);
        $el.removeAttr('style');
        if ($el.offset().top > rowTop) {
            rowIndex++;
            rows[rowIndex] = [];
            rowTop = $el.offset().top;
            maxHeight[rowIndex] = 0;
        }
        if ($el.height() > maxHeight[rowIndex]) {
            maxHeight[rowIndex] = $el.height();
        }
        rows[rowIndex].push($el);
    });
    for (row = 1; row <= rowIndex; row++) {
        for (i = 0; i <= rows[row].length; i++) {
            $(rows[row][i]).height(maxHeight[row]);
        }
    }
});
$(window).load(function() {
	$(window).trigger('resize');
});

// tocify
if ($(".toc").length > 0) {
	var tocCallback = function() {
		var toc = $("#sidebar.toc").tocify({
			selectors: "h2, h3",
			scrollTo: 70,
			highlightOffset: 70
		}).data("toc-tocify");
		$(".optionName").popover({
			trigger: "hover"
		});
	};
	$.getScript('//cdnjs.cloudflare.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js', function() {
		$.getScript('//cdnjs.cloudflare.com/ajax/libs/jquery.tocify/1.7.0/jquery.tocify.min.js', tocCallback);
	});
}

var disqus_shortname = '{{ site.disqus_shortname }}';
var disqus_url = $("link[rel='canonical']").attr("href");
if ($("#disqus_thread").length > 0) {
    var comments = document.getElementById('disqus_thread'),
        disqusLoaded=false;
        
    function loadDisqus() {
        var dsq = document.createElement('script');
        dsq.type = 'text/javascript';
        dsq.async = true;
        dsq.src = 'http://' + disqus_shortname + '.disqus.com/embed.js';
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
        disqusLoaded = true;
    }
    
    function findTop(obj) {
        var curtop = 0;
        if (obj.offsetParent) {
            do {
                curtop += obj.offsetTop;
            } while (obj = obj.offsetParent);
            return curtop;
        }
    }
    
    if(window.location.hash.indexOf('#comment') > 0) loadDisqus();
    if(comments) {
        var commentsOffset = findTop(comments);
        window.onscroll = function() {
            if(!disqusLoaded && window.pageYOffset > commentsOffset - 1500) loadDisqus();
        }
    }
}
if ($(".comment-link").length > 0) {
	(function () {
		var s = document.createElement('script'); s.async = true;
		s.type = 'text/javascript';
		s.src = 'http://' + disqus_shortname + '.disqus.com/count.js';
		(document.getElementsByTagName('HEAD')[0] || document.getElementsByTagName('BODY')[0]).appendChild(s);
	}());
}


if ($(".img-link").length > 0) {
	$('.img-link').click(function () {
        $( "body" ).append( '<div id="imgModal" class="modal img-modal fade" tabindex="-1" role="dialog" aria-hidden="true"><div class="img thumbnail"><img /><span class="lead"></span></div><button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button></div>' );
		$('.img-modal img').attr('src', $(this).attr('data-img'));
		$('.img-modal span').text($(this).attr('data-title'));
	});
};

// fix dropdown close on click in form
$('.dropdown-menu form').click(function(e) {
    e.stopPropagation();
});
