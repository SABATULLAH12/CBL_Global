using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBLGlobal.MODELS.EntityModel
{
    public class DrinkingMomentsDeepDiveEntity
    {
        public List<DMEntity> DMShareList { get; set; }
        public SampleSizeEntity SampleSize { get; set; }
    }
    public class DMEntity
    {
        public string DrinkingMoment_Name { get; set; }
        public string DrinkingMoment_Id { get; set; }
        public ShareEntity DMShare { get; set; }
        public ShareEntity DMKOShare { get; set; }
        public List<CategoryShareEntity> CategoryShareList { get; set; }
    }
    public class ShareEntity: BaseDMEntity
    {  
      
    }
    public class CategoryShareEntity
    {
        public string DrinkingMoment_Name { get; set; }
        public string Category_Name { get; set; }
        public string Category_Id { get; set; }
        public ShareEntity CategoryShare { get; set; }
        public ShareEntity CategoryKOShare { get; set; }
        public List<BrandShareEntity> BrandShareList { get; set; }
    }
    public class BrandShareEntity
    {
        public string DrinkingMoment_Name { get; set; }
        public string Category_Name { get; set; }
        public string Brand_Name { get; set; }
        public CategoryBrandShareEntity ShareInCategory { get; set; }
        public CategoryBrandShareEntity ShareInMarket { get; set; }
    }
    public class CategoryBrandShareEntity
    {
        public ShareEntity BrandShare { get; set; }
        public ShareEntity BrandShareDifference { get; set; }       
    }
    public abstract class BaseDMEntity
    {
        public string Volume { get; set; }
        public string Index { get; set; }
        public string SampleSize { get; set; }
    }
    public class SampleSizeEntity
    {
        public string SampleSize_Volume { get; set; }
    }
}
