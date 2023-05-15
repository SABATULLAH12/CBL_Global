using CBLGlobalBAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CBLGlobal.MODELS.EntityModel;
using CBLGlobalDAL;
using System.Data;

namespace CBLGlobalBAL
{
    public class BrandFitAnalysis : IBrandFitAnalysis
    {
        DataAccess da = new DataAccess(SQLFactory.SQLConnectionString);
        DataSet ds = null;
        DataTable table = null;
        public BrandFitEntity GetAnalysisData(CBLSelectionEntity CBL_SelectionEntity)
        {
            BrandFitEntity BrandFitEntityObj = new BrandFitEntity();
            try
            {
                BrandFitEntityObj.BrandFitCompareByEntityList = new List<BrandFitCompareByEntity>();
                object[] param_objects = new object[] { CBL_SelectionEntity.Market.Id,
                CBL_SelectionEntity.Wave.Id, CBL_SelectionEntity.DrinkingMoments.Id,
                CBL_SelectionEntity.FitBasis.Id, Common.GetAdvancedFiltersDBMappingIdList(CBL_SelectionEntity.CompareBy),CBL_SelectionEntity.BrandsCategory.Id, CBL_SelectionEntity.Benchmark.Id
                ,Common.GetAdvancedFiltersDBMappingIdList(CBL_SelectionEntity.AdvancedFilters)};

                ds = da.GetData(param_objects, SPVariables.USP_cbl_FitScore);
                if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                {
                    BrandFitEntityObj.BrandFitCompareByEntityList = (from row in ds.Tables[0].AsEnumerable()
                                                                     select new BrandFitCompareByEntity()
                                                                     {
                                                                         CompareBy = Convert.ToString(row[ColumnVariables.CompareBy]),
                                                                         CompareById = Convert.ToString(row[ColumnVariables.CompareById])
                                                                     }).ToList().GroupBy(x => x.CompareBy).Select(x => x.FirstOrDefault()).ToList();
                    foreach (BrandFitCompareByEntity comparebyObj in BrandFitEntityObj.BrandFitCompareByEntityList)
                    {
                        comparebyObj.BrandFitEntityList = (from row in ds.Tables[0].AsEnumerable()
                                                           where comparebyObj.CompareBy.Equals(Convert.ToString(row[ColumnVariables.CompareBy]), StringComparison.OrdinalIgnoreCase)
                                                           select new BaseBrandFitEntity()
                                                           {
                                                               DrinkingMoment_Name = Convert.ToString(row[ColumnVariables.DM]),
                                                               DrinkingMoment_Id = Convert.ToString(row[ColumnVariables.DMId]),
                                                               Share_Index = Convert.ToString(row[ColumnVariables.ShareIndex]),
                                                               Fit_Score_Volume = Convert.ToString(row[ColumnVariables.FitScore]),
                                                               Share_DM_Volume = Convert.ToString(row[ColumnVariables.ShareDM]),
                                                               Vol_Cont_Volume = Convert.ToString(row[ColumnVariables.VolCont]),
                                                               Measure= Convert.ToString(row[ColumnVariables.Measure]),
                                                               IsLowSample=Convert.ToString(row[ColumnVariables.IsLowSample])
                                                           }
                                                         ).ToList();
                    }
                }
                
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return BrandFitEntityObj;
        }

        public BrandFitDeepDiveEntity GetDeepDiveData(CBLSelectionEntity CBL_SelectionEntity)
        {
            BrandFitDeepDiveEntity BrandFitEntityObj = new BrandFitDeepDiveEntity();
            try
            {
                BrandFitEntityObj.Reasons = new List<ReasonsForDrinking>();
                BrandFitEntityObj.RFDWidgetsData = new List<RFDWidgets>();
                object[] param_objects = new object[] { CBL_SelectionEntity.Market.Id,
                CBL_SelectionEntity.Wave.Id, CBL_SelectionEntity.DrinkingMoments.Id,
                CBL_SelectionEntity.FitBasis.Id, CBL_SelectionEntity.CompareDeepDive.Id,CBL_SelectionEntity.BrandsCategory.Id, CBL_SelectionEntity.Benchmark.Id
                ,Common.GetAdvancedFiltersDBMappingIdList(CBL_SelectionEntity.AdvancedFilters)};

                ds = da.GetData(param_objects, SPVariables.USP_cbl_BFDeepDive);
                if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                {
                    BrandFitEntityObj.Reasons = (from row in ds.Tables[1].AsEnumerable()
                                                 select new ReasonsForDrinking()
                                                 {
                                                     ReasonForDrinking = Convert.ToString(row[ColumnVariables.Attribute]),
                                                     OverlappingBenefits = Convert.ToString(row[ColumnVariables.isMatching])
                                                 }).ToList();
                    BrandFitEntityObj.RFDWidgetsData= (from row in ds.Tables[0].AsEnumerable()
                                                       select new RFDWidgets()
                                                       {
                                                           RFD = Convert.ToString(row[ColumnVariables.FitBasis]),
                                                           IsLowSample = Convert.ToString(row[ColumnVariables.IsLowSample])                       
                                                       }).ToList().GroupBy(x => x.RFD).Select(x => x.FirstOrDefault()).ToList();
                    foreach(RFDWidgets RFD in BrandFitEntityObj.RFDWidgetsData)
                    {
                        RFD.BrandsList= (from row in ds.Tables[0].AsEnumerable()
                                         where RFD.RFD.Equals(Convert.ToString(row[ColumnVariables.FitBasis]), StringComparison.OrdinalIgnoreCase)
                                         select new BaseBrandCategory
                                         {
                                             Brand = Convert.ToString(row[ColumnVariables.Brand]),
                                             Category = Convert.ToString(row[ColumnVariables.Category]),
                                             Volume = string.IsNullOrEmpty(Convert.ToString(row[ColumnVariables.CatVol])) ? "NA" : Convert.ToString(row[ColumnVariables.CatVol])
                                         }).ToList();
                    }
                }


            }
            catch (Exception ex)
            {
                throw ex;
            }
            return BrandFitEntityObj;
        }

        public DataSet GetAnalysisExcelData(CBLSelectionEntity CBL_SelectionEntity)
        {
            object[] param_objects = new object[] { CBL_SelectionEntity.Market.Id,
                CBL_SelectionEntity.Wave.Id, CBL_SelectionEntity.DrinkingMoments.Id,
                CBL_SelectionEntity.FitBasis.Id, Common.GetAdvancedFiltersDBMappingIdList(CBL_SelectionEntity.CompareBy),CBL_SelectionEntity.BrandsCategory.Id, CBL_SelectionEntity.Benchmark.Id
                ,Common.GetAdvancedFiltersDBMappingIdList(CBL_SelectionEntity.AdvancedFilters)};

            ds = da.GetData(param_objects, SPVariables.USP_cbl_FitScore);

            return ds;
        }
    }
}
