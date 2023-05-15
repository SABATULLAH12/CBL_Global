using CBLGlobal.MODELS.EntityModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBLGlobalBAL.Interfaces
{
    public interface IFilters
    {
        List<PanelInfo> GetFilters(string Filter);
    }
}
