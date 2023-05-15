/// <reference path="../angular.min.js" />
var left_scroll_bgcolor = "white";
var right_scroll_bgcolor = "#c11b2f";
var app = angular.module('myApp', []);
var maxChartValues = []
const arrMax = arr => Math.max(...arr); //calculates Max value in an array

app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
}]
);
//************common service**********
app.service("cblService", function () {
    this.setValue = function (value, decimalPoints) {
        var _value = 0;
        if (value != null && value != undefined && value != '' && value != 'NA') {
            _value = parseFloat(value).toFixed(decimalPoints);
        }
        return _value;
    }    
});
var numberOfDecimals = 1;
var submitflag = false;
var MinSampleSize = 30;
function SetScroll(Obj, cursor_color, top, right, left, bottom, cursorwidth) {
    $(Obj).niceScroll({
        cursorcolor: cursor_color,
        cursorborder: cursor_color,
        cursorwidth: cursorwidth + "px",
        autohidemode: false,
        zindex: "1000000",
        railpadding: {
            top: top,
            right: right,
            left: left,
            bottom: bottom
        },
    });
    $(Obj).getNiceScroll().resize();
}

$(document).ready(function () {
    $(document).on("click",function(e)
    {
      
            var topmenu = $(".selection-summary-Div");
            if ($(topmenu).is(":Visible") && !$(".leftBody").is(":Visible"))
                hide_leftMenuSow(null, null);
    });
    $(".left-panel-Icon").click(function () {
        if ($(".showMenu").is(":visible"))
            $(".showMenu").toggle("pulsate");
        if (!$(".leftBody").is(":visible")) {
            //$(".rightBody").css("width", "calc(100% - 250px)");
            $(".rightBody").hide();
            $(".footer").hide();
        }
        else {
            if (submitflag == true) {
                $(".rightBody").show();
                $(".footer").show();
            }
            $(".rightBody").css("width", "calc(100% - 0px)");
        }
        $(".leftBody").toggle();
    });

    $("#settings-div").click(function (e) {
        if ($("#settings-div").hasClass('inactive-settings'))
            $("#settings-div").removeClass('inactive-settings').addClass("active-settings");
        else
            $("#settings-div").removeClass('active-settings').addClass("inactive-settings");
        $(".settings-expand-div").toggle();
        e.stopImmediatePropagation();
    });
    $(".alert-close").click(function () {
        $(".alert-div").hide();
        $(".TranslucentDiv").hide();
    });

    $(".alert-ok").click(function () {
        $(".alert-div").hide();
        $(".TranslucentDiv").hide();
        $(".rightBody").hide();
        $(".footer").hide();
    });
  
});

function RedirectToSubMenu(e, pageUrl) {
    localStorage.setItem('pageName', $(e).attr('id'));
    localStorage.removeItem('BrandFitEntity');
    window.location.href = pageUrl;
}

function RedirectToHome(url) {
    localStorage.removeItem('BrandFitEntity');
    window.location.href = url;
}
function showAlertBox(message) {
    $(".TranslucentDiv").show();
    $(".alert-message").html(message);
    $(".alert-div").show();
}
function OnSessionExpired(response) {
    if (response.data != null && response.data.result == "SessionExpired" || (response.result == "SessionExpired")) {
        $(".logOutContainer").trigger("click");
        return true;
    }
    return false;
}
function logOut(url) {
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = url;
}

function exportPPT() {
    if (submitflag == false) {
        showAlertBox("Please Make Selections.");
        return;
    }
    if (localStorage.getItem('pageName') == "DrinkingMomentsMenu"){
        DMPPTExport();     
    }
    else if (localStorage.getItem('pageName') == "FiveWProfileMenu") {
        FiveWPPTExport();
    }
    else if (localStorage.getItem('pageName') == "BrandFitAnalysisMenu") {
        BrandFitPPTExport();
    }
    else if (localStorage.getItem('pageName') == "BrandFitDeepDiveMenu") {
        BrandFitDDPPTExport();
    }

}

function exportExcel() {
    if (submitflag == false) {
        showAlertBox("Please Make Selections.");
        return;
    }
    if (localStorage.getItem('pageName') == "DrinkingMomentsMenu") {
        DMExcelExport();
    }
    else if (localStorage.getItem('pageName') == "FiveWProfileMenu") {
        FiveWExcelExport();
    }
    else if (localStorage.getItem('pageName') == "BrandFitAnalysisMenu") {
        BrandFitExcelExport();
    }
    else if (localStorage.getItem('pageName') == "BrandFitDeepDiveMenu") {
        BrandFitDDExcelExport();
    }
}

function ShowLoader() {   
    $(".TranslucentDiv").show();
    $("#Loader").show();
}
function HideLoader() {
    $(".TranslucentDiv").hide(); 
    $("#Loader").hide();
    if ($(".LowSample-popup").is(":visible") || $(".exporttoexcelpopup").is(":visible") || $(".exportchartlistpopup").is(":visible") || $(".popup1").is(":visible")) {
        Set_zIndex();
        $(".TranslucentDiv").show();
    }
}
function setValue(value, category) {
    if (value != null && value != undefined && value != '' && value != 'NA') {
        if(category == undefined)
            var _value = parseFloat(value).toFixed(numberOfDecimals);
        else
            var _value = parseFloat((value / maxChartValues[category]) * 100).toFixed(numberOfDecimals);
        return _value;
    }
    else if (value == "NA")
        return value;
    else
        return  parseFloat("0.0").toFixed(numberOfDecimals);
}

function setWidth(value) {
    if (value == "NA")
        return "0%";
    else
        return value + "%";
}

function setIndex(value) {
    if (value != null && value != undefined && value != '' && value != 'NA') {

        var _value = Math.round(value);
        return _value;
    }
    else if (value == "NA")
        return value;
}

function downloadDocs()
{
    window.location.href = '../Templates/CBL Training Document.pptx';
}