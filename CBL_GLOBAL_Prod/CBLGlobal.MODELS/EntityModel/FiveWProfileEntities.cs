using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBLGlobal.MODELS.EntityModel
{
   public class FiveWProfileEntity
    {
        public List<FiveWWidgetEntity> FiveWWidgetData { get; set; }
        public SampleSizeEntity SampleSize { get; set; }

    }
    
    public class FiveWWidgetEntity
    {
        public string WidgetName { get; set; }
        public List<WidgetSubEntity> WidgetData { get; set; }
        
    }
    
    public class WidgetSubEntity
    {
        public string SubWidgetName { get; set; }
        public List<FiveWData> SubWidgetData { get; set; }
    }

    public class FiveWData
    {
        public string AttributeName { get; set; }
        public string Volume { get; set; }
        public string Index { get; set; }
    }

}
