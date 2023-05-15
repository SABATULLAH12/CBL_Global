/// <reference path="../CBL/Global.js" />
/// <reference path="../CBL/Master.js" />
var BrandFitData = {};

app.controller('leftPanelCtrl', function ($scope, $http, $q) {

});
app.controller('rightPanelCtrl', ['$scope', '$http', '$q', '$rootScope', '$timeout', 'cblService', function ($scope, $http, $q, $rootScope, $timeout, cblService) {
    var widgetData = {};
    widgetData.categoryList = [{ Name: "JUICE", Volume: 10 }, { Name: "MILK", Volume: 07 }, { Name: "TEA", Volume: 06 }];
    widgetData.brandList = [{ Name: "COCA COLA" }, { Name: "FUSETEA" }, { Name: "TROPICANA" }];
    $scope.CategoryBrandList = [];
    $scope.RFDList = [];
    $scope.Brand = [];
    $scope.DM = [];
    $rootScope.$on("setCategoryBrandData", function (event, data) {
        $scope.setCategoryBrandData(data);
    });
    $rootScope.$on("setRFDData", function (event, data) {
        $scope.setRFDData(data);
    });
    $rootScope.$on("setSelections", function (event, data) {
        $scope.setSelections(data);
    });
    $scope.setCategoryBrandData = function (data) {
        $scope.CategoryBrandList = data;
    };
    $scope.setRFDData = function (data) {
        $scope.RFDList = data;
    };
    $scope.setValue = function (value) {

        return cblService.setValue(value, 0);
    };
    $scope.setSelections = function (value) {
        $(".title-wraper span").text("Top 5 " + BrandFitData.FitBasis.Name + " in this moment");

        $scope.DM.push(BrandFitData.DrinkingMoments.Name + " - " + BrandFitData.CompareBy.Name)
        if (BrandFitData.BrandsCategory.Name == "") {
            $scope.DM = [];
            BrandFitData.BrandsCategory.Name = BrandFitData.CompareBy.Name
            $scope.DM.push(BrandFitData.DrinkingMoments.Name)
        }
        $(".bottom-title").text("Top 5 " + BrandFitData.FitBasis.Name + " : " + BrandFitData.BrandsCategory.Name);
        $scope.Brand.push(BrandFitData.BrandsCategory.Name);
        $timeout(function () {
            var chartData = [];
            $(".Share span").text(cblService.setValue(BrandFitData.Share) + "%");
            chartData.push(cblService.setValue(BrandFitData.Share));
            chartData.push(100 - cblService.setValue(BrandFitData.Share));
            createArcChart("Share", 24, chartData);
            $(".Volume span").text(cblService.setValue(BrandFitData.Volume) + "%");
            var chartData = [];
            chartData.push(cblService.setValue(BrandFitData.Volume));
            chartData.push(100 - cblService.setValue(BrandFitData.Volume));
            createArcChart("Volume", 24, chartData);
            $(".Fit span").text(cblService.setValue(BrandFitData.FitScore));
            var chartData = [];
            chartData.push(cblService.setValue(BrandFitData.FitScore));
            chartData.push(100 - cblService.setValue(BrandFitData.FitScore));
            createArcChart("Fit", 24, chartData);
        }, 0, false);

    };
    $scope.setCategoryIcon = function (icon) {
        var icon = icon.replace("/", "-").split(" ").join("");
        return icon;
    };

    $scope.setStrategyColor = function () {
        var value = sessionStorage.getItem('Recommendation1');
        var index = sessionStorage.getItem('Recommendation2');

        var bgColor = "white";
        if ((value != null && value != undefined && value != '' && value != 'NA') && (index != null && index != undefined && index != '' && index != 'NA')) {
            if (value > 50 && index > 120)
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

    $scope.setStrategyName = function () {
        var value = sessionStorage.getItem('Recommendation1');
        var index = sessionStorage.getItem('Recommendation2');

        var name = "";
        if ((value != null && value != undefined && value != '' && value != 'NA') && (index != null && index != undefined && index != '' && index != 'NA')) {
            if (value > 50 && index > 120)
                name = "Defend";
            if (value > 50 && index < 120)
                name = "Expand";
            if (value < 50 && index > 120)
                name = "Reshape";
            if (value < 50 && index < 120)
                name = "Reconsider";
        }
        return name;
    }
}]);

app.controller('onSubmitCtrl', ['$scope', '$http', '$q', '$rootScope', '$timeout', function ($scope, $http, $q, $rootScope, $timeout) {
    $scope.getOnSubmitData = function () {
        //**********load selected filters**************
        var CBL_SelectionEntity = {};

        //********object members initialization************
        CBL_SelectionEntity.Market = { Id: '', Name: '' };
        CBL_SelectionEntity.Wave = { Id: '', Name: '' };
        CBL_SelectionEntity.DrinkingMoments = { Id: '', Name: '' };
        CBL_SelectionEntity.FitBasis = { Id: '', Name: '' };
        CBL_SelectionEntity.Benchmark = { Id: '', Name: '' };
        CBL_SelectionEntity.CompareDeepDive = { Id: '', Name: '' };
        CBL_SelectionEntity.BrandsCategory = { Id: '', Name: '' };
        CBL_SelectionEntity.AdvancedFilters = [];

        BrandFitData = JSON.parse(localStorage.getItem("BrandFitEntity"));
        //**********asign filter values***************


        CBL_SelectionEntity.Market.Id = BrandFitData.Market.Id;
        CBL_SelectionEntity.Market.Name = BrandFitData.Market.Name;

        CBL_SelectionEntity.Wave.Id = BrandFitData.Wave.Id;
        CBL_SelectionEntity.Wave.Name = BrandFitData.Wave.Name;


        CBL_SelectionEntity.DrinkingMoments.Id = BrandFitData.DrinkingMoments.Id;
        CBL_SelectionEntity.DrinkingMoments.Name = BrandFitData.DrinkingMoments.Name;


        CBL_SelectionEntity.BrandsCategory.Id = BrandFitData.BrandsCategory.Id;
        CBL_SelectionEntity.BrandsCategory.Name = BrandFitData.BrandsCategory.Name;


        CBL_SelectionEntity.FitBasis.Id = BrandFitData.FitBasis.Id;
        CBL_SelectionEntity.FitBasis.Name = BrandFitData.FitBasis.Name;

        CBL_SelectionEntity.Benchmark.Id = BrandFitData.Benchmark.Id;
        CBL_SelectionEntity.Benchmark.Name = BrandFitData.Benchmark.Name;

        CBL_SelectionEntity.CompareDeepDive.Id = BrandFitData.CompareBy.Id;
        CBL_SelectionEntity.CompareDeepDive.Name = BrandFitData.CompareBy.Name;


        if (BrandFitData.AdvancedFilters != null) {
            $(BrandFitData.AdvancedFilters).each(function (indx, obj) {
                CBL_SelectionEntity.AdvancedFilters.push({ Id: obj.Id, Name: obj.Name });
            });
        }
        $("#current-wave").text(CBL_SelectionEntity.Wave.Name + " |");
        $(".previous-wave").hide();
        $("#previous-wave").text("Top 5 RFD’s / PC's based on Volume");
        //**********send http request***************
        ShowLoader();
        //$(".left-panel-Icon").trigger("click");
        $http({
            url: AQ.CBL.BaseUrl + "/BrandFitAnalysis/GetDeepDiveData",
            method: AQ.CBL.Http.Type.POST,
            data: { 'CBL_SelectionEntity': CBL_SelectionEntity }
        })
    .then(function (response) {
        if (OnSessionExpired(response))
            return false;
        widgetData = response.data;
        if (widgetData == null) {
            HideLoader();

            return false;
            showAlertBox("Data Not Available");
        }

        submitflag = true;
        $(".rightBody").show();
        $(".footer").show();
        $rootScope.$emit("setCategoryBrandData", widgetData.RFDWidgetsData);
        $rootScope.$emit("setRFDData", widgetData.Reasons);
        $rootScope.$emit("setSelections", BrandFitData)
        HideLoader();
    },
    function (error) {
        //alert(error);
        HideLoader();
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
    $(".left-panel-Icon").css('display', 'none');
    $(".selection-summary-Div").css('display', 'none');
    $(".export-div").css('height', 'calc(100% - 110px)')
    localStorage.setItem('pageName', 'BrandFitDeepDiveMenu');
    $(".submitDiv").click();
});

function RedirectToBrandFit(url) {
    window.location.href = url;
}
function createArcChart(container, outerR, data) {
    var height = $("." + container).height();
    var width = $("." + container).width();
    var vis = d3.select("." + container).append("svg").attr("preserveAspectRatio", "xMidYMid meet").attr("viewbox", "0 0 " + width + " " + height + "").attr("height", "100%").attr("width", "100%")
    var arc = d3.svg.arc()
        .innerRadius(outerR - 5)
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
      .range(["rgb(220, 20, 60)", "transparent"]);
    var color = ["rgb(220, 20, 60)", "transparent"];
    var pie = d3.layout.pie()
      .sort(null)
      .value(function (d) {
          return d;
      });

    g.selectAll(".arc")
      .data(pie(data))
      .enter()
      .append("path")
      .attr("class", function (d, i) { return i != 0 ? "arc" : "arc crimson_arc"; })
      .style("fill", function (d, i) {
          return color[i];
      })
      .attr("d", arc);
}

function BrandFitDDPPTExport() {
    var sContainer = $('.export-div');
    svgElements = $(sContainer).find('svg');
    $(".export-div").css('background', 'rgba(0, 0, 0, 1)');
    //$('.crimson_arc').css('fill', 'black');
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

        $(canvas).height(50);
        $(canvas).width(50);
        $(this).height(50);
        $(this).width(50);

        sContainer[0].appendChild(canvas);

        //convert SVG into a XML string
        xml = (new XMLSerializer()).serializeToString(this);

        // Removing the name space as IE throws an error
        xml = xml.replace(/xmlns=\"http:\/\/www\.w3\.org\/2000\/svg\"/, '');
        //console.log(xml);
        //xml = xml.replace(/xmlns:xlink=\"http:\/\/www\.w3\.org\/1999\/xlink\"/, '');
        xml = xml.replace(/xlink:href/g, '');

        //this.setAttribute('fill', style.getPropertyValue('fill'));
        //draw the SVG onto a canvas
        canvg(canvas, xml);
        //Adjust Canvas Height & Width

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
            request.pageName = 'BrandFitDeepDiveMenu';

            var CBL_SelectionEntity = {};
            //********object members initialization************
            CBL_SelectionEntity.Market = { Id: '', Name: '' };
            CBL_SelectionEntity.Wave = { Id: '', Name: '' };
            CBL_SelectionEntity.DrinkingMoments = { Id: '', Name: '' };
            CBL_SelectionEntity.FitBasis = { Id: '', Name: '' };
            CBL_SelectionEntity.Benchmark = { Id: '', Name: '' };
            CBL_SelectionEntity.CompareDeepDive = { Id: '', Name: '' };
            CBL_SelectionEntity.BrandsCategory = { Id: '', Name: '' };
            CBL_SelectionEntity.AdvancedFilters = [];

            //**********asign filter values***************
            BrandFitData = JSON.parse(localStorage.getItem("BrandFitEntity"));


            CBL_SelectionEntity.Market.Id = BrandFitData.Market.Id;
            CBL_SelectionEntity.Market.Name = BrandFitData.Market.Name;

            CBL_SelectionEntity.Wave.Id = BrandFitData.Wave.Id;
            CBL_SelectionEntity.Wave.Name = BrandFitData.Wave.Name;


            CBL_SelectionEntity.DrinkingMoments.Id = BrandFitData.DrinkingMoments.Id;
            CBL_SelectionEntity.DrinkingMoments.Name = BrandFitData.DrinkingMoments.Name;


            CBL_SelectionEntity.BrandsCategory.Id = BrandFitData.BrandsCategory.Id;
            CBL_SelectionEntity.BrandsCategory.Name = BrandFitData.BrandsCategory.Name;


            CBL_SelectionEntity.FitBasis.Id = BrandFitData.FitBasis.Id;
            CBL_SelectionEntity.FitBasis.Name = BrandFitData.FitBasis.Name;

            CBL_SelectionEntity.Benchmark.Id = BrandFitData.Benchmark.Id;
            CBL_SelectionEntity.Benchmark.Name = BrandFitData.Benchmark.Name;

            CBL_SelectionEntity.CompareDeepDive.Id = BrandFitData.CompareBy.Id;
            CBL_SelectionEntity.CompareDeepDive.Name = BrandFitData.CompareBy.Name;


            if (BrandFitData.AdvancedFilters != null) {
                $(BrandFitData.AdvancedFilters).each(function (indx, obj) {
                    CBL_SelectionEntity.AdvancedFilters.push({ Id: obj.Id, Name: obj.Name });
                });
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

function BrandFitDDExcelExport() {

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
    CBL_SelectionEntity.pageName = "BrandFitDeepDiveMenu";
    CBL_SelectionEntity.ExcelData = {};
   
    filterSelectionList = JSON.parse(sessionStorage.getItem('filterSelectionList'));

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
            CBL_SelectionEntity.DrinkingMoments.Id = BrandFitData['DrinkingMoments'].Id;
            CBL_SelectionEntity.DrinkingMoments.Name = BrandFitData['DrinkingMoments'].Name;
        }
        if (JSON.stringify(BrandsCategory_Data.Data) != '{}' && BrandsCategory_Data.Data != null) {
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
            Object.keys(CompareBy_Data.Data).forEach(function (d, i) {
                CBL_SelectionEntity.CompareBy.push({ Id: CompareBy_Data.Data[d].Id, Name: CompareBy_Data.Data[d].Text });
            });
        }
        if (AdvancedFilters_Data.Data != null) {
            Object.keys(AdvancedFilters_Data.Data).forEach(function (d, i) {
                CBL_SelectionEntity.AdvancedFilters.push({ Id: AdvancedFilters_Data.Data[d].Id, Name: AdvancedFilters_Data.Data[d].Text });
            });
        }
        var _compareDD = CBL_SelectionEntity.CompareBy.filter(function (d) { return (d.Name == sessionStorage.getItem('CompareDeepDive')); })
        CBL_SelectionEntity.CompareDeepDive = (_compareDD.length > 0 ? _compareDD[0] : null);
    }

    CBL_SelectionEntity.ExcelData.OpportunitySpace = sessionStorage.getItem('OpportunitySpace');
    CBL_SelectionEntity.ExcelData.Recommendation1 = sessionStorage.getItem('Recommendation1');
    CBL_SelectionEntity.ExcelData.Recommendation2 = sessionStorage.getItem('Recommendation2');

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