using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBLGlobalDAL
{
    public class SPVariables
    {
        public const string USP_populateLeftpanel = "usp_populateLeftpanel";
        public const string USP_cbl_DMDeepdive = "usp_cbl_DMDeepdive";
        public const string SP_validateUser = "sp_validateUser";
        public const string USP_cbl_5WProfile = "usp_cbl_5WProfile";
        public const string USP_cbl_FitScore = "USP_cbl_FitScore";
        public const string USP_cbl_5WProfileExcel = "usp_cbl_5WProfile_E2Xl";
        public const string USP_cbl_DMExcel = "usp_cbl_DMDeepdive_E2xl";
        public const string USP_cbl_BFDeepDive = "usp_cbl_BrandFitDeepDive";
    }
    public class SessionVariables
    {
        public const string User_Details = "User_Details";
    }
    public class ColumnVariables
    {
        public const string FilterType = "FilterType";
        public const string UniqueFilterId = "UniqueFilterId";
        public const string Country = "Country";
        public const string TimePeriod = "TimePeriod";
        public const string SampleSize = "SampleSize";
        public const string Selection = "Selection";
        public const string DrinkingMoments = "DrinkingMoments";
        public const string DrinkingMomentsId = "DMId";
        public const string Category = "Category";
        public const string CategoryId = "CatId";
        public const string Volume = "Volume";
        public const string Indx = "Indx";
        public const string Brand = "Brand";
        public const string Type = "WidgetType";
        public const string AttributeType = "attributeType";
        public const string Attribute = "Attribute";
        public const string CompareBy = "CompareBy";
        public const string CompareById = "CompareById";
        public const string DM = "DM";
        public const string DMId = "DMId";
        public const string FitScore = "FitScore";
        public const string ShareDM = "ShareDM";
        public const string ShareIndex = "ShareIndex";
        public const string VolCont = "VolCont";
        public const string Measure = "Measure";
        public const string CatVol = "CatVol";
        public const string FitBasis = "FitBasis";
        public const string Attributeid = "Attributeid";
        public const string isMatching = "IsMatching";
        public const string IsLowSample = "IsLowSample";
        public const string BrandsCategories = "Brands/Categories";
        public const string Demography = "Demography";
        public const string isLowSample = "isLowSample";

        public const string expTblH1 = "Volume Contribution To Brand";
        public const string expTblH2 = "Share of Brand";
        public const string expTblH3 = "Fit Score of Brand";

    }
    public class GlobalVariables
    {
        public const string NA = "NA";
        public const double MinSampleSize = 30;
    }
    public static class FiveW_WidgetCount
    {
        public static Dictionary<string, int> widget_count = new Dictionary<string, int>() { { "Age Group", 6}, { "Gender ", 2} , { "Household Size" , 3},
            { "Occupation", 6}, { "Weekend/Weekday", 2}, {"Day Part", 5 }, { "Global Drinking Moment", 5}, {"Home/Away From Home",2 },
            { "Location", 4 }, {"Channel of Purchase" , 6}, {"Container Type",5 }, {"Reasons For Drinking" ,5}, {"Category      ", 5 }, {"Number of Children in HH - Aged 18-19 years",3 }, {"Size of Container(Purchased)",5 },{ "Local Drinking Moment", 5} };
    }
    public class ViewNames
    {
        public const string FiveW = "FiveW";
        public const string DrinkingMomentsDeepdive = "DMD";
        public const string AdvancedAnalytics = "AA";
    }
}