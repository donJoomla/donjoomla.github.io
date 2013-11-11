---
---
// stuff for the things...

// sticky header
waypointCallback = function () {
    $('#main').waypoint(function (direction) {
        if (direction == 'down') {
            $('#sidebar').addClass('affix');
        } else if (direction == 'up') {
            $('#sidebar').removeClass('affix');
        }
    }, {
        offset: 70
    });
}
$.getScript('{{ site.url }}/js/waypoints.min.js', waypointCallback);

// search autocomplete
typeaheadCallback = function () {
    $('#search_control').typeahead({
        prefetch: "{{ site.url }}/search.json",
        remote: {
            url: "http://clients1.google.com/complete/search?q=%QUERY&hl=en&client=partner&source=gcsc&partnerid={014812861817308790526:-rrfwxely2g}&ds=cse&nocache=" + Math.random().toString(),
            dataType: 'jsonp',
            filter: function (resp) {
                return $.map(resp[1], function (item) {
                    return {
                        value: item,
                        tokens: item
                    };
                });
            }
        }
    })
    .on('typeahead:selected', function (e) {
        e.target.form.submit();
    });
}
$.getScript('http://twitter.github.io/typeahead.js/releases/latest/typeahead.js', typeaheadCallback);

// tocify
if ($(".toc").length > 0) {
    var tocCallback = function () {
        var toc = $("#sidebar.toc").tocify({
            selectors: "h2, h3",
            scrollTo: 50,
            highlightOffset: 50
        }).data("toc-tocify");
        $(".optionName").popover({
            trigger: "hover"
        });
    };
    
    $.getScript('{{{ site.url }}/js/jquery-ui-1.9.1.custom.min.js', function() {
    	$.getScript('{{ site.url }}/js/jquery.tocify.min.js', tocCallback);
    });
}

// iframe auto-height
if ($(".demoFrame").length > 0) {
    $.getScript('{{ site.url }}/js/jquery.iframeheight.min.js', function () {
        $(".demoFrame").iframeHeight();
    });
    /*  should it be like this? I don't know...
    $(".demoFrame").each(function(index, element) {
        $(element).iframeHeight();
    }); */
}

// jQuery $_GET plugin
(function ($) {
    $.QueryString = (function (a) {
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
