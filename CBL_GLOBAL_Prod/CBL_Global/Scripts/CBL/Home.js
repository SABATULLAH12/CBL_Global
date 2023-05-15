$(document).ready(function () {
   
    $(".settings").click(function (e) {
        if ($(".settings").hasClass('inactive-settings'))
            $(".settings").removeClass('inactive-settings').addClass("active-settings");
        else
            $(".settings").removeClass('active-settings').addClass("inactive-settings");
        $(".settings-expand-div").toggle();
        e.stopImmediatePropagation();
    });

    $(".widgetMainDiv").find(".widget1,.widget2").mouseover(function () { $(".widgetMainDiv").find(".widget-top-header-d").css("color", "red"); });
    $(".widgetMainDiv").find(".widget1,.widget2").mouseout(function () { $(".widgetMainDiv").find(".widget-top-header-d").css("color", "#777777"); });
    $(".widgetMainDiv").find(".widget3").mouseover(function () { $(".widgetMainDiv").find(".widget-top-header-ad").css("color", "red"); });
    $(".widgetMainDiv").find(".widget3").mouseout(function () { $(".widgetMainDiv").find(".widget-top-header-ad").css("color", "#777777"); });

    $(document).click(function () {
        $(".settings-expand-div").hide();
        $(".settings").removeClass('active-settings').addClass("inactive-settings");
    });
    //******************for tooltip***************
    $(".widget").hover(function () {
        var title = $(this).attr('title');
        if (title != undefined && title != "" && title != null) {
            $(this).data('tipText', title).removeAttr('title');
            $('<p class="GeoToolTip"></p>')
            .text(title)
            .appendTo('body')
            .fadeIn('slow');

            var pos = $(this).position();
            // .outerWidth() takes into account border and padding.
            var width = $(this).outerWidth();
            //show the menu directly over the placeholder
            $(".GeoToolTip").css({
                position: "absolute",
                top: pos.top + "px",
                left: (pos.left + width) + "px",
            }).show();
        }

    }, function () {
        // Hover out code
        $(this).attr('title', $(this).data('tipText'));
        $('.GeoToolTip').remove();
    }).mousemove(function (e) {
        var mousex = e.pageX + 10; //Get X coordinates
        var mousey = e.pageY + 10; //Get Y coordinates
        $('.GeoToolTip').css({ top: mousey, left: mousex })
    });
});



function logOut(url) {
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = url;
}

function redirectToWidgets(e,pageUrl) {
    localStorage.setItem('pageName', $(e).attr('data-name'));
    localStorage.removeItem('BrandFitEntity');
    window.location.href = pageUrl;
}

