using CBLGlobal.MODELS.EntityModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;

namespace CBLGlobalBAL.Interfaces
{
    public interface IFiveWProfile
    {
        FiveWProfileEntity Get5WData(CBLSelectionEntity CBL_SelectionEntity);
        DataSet Get5WExcelData(CBLSelectionEntity cBL_SelectionEntity);
    }
}
