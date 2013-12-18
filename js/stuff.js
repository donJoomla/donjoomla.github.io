// stuff for the things...
$.getScript('//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.0.2/js/bootstrap.min.js');

// sticky header
waypointCallback = function() {
	$('#main').waypoint(function(direction) {
		if (direction == 'down') {
			$('#sidebar').addClass('affix');
		} else if (direction == 'up') {
			$('#sidebar').removeClass('affix');
		}
	}, {
		offset: 70
	});
}
$.getScript('//cdnjs.cloudflare.com/ajax/libs/waypoints/2.0.3/waypoints.min.js', waypointCallback);

// search autocomplete
typeaheadCallback = function() {
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
}
$.getScript('//cdnjs.cloudflare.com/ajax/libs/typeahead.js/0.9.3/typeahead.min.js', typeaheadCallback);

// tocify
if ($(".toc").length > 0) {
	var tocCallback = function() {
		var toc = $("#sidebar.toc").tocify({
			selectors: "h2, h3",
			scrollTo: 50,
			highlightOffset: 50
		}).data("toc-tocify");
		$(".optionName").popover({
			trigger: "hover"
		});
	};

	$.getScript('//cdnjs.cloudflare.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js', function() {
		$.getScript('//cdnjs.cloudflare.com/ajax/libs/jquery.tocify/1.7.0/jquery.tocify.min.js', tocCallback);
	});
}

// iframe auto-height
if ($(".demoFrame").length > 0) {
	$.getScript('/js/iframeheight.min.js', function() {
		$(".demoFrame").iframeHeight();
	});
	/*  should it be like this? I don't know...
	 $(".demoFrame").each(function(index, element) {
	 $(element).iframeHeight();
	 }); */
}

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


// twitter follow button
$.getScript('//platform.twitter.com/widgets.js');

// zopim chat
window.$zopim || (function(d, s) {
	var z = $zopim = function(c) {
		z._.push(c)
	},
		$ = z.s =
	d.createElement(s),
		e = d.getElementsByTagName(s)[0];
	z.set = function(o) {
			z.set.
			_.push(o)
		};
	z._ = [];
	z.set._ = [];
	$.async = !0;
	$.setAttribute('charset', 'utf-8');
	$.src = '//v2.zopim.com/?14JibENISkzX2WdkicVa9c44GnlgSyGe';
	z.t = +new Date;
	$.
	type = 'text/javascript';
	e.parentNode.insertBefore($, e)
})(document, 'script');
$zopim(function() {
	$zopim.livechat.button.show();
});


/* Social Share */
if ($(".js-share").length > 0) {
	(function() {
		$(".showSecondary").click(function(e) {
			if ($(".js-share").hasClass("active")) {
				$(".js-share").removeClass("active");
			} else {
				$(".js-share").addClass("active");
			}
		});
		$(".js-share-btn a").click(function() {
			var url = $(this).attr('href'),
				width = 300,
				height = 400,
				left = (screen.width/2)-(width/2),
				top = (screen.height/2)-(height/2);
			newwindow=window.open(url, 'Share', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+width+', height='+height+', top='+top+', left='+left);
			if (window.focus) {newwindow.focus()}
			return false;
		});
		var shareUrl = $("link[rel=canonical]").attr("href");
		$.ajaxSetup({ cache: true });
		$.getJSON('http://share-count.appspot.com/?url=' + encodeURIComponent(shareUrl) + "&callback=?", function (data) {
			shares = data.shares;
			$(".count").each(function (index, el) {
				var $service = $(el).parents(".js-share-btn").attr("data-service");
				$(el).html(shares[$service]);
			});
		});
	})();
}