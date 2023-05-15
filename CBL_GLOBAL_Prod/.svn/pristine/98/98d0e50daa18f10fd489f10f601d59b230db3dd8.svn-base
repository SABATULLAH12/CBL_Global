using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBLGlobal.MODELS.EntityModel
{
    public class BrandFitEntity
    {
        public List<BrandFitCompareByEntity> BrandFitCompareByEntityList { get; set; }
    }
    public class BrandFitCompareByEntity
    {
        public string CompareBy { get; set; }
        public string CompareById { get; set; }

        public List<BaseBrandFitEntity> BrandFitEntityList { get; set; }
    }
    public class BaseBrandFitEntity
    {
        public string DrinkingMoment_Name { get; set; }
        public string DrinkingMoment_Id { get; set; }
        public string Measure { get; set; }
        public string Share_Index { get; set; }
        public string Vol_Cont_Volume { get; set; }
        public string Share_DM_Volume { get; set; }
        public string Fit_Score_Volume { get; set; }
        public string IsLowSample { get; set; }
    }

    public class BrandFitDeepDiveEntity
    {
        public List<ReasonsForDrinking> Reasons { get; set; }
        public List<RFDWidgets> RFDWidgetsData { get; set; }
    }

    public class ReasonsForDrinking
    {
        public string ReasonForDrinking { get; set; }
        public string OverlappingBenefits { get; set; }
    }
    public class RFDWidgets
    {
        public string RFD { get; set; }
        public List<BaseBrandCategory> BrandsList { get; set; }
        public string IsLowSample { get; set; }
    }
    public class BaseBrandCategory
    {
        public string Brand { get; set; }
        public string Category { get; set; }
        public string Volume { get; set; }
    }
}