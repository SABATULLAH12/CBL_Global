using CBLGlobal.MODELS.EntityModel;
using CBLGlobalDAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBLGlobalBAL
{
    public class Common
    {
        public static string GetAdvancedFiltersDBMappingIdList(List<AdvancedFiltersEntity> AdvancedFilters)
        {
            if (AdvancedFilters == null || AdvancedFilters.Count == 0)
                return string.Empty;
            
            return String.Join("|", AdvancedFilters.Select(x => x.Id));
        }
        public static string FormateValue(string value)
        {
            if (string.IsNullOrEmpty(value))
                value = "0";
            return value;
        }
    }
}
