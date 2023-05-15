using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBLGlobal.MODELS.EntityModel
{
    public class CBLSelectionEntity
    {
        public MarketEntity Market { get; set; }
        public WaveEntity Wave { get; set; }
        public DrinkingMomentsEntity DrinkingMoments { get; set; }
        public BaseEntity Base { get; set; }
        public BenchmarkEntity Benchmark { get; set; }
        public MeasureEntity Measure { get; set; }
        public FitBasisEntity FitBasis { get; set; }
        public List<AdvancedFiltersEntity> CompareBy { get; set; }
        public MeasureEntity CompareDeepDive { get; set; }
        public BrandsCategoryEntity BrandsCategory { get; set; }
        public List<AdvancedFiltersEntity> AdvancedFilters { get; set; }
        public List<AdvancedFiltersEntity> DrinkingMoments5W { get; set; }
        public string pageName { get; set; }
        public DrinkingMomentsEntity SelectedDMId { get; set; }
        public DrinkingMomentsEntity SelectedCategoryId { get; set; }
        public ExportExcelEntity ExcelData { get; set; }

    }
    public class ExportExcelEntity {
        public string OpportunitySpace { get; set; }
        public string Recommendation1 { get; set; }
        public string Recommendation2 { get; set; }
    }
    public abstract class BaseCBLEntity
    {
        public string ParentName { get; set; }
        public string Name { get; set; }
        public string Id { get; set; }
    }
    public class MarketEntity : BaseCBLEntity
    {
    }
    public class WaveEntity : BaseCBLEntity
    {
    }
    public class DrinkingMomentsEntity : BaseCBLEntity
    {
    }
    public class BaseEntity : BaseCBLEntity
    {
    }
    public class BenchmarkEntity : BaseCBLEntity
    {
    }
    public class MeasureEntity : BaseCBLEntity
    {
    }

    public class FitBasisEntity : BaseCBLEntity
    {
    }
    public class CompareByEntity : BaseCBLEntity
    {
    }

    public class BrandsCategoryEntity: BaseCBLEntity
    {
    }
    public class AdvancedFiltersEntity : BaseCBLEntity
    {
    }
}
