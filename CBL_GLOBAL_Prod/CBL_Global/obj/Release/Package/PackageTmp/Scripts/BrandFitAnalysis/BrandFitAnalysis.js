/// <reference path="../CBL/Global.js" />
/// <reference path="../CBL/Master.js" />
/// <reference path="../CBL/LeftPanelFilters.js" />

var leftPanelSortedFilters = [],fromFW=true, pageId = 3;//1=5W | 2=DM | 3=BF
var selectedScoreName = "FIT SCORE", pageId = 3;//1=5W | 2=DM | 3=BF
var BrandFitData = [];
app.controller('leftPanelCtrl', ['$scope', '$http', '$q', '$timeout', function ($scope, $http, $q, $timeout) {
    ShowLoader();
    $http({
        url: AQ.CBL.BaseUrl + "/Common/GetFilters",
        method: "POST",
        data: { 'Filter': 'BrandFit' }
    })
   .then(function (response) {
       $scope.leftPanelFilters = response.data;
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

               filterSelectionList[2].Data.Id = BrandFitData.DrinkingMomentsGlobal.Id;
               filterSelectionList[2].Data.Text = BrandFitData.DrinkingMomentsGlobal.Name;

               filterSelectionList[3].Data.Id = BrandFitData.FitBasis.Id;
               filterSelectionList[3].Data.Text = BrandFitData.FitBasis.Name;

               if (BrandFitData.CompareByGlobal != null) {
                   $(BrandFitData.CompareByGlobal).each(function (indx, obj) {
                       filterSelectionList[4].Data.push({ Id: obj.Id, Text: obj.Name, ParentText: obj.ParentText });
                   });
               }

               filterSelectionList[5].Data.Id = BrandFitData.BrandsCategory.Id;
               filterSelectionList[5].Data.Text = BrandFitData.BrandsCategory.Name;

               filterSelectionList[6].Data.Id = BrandFitData.Benchmark.Id;
               filterSelectionList[6].Data.Text = BrandFitData.Benchmark.Name;

               if (BrandFitData.AdvancedFilters != null) {
                   $(BrandFitData.AdvancedFilters).each(function (indx, obj) {
                       filterSelectionList[7].Data.push({ Id: obj.Id, Text: obj.Name, ParentText: obj.ParentText });
                   });
               }
               ShowFilterSelection();
               $(filterSelectionList).each(function (indx, obj) {
                   if (obj.ButtonType == "radio") {
                       $("div.filter-data-popup[filter-data-type='" + obj.FilterType + "'] div[button-type='" + obj.ButtonType + "'][data-id='" + obj.Data.Id + "']").addClass("active-" + obj.ButtonType + "");
                       if(obj.Data.Text!="")
                           $("div.filter-data-popup[filter-data-type='" + obj.FilterType + "']").parent(".filter-menu").find(".selected-filter").html(obj.Data.Text);
                   }
                   else {
                       $(obj.Data).each(function (i, v) {
                           $("div.filter-data-popup[filter-data-type='" + obj.FilterType + "'] div[button-type='" + obj.ButtonType + "'][data-id='" + v.Id + "']").addClass("active-" + obj.ButtonType + "");
                           $("div.filter-data-popup[filter-data-type='" + obj.FilterType + "']").parent(".filter-menu").find(".selected-filter").html(v.Text);
                           if(i>0)
                               $("div.filter-data-popup[filter-data-type='" + obj.FilterType + "']").parent(".filter-menu").find(".selected-filter").html("Multiple");
                       })
                   }
               })
           
               $(".submitDiv").click();
           }, 0, false);
       }
       else {
           //$(".defaltdataloding").show();
           CheckForDefaultSelection($http);
           localStorage.removeItem("BrandFitEntity");
          // HideLoader();
       }
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

app.controller('rightPanelCtrl', ['$scope', '$http', '$q', '$rootScope', '$timeout', 'cblService', function ($scope, $http, $q, $rootScope, $timeout, cblService) {
    $scope.tableHeader = [];
    $scope.tableLeftBody = [];
    $scope.tableRightBody = [];
    $rootScope.$on("buildTableHeader", function (event, data) {
        $scope.buildTableHeader(data);
    });
    $rootScope.$on("buildTableLeftBody", function (event, data) {
        $scope.buildTableLeftBody(data);
    });
    $rootScope.$on("buildTableRightBody", function (event, data) {
       
        $scope.buildTableRightBody(data);
    });
    $scope.RedirectToDeepDive5W = function (url, DM, DMName, CBy, CByName, Volume, Share, FitScore,Measure,Share_Index) {
        RedirectToDeepDive5W(url, DM, DMName, CBy, CByName, Volume, Share, FitScore, Measure, Share_Index);
    }
    $scope.buildTableHeader = function (data) {
        $scope.tableHeader = data;
    }
    $scope.buildTableLeftBody = function (data) {
        $scope.tableLeftBody = data;
    }
    $scope.buildTableRightBody = function (data) {
        $scope.tableRightBody = data;
    }
    $scope.updateData = function (name) {
        selectedScoreName = name;
        $scope.buildTableRightBody(BrandFitData);
    }
    $scope.setValue = function (value) {
        return setValue(value);
    }
    $scope.setRowData = function (dataRow) {
       if (selectedScoreName == "NONE")
        return "";
        else if (dataRow.IsLowSample == 1)
            return "LS";
        else if (selectedScoreName == "VOL. CONTR TO BRAND")
            return setValue(dataRow.Vol_Cont_Volume)+"%";
        else if (selectedScoreName == "SHARE OF BRAND")
            return setValue(dataRow.Share_DM_Volume)+"%";
        else if (selectedScoreName == "FIT SCORE")
            return cblService.setValue(dataRow.Fit_Score_Volume, 0);
        
        
    }
    //$scope.setValue = function (value, decimalPoints) {
    //    return cblService.setValue(value, decimalPoints);
    //}
    $scope.setIndexColor = function (dataRow) {
        var value = 0;
        var index = 0;
        //if (selectedScoreName == "VOL. CONTR TO BRAND")
        //{
        //    value = dataRow.Vol_Cont_Volume;
        //    index = dataRow.Share_Index;
        //}
        //else if (selectedScoreName == "SHARED OF BRAND")
        //{
        //    value = dataRow.Share_DM_Volume;
        //    index = dataRow.Share_Index;
        //}
        //else if (selectedScoreName == "FIT SCORE")
        //{
           value = dataRow.Fit_Score_Volume;
            index = dataRow.Share_Index; 
        //}
        //else if (selectedScoreName == "NONE")
        //{         
        //    index = dataRow.Share_Index;
        //}

        var bgColor = "white";
        if ((value != null && value != undefined && value != '' && value != 'NA') && (index != null && index != undefined && index != '' && index != 'NA') && dataRow.IsLowSample!=1)
        {
            if(value > 50 && index > 120)
                bgColor = "#9DBD96";
            if (value > 50 && index < 120)
                bgColor = "#FEC84F";
            if (value < 50 && index > 120)
                bgColor = "#DDDDDD";
            if (value < 50 && index < 120)
                bgColor = "#FFFFFF";
        }
        return bgColor;
    }
}]);
app.controller('onSubmitCtrl', ['$scope', '$http', '$q', '$rootScope', '$timeout', function ($scope, $http, $q, $rootScope, $timeout) {
    $scope.getOnSubmitData = function () {
        //Hide top Menu
        hide_leftMenuSow(null);

        //sessionStorage.setItem('OpportunitySpace', BrandFitData.DrinkingMoments.Name + ":" + BrandFitData.CompareBy.Name);

        //**********load selected filters**************
        var CBL_SelectionEntity = {};
        //********object members initialization************
        CBL_SelectionEntity.Market = { Id: '', Name: '' };
        CBL_SelectionEntity.Wave = { Id: '', Name: '' };
        CBL_SelectionEntity.DrinkingMoments = { Id: '', Name: '' };
        CBL_SelectionEntity.FitBasis = { Id: '', Name: '' };
        CBL_SelectionEntity.Benchmark = { Id: '', Name: '' };
        CBL_SelectionEntity.CompareBy = [];
        CBL_SelectionEntity.BrandsCategory = { Id: '', Name: '' };
        CBL_SelectionEntity.AdvancedFilters = [];


       
            Markets_Data = GetFilter(AQ.CBL.Filters.Markets);
            Wave_Data = GetFilter(AQ.CBL.Filters.Wave);
            DrinkingMoments_Data = GetFilter(AQ.CBL.Filters.DrinkingMoments);
            BrandsCategory_Data = GetFilter(AQ.CBL.Filters.BrandsCategory);
            FitBasis_Data = GetFilter(AQ.CBL.Filters.FitBasis);
            CompareBy_Data = GetFilter(AQ.CBL.Filters.CompareBy);
            Benchmark_Data = GetFilter(AQ.CBL.Filters.Benchmark);
            AdvancedFilters_Data = GetFilter(AQ.CBL.Filters.AdvancedFilters);

          
            if (Markets_Data == null || Wave_Data == null || DrinkingMoments_Data == null || FitBasis_Data == null || Benchmark_Data == null || CompareBy_Data == null || Markets_Data.Data == null || Wave_Data.Data == null || DrinkingMoments_Data.Data == null || FitBasis_Data.Data == null || Benchmark_Data.Data == null || CompareBy_Data.Data == null) {
                showAlertBox("Please complete all selections.");
                return;
            }
            if ((BrandsCategory_Data == null || BrandsCategory_Data.Data == null) && $($(".data-row[filter-text='" + filterSelectionList[4].Data[0].ParentText + "']")[0]).attr('parent-filter-name') == "Who") {
                showAlertBox("Please complete all selections.");
                return;
            }
            $("#current-wave").text(Wave_Data.Data.Text + " |");
            $("#previous-wave").text("NA");

            if ($(".data-row[filter-data-type='Wave'][market-name='" + filterSelectionList[0].Data.Text + "'][wave='" + filterSelectionList[1].Data.Text + "']").next().attr('market-name') == filterSelectionList[0].Data.Text)
                $("#previous-wave").text($(".data-row[filter-data-type='Wave'][market-name='" + filterSelectionList[0].Data.Text + "'][wave='" + filterSelectionList[1].Data.Text + "']").next().attr('filter-text'));
            else
                $("#previous-wave").text("NA");

            //if (Markets_Data.Data == null || Markets_Data.Data.length == 0) {
            //    filterSelectionList = {};
            //    clearAll();
            //    $(".selected-filter").text("None");
            //    HideLoader();
            //    return;
            //}
          
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
                if (BrandsCategory_Data.Data != null) {
                    CBL_SelectionEntity.BrandsCategory.Id = BrandsCategory_Data.Data.Id;
                    CBL_SelectionEntity.BrandsCategory.Name = BrandsCategory_Data.Data.Text;
                }
                if (FitBasis_Data.Data != null) {
                    CBL_SelectionEntity.FitBasis.Id = FitBasis_Data.Data.Id;
                    CBL_SelectionEntity.FitBasis.Name = FitBasis_Data.Data.Text;
                }
                if (Benchmark_Data.Data != null) {
                    CBL_SelectionEntity.Benchmark.Id = Benchmark_Data.Data.Id;
                    CBL_SelectionEntity.Benchmark.Name = Benchmark_Data.Data.Text;
                }
                if (CompareBy_Data.Data != null) {

                    $(CompareBy_Data.Data).each(function (indx, obj) {
                        CBL_SelectionEntity.CompareBy.push({ Id: obj.Id, Name: obj.Text });
                    });
                    if (pageId == 3) {
                        if ($($(".data-row[filter-text='" + filterSelectionList[4].Data[0].ParentText + "']")[0]).attr('parent-filter-name') != "Who" && $($(".data-row[filter-text='" + filterSelectionList[4].Data[0].ParentText + "']")[0]).attr('parent-filter-name').toLowerCase() != "demographics")
                            removeBrandOrCategery(true);
                        else
                            removeBrandOrCategery(false);
                    }
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
            url: AQ.CBL.BaseUrl + "/BrandFitAnalysis/GetAnalysisData",
            method: AQ.CBL.Http.Type.POST,
            data: { 'CBL_SelectionEntity': CBL_SelectionEntity, 'filterSelectionList': JSON.stringify({ "filterSelectionList": filterSelectionList }), overwirtemenu :checkOverwriteornot() }
        })
    .then(function (response) {
        if (OnSessionExpired(response))
            return false;

        submitflag = true;

        if (response.data.BrandFitCompareByEntityList != [] && response.data.BrandFitCompareByEntityList.length != 0) {
            var max = 0;
            response.data.BrandFitCompareByEntityList.forEach(function (item, index) { max = item.BrandFitEntityList.length < response.data.BrandFitCompareByEntityList[max].BrandFitEntityList.length ? max : index });
            response.data.BrandFitCompareByEntityList[0].Title = "Deep dive to compare " + ((FitBasis_Data == null || FitBasis_Data == undefined) ? "." : FitBasis_Data.Data.Text);
            $rootScope.$emit("buildTableHeader", response.data.BrandFitCompareByEntityList[max].BrandFitEntityList);
        }
        $rootScope.$emit("buildTableLeftBody", response.data.BrandFitCompareByEntityList);
        $rootScope.$emit("buildTableRightBody", response.data.BrandFitCompareByEntityList);
        BrandFitData = response.data.BrandFitCompareByEntityList;
        //$(".data-icon-search-container").attr("title", "Deep dive to compare " + ((FitBasis_Data == null || FitBasis_Data == undefined)?"." : FitBasis_Data.Data.Text))
        $(".rightBody").show();
        $(".footer").show();
        HideLoader();
    },
    function (error) {
        //alert(error);
        submitflag = false;
        HideLoader();
        $(".rightBody").hide();
    });
    }
}]);
$(document).ready(function () {
    $(".index-div").hide();
    $("#AdvancedAnalyticsMenu").addClass("selected-menu");
    $("#FiveWProfileMenu").hide();
    $("#DrinkingMomentsMenu").hide();
    $("#BrandFitToolMenu").show();
    $("#BrandFitToolMenu").addClass("selected-sub-menu");
    $("#BrandFitToolMenu .sub-menu-img").removeClass("InactiveBrandFitToolMenuImg").addClass("ActiveBrandFitToolMenuImg");
    $("#BrandFitToolMenu .sub-menu-arrow").removeClass("inactiveArrow").addClass("activeArrow");
    $(".ClearAllM").attr("style", "margin-top:-0.5vw!important;");
    SetScroll($(".right-table-body"), right_scroll_bgcolor, 0, -15, 0, -13, 5);
    localStorage.setItem('pageName', 'BrandFitAnalysisMenu')
    //$(".exportExcelContainer").css('pointer-events', 'none');
    //$(".exportPPTContainer").css('pointer-events', 'none');
    $(document).on("click", ".menu-option", function () {
        $(".header-selection-container .menu-button").removeClass("active-menu-button").addClass("inactive-menu-button");
        $(this).find(".menu-button").removeClass("inactive-menu-button").addClass("active-menu-button");
    });
    //if (localStorage.getItem("BrandFitEntity") != null && localStorage.getItem("BrandFitEntity") != "") {
       
    //    $(".submitDiv").click();
    //}
});
function reposVertical(e) {   
    $(".left-body-scroll-wrapper").scrollTop(e.scrollTop);
    $(".right-table-body").scrollTop(e.scrollTop);

    $(".right-table-header").scrollLeft(e.scrollLeft);
    $(".right-table-body").scrollLeft(e.scrollLeft);
}

function RedirectToDeepDive5W(url, DM, DMName, CBy, CByName,Volume,Share,FitScore,Measure, Share_Index)
{
    var BrandFitEntity = {};
    Markets_Data = GetFilter(AQ.CBL.Filters.Markets);
    Wave_Data = GetFilter(AQ.CBL.Filters.Wave);
    DrinkingMoments_Data = GetFilter(AQ.CBL.Filters.DrinkingMoments);
    BrandsCategory_Data = GetFilter(AQ.CBL.Filters.BrandsCategory);
    FitBasis_Data = GetFilter(AQ.CBL.Filters.FitBasis);
    Benchmark_Data = GetFilter(AQ.CBL.Filters.Benchmark);
    CompareBy_Data = GetFilter(AQ.CBL.Filters.CompareBy);
    AdvancedFilters_Data = GetFilter(AQ.CBL.Filters.AdvancedFilters);
    
    BrandFitEntity.Market = { Id: '', Name: '' };
    BrandFitEntity.Wave = { Id: '', Name: '' };
    BrandFitEntity.DrinkingMoments = { Id: '', Name: '' };
    BrandFitEntity.FitBasis = { Id: '', Name: '' };
    BrandFitEntity.Benchmark = { Id: '', Name: '' };
    BrandFitEntity.CompareBy = { Id: '', Name: '' };
    BrandFitEntity.BrandsCategory = { Id: '', Name: '' };
    BrandFitEntity.DrinkingMomentsGlobal = { Id: '', Name: '' };
    BrandFitEntity.CompareByGlobal = [];
    BrandFitEntity.AdvancedFilters = [];
    BrandFitEntity.Volume = "";
    BrandFitEntity.Share = "";
    BrandFitEntity.FitScore = "";
    BrandFitEntity.Measure = "";

    if (Markets_Data.Data != null) {
        BrandFitEntity.Market.Id = Markets_Data.Data.Id;
        BrandFitEntity.Market.Name = Markets_Data.Data.Text;
        $(".selected-market").html(Markets_Data.Data.Text.toUpperCase());
    }
    if (Wave_Data.Data != null) {
        BrandFitEntity.Wave.Id = Wave_Data.Data.Id;
        BrandFitEntity.Wave.Name = Wave_Data.Data.Text;
    }
    if (DrinkingMoments_Data.Data != null) {
        BrandFitEntity.DrinkingMomentsGlobal.Id = DrinkingMoments_Data.Data.Id;
        BrandFitEntity.DrinkingMomentsGlobal.Name = DrinkingMoments_Data.Data.Text;
    }
    BrandFitEntity.DrinkingMoments.Id = DM;
    BrandFitEntity.DrinkingMoments.Name = DMName;

    sessionStorage.setItem('OpportunitySpace', DMName + ":" + DM);

    if (BrandsCategory_Data.Data != null) {
        BrandFitEntity.BrandsCategory.Id = BrandsCategory_Data.Data.Id;
        BrandFitEntity.BrandsCategory.Name = BrandsCategory_Data.Data.Text;
    }
    else {
        BrandFitEntity.BrandsCategory.Id = "";
        BrandFitEntity.BrandsCategory.Name = "";
    }
    if (FitBasis_Data.Data != null) {
        BrandFitEntity.FitBasis.Id = FitBasis_Data.Data.Id;
        BrandFitEntity.FitBasis.Name = FitBasis_Data.Data.Text;
    }
    if (Benchmark_Data.Data != null) {
        BrandFitEntity.Benchmark.Id = Benchmark_Data.Data.Id;
        BrandFitEntity.Benchmark.Name = Benchmark_Data.Data.Text;
    }
    if (CompareBy_Data.Data != null) {
        $(CompareBy_Data.Data).each(function (indx, obj) {
            BrandFitEntity.CompareByGlobal.push({ Id: obj.Id, Name: obj.Text, ParentText:obj.ParentText });
        });
    }
    BrandFitEntity.CompareBy.Id = CBy;
    BrandFitEntity.CompareBy.Name = CByName;
    if (AdvancedFilters_Data.Data != null) {
        $(AdvancedFilters_Data.Data).each(function (indx, obj) {
            BrandFitEntity.AdvancedFilters.push({ Id: obj.Id, Name: obj.Text, ParentText: obj.ParentText });
        });
    }
    BrandFitEntity.Volume = Volume;
    BrandFitEntity.Share = Share;
    BrandFitEntity.FitScore = FitScore;
    BrandFitEntity.Measure = Measure;
    
    localStorage.setItem("BrandFitEntity", JSON.stringify(BrandFitEntity));
    //localStorage.setItem("filterSelectionList", JSON.stringify(JSON.parse(filterSelectionList)));
    //Temporary Storing left panel data

    sessionStorage.setItem('CompareDeepDive', CByName)
    sessionStorage.setItem('filterSelectionList', JSON.stringify(convertIntoCorrectJSON(filterSelectionList)));

    sessionStorage.setItem('Recommendation1', JSON.stringify(Math.round(parseFloat((BrandFitEntity.FitScore)))))
    sessionStorage.setItem('Recommendation2', JSON.stringify(Math.round(parseFloat((Share_Index)))))

    window.location.href = url;

}

function convertIntoCorrectJSON(data) {
    var temp_data = JSON.parse(JSON.stringify(data));
    data.forEach(function (d, i) {
        temp_data[i].Data = {};
        if (d.Data != null) {
            Object.keys(d.Data).forEach(function (e, j) {
                temp_data[i].Data[e] = d.Data[e];
            });
        }
    });
    return temp_data;
}

function BrandFitPPTExport() {
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
            request.pageName = 'BrandFitAnalysisMenu';

            var CBL_SelectionEntity = {};
            //********object members initialization************
            CBL_SelectionEntity.Market = { Id: '', Name: '' };
            CBL_SelectionEntity.Wave = { Id: '', Name: '' };
            CBL_SelectionEntity.DrinkingMoments = { Id: '', Name: '' };
            CBL_SelectionEntity.FitBasis = { Id: '', Name: '' };
            CBL_SelectionEntity.Benchmark = { Id: '', Name: '' };
            CBL_SelectionEntity.CompareBy = [];
            CBL_SelectionEntity.BrandsCategory = { Id: '', Name: '' };
            CBL_SelectionEntity.AdvancedFilters = [];



            Markets_Data = GetFilter(AQ.CBL.Filters.Markets);
            Wave_Data = GetFilter(AQ.CBL.Filters.Wave);
            DrinkingMoments_Data = GetFilter(AQ.CBL.Filters.DrinkingMoments);
            BrandsCategory_Data = GetFilter(AQ.CBL.Filters.BrandsCategory);
            FitBasis_Data = GetFilter(AQ.CBL.Filters.FitBasis);
            CompareBy_Data = GetFilter(AQ.CBL.Filters.CompareBy);
            Benchmark_Data = GetFilter(AQ.CBL.Filters.Benchmark);
            AdvancedFilters_Data = GetFilter(AQ.CBL.Filters.AdvancedFilters);


            if (Markets_Data == null || Wave_Data == null || DrinkingMoments_Data == null || FitBasis_Data == null || Benchmark_Data == null || CompareBy_Data == null || Markets_Data.Data == null || Wave_Data.Data == null || DrinkingMoments_Data.Data == null || FitBasis_Data.Data == null || Benchmark_Data.Data == null || CompareBy_Data.Data == null) {
                showAlertBox("Please complete all selections.");
                return;
            }
            if ((BrandsCategory_Data == null || BrandsCategory_Data.Data == null) && $($(".data-row[filter-text='" + filterSelectionList[4].Data[0].ParentText + "']")[0]).attr('parent-filter-name') == "Who") {
                showAlertBox("Please complete all selections.");
                return;
            }
           

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
                if (BrandsCategory_Data.Data != null) {
                    CBL_SelectionEntity.BrandsCategory.Id = BrandsCategory_Data.Data.Id;
                    CBL_SelectionEntity.BrandsCategory.Name = BrandsCategory_Data.Data.Text;
                }
                if (FitBasis_Data.Data != null) {
                    CBL_SelectionEntity.FitBasis.Id = FitBasis_Data.Data.Id;
                    CBL_SelectionEntity.FitBasis.Name = FitBasis_Data.Data.Text;
                }
                if (Benchmark_Data.Data != null) {
                    CBL_SelectionEntity.Benchmark.Id = Benchmark_Data.Data.Id;
                    CBL_SelectionEntity.Benchmark.Name = Benchmark_Data.Data.Text;
                }
                if (CompareBy_Data.Data != null) {

                    $(CompareBy_Data.Data).each(function (indx, obj) {
                        CBL_SelectionEntity.CompareBy.push({ Id: obj.Id, Name: obj.Text });
                    });
                }
                if (AdvancedFilters_Data.Data != null) {
                    $(AdvancedFilters_Data.Data).each(function (indx, obj) {
                        CBL_SelectionEntity.AdvancedFilters.push({ Id: obj.Id, Name: obj.Text });
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

function BrandFitExcelExport() {
    var CBL_SelectionEntity = {};
    //********object members initialization************
    CBL_SelectionEntity.Market = { Id: '', Name: '' };
    CBL_SelectionEntity.Wave = { Id: '', Name: '' };
    CBL_SelectionEntity.DrinkingMoments = { Id: '', Name: '' };
    CBL_SelectionEntity.FitBasis = { Id: '', Name: '' };
    CBL_SelectionEntity.Benchmark = { Id: '', Name: '' };
    CBL_SelectionEntity.CompareBy = [];
    CBL_SelectionEntity.BrandsCategory = { Id: '', Name: '' };
    CBL_SelectionEntity.AdvancedFilters = [];
    CBL_SelectionEntity.pageName = "BrandFitAnalysisMenu";



    Markets_Data = GetFilter(AQ.CBL.Filters.Markets);
    Wave_Data = GetFilter(AQ.CBL.Filters.Wave);
    DrinkingMoments_Data = GetFilter(AQ.CBL.Filters.DrinkingMoments);
    BrandsCategory_Data = GetFilter(AQ.CBL.Filters.BrandsCategory);
    FitBasis_Data = GetFilter(AQ.CBL.Filters.FitBasis);
    CompareBy_Data = GetFilter(AQ.CBL.Filters.CompareBy);
    Benchmark_Data = GetFilter(AQ.CBL.Filters.Benchmark);
    AdvancedFilters_Data = GetFilter(AQ.CBL.Filters.AdvancedFilters);


    if (Markets_Data == null || Wave_Data == null || DrinkingMoments_Data == null || FitBasis_Data == null || Benchmark_Data == null || CompareBy_Data == null || Markets_Data.Data == null || Wave_Data.Data == null || DrinkingMoments_Data.Data == null || FitBasis_Data.Data == null || Benchmark_Data.Data == null || CompareBy_Data.Data == null) {
        showAlertBox("Please complete all selections.");
        return;
    }
    if ((BrandsCategory_Data == null || BrandsCategory_Data.Data == null) && $($(".data-row[filter-text='" + filterSelectionList[4].Data[0].ParentText + "']")[0]).attr('parent-filter-name') == "Who") {
        showAlertBox("Please complete all selections.");
        return;
    }
   
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
        if (BrandsCategory_Data.Data != null) {
            CBL_SelectionEntity.BrandsCategory.Id = BrandsCategory_Data.Data.Id;
            CBL_SelectionEntity.BrandsCategory.Name = BrandsCategory_Data.Data.Text;
        }
        if (FitBasis_Data.Data != null) {
            CBL_SelectionEntity.FitBasis.Id = FitBasis_Data.Data.Id;
            CBL_SelectionEntity.FitBasis.Name = FitBasis_Data.Data.Text;
        }
        if (Benchmark_Data.Data != null) {
            CBL_SelectionEntity.Benchmark.Id = Benchmark_Data.Data.Id;
            CBL_SelectionEntity.Benchmark.Name = Benchmark_Data.Data.Text;
        }
        if (CompareBy_Data.Data != null) {

            $(CompareBy_Data.Data).each(function (indx, obj) {
                CBL_SelectionEntity.CompareBy.push({ Id: obj.Id, Name: obj.Text });
            });
        }
        if (AdvancedFilters_Data.Data != null) {
            $(AdvancedFilters_Data.Data).each(function (indx, obj) {
                CBL_SelectionEntity.AdvancedFilters.push({ Id: obj.Id, Name: obj.Text });
            });
        }

    }

    //**********send http request***************
    ShowLoader();

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
function CheckForDefaultSelection($http) {
    $http({
        url: AQ.CBL.BaseUrl + "/Common/GetDefaultSelectionsForUser",
        method: "POST",
        data: { 'View': 'AA' }
    })
   .then(function (response) {
       if (response.data == null || response.data == "null" || response.data == "")
       {//      $(".defaltdataloding").hide();
           //HideLoader(); $(".showMenu").toggle("pulsate"); return;
           DefaultSelections();
       }
       var data = JSON.parse(JSON.parse(response.data))
       filterSelectionList = data.filterSelectionList
       //localStorage.setItem("BrandFitEntity", JSON.stringify(data.BrandFitEntity));
       upDateLeftpanel();
       //$(".defaltdataloding").hide();
       angular.element($(".submitDiv")).scope().getOnSubmitData();
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
                } else if (obj.Data.length == 1)
                {
                    var selecter = obj.PopupElementSelector;
                    $(selecter).find("[data-id =" + obj.Data[0].Id + "]").addClass("active-checkbox");
                    $(".filter-menu[data-name='" + obj.FilterType + "']").find(".filter-header").find(".selected-filter").html(obj.Data[0].Text);//Single
                }else
                {
                    $(".filter-menu[data-name='" + obj.FilterType + "']").find(".filter-header").find(".selected-filter").html("None");//Single
                    console.log(obj.Data.Text);
                }
            }
        }
    });

}
function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
function checkOverwriteornot() {
    
    try {
        var overwrt = getUrlVars();
        if (overwrt.frmFW != undefined && overwrt.frmFW != null && overwrt.frmFW == "1" && fromFW == true) {
           
                //--whenever redirecting from 5W then query string value will add but after that user change menu then that need to save ,So ignoring later part
                fromFW = false;
                return false;            
        }
        else return true;

    } catch (er)
    {
        console.log(er);
        return false;
    }
    return true;
}
function showInfoPopUp() {
    var popup = document.getElementById("InfoPopup");
    popup.classList.toggle("show");
}
function appendClearAll() {
    $(".filter-menu[data-name='Compare By']").find(".ClearAllItem").parent().parent().append("<div class='ClearAll' onclick='ClearItem(4,event) '>Clear Tab</div>");
    $(".filter-menu[data-name='Brands/Category']").find(".ClearAllItem").parent().parent().append("<div class='ClearAll' onclick='ClearItem(5,event) '>Clear Tab</div>");   
    $(".filter-menu[data-name='Advanced Filters']").find(".ClearAllItem").parent().parent().append("<div class='ClearAll' onclick='ClearItem(7,event) '>Clear Tab</div>");
}
