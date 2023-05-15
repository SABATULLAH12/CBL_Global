/// <reference path="../CBL/Global.js" />
/// <reference path="../CBL/Master.js" />

var leftPanelSortedFilters = [], pageId = 1;//1=5W | 2=DM | 3=BF
app.controller('leftPanelCtrl', ['$scope', '$http', '$q', '$timeout', function ($scope, $http, $q, $timeout) {
    ShowLoader();
    $http({
        url: AQ.CBL.BaseUrl + "/Common/GetFilters",
        method: "POST",
        data: { 'Filter': '5W' }
    })
   .then(function (response) {
       $scope.leftPanelFilters = setSearchAndClearAll(response.data);
       $scope.$on('appendClearAll', function (ngRepeatFinishedEvent) {
           appendClearAll();
       });
       if (localStorage.getItem("BrandFitEntity") != null && localStorage.getItem("BrandFitEntity") != "") {
           ShowLoader();
           $timeout(function () {
               BrandFitData = JSON.parse(localStorage.getItem("BrandFitEntity"));
               filterSelectionList = [];
               $("div.filter-data-popup").each(function () {
                   var filter = { FilterType: $(this).attr("filter-data-type"), PopupElementSelector: "div.filter-data-popup[filter-data-type='" + $(this).attr("filter-data-type") + "']", ButtonType: "radio", SelectionType: "single", Data: null };
                   if ($(this).attr("filter-data-type").toLowerCase().indexOf("advanced filters") > -1 || ($(this).attr("filter-data-type").toLowerCase().indexOf("drinking moments") > -1 && localStorage.getItem('pageName') == "FiveWProfileMenu")
                      || $(this).attr("filter-data-type").toLowerCase().indexOf("compare by") > -1) {
                       filter.ButtonType = "checkbox";
                       filter.SelectionType = "multiple";
                   }
                   filterSelectionList.push(filter);
               });
               var dataList = [];
               $(filterSelectionList).each(function (indx, obj) {
                            obj.Data = JSON.parse(JSON.stringify(dataList));
               });
               
               filterSelectionList[0].Data.Id = BrandFitData.Market.Id;
               filterSelectionList[0].Data.Text = BrandFitData.Market.Name;

               filterSelectionList[1].Data.Id = BrandFitData.Wave.Id;
               filterSelectionList[1].Data.Text = BrandFitData.Wave.Name;

               if (BrandFitData.BrandsCategory.Id != "") {
                   filterSelectionList[2].Data.Id = BrandFitData.BrandsCategory.Id;
                   filterSelectionList[2].Data.Text = BrandFitData.BrandsCategory.Name;
               }
               else {
                   filterSelectionList[2].Data.Id = BrandFitData.CompareBy.Id;
                   filterSelectionList[2].Data.Text = BrandFitData.CompareBy.Name;
               }      

               filterSelectionList[3].Data.Id = BrandFitData.Benchmark.Id;
               filterSelectionList[3].Data.Text = BrandFitData.Benchmark.Name;

               filterSelectionList[4].Data.Id = BrandFitData.Measure;
               filterSelectionList[4].Data.Text = "Volume(AUC)";

               filterSelectionList[5].Data.push({ Id: BrandFitData.DrinkingMoments.Id, Text: BrandFitData.DrinkingMoments.Name, ParentText: BrandFitData.DrinkingMomentsGlobal.Name });

               if (BrandFitData.AdvancedFilters != null) {
                   $(BrandFitData.AdvancedFilters).each(function (indx, obj) {
                       filterSelectionList[6].Data.push({ Id: obj.Id, Text: obj.Name, ParentText: obj.ParentText });
                   });
               }
               ShowFilterSelection();
               $(".submitDiv").click();
            
           });

       }
       else
       {
           //$(".defaltdataloding").show();
           CheckForDefaultSelection($http);
           localStorage.removeItem("BrandFitEntity");
           localStorage.removeItem("filterSelectionList");
       }       
      // HideLoader();
   },
   function (response) {
       
   });
}]);
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
    $scope.whatWidget = [];
    $scope.channelData = [];
    $scope.whywidget = [];
    $scope.ageGroupArray = [];
    $scope.occupationArray = [];
    $scope.whereWidget = [];
    $scope.whereLeftWidget = [];
    $scope.genderArray = [];
    $scope.whenWidget = [];
    $scope.householdArray = [];
    $scope.timeWidget = [];
    $scope.momentsCategoryWidget = [];
    $scope.whatArray = [52, 51, 50, 49, 48, 47, 46, 45, 44, 43, 42, 41, 40, 39, 38, 37, 36, 35, 34, 33, 32, 31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]

    $rootScope.$on("setWhoWidgetsData", function (event, data) {
        $scope.setWhoWidgetsData(data);
    });
    $rootScope.$on("setWhenWidgetsData", function (event, data) {
        $scope.setWhenWidgetsData(data);
    });
    $rootScope.$on("setMCWidgetsData", function (event, data) {
        $scope.setMCWidgetsData(data);
    });
    $rootScope.$on("setWhereWidgetsData", function (event, data) {
        $scope.setWhereWidgetsData(data);
    });
    $rootScope.$on("setWhatWidgetsData", function (event, data) {
        $scope.setWhatWidgetsData(data);
    });
    $rootScope.$on("setWhyWidgetsData", function (event, data) {
        $scope.setWhyWidgetsData(data);
    });
    $rootScope.$on("checkForDataAvailability", function () {
        $scope.checkForDataAvailability();
    });

    $scope.checkForDataAvailability = function () {
        
        if ($scope.whatWidget.length == 0)
            $("#what-widget .NoDataAvailable").show();
        if ($scope.whywidget.length == 0)
            $("#why-widget-content .NoDataAvailable").show();
        if ($scope.channelData.length == 0)
            $("#channel-widget .NoDataAvailable").show();
        if ($scope.whereWidget.length == 0)
            $("#away-fromhome-widget .NoDataAvailable").show();
        if ($scope.occupationArray.length == 0)
            $("#occupation-widget .NoDataAvailable").show();
        if ($scope.ageGroupArray.length == 0)
            $("#agegroup-widget .NoDataAvailable").show();
        if ($scope.genderArray.length == 0)
            $("#gender-widget .NoDataAvailable").show();
        if ($scope.householdArray.length == 0)
            $("#household-widget .NoDataAvailable").show();
        if ($scope.whereLeftWidget.length == 0)
            $("#where-left-widget .NoDataAvailable").show();
        if ($scope.momentsCategoryWidget.length == 0) {
            $("#mc-widget .NoDataAvailable").show();
            $("#chart").html("");
        }
        if ($scope.timeWidget.length == 0)
            $("#time-widget .NoDataAvailable").show();

    }
    $scope.setWhoWidgetsData = function (data) {
        $scope.genderArray = DataMapping(data, 1, "Gender"); //[2].SubWidgetData
        $scope.householdArray = DataMapping(data,2, "Household Size");
        $scope.ageGroupArray = DataMapping(data,0, "Age Group");
        $scope.occupationArray = DataMapping(data, 3, "Occupation");

        maxChartValues["Age Group"] = Math.max.apply(Math, $scope.ageGroupArray.map(function (o) { return o.Volume; }))
        maxChartValues["Occupation"] = Math.max.apply(Math, $scope.occupationArray.map(function (o) { return o.Volume; }))
       
    }
    $scope.setWhenWidgetsData = function (data) {
        $('.when-chart-container').html("");
        $scope.whenWidget = (data.length>1)? data[1].SubWidgetData : null;
        $scope.timeWidget = data[0].SubWidgetData;
        var chartData = [];
        $('.when-chart-container').html("");
        if ($scope.whenWidget != null) {
            $('.when-chart-container').css("width", "30%");
            $('.when-chart-container').html("<div class='when-arc-image'></div> ");
        }
        else {
            $('.when-chart-container').css("width","100%");
            $('.when-chart-container').html("<div class='NoDataAvailable' style='font-size: 15px;'>Data Not Available</div> ");
        }
        $timeout(function () {
            $("div.when-percentage-container").each(function () {
                var widget_index_data_value = $(this).attr("widget-data-value") != "NA" ? parseInt($(this).attr("widget-data-value")) : 0;
                chartData.push(widget_index_data_value);
            })
            if (chartData.length > 0) {
                chartData.reverse();
                createArcChart("when-chart-container", 36, chartData);
            }

        }, 0, false);
    }
    $scope.setMCWidgetsData = function (data) {
        $scope.momentsCategoryWidget = data[0].SubWidgetData;
        if (data[0].SubWidgetName == "Global Drinking Moment" || data[0].SubWidgetName == "Local Drinking Moment")
            $("#M-CWidget .widget-head").text("MOMENTS")
        else
            $("#M-CWidget .widget-head").text("CATEGORY")

        if ($scope.momentsCategoryWidget.length != 0) {
            $timeout(function () {
                var chartData = [];
                $("div.mc-widget-container").each(function () {
                    var widget_index_data_value = $(this).attr("widget-data-value") != "NA" ? parseInt($(this).attr("widget-data-value")) : 0;
                    chartData.push(widget_index_data_value);
                })

                var maxValue = arrMax(chartData);

                for (var i = 0; i < chartData.length; i++)
                    chartData[i] = parseInt((chartData[i] / maxValue) * 100);

                createDonutChart(chartData);

            }, 0, false);
        }
    }
    $scope.setWhereWidgetsData = function (data) {
        $scope.whereWidget = data[2].SubWidgetData;
        $scope.whereLeftWidget = data[1].SubWidgetData;
        $scope.channelData = data[0].SubWidgetData;

        maxChartValues["Channel Data"] = Math.max.apply(Math, $scope.channelData.map(function (o) { return o.Volume; }))
        
        if ($scope.whereLeftWidget.length != 0) {
            var chartData = [];
            $('.where-arc-chart').html("");
            $('.where-arc-chart').html("<div class='where-arc-image'></div> ");
            $timeout(function () {
                $("div.where-percentage-container").each(function () {
                    var widget_index_data_value = $(this).attr("widget-data-value") != "NA" ? parseInt($(this).attr("widget-data-value")) : 0;
                    chartData.push(widget_index_data_value);
                })
                chartData.reverse();
                createArcChart("where-arc-chart", 46, chartData);

            }, 0, false);
        }
    }
    $scope.setWhatWidgetsData = function (data) {
        if (data[0].SubWidgetData == null || data[0].SubWidgetData == undefined)
        { ClearWhatWiget(); }
        else {
            $("#what-widget").find(".NoDataAvailable").hide();
            $scope.whatWidget = data[0].SubWidgetData;
            $timeout(function () {
                $("div.what-sub-div").each(function () {
                    var widget_index = $(this).attr("index-value");
                    var widget_index_data_value = $(this).attr("widget-index-data-value") != "NA" ? parseInt($(this).attr("widget-index-data-value")) : 0;
                    fillWhatChart(widget_index_data_value, widget_index);
                })

            }, 0, false);
        }
    }
    $scope.setWhyWidgetsData = function (data) {
        $scope.whywidget = data[0].SubWidgetData;
        maxChartValues["Why Widget"] = Math.max.apply(Math, $scope.whywidget.map(function (o) { return o.Volume; }))
    }
    $scope.setCategoryIcon = function (icon) {
        var icon = icon.replace("/", "-").split(" ").join("");
        return icon;
    }
    $scope.setValue = function (value, category) {
        return setValue(value, category);
    }
    $scope.setIndex = function (value) {
        return setIndex(value);
    }
    $scope.setWidth = function (value) {
        return setWidth(value);
    }
    $scope.setSeparatorColor = function (value) {
        var colorValue = "";
        if (value == "0")
            return "red-bottom-image";
        else
            return "yellow-bottom-image"

    }
    $scope.setIndexColor = function (index) {
        var indexValue = parseInt(index, 0);
        if (indexValue > 120)
            return "green-index";
        else if (indexValue < 80 && indexValue != 0)
            return "red-index";
        else
            return "";
    }

}]);
function DataMapping(Data,rownum,Name)
{    
    var rtdata = [];
            $(Data).each(function (idx, val) {
                if (val.SubWidgetName.trim() == Name) {
                    rtdata = val.SubWidgetData;
                    return false;
                }
            });
       
            return rtdata;
}
app.controller('onSubmitCtrl', ['$scope', '$http', '$q', '$rootScope', '$timeout', function ($scope, $http, $q, $rootScope, $timeout) {
    $scope.getOnSubmitData = function () {
        //Hide top Menu
        hide_leftMenuSow();

        //**********load selected filters**************
        var CBL_SelectionEntity = {};
        //********object members initialization************
        CBL_SelectionEntity.Market = { Id: '', Name: '' };
        CBL_SelectionEntity.Wave = { Id: '', Name: '' };
        CBL_SelectionEntity.DrinkingMoments5W = [];
        CBL_SelectionEntity.BrandsCategory = { Id: '', Name: '' };
        CBL_SelectionEntity.Benchmark = { Id: '', Name: '' };
        CBL_SelectionEntity.Measure = { Id: '', Name: '' };
        CBL_SelectionEntity.AdvancedFilters = [];

       
            Markets_Data = GetFilter(AQ.CBL.Filters.Markets);
            Wave_Data = GetFilter(AQ.CBL.Filters.Wave);
            DrinkingMoments_Data = GetFilter(AQ.CBL.Filters.DrinkingMoments);
            BrandsCategory_Data = GetFilter(AQ.CBL.Filters.BrandsCategory);
            Benchmark_Data = GetFilter(AQ.CBL.Filters.Benchmark);
            Measure_Data = GetFilter(AQ.CBL.Filters.Measure);
            AdvancedFilters_Data = GetFilter(AQ.CBL.Filters.AdvancedFilters);

            if (Markets_Data == null || Wave_Data == null || BrandsCategory_Data == null || Benchmark_Data == null || Measure_Data == null || Markets_Data.Data == null || Wave_Data.Data == null || BrandsCategory_Data.Data == null || Benchmark_Data.Data == null || Measure_Data.Data == null) {
                showAlertBox("Please complete all selections.");
                return;
            }
            $("#current-wave").text(Wave_Data.Data.Text + " |");

            if ($(".data-row[filter-data-type='Wave'][market-name='" + filterSelectionList[0].Data.Text + "'][wave='" + filterSelectionList[1].Data.Text + "']").next().attr('market-name') == filterSelectionList[0].Data.Text)
                $("#previous-wave").text($(".data-row[filter-data-type='Wave'][market-name='" + filterSelectionList[0].Data.Text + "'][wave='" + filterSelectionList[1].Data.Text + "']").next().attr('filter-text'));
            else
                $("#previous-wave").text("NA");

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

                    $(DrinkingMoments_Data.Data).each(function (indx, obj) {
                        CBL_SelectionEntity.DrinkingMoments5W.push({ Id: obj.Id, Name: obj.Text });
                    });
                }
                if (BrandsCategory_Data.Data != null) {
                    CBL_SelectionEntity.BrandsCategory.Id = BrandsCategory_Data.Data.Id;
                    CBL_SelectionEntity.BrandsCategory.Name = BrandsCategory_Data.Data.Text;
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
       
     

        //**********asign filter values***************
       

        ShowLoader();
        $(".left-panel-Icon").trigger("click");
        $(".NoDataAvailable").hide();
        $http({
            url: AQ.CBL.BaseUrl + "/FiveWProfile/Get5WData",
            method: AQ.CBL.Http.Type.POST,
            data: { 'CBL_SelectionEntity': CBL_SelectionEntity, 'filterSelectionList': JSON.stringify({ "filterSelectionList": filterSelectionList, "BrandFitEntity": CBL_SelectionEntity }), overwirtemenu: (($(".left-panel-Icon").is(":visible")==true)?true:false) }
            //data: { 'filterSelectionList': JSON.stringify(filterSelectionList) }
        })
    .then(function (response) {
        if (OnSessionExpired(response))
            return false;


        widgetData = response.data;
        //sample size checks
        var samplesize = parseInt(response.data.SampleSize.SampleSize_Volume, 0);
        if (samplesize < MinSampleSize) {
            HideLoader();
            submitflag = false;
            showAlertBox("Sample Size Less than " + MinSampleSize);

            return false;
        }        
        if (widgetData.FiveWWidgetData != null) {
            submitflag = true;
            $(".rightBody").show();
            $(".footer").show();
            $(".sample-size-div span").text("Sample Size: " + samplesize);
            $("#brand-container").text(CBL_SelectionEntity.BrandsCategory.Name);
            //--clear Widget before each load-----
            ClearWhatWiget();
            //-------------------------------------
            widgetData.FiveWWidgetData.forEach(function (item, index) {
                if (item.WidgetName == "WHO")
                    $rootScope.$emit("setWhoWidgetsData", item.WidgetData)
                else if (item.WidgetName == "WHEN")
                    $rootScope.$emit("setWhenWidgetsData", item.WidgetData);
                else if (item.WidgetName == "Moments/Category")
                    $rootScope.$emit("setMCWidgetsData", item.WidgetData);
                else if (item.WidgetName == "WHERE")
                    $rootScope.$emit("setWhereWidgetsData", item.WidgetData);
                else if (item.WidgetName == "WHAT")
                    $rootScope.$emit("setWhatWidgetsData", item.WidgetData)
                else if (item.WidgetName == "WHY")
                    $rootScope.$emit("setWhyWidgetsData", item.WidgetData);
            })
            $rootScope.$emit("checkForDataAvailability");
        }
        HideLoader();
    },
    function (error) {

        HideLoader();
        $(".rightBody").hide();
        $(".footer").hide();
    });
    }
}]);
$(document).ready(function () {
    $("#DashboardMenu").addClass("selected-menu");
    $("#FiveWProfileMenu").addClass("selected-sub-menu");
    $("#FiveWProfileMenu .sub-menu-img").removeClass("InactiveFiveWProfileMenuImg").addClass("ActiveFiveWProfileMenuImg");
    $("#FiveWProfileMenu .sub-menu-arrow").removeClass("inactiveArrow").addClass("activeArrow");
    localStorage.setItem('pageName', 'FiveWProfileMenu')
    if (localStorage.getItem("BrandFitEntity")!=null&& localStorage.getItem("BrandFitEntity") != "") {
        $(".left-panel-Icon").css('display', 'none');
        //$(".exportExcelContainer").css('pointer-events', 'none');
        //$(".exportPPTContainer").css('pointer-events', 'none');
        $("#DrinkingMomentsMenu").hide();
        $(".redirectIcon").show();
       
    }
});

function createArcChart(container, outerR, data) {
    var height = $("." + container).height();
    var width = $("." + container).width();
    var vis = d3.select("." + container).append("svg").attr("preserveAspectRatio", "xMidYMid meet").attr("viewbox", "0 0 " + width + " " + height + "").attr("height", "100%").attr("width", "100%")
    var arc = d3.svg.arc()
        .innerRadius(outerR - 4)
        .outerRadius(outerR)
    //converting from degs to radians
    //just radians

    var svg = vis;//d3.select("svg")
    g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")") //.style("transform","translate(50%, 50%)")//
    g.append("path")
         .datum({
             endAngle: 2 * Math.PI
         })
        .attr("d", arc)

    var data = data;
    var c = d3.scale.linear()
      .domain(data)
      .range(["orange", "crimson"]);

    var pie = d3.layout.pie()
      .sort(null)
      .value(function (d) {
          return d;
      });

    g.selectAll(".arc")
      .data(pie(data))
      .enter()
      .append("path")
      .attr("class", "arc")
      .style("fill", function (d) {
          return c(d.value);
      })
      .attr("d", arc);
}

function fillWhatChart(value, widgetId) {

    var number = 0;
    var remainder = 0.0;
    if (value < 100 / 52) {
        number = 0;
        remainder = (value * 52 / 100) * 100;
    }
    else {
        number = Math.floor(value * 52 / 100);
        remainder = ((value * 52 / 100) - number) * 100;
    }
    var n = number + 1;
    $("#what-child-" + widgetId + "_" + n).css('width', remainder + '%')
    while (number > 0) {
        $("#what-child-" + widgetId + "_" + number).css('width', '100%')
        number = number - 1;
    }

}

function FiveWPPTExport() {

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
            request.pageName = 'FiveWProfileMenu';


            var CBL_SelectionEntity = {};
            Markets_Data = GetFilter(AQ.CBL.Filters.Markets);
            Wave_Data = GetFilter(AQ.CBL.Filters.Wave);
            DrinkingMoments_Data = GetFilter(AQ.CBL.Filters.DrinkingMoments);
            BrandsCategory_Data = GetFilter(AQ.CBL.Filters.BrandsCategory);
            Benchmark_Data = GetFilter(AQ.CBL.Filters.Benchmark);
            Measure_Data = GetFilter(AQ.CBL.Filters.Measure);
            AdvancedFilters_Data = GetFilter(AQ.CBL.Filters.AdvancedFilters);

            if (Markets_Data == null || Wave_Data == null || BrandsCategory_Data == null || Benchmark_Data == null || Measure_Data == null || Markets_Data.Data == null || Wave_Data.Data == null || BrandsCategory_Data.Data == null || Benchmark_Data.Data == null || Measure_Data.Data == null) {
                showAlertBox("Please complete all selections.");
                return;
            }

            //********object members initialization************
            CBL_SelectionEntity.Market = { Id: '', Name: '' };
            CBL_SelectionEntity.Wave = { Id: '', Name: '' };
            CBL_SelectionEntity.DrinkingMoments5W = [];
            CBL_SelectionEntity.BrandsCategory = { Id: '', Name: '' };
            CBL_SelectionEntity.Benchmark = { Id: '', Name: '' };
            CBL_SelectionEntity.Measure = { Id: '', Name: '' };
            CBL_SelectionEntity.AdvancedFilters = [];


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

                    $(DrinkingMoments_Data.Data).each(function (indx, obj) {
                        CBL_SelectionEntity.DrinkingMoments5W.push({ Id: obj.Id, Name: obj.Text });
                    });
                }
                if (BrandsCategory_Data.Data != null) {
                    CBL_SelectionEntity.BrandsCategory.Id = BrandsCategory_Data.Data.Id;
                    CBL_SelectionEntity.BrandsCategory.Name = BrandsCategory_Data.Data.Text;
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
                        CBL_SelectionEntity.AdvancedFilters.push({ ParentName: obj.ParentText, Name: obj.Text });
                    });
                }
            }
            request.filter = CBL_SelectionEntity;
            $.ajax({
                type: "post",
                url: "/Common/DownloadPPT",
                async: true,
                data: JSON.stringify(request),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (d) {
                    if (OnSessionExpired(d))
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

function FiveWExcelExport() {
    var CBL_SelectionEntity = {};
    Markets_Data = GetFilter(AQ.CBL.Filters.Markets);
    Wave_Data = GetFilter(AQ.CBL.Filters.Wave);
    DrinkingMoments_Data = GetFilter(AQ.CBL.Filters.DrinkingMoments);
    BrandsCategory_Data = GetFilter(AQ.CBL.Filters.BrandsCategory);
    Benchmark_Data = GetFilter(AQ.CBL.Filters.Benchmark);
    Measure_Data = GetFilter(AQ.CBL.Filters.Measure);
    AdvancedFilters_Data = GetFilter(AQ.CBL.Filters.AdvancedFilters);

    if (Markets_Data == null || Wave_Data == null || BrandsCategory_Data == null || Benchmark_Data == null || Measure_Data == null || Markets_Data.Data == null || Wave_Data.Data == null || BrandsCategory_Data.Data == null || Benchmark_Data.Data == null || Measure_Data.Data == null) {
        showAlertBox("Please complete all selections.");
        return;
    }
  
    //********object members initialization************
    CBL_SelectionEntity.Market = { Id: '', Name: '' };
    CBL_SelectionEntity.Wave = { Id: '', Name: '' };
    CBL_SelectionEntity.DrinkingMoments5W = [];
    CBL_SelectionEntity.BrandsCategory = { Id: '', Name: '' };
    CBL_SelectionEntity.Benchmark = { Id: '', Name: '' };
    CBL_SelectionEntity.Measure = { Id: '', Name: '' };
    CBL_SelectionEntity.AdvancedFilters = [];
    CBL_SelectionEntity.pageName = "FiveWProfileMenu";


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

            $(DrinkingMoments_Data.Data).each(function (indx, obj) {
                CBL_SelectionEntity.DrinkingMoments5W.push({ Id: obj.Id, Name: obj.Text });
            });
        }
        if (BrandsCategory_Data.Data != null) {
            CBL_SelectionEntity.BrandsCategory.Id = BrandsCategory_Data.Data.Id;
            CBL_SelectionEntity.BrandsCategory.Name = BrandsCategory_Data.Data.Text;
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

    ShowLoader();
    
    $.ajax({
        type: "post",
        url: "/Common/DownloadExcel",
        async: true,
        data:JSON.stringify(CBL_SelectionEntity) ,
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

function createDonutChart(Values) {
    var width = 168;
    var height = 182;
    var radius = Math.min(width, height) / 2;
    var upper_padding = 3;
    var color = d3.scale.ordinal()
   .range(['crimson', 'orange', '#A56061', '#F07197', '#EFC2E6']);
    var data = [1, 1, 1, 1, 1];
    var data1 = Values;
    $("#chart").html("");
    var vis = d3.select("#chart")
                .append("svg")
                .data([data])
                .attr("width", width)
                .attr("height", '100%')
                .append("svg:g")
                .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');
    // Create the svg:defs element and the main gradient definition.
    //var svgDefs = vis.append('defs');

    //var mainGradient = svgDefs.append('linearGradient')
    //    .attr('id', 'mainGradient');

    //// Create the stops of the main gradient. Each stop will be assigned
    //// a class to style the stop using CSS.
    //mainGradient.append('stop')
    //    .attr('stop-color', 'rgba(35, 31, 32, 0.1)')
    //    .attr('offset', '0');
    //mainGradient.append('stop')
    //    .attr('stop-color', 'rgba(35, 31, 32, 0.1)')
    //    .attr('offset', '0.05');
    //mainGradient.append('stop')
    //    .attr('stop-color', 'rgba(230,230,230,0.5)')
    //    .attr('offset', '0.05');
    //mainGradient.append('stop')
    //    .attr('stop-color', 'rgba(230,230,230,0.5)')
    //    .attr('offset', '1');
    var arc = d3.svg.arc()
        .innerRadius(30)
  		.outerRadius(radius);
    var smallArc = d3.svg.arc()
    .innerRadius(30)
    .outerRadius(function (d, i) {
        return (((radius - 30) * data1[i]) / 100) + 30;
    })
    var outerArc = d3.svg.arc()
    .innerRadius(radius - upper_padding - 2.5)
     .outerRadius(radius - upper_padding - 2.5)

    var pie = d3.layout.pie()
                .startAngle(-90 * (Math.PI / 180))
                .endAngle(90 * (Math.PI / 180))
                //.padAngle(.02)
  	        	  .sort(null)
                .value(function (d) { return d });

    var arcs = vis.selectAll("g.slice")
                    .data(pie)
       					 .enter()
            		.append("svg:g");
    arcs.attr("class", function (d, i) {
        if (i != 0) {
            //Plot Lines
            var _tempArc = d3.svg.arc()
                .innerRadius(30)
                .outerRadius(radius - upper_padding)
                .startAngle(d.startAngle)
                .endAngle(d.startAngle)
            arcs.append("svg:path")
                .attr('class', 'line-arc')
                .attr("fill", 'none')
                .attr("stroke", "#dadada")
                .attr("stroke-width", '1')
                .attr("d", _tempArc);
            //Plot outer Tick
            _tempArc = d3.svg.arc()
                .innerRadius(radius - upper_padding - 5)
                .outerRadius(radius - upper_padding)
                .startAngle(d.startAngle)
                .endAngle(d.startAngle)
            arcs.append("svg:path")
                .attr('class', 'line-arc')
                .attr("fill", 'none')
                .attr("stroke", "#000")
                .attr("stroke-width", '1')
                .attr("d", _tempArc);
        }
        return "slice";
    });

    arcs.append("svg:path")
            .attr("fill", 'rgba(230,230,230,0.5)')
            .attr("d", arc);
    arcs.append("svg:path")
            .attr("fill", function (d, i) { return color(i); })
            .attr("d", smallArc);
    arcs.append("svg:path")
           .attr("stroke", '#cacaca')
           .attr("stroke-width", 3)
           .attr("stroke-dasharray", '1 6')
           .attr("d", outerArc);
}

function RedirectToBrandFit(url) {
    window.location.href = url;
}
function CheckForDefaultSelection($http)
{
    $http({
        url: AQ.CBL.BaseUrl + "/Common/GetDefaultSelectionsForUser",
        method: "POST",
        data: { 'View': 'FiveW' }
    })
   .then(function (response) {
       if (response.data == null || response.data == "null" || response.data == "")
       {//$(".defaltdataloding").hide();
           //HideLoader(); $(".showMenu").toggle("pulsate"); return;
           DefaultSelections();
       }
       var data = JSON.parse(JSON.parse(response.data))       
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
                } else {
                    $(".filter-menu[data-name='" + obj.FilterType + "']").find(".filter-header").find(".selected-filter").html("Single");
                    console.log(obj.Data.Text);
                }
            }
        }
    });
       
}
function setSearchAndClearAll(Data) {
    try {
        var ClearAllIn = { "BRANDS/CATEGORY":true, "DRINKING MOMENTS":true, "ADVANCED FILTERS":true};// 2: ["ADVANCED FILTERS"], 3: ["COMPARE BY", "BRANDS/CATEGORY", "ADVANCED FILTERS"] }
        var searchForFW = { "Markets": true, "Brands/Category": true, "Benchmark": true, "Measure": true, "Drinking Moments": true, "Advanced Filters": true }
        $(Data).each(function (idx, val) {            
            val.ClearAll = (ClearAllIn[val.Label.toUpperCase()] == undefined) ? false : ClearAllIn[val.Label.toUpperCase()];
            val.Search = (searchForFW[val.Label] == undefined) ? false : searchForFW[val.Label];
        });
        return Data;
    }catch(ex)
    {
        return Data
    }
}
function ClearWhatWiget() {
    $("#what-widget").find(".what-sub-div").remove();
    $("#what-widget").find(".NoDataAvailable").show();
    
}

function appendClearAll() {
    $(".filter-menu[data-name='Brands/Category']").find(".ClearAllItem").parent().parent().append("<div class='ClearAll' onclick='ClearItem(2,event) '>Clear Tab</div>");
    $(".filter-menu[data-name='Drinking Moments']").find(".ClearAllItem").parent().parent().append("<div class='ClearAll' onclick='ClearItem(5,event) '>Clear Tab</div>");
    $(".filter-menu[data-name='Advanced Filters']").find(".ClearAllItem").parent().parent().append("<div class='ClearAll' onclick='ClearItem(6,event) '>Clear Tab</div>");
}
