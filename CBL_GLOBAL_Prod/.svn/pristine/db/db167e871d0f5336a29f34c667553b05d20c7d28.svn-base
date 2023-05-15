/// <reference path="../jquery-1.10.2.min.js" />
/// <reference path="Master.js" />
var filterSelectionList = [];
var Markets_Data = null;
var Wave_Data = null;
var BrandsCategory_Data = null;
var FitBasis_Data = null;
var CompareBy_Data = null;
var DrinkingMoments_Data = null;
var Base_Data = null;
var Benchmark_Data = null;
var Measure_Data = null;
var AdvancedFilters_Data = null;
var htmlstring = "";
var filterDataType = "";
var selected_filter = "";
var buttonType = "";
var benchmarkValidation5W = [{ "Name": "Alcohol", "Text": ["Alcohol", "Category", "NA RTD", "NA NRTD"] },
    { "Name": "NA RTD", "Text": ["Alcohol", "Category", "NA RTD", "NA NRTD"] },
    { "Name": "NA NRTD", "Text": ["Alcohol", "Category", "NA RTD", "NA NRTD"] },
    { "Name": "Total Beverage", "Text": ["Alcohol", "Category", "NA RTD", "NA NRTD", "Total Commercial Beverages"] },
{ "Name": "Total Commercial Beverages", "Text": ["Alcohol", "Category", "NA RTD", "NA NRTD", "Total Commercial Beverages"] },
{ "Name": "Category", "Text": ["Category"] }]
var categoryValidation = "";
var brandsSelected = false
$(document).ready(function () {
    $(document).on("click", ".filter-menu", function (e) {
        if ($(this).attr("data-name") != "Markets") {

            if ($("#Markets-text").text() == "None") {
                showAlertBox("Please Select Market.");
                return;
            }
            else if ($("#Wave-text").text() == "None" && $(this).attr("data-name") != "Wave") {
                showAlertBox("Please Select Wave.");
                return;
            }
            else if ($(this).attr("data-name") == "Benchmark") {
                if (localStorage.getItem('pageName') == "DrinkingMomentsMenu" && $("#Base-text").text() == "None") {
                    showAlertBox("Please Select Base.");
                    return;
                }
                else if (localStorage.getItem('pageName') == "FiveWProfileMenu" && filterSelectionList[2].Data == null) {
                    showAlertBox("Please Select Brand/Category.");
                    return;
                }

            }
            else if ($(this).attr("data-name") == "Brands/Category" && localStorage.getItem('pageName') == "BrandFitAnalysisMenu") {
                if (filterSelectionList[4].Data == null) {
                    showAlertBox("Please Select Compare By.");
                    return;
                }
                if ($($(".data-row[filter-text='" + filterSelectionList[4].Data[0].ParentText + "']")[0]).attr('parent-filter-name') != "Who" && $($(".data-row[filter-text='" + filterSelectionList[4].Data[0].ParentText + "']")[0]).attr('parent-filter-name').toLowerCase() != "demographics") {
                    brandsSelected = true;
                    showAlertBox("Brands/Category already selected in Compare By.");
                    return;
                }
            }
        }

        $(".filter-data-popup").css("display", "none");
        $(".filter-level").css("display", "none");

        $(".filter-menu").removeClass("active-menu").addClass("inactive-menu");
        $(".filter-menu").find(".arrow").removeClass("active-arrow").addClass("inactive-arrow");
        $(".filter-menu").find(".filter-header-title").removeClass("active-menu-title").addClass("inactive-menu-title");
        $(".filter-menu").find(".filter-optional-title").removeClass("active-filter-optional-title").addClass("inactive-filter-optional-title");

        $(this).removeClass("inactive-menu").addClass("active-menu");
        $(this).children(".filter-arrow").find(".arrow").removeClass("inactive-arrow").addClass("active-arrow");
        $(this).children(".filter-header").find(".filter-header-title").removeClass("inactive-menu-title").addClass("active-menu-title");
        $(this).children(".filter-header").find(".filter-optional-title").removeClass("inactive-filter-optional-title").addClass("active-filter-optional-title");

        $(".filter-data-popup").css("height", ($(".leftBody").height() - 20) + "px");
        $(this).find(".filter-data-popup").css("top", ($(".leftBody").offset().top) + "px");

        $(this).find(".filter-data-popup").css("left", ($(".leftBody").offset().left) + "px");
        $(this).find(".filter-data-popup").css("left", (($(".leftBody").outerWidth() + $(".leftBody").offset().left)) + "px");
        if ($(this).attr("data-name") != "Markets") {
            $(".filter-data-popup[filter-data-type='" + $(this).attr("data-name") + "'] ul li").hide();
            if ($(this).attr("data-name") != "Wave")
                $(".filter-data-popup[filter-data-type='" + $(this).attr("data-name") + "'] ul li[market-name='" + filterSelectionList[0].Data.Text + "'][wave='" + filterSelectionList[1].Data.Text + "']").show()
            else
                $(".filter-data-popup[filter-data-type='" + $(this).attr("data-name") + "'] ul li[market-name='" + filterSelectionList[0].Data.Text + "']").show()
        }
        //Benchmark Validations

        if ($(this).attr("data-name") == "Benchmark") {
            categoryValidation = "";
            validateBenchmark(localStorage.getItem('pageName'), $(this).attr("data-name"));
        }
        $(this).find(".filter-data-popup").css("display", "block");

        if (localStorage.getItem('pageName') == "FiveWProfileMenu" && categoryValidation != "") {
            $(".filter-data-popup[filter-data-type='Benchmark'] .filter-level[level-id='1'] ul li:contains('Category - ')").hide();
            $(".filter-data-popup[filter-data-type='Benchmark'] .filter-level[level-id='1'] ul li[filter-text='Category - " + categoryValidation + "'][market-name='" + filterSelectionList[0].Data.Text + "'][wave='" + filterSelectionList[1].Data.Text + "']").show();
        }
        else if ($(this).attr("data-name") == "Benchmark" && filterSelectionList[2].Data.ParentText == "Category") {
            $(".filter-data-popup[filter-data-type='Benchmark'] .filter-level[level-id='1'] ul li:contains('Category - ')").hide();
        }
        $(this).find(".filter-level").eq(0).css("display", "block");
        SetScroll($(".filter-level"), left_scroll_bgcolor, 0, -4, 0, 0, 8);

        SearchFilter($(this));
       
        e.stopImmediatePropagation();
    });
    $(document).on("click", ".filter-data-popup", function (e) {
        e.stopImmediatePropagation();
    });

    $(document).click(function () {
        $(".settings-expand-div").hide();
        $("#settings-div").removeClass('active-settings').addClass("inactive-settings");
        $(".filter-menu").removeClass("active-menu").addClass("inactive-menu");
        $(".filter-data-popup").css("display", "none");
        $(".filter-menu").find(".filter-header-title").removeClass("active-menu-title").addClass("inactive-menu-title");
        $(".filter-menu").find(".filter-optional-title").removeClass("active-filter-optional-title").addClass("inactive-filter-optional-title");
        $(".filter-menu").find(".arrow").removeClass("active-arrow").addClass("inactive-arrow");
    });
    $(document).on("click", ".data-row", function (e) {
        buttonType = $(this).attr("button-type");

        filterDataType = $(this).attr("filter-data-type");
        selected_filter = $(this).find(".data-label").html();
        var parentFilterName = $(this).attr("parent-filter-name");
        var filterText = $(this).attr("filter-text");
        resetFilters();
        var totalLevelCount = parseInt($("div.filter-data-popup[filter-data-type='" + filterDataType + "']").attr("total-level-count"), 0);
        var currentLevel = parseInt($(this).parent("ul").parent(".filter-level").attr("level-id"), 0);

        for (var level = (currentLevel + 1) ; level <= totalLevelCount; level++) {
            $("div.filter-data-popup[filter-data-type='" + filterDataType + "'] div.filter-level[level-id='" + level + "']").css("display", "none");
            if (buttonType == "menu") {
                $("div.filter-data-popup[filter-data-type='" + filterDataType + "'] div.filter-level[level-id='" + level + "']").find(".arrow").removeClass("active-arrow").addClass("inactive-arrow");
            }
        }

        if (buttonType == "menu") {
            //show level
            $(this).parent("ul").parent(".filter-level").next(".filter-level").find("ul li").css("display", "none");
            if (filterDataType == "Wave" || filterDataType == "Markets")
                $("div.filter-data-popup[filter-data-type='" + filterDataType + "'] ul li[parent-filter-name='" + filterText + "']").css("display", "table");
                //else if (filterDataType == "Benchmark" && localStorage.getItem('pageName') == "FiveWProfileMenu" && categoryValidation!="") {
                //    $(".filter-data-popup[filter-data-type='Benchmark'] .filter-level[level-id='1'] ul li").hide();
                //    $(".filter-data-popup[filter-data-type='Benchmark'] .filter-level[level-id='1'] ul li[filter-text='" + categoryValidation + "'][market-name='" + filterSelectionList[0].Data.Text + "'][wave='" + filterSelectionList[1].Data.Text + "']").show();
                //}
            else
                $("div.filter-data-popup[filter-data-type='" + filterDataType + "'] ul li[parent-filter-name='" + filterText + "'][market-name='" + filterSelectionList[0].Data.Text + "'][wave='" + filterSelectionList[1].Data.Text + "']").css("display", "table");

            $(this).parent("ul").parent(".filter-level").next(".filter-level").css("display", "block");

            //activate menu
            $(this).parent("ul").parent(".filter-level").find(".arrow").removeClass("active-arrow").addClass("inactive-arrow");
            $(this).find(".arrow").removeClass("inactive-arrow").addClass("active-arrow");
        }
        else {
            if (buttonType == "radio") {
                $("div.filter-data-popup[filter-data-type='" + filterDataType + "'] div[button-type='" + buttonType + "']").removeClass("active-" + buttonType + "").addClass("inactive-" + buttonType + "");
                $("div.filter-data-popup[filter-data-type='" + filterDataType + "']").parent(".filter-menu").find(".selected-filter").html($(this).find(".data-label").html());
            }
            $(this).find("div[button-type='" + buttonType + "']").addClass("active-" + buttonType + "");
            if (buttonType == "checkbox") {
                if (filterDataType == "Compare By" && ($($(".data-row[filter-text='" + parentFilterName + "']")[0]).attr('parent-filter-name') != "Brand" ||
                    ($($(".data-row[filter-text='" + parentFilterName + "']")[0]).attr('parent-filter-name') == "Brand" && filterSelectionList[4].Data != null &&
                    $($(".data-row[filter-text='" + filterSelectionList[4].Data[0].ParentText + "']")[0]).attr('parent-filter-name') != "Brand"))) {
                    if (filterSelectionList[4].Data != null && filterSelectionList[4].Data[0].ParentText != parentFilterName)
                        $("div.filter-data-popup[filter-data-type='" + filterDataType + "'] div[button-type='" + buttonType + "']").removeClass("active-" + buttonType + "").addClass("inactive-" + buttonType + "");
                }


                if ($(this).find("div[button-type='" + buttonType + "']").hasClass("inactive-checkbox")) {
                    $(this).find("div[button-type='" + buttonType + "']").removeClass("inactive-checkbox").addClass("active-checkbox");
                }
                else {
                    $(this).find("div[button-type='" + buttonType + "']").removeClass("active-checkbox").addClass("inactive-checkbox");
                }

                $("div.filter-data-popup[filter-data-type='" + filterDataType + "']").parent(".filter-menu").find(".selected-filter").html("None");
                if ($("div.filter-data-popup[filter-data-type='" + filterDataType + "'] .active-checkbox").length > 1) {
                    $("div.filter-data-popup[filter-data-type='" + filterDataType + "']").parent(".filter-menu").find(".selected-filter").html("Multiple");
                }
                else if ($("div.filter-data-popup[filter-data-type='" + filterDataType + "'] .active-checkbox").length == 1) {
                    $("div.filter-data-popup[filter-data-type='" + filterDataType + "']").parent(".filter-menu").find(".selected-filter").html($("div.filter-data-popup[filter-data-type='" + filterDataType + "'] .active-checkbox").parent(".filter-button").parent(".data-row").find(".data-label").html());
                }
            }
           
        }
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
        LoadFilterSelection();
        ShowFilterSelection();
        if (pageId == 3 && filterDataType == "Compare By") {
            if ($($(".data-row[filter-text='" + filterSelectionList[4].Data[0].ParentText + "']")[0]).attr('parent-filter-name') != "Who" && $($(".data-row[filter-text='" + filterSelectionList[4].Data[0].ParentText + "']")[0]).attr('parent-filter-name').toLowerCase() != "demographics")
                removeBrandOrCategery(true);
            else
                removeBrandOrCategery(false);
        }
        
    });
    $(document).on("click", ".selection-summary-Div", function (e) { //arrow_popup
        if ($(".arrow_popup").find(".arrw").hasClass("arrw_dwn")) {
            $(".arrow_popup").find(".arrw").removeClass("arrw_dwn").addClass("uparrw");
            if ($(".leftBody").is(":Visible")) {
                $(".selection-summary-Div .filter-selection-container ul").addClass("leftMenuSow").css("height", "auto");
                //reg_leftMenuSow();
            }
            else
                $(".selection-summary-Div .filter-selection-container ul").css("height", "auto");
            //$(".TranslucentDiv").show();
        }
        else {
            hide_leftMenuSow(this)
            //$(this).find(".arrw").removeClass("uparrw").addClass("arrw_dwn");
            //$(".selection-summary-Div .filter-selection-container ul").removeClass("leftMenuSow").css("height", "100%");
            //$(".TranslucentDiv").hide();
        }
        e.stopPropagation();
    });

});

//************************search filter implementation********

function SearchFilter(div) {
    var searchBoxData = getSearchBoxData(div)

    $('.filter-menu[data-name="' + div.attr("data-name") + '"]').find('#search').autocomplete({
        minLength: 2,
        appendTo: '.filter-menu[data-name="' + div.attr("data-name") + '"] .Search-Filter',
        autoFocus: false,
        position: {
            my: "left top",
            at: "left bottom",
            collision: "none"
        },
        open: function () {
            
            $(".Search-Filter .ui-widget-content ").css("max-width", "300px");
            $(".Search-Filter .ui-widget-content").css("width", "231px");
            $(".Search-Filter .ui-menu-item .ui-menu-item-wrapper").css("color", "rgba(255, 255, 255, 0.6)");
            $(".Search-Filter .ui-menu-item .ui-menu-item-wrapper").css("cursor", "pointer");
            $(".Search-Filter .ui-menu-item .ui-menu-item-wrapper").css("background-color", "transparent");
            $(".Search-Filter .ui-menu-item .ui-menu-item-wrapper").css("padding", "4px");
            $(".Search-Filter .ui-menu-item .ui-menu-item-wrapper").css("margin-left", "4px");
            $(".Search-Filter .ui-menu-item .ui-menu-item-wrapper").css("margin-right", "4px");
            $(".Search-Filter .ui-menu-item .ui-menu-item-wrapper").css("color", "rgba(255, 255, 255, 0.6)");
            SetScroll($('.Search-Filter .ui-widget-content'), 'black', 0, 0, 0, 0, 8);

        },
        close: function (event, ui) {

            if ($.isNumeric($('#search').val()))
                $(".txt-search").val("");
        },
        focus: function (event, ui) {
            //this.value = ui.item.label;
            //event.preventDefault();
        },
        source: function (request, response) {
            var sArr = [];
            var sArray = _.map(searchBoxData).map(function (x) {
                sArr.push({
                    label: x.split('|')[0] + ' ('+x.split('|')[1] + ')',
                    value: x.split('|')[0],
                    parent: x.split('|')[1]
                });
                return {
                    label: x.split('|')[0] + ' (' + x.split('|')[1] + ')',
                    value: x.split('|')[0],
                    parent: x.split('|')[1]
                };
            });
            if (request.term != "")
                response($.ui.autocomplete.filter(sArray, request.term));
            else
                $(".Search-Filter .ui-widget-content").css("display", "none");
            $('.ui-helper-hidden-accessible').hide();
            return;
        },
        select: function (e, ui) {
        }

    });

    $('.filter-menu[data-name="' + div.attr("data-name") + '"]').find('#search').on("autocompleteselect", function (e, ui) {
        $('.filter-menu[data-name="' + div.attr("data-name") + '"]').find('.data-row[parent-filter-name="' + ui.item.parent + '"]').each(function (i, d) {
            if ($(d).attr('parent-filter-name') == 'Markets' || $(d).attr('parent-filter-name') == 'Waves' || $(d).attr('parent-filter-name') == "BU") {
                if ($(d).attr('filter-text') == ui.item.value) {
                    $(d).trigger('click');
                    return false
                }
            }
            else
                if ($(d).attr('filter-text') == ui.item.value && $(d).attr('market-name') == filterSelectionList[0].Data.Text && $(d).attr('wave') == filterSelectionList[1].Data.Text) {
                    $(d).trigger('click');
                    return false;
                }
        })
        setTimeout(function () {
            $('.filter-menu[data-name="' + div.attr("data-name") + '"]').find('#search').val('');
        }, 10);
        e.stopImmediatePropagation();
    });

}

function getSearchBoxData(div) {
    var searchBoxData = []
    if (div.attr("data-name") != "Markets" && div.attr("data-name") != "Wave")
        div.find(".filter-button").each(function (i, d) {
            if ($(d).attr('market-name') == filterSelectionList[0].Data.Text && $(d).attr('wave') == filterSelectionList[1].Data.Text)
                searchBoxData.push($(d).children().attr('data-text') + '|' + $(d).children().attr('parent-text'))
        })
    else
        div.find(".filter-button").each(function (i, d) {
            searchBoxData.push($(d).children().attr('data-text') + '|' + $(d).children().attr('parent-text'))
        })
    return searchBoxData;
}

//************************load filter selection****************
function LoadFilterSelection() {
    $(filterSelectionList).each(function (indx, obj) {
        var dataList = [];
        $(obj.PopupElementSelector + " div.active-" + obj.ButtonType + "[button-type='" + obj.ButtonType + "']").each(function (i) {
            var data = { Id: null, Text: null, ParentText: null };
            data.Id = $(this).attr("data-id");
            data.Text = $(this).attr("data-text");
            data.ParentText = $(this).attr("parent-text");
            obj.Data = data;
            if (obj.SelectionType == "single")
                return false;
            else
                // if ($("div.filter-data-popup[filter-data-type='Wave'] div.active-radio[button-type='radio']").length > 0)
                dataList.push(data);

            if (($(obj.PopupElementSelector + " div.active-" + obj.ButtonType + "[button-type='" + obj.ButtonType + "']").length - 1) == i)
                obj.Data = dataList;
        });
    });
}

//************get filter************************
function GetFilter(filterName) {
    var filter = null;
    for (var i = 0; i < filterSelectionList.length; i++) {
        if (filterSelectionList[i].FilterType.toLowerCase() == filterName.toLowerCase()) {
            filter = filterSelectionList[i];
            break;
        }
    }
    return filter;
}

//************show filter selection************************
function ShowFilterSelection() {
    $(".selection-summary-Div .filter-selection-container").html("");
    htmlstring = "<ul class='igclk'>";
    htmlstring += "<li><span>SELECTION SUMMARY: </span></li>"
    var li = "";
    if (filterSelectionList != null && filterSelectionList.length > 0) {
        for (var i = 0; i < filterSelectionList.length; i++) {
            var filter = filterSelectionList[i];
            if (filter != null && filter.Data != null && filter.Data != null && filter.ButtonType == "radio") {
                if (li == "") {
                    li += "<li><span class='selection-filter-header'>" + filter.FilterType + ": </span></li>"
                    li += "<li><span class='selection-filter'>" + filter.Data.Text + "</span></li>"
                }
                else {
                    li += "<li><span class='selection-filter-seperator'>|</span></li>"
                    li += "<li><span class='selection-filter-header'>" + filter.FilterType + ": </span></li>"
                    li += "<li><span class='selection-filter'>" + filter.Data.Text + "</span></li>"
                }
            }
            else {
                if (filter != null && filter.Data != null && filter.Data.length > 0) {
                    if (li == "") {
                        li += "<li><span class='selection-filter-header'>" + filter.FilterType + ": </span></li>"
                    }
                    else {
                        li += "<li><span class='selection-filter-seperator'>|</span></li>"
                        li += "<li><span class='selection-filter-header'>" + filter.FilterType + ": </span></li>"
                    }

                    var advfilterlist = [];
                    for (var j = 0; j < filter.Data.length; j++) {
                        var advfilter = filter.Data[j];
                        advfilterlist.push(advfilter.ParentText + ": " + advfilter.Text);
                    }
                    if (advfilterlist.length > 0) {
                        var selectedAdvFilters = advfilterlist.join(", ");
                        li += "<li><span class='selection-filter'>" + selectedAdvFilters + "</span></li>"
                    }

                }
            }
        }
    }
    htmlstring += li;
    htmlstring += "</ul>";
    $(".selection-summary-Div .filter-selection-container").html(htmlstring);
    if ($(".arrow_popup").find(".arrw").hasClass("uparrw")) {
        if ($(".leftBody").is(":Visible")) {
            $(".selection-summary-Div .filter-selection-container ul").addClass("leftMenuSow").css("height", "auto");
            //reg_leftMenuSow();
        }
        else
            $(".selection-summary-Div .filter-selection-container ul").css("height", "auto");
        //$(".TranslucentDiv").show();
    }
}
//validations

//*************reset filters******************
function resetFilters() {

    var filter = GetFilter(filterDataType);
    if (filterDataType == "Markets" && buttonType == "radio") {
        if (filter != null && filter.Data != null) {
            if (selected_filter != filter.Data.Text) {
                $("div.filter-data-popup").each(function () {
                    filter = GetFilter($(this).attr("filter-data-type"));
                    if ($(this).attr("filter-data-type").toLowerCase().indexOf("advanced filters") > -1) {
                        if (filter != null && filter.Data != null && filter.Data.length > 0) {
                            for (var i = 0; i < filter.Data.length; i++) {
                                $("div.filter-data-popup[filter-data-type='" + $(this).attr("filter-data-type") + "'] ul li[filter-text='" + filter.Data[i].Text + "']").find("div[button-type='checkbox']").removeClass("active-checkbox").addClass("inactive-checkbox");
                            }
                        }
                    }
                    else {
                        if (filter != null && filter.Data != null) {
                            $("div.filter-data-popup[filter-data-type='" + $(this).attr("filter-data-type") + "'] ul li[filter-text='" + filter.Data.Text + "']").find("div[button-type='radio']").removeClass("active-radio").addClass("inactive-radio");
                        }
                    }
                    $("div.filter-data-popup[filter-data-type='" + $(this).attr("filter-data-type") + "']").parent(".filter-menu").find(".selected-filter").html("None");
                });
                //Added By Ajash
                $("div.filter-data-popup[filter-data-type='Compare By'] div.active-checkbox[button-type='checkbox']").removeClass("active-checkbox").addClass("inactive-checkbox");
                $("div.filter-data-popup[filter-data-type='Drinking Moments'] div.active-checkbox[button-type='checkbox']").removeClass("active-checkbox").addClass("inactive-checkbox");
            }
            localStorage.removeItem("BrandFitEntity");
        }
    }
    else if (filterDataType == "Wave" && buttonType == "radio") {
        if (filter != null && filter.Data != null) {
            if (selected_filter != filter.Data.Text) {
                $("div.filter-data-popup").each(function () {
                    if ($(this).attr("filter-data-type") != "Markets") {
                        filter = GetFilter($(this).attr("filter-data-type"));
                        if ($(this).attr("filter-data-type").toLowerCase().indexOf("advanced filters") > -1) {
                            if (filter != null && filter.Data != null && filter.Data.length > 0) {
                                for (var i = 0; i < filter.Data.length; i++) {
                                    $("div.filter-data-popup[filter-data-type='" + $(this).attr("filter-data-type") + "'] ul li[filter-text='" + filter.Data[i].Text + "']").find("div[button-type='checkbox']").removeClass("active-checkbox").addClass("inactive-checkbox");
                                }
                            }
                        }
                        else {
                            if (filter != null && filter.Data != null) {
                                $("div.filter-data-popup[filter-data-type='" + $(this).attr("filter-data-type") + "'] ul li[filter-text='" + filter.Data.Text + "']").find("div[button-type='radio']").removeClass("active-radio").addClass("inactive-radio");
                            }
                        }
                        $("div.filter-data-popup[filter-data-type='" + $(this).attr("filter-data-type") + "']").parent(".filter-menu").find(".selected-filter").html("None");
                    }
                });
                //Added By Ajash
                $("div.filter-data-popup[filter-data-type='Compare By'] div.active-checkbox[button-type='checkbox']").removeClass("active-checkbox").addClass("inactive-checkbox");
                $("div.filter-data-popup[filter-data-type='Drinking Moments'] div.active-checkbox[button-type='checkbox']").removeClass("active-checkbox").addClass("inactive-checkbox");
                
            }
        }
    }
    else if (filterDataType == "Brands/Category" && buttonType == "radio" && localStorage.getItem('pageName') == "FiveWProfileMenu") {
        if (filter != null && filter.Data != null) {
            if (selected_filter != filter.Data.Text) {
                $("div.filter-data-popup").each(function () {
                    if ($(this).attr("filter-data-type") == "Benchmark") {
                        filter = GetFilter($(this).attr("filter-data-type"));
                        if (filter != null && filter.Data != null) {
                            $("div.filter-data-popup[filter-data-type='" + $(this).attr("filter-data-type") + "'] ul li[filter-text='" + filter.Data.Text + "']").find("div[button-type='radio']").removeClass("active-radio").addClass("inactive-radio");
                        }

                        $("div.filter-data-popup[filter-data-type='" + $(this).attr("filter-data-type") + "']").parent(".filter-menu").find(".selected-filter").html("None");
                    }
                });
            }
        }
    }
    else if (filterDataType == "Compare By" && buttonType == "checkbox" && localStorage.getItem('pageName') == "BrandFitAnalysisMenu") {
        if (filter != null && filter.Data != null) {
            if (selected_filter != filter.Data.Text) {
                $("div.filter-data-popup").each(function () {
                    if ($(this).attr("filter-data-type") == "Brands/Category") {
                        filter = GetFilter($(this).attr("filter-data-type"));
                        if (filter != null && filter.Data != null) {
                            $("div.filter-data-popup[filter-data-type='" + $(this).attr("filter-data-type") + "'] ul li[filter-text='" + filter.Data.Text + "']").find("div[button-type='radio']").removeClass("active-radio").addClass("inactive-radio");
                        }

                        $("div.filter-data-popup[filter-data-type='" + $(this).attr("filter-data-type") + "']").parent(".filter-menu").find(".selected-filter").html("None");
                    }
                });
            }
        }
    }
}

//Benchmark Validations
function validateBenchmark(pageName, filterName) {   
    var text = [];
    if (pageName == "FiveWProfileMenu") {
        if (filterSelectionList[2].Data.ParentText == "Category") {
            $.each(benchmarkValidation5W, function (i, v) {
                if (v.Name == filterSelectionList[2].Data.Text)
                    text = v.Text;
            })

            if (text.length == 0)
                text.push("Category");
            text.forEach(function (i, v) {
                $(".filter-data-popup[filter-data-type='" + filterName + "'] ul li[filter-text='" + i + "']").hide();
            })
        }
        else if (filterSelectionList[2].Data.ParentText != "TradeMark") {
            categoryValidation = filterSelectionList[2].Data.ParentText;
        }
    }
    else
        return;
}
//-------
function clearAll() {
    // $("div.filter-data-popup[filter-data-type='Advanced Filters']").find(".active-checkbox").removeClass("active-checkbox").addClass("inactive-checkbox")
    $(filterSelectionList).each(function (id, val) {
        if (val.ButtonType == "checkbox")
            $(val.PopupElementSelector).find(".active-checkbox").removeClass("active-checkbox").addClass("inactive-checkbox");
        else if (val.ButtonType == "radio")
            $(val.PopupElementSelector).find(".active-radio").removeClass("active-radio").addClass("inactive-radio");
        $(val.PopupElementSelector).parent(".filter-menu").find(".selected-filter").html("None");
    });
    filterSelectionList = [];
    $(".filter-selection-container").html("");
    $(".rightBody").hide();
    $(".footer").hide();
    submitflag = false;
}
//function reg_leftMenuSow() {
//    $(".leftMenuSow").bind("click", function () {
//        hide_leftMenuSow(null,true);
//    });
//}
function hide_leftMenuSow(ths, bind) {
    if (ths == null)
        ths = ".arrow_popup";
    // if (bind != true) $(".leftMenuSow").unbind("click");
    $(ths).find(".arrw").removeClass("uparrw").addClass("arrw_dwn");
    $(".selection-summary-Div .filter-selection-container ul").removeClass("leftMenuSow").css("height", "100%");
}
function ClearItem(itm, e) {
    var val = filterSelectionList[itm];
    if (val.ButtonType == "checkbox")
        $(val.PopupElementSelector).find(".active-checkbox").removeClass("active-checkbox").addClass("inactive-checkbox");
    else if (val.ButtonType == "radio")
        $(val.PopupElementSelector).find(".active-radio").removeClass("active-radio").addClass("inactive-radio");
    $(val.PopupElementSelector).parent(".filter-menu").find(".selected-filter").html("None");
    val.Data = null;
    ShowFilterSelection();
    submitflag = false;
}

function DefaultSelections() {
    var fwCategory='';
    $("div.filter-data-popup").each(function (id, val) {
        if (!($(this).parent().find('.filter-optional-title').length)) {
            var baseFilter = '';
            if ($(this).attr("filter-data-type") == "Markets")
            {
                baseFilter = $(this).find(".filter-level").last().find("li [button-type='radio'],[button-type='checkbox']");
            } else
                baseFilter = $(this).find(".filter-level").last().find("li [market-name='" + $("#Markets-text").text() + "'] [button-type='radio'],[button-type='checkbox']");

            
            if (pageId == 1) {
                if ($(this).attr("filter-data-type") == "Measure" && baseFilter.filter("[data-text='Volume(AUC)']").length >0)
                    baseFilter.filter("[data-text='Volume(AUC)']").first().click();
                else if ($(this).attr("filter-data-type") == "Benchmark" && baseFilter.filter("[data-text='Category - " + fwCategory + "']").length)
                    baseFilter.filter("[data-text='Category - " + fwCategory + "']").first().click();
                else if ($(this).attr("filter-data-type") == "Brands/Category") {
                    fwCategory = baseFilter.attr("parent-text");
                    baseFilter.first().click();
                }
                else
                    baseFilter.first().click();
            } else if (pageId == 2) {
                if ($(this).attr("filter-data-type") == "Base" && baseFilter.filter("[data-text='NA RTD']").length > 0)
                    baseFilter.filter("[data-text='NA RTD']").first().click();
                else if ($(this).attr("filter-data-type") == "Measure" && baseFilter.filter("[data-text='Volume(AUC)']").length>0)
                    baseFilter.filter("[data-text='Volume(AUC)']").first().click();
                else
                    baseFilter.first().click();

            } else if (pageId == 3) {

                if ($(this).attr("filter-data-type") == "Drinking Moments" && baseFilter.filter("[data-text='Local Drinking Moments']").length > 0) {                    
                        baseFilter.filter("[data-text='Local Drinking Moments']").first().click();
                }
                else if ($(this).attr("filter-data-type") == "Fit Basis" && baseFilter.filter("[data-text='Reasons For Drinking']").length >0)
                    baseFilter.filter("[data-text='Reasons For Drinking']").first().click();
                else if ($(this).attr("filter-data-type") == "Benchmark" && baseFilter.filter("[data-text='NA RTD']").length >0)
                    baseFilter.filter("[data-text='NA RTD']").first().click();
                else if ($(this).attr("filter-data-type") == "Brands/Category")
                { }
                else
                    baseFilter.first().click();
            }
        }
    });
    angular.element($(".submitDiv")).scope().getOnSubmitData();
    $(".left-panel-Icon").click();
    return;
}
function removeBrandOrCategery(trf)
{
    //In BrandFIT module if user selected Brand or category from "Compare By" then desable Brand and Category menu 
 
    if (trf == true) {
        var BorC = $(".filter-menu[data-name='Brands/Category']");
        BorC.attr("style", "background-color:#d3d3d330");
        BorC.addClass("filter-menu-inactive").removeClass("filter-menu");
        BorC.find(".filter-header-title").attr("style", "color:gray!important");
    }else
    {
        var BorC = $(".filter-menu-inactive[data-name='Brands/Category']");
        BorC.attr("style", "background-color:transparent");
        BorC.addClass("filter-menu").removeClass("filter-menu-inactive");
        BorC.find(".filter-header-title").attr("style", "color:white");
    }
}