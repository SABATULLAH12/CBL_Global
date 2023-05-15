/// <reference path="../CBL/Global.js" />
/// <reference path="../CBL/Master.js" />
/// <reference path="../CBL/LeftPanelFilters.js" />
var widgetData = null, pageId = 2;//1=5W | 2=DM | 3=BF
app.controller('leftPanelCtrl', function ($scope, $http, $q) {
    //$(".defaltdataloding").show();
    ShowLoader();
    $http({
        url: AQ.CBL.BaseUrl + "/Common/GetFilters",
        method: AQ.CBL.Http.Type.POST,
        data: { 'Filter': 'DM' }
    })
   .then(function (response) {
        if(OnSessionExpired(response))
            return false;
        $scope.leftPanelFilters = response.data;
        $scope.$on('appendClearAll', function (ngRepeatFinishedEvent) {
            appendClearAll();
        });
        CheckForDefaultSelection($http);
   },
   function (response) {

   });
});
app.directive('onFinishRender', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit(attr.onFinishRender);
                });
            }
        }
    }
});
app.controller('rightPanelCtrl', ['$scope', '$http', '$q', '$rootScope', '$timeout', function ($scope, $http, $q, $rootScope, $timeout) {
    $scope.array = [30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
    $scope.topWidgetList = [];
    $scope.middleWidgetList = [];
    $scope.bottomWidgetList = [];
    $scope.setIndexColor = function (index) {
        var indexValue = parseInt(index, 0);
        if (indexValue > 120)
            return "green-index";
        else if (indexValue < 80 && indexValue != 0)
            return "red-index";
        else
            return "grey-index";
    }
    $scope.setSampleSizeIndexColor = function (index, sampleSize) {
        var _sampleSize = parseInt(sampleSize, 0);
        if (_sampleSize < MinSampleSize)
            return "";

        var indexValue = parseInt(Math.round(index, 0));//parseInt(index, 0);
        if (indexValue > 120)
            return "green-index";
        else if (indexValue < 80 && indexValue != 0)
            return "red-index";
        else
            return "grey-index";
    }
    $scope.setBottomWidgetShareDifferenceValue = function (value) {
        if (value != null && value != undefined && value != '') {
            var _value = parseInt(value, 0);
            if (_value == -10000)
                return "";

            var _decimalvalue = parseFloat(value).toFixed(numberOfDecimals);
            if (_decimalvalue > 0)
                return "+" + _decimalvalue + "%";
            else if (_value < 0)
                return _decimalvalue + "%";
        }
        return "";
    }
    $scope.setBottomWidgetIndexSign = function (value) {
        if (value != null && value != undefined && value != '') {
            var _value = parseInt(value, 0);
            if (_value == -10000)
                return "";
            else if(_value > 0)
                return "green-index-sign"
            else if (_value < 0)
                return "red-index-sign"
        }
        return "";
    }
    $scope.setValue = function (value) {       
        return setValue(value) + "%";
    }
    $scope.checkSampleSize = function (value, sampleSize) {
        var _sampleSize = parseInt(sampleSize, 0);
        if (_sampleSize < MinSampleSize || sampleSize == null)
            return "LS";
        return setValue(value) + "%";
    }
    $scope.checkKOShareSampleSize = function (data) {
        var _sampleSize = 0;
        if (data.CategoryKOShare.SampleSize == null) {
            if (data.BrandShareList.length > 0) {
                _sampleSize = parseInt(data.BrandShareList[0].ShareInCategory.BrandShare.SampleSize, 0);
            }
        }
        else {
            _sampleSize = parseInt(data.CategoryKOShare.SampleSize, 0);
        }

        if (data.CategoryKOShare.SampleSize == null && data.BrandShareList.length == 0)
            return setValue(0) + "%";

        if (_sampleSize < MinSampleSize)
            return "LS";
        return setValue(data.CategoryKOShare.Volume) + "%";
    }
    $rootScope.$on("setTopWidgetsData", function (event, data) {
        $scope.setTopWidgetsData(data);
    });
    $rootScope.$on("setMiddleWidgetsData", function (event, data) {
        $scope.setMiddleWidgetsData(data);
    });
    $rootScope.$on("setBottomWidgetsData", function (event, data) {
        $scope.setBottomWidgetsData(data);
    });

    $scope.setTopWidgetsData = function (data) {
        data["DM_Pos"] = box_img_DRM;
        $scope.topWidgetList = data;      
    }
    $scope.setMiddleWidgetsData = function (data) {
        $scope.middleWidgetList = data;     
    }
    $scope.setBottomWidgetsData = function (data) {
        $scope.bottomWidgetList = data;
        $timeout(function () {
            //fillTheChart(35.5, 'category', 1);
            //fillTheChart(7.5, 'market', 2);
            $("div.category-container").each(function () {
                if ($(this).find(".bottom-widget-value").text() != "LS") {
                    var widget_index = $(this).attr("index-value");
                    var widget_index_data_value = parseInt($(this).attr("widget-index-data-value"));
                    fillTheChart(widget_index_data_value, 'category', widget_index);
                }
            });

            $("div.market-container").each(function () {
                if ($(this).find(".bottom-widget-value").text() != "LS") {
                    var widget_index = $(this).attr("index-value");
                    var widget_index_data_value = parseInt($(this).attr("widget-index-data-value"));
                    fillTheChart(widget_index_data_value, 'market', widget_index);
                }
            });

        }, 0, false);
    }

    $scope.updateMiddleWidgetsData = function (categortData,brandData) {
        $scope.setMiddleWidgetsData(categortData);
        $scope.setBottomWidgetsData(brandData);
    }
    $scope.updateBottomWidgetsData = function (brandData) {    
        $scope.setBottomWidgetsData(brandData);
    }
    $scope.setCategoryIcon = function (icon) {
        var icon = icon.replace(/\//g, "-").split(" ").join(""); // "/"
        icon = icon.replace(/\,/g, "-").split(" ").join("");
        return icon;
    }
}]);
app.controller('onSubmitCtrl', ['$scope', '$http', '$q', '$rootScope', '$timeout', function ($scope, $http, $q, $rootScope, $timeout) {
    $scope.getOnSubmitData = function () {
        //Hide top Menu
        hide_leftMenuSow(null);
        //**********load selected filters**************
        var CBL_SelectionEntity = {};
        Markets_Data = GetFilter(AQ.CBL.Filters.Markets);
        Wave_Data = GetFilter(AQ.CBL.Filters.Wave);
        DrinkingMoments_Data = GetFilter(AQ.CBL.Filters.DrinkingMoments);
        Base_Data = GetFilter(AQ.CBL.Filters.Base);
        Benchmark_Data = GetFilter(AQ.CBL.Filters.Benchmark);
        Measure_Data = GetFilter(AQ.CBL.Filters.Measure);
        AdvancedFilters_Data = GetFilter(AQ.CBL.Filters.AdvancedFilters);

        if (Markets_Data == null || Wave_Data == null || DrinkingMoments_Data == null || Base_Data == null || Benchmark_Data == null || Measure_Data == null ||Markets_Data.Data == null || Wave_Data.Data == null || DrinkingMoments_Data.Data == null || Base_Data.Data == null || Benchmark_Data.Data == null || Measure_Data.Data == null) {
            showAlertBox("Please complete all selections.");
            return;
        }
        $("#current-wave").text(Wave_Data.Data.Text + " |");
        $("#previous-wave").text( "NA" );
        //********object members initialization************
        CBL_SelectionEntity.Market = { Id: '', Name: '' };
        CBL_SelectionEntity.Wave = { Id: '', Name: '' };
        CBL_SelectionEntity.DrinkingMoments = { Id: '', Name: '' };
        CBL_SelectionEntity.Base = { Id: '', Name: '' };
        CBL_SelectionEntity.Benchmark = { Id: '', Name: '' };
        CBL_SelectionEntity.Measure = { Id: '', Name: '' };
        CBL_SelectionEntity.Wave = { Id: '', Name: '' };
        CBL_SelectionEntity.Wave = { Id: '', Name: '' };
        CBL_SelectionEntity.AdvancedFilters = [];

        if ($(".data-row[filter-data-type='Wave'][market-name='" + filterSelectionList[0].Data.Text + "'][wave='" + filterSelectionList[1].Data.Text + "']").next().attr('market-name') == filterSelectionList[0].Data.Text)
            $("#previous-wave").text($(".data-row[filter-data-type='Wave'][market-name='" + filterSelectionList[0].Data.Text + "'][wave='" + filterSelectionList[1].Data.Text + "']").next().attr('filter-text'));
        else
            $("#previous-wave").text("NA");

        //**********asign filter values***************
        if (filterSelectionList != null && filterSelectionList.length > 0) {
            if (Markets_Data.Data != null) {
                CBL_SelectionEntity.Market.Id = Markets_Data.Data.Id;
                CBL_SelectionEntity.Market.Name = Markets_Data.Data.Text;
            }
            if (Wave_Data.Data != null) {
                CBL_SelectionEntity.Wave.Id = Wave_Data.Data.Id;
                CBL_SelectionEntity.Wave.Name = Wave_Data.Data.Text;
            }
            if (DrinkingMoments_Data.Data != null) {
                CBL_SelectionEntity.DrinkingMoments.Id = DrinkingMoments_Data.Data.Id;
                CBL_SelectionEntity.DrinkingMoments.Name = DrinkingMoments_Data.Data.Text;
            }
            if (Base_Data.Data != null) {
                CBL_SelectionEntity.Base.Id = Base_Data.Data.Id;
                CBL_SelectionEntity.Base.Name = Base_Data.Data.Text;
            }
            if (Benchmark_Data.Data != null) {
                CBL_SelectionEntity.Benchmark.Id = Benchmark_Data.Data.Id;
                CBL_SelectionEntity.Benchmark.Name = Benchmark_Data.Data.Text;
            }
            if (Measure_Data.Data != null) {
                CBL_SelectionEntity.Measure.Id = Measure_Data.Data.Id;
                CBL_SelectionEntity.Measure.Name = Measure_Data.Data.Text;
                $(".selected-market").html("SPLIT OF " + CBL_SelectionEntity.Base.Name.toUpperCase() + " BY DRINKING MOMENTS IN " + Markets_Data.Data.Text.toUpperCase() + " | "); //+ " " + Measure_Data.Data.Text.toUpperCase()
                $(".rightBody").find(".top-widgets-header").find(".top-widgets-right-header").html(Measure_Data.Data.Text + " split, Indexed to Benchmark | KO Share");
                $(".rightBody").find(".middle-widgets").find(".middle-widgets-right-header").html("Category  " + Measure_Data.Data.Text + " in DM, Indexed to Base | KO Share in DM");
            }
            if (AdvancedFilters_Data.Data != null) {
                $(AdvancedFilters_Data.Data).each(function (indx, obj) {
                    CBL_SelectionEntity.AdvancedFilters.push({ Id: obj.Id, Name: obj.Text });
                });
            }
        }
        //**********send http request***************
        ShowLoader();
        $(".left-panel-Icon").trigger("click");
        $http({
            url: AQ.CBL.BaseUrl + "/DrinkingMomentsDeepDive/GetDMData",
            method: AQ.CBL.Http.Type.POST,
            data: { 'CBL_SelectionEntity': CBL_SelectionEntity, 'filterSelectionList': JSON.stringify({ "filterSelectionList": filterSelectionList }) }

        })
    .then(function (response) {
       if(OnSessionExpired(response))
              return false;

        submitflag = true;
        widgetData = response.data;
        //sample size check
        var samplesize = parseInt(response.data.SampleSize.SampleSize_Volume,0);
        if (samplesize < MinSampleSize)
        {
            HideLoader();
            submitflag = false;
            showAlertBox("Sample Size Less than " + MinSampleSize);
            
            return false;
        }
        $(".rightBody").show();
        $(".footer").show();
        $rootScope.$emit("setTopWidgetsData", response.data.DMShareList);
        $rootScope.$emit("setMiddleWidgetsData", response.data.DMShareList[0].CategoryShareList);
        $rootScope.$emit("setBottomWidgetsData", response.data.DMShareList[0].CategoryShareList[0].BrandShareList);
        $timeout(function () {           
            activateTopWidget($(".top-widgets .widget-content").eq(0));
            activateMiddleWidget($(".middle-widgets .widget-content").eq(0));
            //$(".selected-DM").html(response.data.DMShareList[0].DrinkingMoment_Name);
        }, 0, false);
        HideLoader();
    },
    function (error) {
        //alert(error);
        HideLoader();
    });
    }
}]);
$(document).ready(function () {
    $("#DashboardMenu").addClass("selected-menu");
    $("#DrinkingMomentsMenu").addClass("selected-sub-menu");
    $("#DrinkingMomentsMenu .sub-menu-img").removeClass("InactiveDrinkingMomentsMenuImg").addClass("ActiveDrinkingMomentsMenuImg");
    $("#DrinkingMomentsMenu .sub-menu-arrow").removeClass("inactiveArrow").addClass("activeArrow");
    SetScroll($(".widget-scroll"), right_scroll_bgcolor, 0, -4, 0, -3, 5);
    $(document).on("click", ".top-widgets .widget-content", function () {
        activateTopWidget($(this));
        activateMiddleWidget($(".middle-widgets .widget-content").eq(0));
    });
    $(document).on("click", ".middle-widgets .widget-content", function () {
        activateMiddleWidget($(this));      
    });
});

function activateTopWidget(ele)
{
    $(".top-widgets .widget-content").removeClass("DM-selected-bg");
    $(".top-widgets .widget-content").find(".widget-title").css("color", "#000000");
    //$(".top-widgets .widget-content").find(".percentage-seperator").css("color", "#000000");
    $(".top-widgets .widget-content").find(".widget-img-seperator").addClass("unselected-widget-img-seperator");
    //$(".top-widgets .widget-content").find(".change-percentage").removeAttr("style")
    //$(".top-widgets .widget-content").find(".previous-percentage").removeAttr("style")

    $(ele).addClass("DM-selected-bg");
    $(ele).find(".widget-title").css("color", "#ffffff");
    //$(ele).find(".percentage-seperator").css("color", "#ffffff");
    $(ele).find(".widget-img-seperator").removeClass("unselected-widget-img-seperator");
    //$(ele).find(".change-percentage").css("color", "#ffffff");
    //$(ele).find(".previous-percentage").css("color", "#ffffff");

    $(".selected-DM").html("Category Mix WITHIN " + $(ele).find(".widget-title").children("span").html().toUpperCase() + " | ");//"SPLIT OF " + Base_Data.Data.Text.toUpperCase() + " " + Measure_Data.Data.Text.toUpperCase() + "
}
function activateMiddleWidget(ele)
{
    if ($(".middle-widgets .widget-content").find(".widget-box.selected-widget-box").length > 0)
        $(".middle-widgets .widget-content").find(".widget-box.selected-widget-box").css("background-image", $(".middle-widgets .widget-content").find(".widget-box.selected-widget-box").css("background-image").replace("_Active.png", ".png"));
    $(".middle-widgets .widget-content").find(".widget-box").removeClass("selected-widget-box").addClass("unselected-widget-box");
    $(".middle-widgets .widget-content").find(".vertical-seperator").removeClass("selected-verticle-widget-seperator").addClass("unselected-verticle-widget-seperator");

    $(ele).find(".widget-box").removeClass("unselected-widget-box").addClass("selected-widget-box").css("background-image", $(ele).find(".widget-box").css("background-image").replace(".png","_Active.png"));
    $(ele).find(".vertical-seperator").removeClass("unselected-verticle-widget-seperator").addClass("selected-verticle-widget-seperator");
    if ($('.bottom-widgets').find('.widget-scroll').find('.bottom-widget-container').length > 0) {
        $(".selected-widget").html("Brand share - "+$(ele).find(".widget-name").html().toUpperCase());//"SPLIT OF " + $(ele).find(".widget-name").html().toUpperCase() + " " + Measure_Data.Data.Text.toUpperCase() + " WITHIN " + $('.DM-selected-bg').find('.box-img-txt').text().toUpperCase() + " BY BRAND");
        $('.bottom-widgets-header').find('.header-icon').show()
    }
    else {
        $(".selected-widget").html("");
        $('.bottom-widgets-header').find('.header-icon').hide()
    }
}
//fillTheChart(35.5, 'category', 1);
//fillTheChart(7.5, 'market', 2);
function fillTheChart(value, type, widgetId) {
    var number = 0;
    var remainder = 0.0;
    if (value < 100 / 30) {
        number = 0;
        remainder = (value * 30 / 100) * 100;
    }
    else {
        number = Math.floor(value * 30 / 100);
        remainder = ((value * 30 / 100) - number) * 100;
    }
    var n = number + 1;
    $("#child-" + type + "_" + widgetId + "_" + n).css('width', remainder + '%')
    while (number > 0) {
        $("#child-" + type + "_" + widgetId + "_" + number).css('width', '100%')
        number = number - 1;
    }

}

function DMPPTExport() {
    var sContainer = $('.export-div');
    svgElements = $(sContainer).find('svg');
    $(".export-div").css('background', 'rgba(0, 0, 0, 1)')
    ShowLoader();
    //replace all svgs with a temp canvas
    var i = 0;
    svgElements.each(function () {
        var canvas, xml;
        // canvg doesn't cope very well with em font sizes so find the calculated size in pixels and replace it in the element.
        $.each($(this).find('[style*=em]'), function (index, el) {
            $(this).css('font-size', getStyle(el, 'font-size'));
        });
        canvas = document.createElement("canvas");
        sContainer[0].appendChild(canvas);

        //convert SVG into a XML string
        xml = (new XMLSerializer()).serializeToString(this);

        // Removing the name space as IE throws an error
        xml = xml.replace(/xmlns=\"http:\/\/www\.w3\.org\/2000\/svg\"/, '');
        //console.log(xml);
        //xml = xml.replace(/xmlns:xlink=\"http:\/\/www\.w3\.org\/1999\/xlink\"/, '');
        xml = xml.replace(/xlink:href/g, '');

        //draw the SVG onto a canvas
        canvg(canvas, xml);

        $(canvas).insertAfter(this);
        //hide the SVG element
        $(this).hide();
    });
   
   
    html2canvas($(sContainer), {
        allowTaint: true,
        letterRendering: true,
        onrendered: function (canvas) {

            var base64 = canvas.toDataURL();
            base64 = base64.replace('data:image/png;base64,', '');

            var request = {};
            request.imgBase64 = base64;
            request.pageName = 'DrinkingMomentsMenu';
            $(".category-img").show();

            var CBL_SelectionEntity = {};
            Markets_Data = GetFilter(AQ.CBL.Filters.Markets);
            Wave_Data = GetFilter(AQ.CBL.Filters.Wave);
            DrinkingMoments_Data = GetFilter(AQ.CBL.Filters.DrinkingMoments);
            Base_Data = GetFilter(AQ.CBL.Filters.Base);
            Benchmark_Data = GetFilter(AQ.CBL.Filters.Benchmark);
            Measure_Data = GetFilter(AQ.CBL.Filters.Measure);
            AdvancedFilters_Data = GetFilter(AQ.CBL.Filters.AdvancedFilters);

            if (Markets_Data.Data == null || Wave_Data.Data == null || DrinkingMoments_Data.Data == null || Base_Data.Data == null || Benchmark_Data.Data == null || Measure_Data.Data == null) {
               HideLoader();
               showAlertBox("Please complete all selections.");
                return;
            }
            //********object members initialization************
            CBL_SelectionEntity.Market = {  Name: '' };
            CBL_SelectionEntity.Wave = { Name: '' };
            CBL_SelectionEntity.DrinkingMoments = { Name: '' };
            CBL_SelectionEntity.Base = { Name: '' };
            CBL_SelectionEntity.Benchmark = { Name: '' };
            CBL_SelectionEntity.Measure = {  Name: '' };
            CBL_SelectionEntity.Wave = {  Name: '' };
            CBL_SelectionEntity.Wave = { Name: '' };
            CBL_SelectionEntity.AdvancedFilters = [];

            
            //**********asign filter values***************
            if (filterSelectionList != null && filterSelectionList.length > 0) {
                if (Markets_Data.Data != null) {   
                    CBL_SelectionEntity.Market.Name = Markets_Data.Data.Text;
                }
                if (Wave_Data.Data != null) {
                    CBL_SelectionEntity.Wave.Name = Wave_Data.Data.Text;
                }
                if (DrinkingMoments_Data.Data != null) {
                    CBL_SelectionEntity.DrinkingMoments.Name = DrinkingMoments_Data.Data.Text;
                }
                if (Base_Data.Data != null) {                   
                    CBL_SelectionEntity.Base.Name = Base_Data.Data.Text;
                }
                if (Benchmark_Data.Data != null) {                  
                    CBL_SelectionEntity.Benchmark.Name = Benchmark_Data.Data.Text;
                }
                if (Measure_Data.Data != null) {                  
                    CBL_SelectionEntity.Measure.Name = Measure_Data.Data.Text;
                }
                if (AdvancedFilters_Data.Data != null) {
                    $(AdvancedFilters_Data.Data).each(function (indx, obj) {
                        CBL_SelectionEntity.AdvancedFilters.push({  ParentName: obj.ParentText, Name: obj.Text });
                    });
                }
            }
            request.filter=CBL_SelectionEntity;
            $.ajax({
                type: "post",
                url: "/Common/DownloadPPT",
                async: true,
                data: JSON.stringify(request),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (d) {
                   if(OnSessionExpired(d))
                       return false;

                    if (d.FileStatus)
                        window.location.href = d.FilePath;
                    else
                        showAlertBox("Something went wrong<br/>Please try again");
                    HideLoader();
                },
                error: function (e) {
                    HideLoader()
                }
            });
            $(sContainer).find('canvas').remove();
            $('svg').show();
        }
    });
}

function DMExcelExport() {
    ShowLoader();
    var CBL_SelectionEntity = {};
    Markets_Data = GetFilter(AQ.CBL.Filters.Markets);
    Wave_Data = GetFilter(AQ.CBL.Filters.Wave);
    DrinkingMoments_Data = GetFilter(AQ.CBL.Filters.DrinkingMoments);
    Base_Data = GetFilter(AQ.CBL.Filters.Base);
    Benchmark_Data = GetFilter(AQ.CBL.Filters.Benchmark);
    Measure_Data = GetFilter(AQ.CBL.Filters.Measure);
    AdvancedFilters_Data = GetFilter(AQ.CBL.Filters.AdvancedFilters);

    if (Markets_Data.Data == null || Wave_Data.Data == null || DrinkingMoments_Data.Data == null || Base_Data.Data == null || Benchmark_Data.Data == null || Measure_Data.Data == null) {
        HideLoader();
        showAlertBox("Please complete all selections.");
        return;
    }
    //********object members initialization************
    CBL_SelectionEntity.Market = { Id: '', Name: '' };
    CBL_SelectionEntity.Wave = { Id: '', Name: '' };
    CBL_SelectionEntity.DrinkingMoments = { Id: '', Name: '' };
    CBL_SelectionEntity.Base = { Id: '', Name: '' };
    CBL_SelectionEntity.Benchmark = { Id: '', Name: '' };
    CBL_SelectionEntity.Measure = { Id: '', Name: '' };
    CBL_SelectionEntity.Wave = { Id: '', Name: '' };
    CBL_SelectionEntity.Wave = { Id: '', Name: '' };
    CBL_SelectionEntity.AdvancedFilters = [];
    CBL_SelectionEntity.pageName = "DrinkingMomentsMenu";
    CBL_SelectionEntity.SelectedDMId = { Id: $(".DM-selected-bg").attr("data-id"), Name: $(".DM-selected-bg .widget-title-container .widget-title span").text() };
    CBL_SelectionEntity.SelectedCategoryId = { Id: $(".selected-widget-box").attr("category-id"), Name: $(".selected-widget-box").attr("category-name") };

    //**********asign filter values***************
    if (filterSelectionList != null && filterSelectionList.length > 0) {
        if (Markets_Data.Data != null) {
            CBL_SelectionEntity.Market.Id = Markets_Data.Data.Id;
            CBL_SelectionEntity.Market.Name = Markets_Data.Data.Text;
            $(".selected-market").html(Markets_Data.Data.Text.toUpperCase());
        }
        if (Wave_Data.Data != null) {
            CBL_SelectionEntity.Wave.Id = Wave_Data.Data.Id;
            CBL_SelectionEntity.Wave.Name = Wave_Data.Data.Text;
        }
        if (DrinkingMoments_Data.Data != null) {
            CBL_SelectionEntity.DrinkingMoments.Id = DrinkingMoments_Data.Data.Id;
            CBL_SelectionEntity.DrinkingMoments.Name = DrinkingMoments_Data.Data.Text;
        }
        if (Base_Data.Data != null) {
            CBL_SelectionEntity.Base.Id = Base_Data.Data.Id;
            CBL_SelectionEntity.Base.Name = Base_Data.Data.Text;
        }
        if (Benchmark_Data.Data != null) {
            CBL_SelectionEntity.Benchmark.Id = Benchmark_Data.Data.Id;
            CBL_SelectionEntity.Benchmark.Name = Benchmark_Data.Data.Text;
        }
        if (Measure_Data.Data != null) {
            CBL_SelectionEntity.Measure.Id = Measure_Data.Data.Id;
            CBL_SelectionEntity.Measure.Name = Measure_Data.Data.Text;
        }
        if (AdvancedFilters_Data.Data != null) {
            $(AdvancedFilters_Data.Data).each(function (indx, obj) {
                CBL_SelectionEntity.AdvancedFilters.push({ Id: obj.Id, Name: obj.Text });
            });
        }
    }
    $.ajax({
        type: "post",
        url: "/Common/DownloadExcel",
        async: true,
        data: JSON.stringify(CBL_SelectionEntity),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (d) {
            if (OnSessionExpired(d))
                return false;

            if (d.FileStatus)
                window.location.href = "/Common/ExcelDownload";
            else
                showAlertBox("Something went wrong<br/>Please try again");
            HideLoader();
        },
        error: function (e) {
            HideLoader()
        }
    });
}

var box_img_DRM = {
    "My Meal/Snack Time": { img1: "-208px -566px", img2: "-489px -522px" },
    "Routine Habits at Home": { img1: "-314px -565px", img2: "-684px -522px" },// "-318px -568px",
    "Time Out at Work/School": { img1: "-369px -562px", img2: "-782px -522px" },//"-371px -568px",
    "Nourishing Breakfast": { img1: "-591px -564px", img2: "-1173px -522px" },//"-594px -568px",
    "Comforting Meals at Home": { img1: "-155px -564px", img2: "-391px -522px" },//"-158px -568px",
    "Nurturing Meals at Home": { img1: "-700px -565px", img2: "-1368px -522px" },//"-703px -568px",
    "Daily Unwind": { img1: "-424px -563px", img2: "-880px -522px" },//"-427px -568px",
    "Physical Recovery": { img1: "-481px -563px", img2: "-977px -522px" },//"-484px -568px",
    "Energy on the Run": { img1: "-536px -565px", img2: "-1075px -522px" },//"-537px -568px",
    "Relaxing Screen Time": { img1: "3px -564px", img2: "-98px -522px" },//"0 -568px",
    "Fun Meals Away from Home": { img1: "-49px -566px", img2: "-196px -522px" },
    "Energizing Breakfast": { img1: "-646px -564px", img2: "-1270px -522px" },
    "Mental Refreshment at Home": { img1: "-262px -566px", img2: "-587px -522px" },
    "Socializing": { img1: "-102px -564px", img2: "-293px -522px" }
}
function CheckForDefaultSelection($http) {
    $http({
        url: AQ.CBL.BaseUrl + "/Common/GetDefaultSelectionsForUser",
        method: "POST",
        data: { 'View': 'DMD' }
    })
   .then(function (response) {
      
       if (response.data == null || response.data == "null" || response.data == "")
       {//$(".defaltdataloding").hide();
           //HideLoader(); $(".showMenu").toggle("pulsate"); return;
           DefaultSelections();
       }
       var data = JSON.parse(JSON.parse(response.data));
       filterSelectionList = data.filterSelectionList
       //localStorage.setItem("BrandFitEntity", JSON.stringify(data.BrandFitEntity));
       upDateLeftpanel();
       angular.element($(".submitDiv")).scope().getOnSubmitData();
       //$(".defaltdataloding").hide();
       $(".left-panel-Icon").click();
       ShowFilterSelection();
   }, function errorCallback(response) {
       // called asynchronously if an error occurs
       // or server returns response with an error status.
   });
}
function upDateLeftpanel() {

    $(filterSelectionList).each(function (indx, obj) {
        if (obj.Data != null) {
            if (obj.ButtonType == "radio") {
                $(obj.PopupElementSelector).find("[data-id =" + obj.Data.Id + "]").addClass("active-radio");
                $(".filter-menu[data-name='" + obj.FilterType + "']").find(".filter-header").find(".selected-filter").html(obj.Data.Text);
            }
            else if (obj.ButtonType == "checkbox") {
                if (obj.Data.length > 1) {
                    var selecter = obj.PopupElementSelector;
                    $(obj.Data).each(function (indx, obj) {
                        $(selecter).find("[data-id =" + obj.Id + "]").addClass("active-checkbox");
                    });
                    $(".filter-menu[data-name='" + obj.FilterType + "']").find(".filter-header").find(".selected-filter").html("Multiple");
                } else if (obj.Data.length == 1) {
                    var selecter = obj.PopupElementSelector;
                    $(selecter).find("[data-id =" + obj.Data[0].Id + "]").addClass("active-checkbox");
                    $(".filter-menu[data-name='" + obj.FilterType + "']").find(".filter-header").find(".selected-filter").html(obj.Data[0].Text);//Single
                }
                else {
                    $(".filter-menu[data-name='" + obj.FilterType + "']").find(".filter-header").find(".selected-filter").html("Single");
                    console.log(obj.Data.Text);
                }
            }
        }
    });

}
function appendClearAll() {
   // $(".filter-menu[data-name='Brands/Category']").find(".ClearAllItem").parent().parent().append("<div class='ClearAll' onclick='ClearItem(2,event) '>ClearAll</div>");
   // $(".filter-menu[data-name='Drinking Moments']").find(".ClearAllItem").parent().parent().append("<div class='ClearAll' onclick='ClearItem(5,event) '>ClearAll</div>");
    $(".filter-menu[data-name='Advanced Filters']").find(".ClearAllItem").parent().parent().append("<div class='ClearAll' onclick='ClearItem(6,event) '>Clear Tab</div>");
}