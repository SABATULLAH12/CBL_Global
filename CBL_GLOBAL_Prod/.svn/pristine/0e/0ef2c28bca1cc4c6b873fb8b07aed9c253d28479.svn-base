using CBLGlobal.MODELS.EntityModel;
using CBLGlobalBAL.Interfaces;
using CBLGlobalDAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBLGlobalBAL
{
    public class FiveWProfile : IFiveWProfile
    {
        DataAccess da = new DataAccess(SQLFactory.SQLConnectionString);
        DataSet ds = null;
        DataTable table = null;

        public FiveWProfileEntity Get5WData(CBLSelectionEntity CBL_SelectionEntity){

            FiveWProfileEntity FiveWObj = new FiveWProfileEntity();
            object[] param_objects = new object[] { CBL_SelectionEntity.Market.Id,
                CBL_SelectionEntity.Wave.Id, Common.GetAdvancedFiltersDBMappingIdList(CBL_SelectionEntity.DrinkingMoments5W),
                CBL_SelectionEntity.BrandsCategory.Id,CBL_SelectionEntity.Benchmark.Id,
                CBL_SelectionEntity.Measure.Id,Common.GetAdvancedFiltersDBMappingIdList(CBL_SelectionEntity.AdvancedFilters)};

            ds = da.GetData(param_objects, SPVariables.USP_cbl_5WProfile);
            FiveWObj.SampleSize = new SampleSizeEntity();
            FiveWObj.SampleSize.SampleSize_Volume = "0";
            if (ds != null && ds.Tables.Count > 0)
            {

                //check sample size
                if (ds.Tables.Count == 2 && ds.Tables[1].Rows.Count > 0)
                {
                    FiveWObj.SampleSize = new SampleSizeEntity();
                    FiveWObj.SampleSize.SampleSize_Volume = (from row in ds.Tables[0].AsEnumerable() select Convert.ToString(row[ColumnVariables.SampleSize])).FirstOrDefault();
                    if (FiveWObj.SampleSize.SampleSize_Volume != null && Convert.ToDouble(FiveWObj.SampleSize.SampleSize_Volume) < GlobalVariables.MinSampleSize)
                        return FiveWObj;
                }

                table = ds.Tables[1];
                FiveWObj.FiveWWidgetData = (from row in table.AsEnumerable()
                                            select new FiveWWidgetEntity
                                            {
                                                WidgetName = Convert.ToString(row[ColumnVariables.Type])
                                            }).ToList().GroupBy(x => x.WidgetName).Select(x => x.FirstOrDefault()).ToList();
                foreach (FiveWWidgetEntity FiveW in FiveWObj.FiveWWidgetData)
                {
                    FiveW.WidgetData = (from row in table.AsEnumerable()
                                        where FiveW.WidgetName.Equals(Convert.ToString(row[ColumnVariables.Type]), StringComparison.OrdinalIgnoreCase)
                                        select new WidgetSubEntity
                                        {
                                            SubWidgetName = Convert.ToString(row[ColumnVariables.AttributeType])
                                        }).ToList().GroupBy(x => x.SubWidgetName).Select(x => x.FirstOrDefault()).ToList();
                }
                foreach (FiveWWidgetEntity FiveW in FiveWObj.FiveWWidgetData)
                {
                    foreach (WidgetSubEntity FiveWSub in FiveW.WidgetData)
                    {
                        FiveWSub.SubWidgetData = (from row in table.AsEnumerable()
                                                  where FiveWSub.SubWidgetName.Equals(Convert.ToString(row[ColumnVariables.AttributeType]), StringComparison.OrdinalIgnoreCase)
                                                  select new FiveWData
                                                  {
                                                      AttributeName = Convert.ToString(row[ColumnVariables.Attribute]),
                                                      Volume = string.IsNullOrEmpty(Convert.ToString(row[ColumnVariables.Volume])) ? "NA" : Convert.ToString(row[ColumnVariables.Volume]),
                                                      Index = string.IsNullOrEmpty(Convert.ToString(row[ColumnVariables.Indx])) ? "NA" : Convert.ToString(row[ColumnVariables.Indx])
                                                  }).Take(FiveW_WidgetCount.widget_count[FiveWSub.SubWidgetName]).ToList();
                    }
                }
            }
                return FiveWObj;
        }

        public DataSet Get5WExcelData(CBLSelectionEntity cBL_SelectionEntity)
        {
            object[] param_objects = new object[] { cBL_SelectionEntity.Market.Id,
                cBL_SelectionEntity.Wave.Id, Common.GetAdvancedFiltersDBMappingIdList(cBL_SelectionEntity.DrinkingMoments5W),
                cBL_SelectionEntity.BrandsCategory.Id,cBL_SelectionEntity.Benchmark.Id,
                cBL_SelectionEntity.Measure.Id,Common.GetAdvancedFiltersDBMappingIdList(cBL_SelectionEntity.AdvancedFilters)};
            
            ds = da.GetData(param_objects, SPVariables.USP_cbl_5WProfileExcel);
            return ds;
        }
    }
}
