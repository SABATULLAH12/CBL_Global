using CBLGlobal.MODELS.EntityModel;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBLGlobalBAL.Interfaces
{
    public interface IBrandFitAnalysis
    {
        BrandFitEntity GetAnalysisData(CBLSelectionEntity CBL_SelectionEntity);
        BrandFitDeepDiveEntity GetDeepDiveData(CBLSelectionEntity CBL_SelectionEntity);
        DataSet GetAnalysisExcelData(CBLSelectionEntity CBL_SelectionEntity);
    }
}
