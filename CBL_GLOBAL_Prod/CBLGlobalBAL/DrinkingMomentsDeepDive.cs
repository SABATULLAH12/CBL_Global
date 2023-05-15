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
    public class DrinkingMomentsDeepDive : IDrinkingMomentsDeepDive
    {
        DataAccess da = new DataAccess(SQLFactory.SQLConnectionString);
        DataSet ds = null;
        DataTable table = null;
        public DrinkingMomentsDeepDiveEntity GetDMData(CBLSelectionEntity CBL_SelectionEntity)
        {
            DrinkingMomentsDeepDiveEntity DMObj = new DrinkingMomentsDeepDiveEntity();
            object[] param_objects = new object[] { CBL_SelectionEntity.Market.Id,
                CBL_SelectionEntity.Wave.Id, CBL_SelectionEntity.DrinkingMoments.Id,
                CBL_SelectionEntity.Base.Id,CBL_SelectionEntity.Benchmark.Id,
                CBL_SelectionEntity.Measure.Id,Common.GetAdvancedFiltersDBMappingIdList(CBL_SelectionEntity.AdvancedFilters)};

            ds = da.GetData(param_objects, SPVariables.USP_cbl_DMDeepdive);
            DMObj.SampleSize = new SampleSizeEntity();
            DMObj.SampleSize.SampleSize_Volume = "0";
            if (ds != null && ds.Tables.Count > 0)
            {
                #region check sample size
                //check sample size
                if (ds.Tables.Count == 2 && ds.Tables[1].Rows.Count > 0)
                {
                    DMObj.SampleSize = new SampleSizeEntity();
                    DMObj.SampleSize.SampleSize_Volume = (from row in ds.Tables[1].AsEnumerable() select Convert.ToString(row[ColumnVariables.SampleSize])).FirstOrDefault();
                    if (DMObj.SampleSize.SampleSize_Volume != null && Convert.ToDouble(DMObj.SampleSize.SampleSize_Volume) < GlobalVariables.MinSampleSize)
                        return DMObj;
                }
                #endregion

                table = ds.Tables[0];
                List<string> DMSelectionList = new List<string>() { "DM Share", "DM share KO" };
                List<string> CategorySelectionList = new List<string>() { "Category Share", "Category Share KO" };
                List<string> BrandShareInCategoryAndMarketList = new List<string>() { "Brands Share In Category", "Share Difference In Category", "Brands Share In Market", "Share Difference In Market" };
              
                DMObj.DMShareList = (from row in table.AsEnumerable()
                                     where DMSelectionList.Contains(Convert.ToString(row[ColumnVariables.Selection]))
                                     select new DMEntity()
                                     {
                                         DrinkingMoment_Name = Convert.ToString(row[ColumnVariables.DrinkingMoments]),
                                         DrinkingMoment_Id = Convert.ToString(row[ColumnVariables.DrinkingMomentsId])
                                     }).ToList().GroupBy(x => x.DrinkingMoment_Name).Select(x => x.FirstOrDefault()).ToList();
                foreach (DMEntity DM in DMObj.DMShareList)
                {
                    DM.DMShare = new ShareEntity();
                    DM.DMKOShare = new ShareEntity();                    
                    #region load DM share and KO share data
                    foreach (string selection in DMSelectionList)
                    {
                        var query = (from row in table.AsEnumerable()
                                     where DM.DrinkingMoment_Name.Equals(Convert.ToString(row[ColumnVariables.DrinkingMoments]), StringComparison.OrdinalIgnoreCase)
                                     && selection.Equals(Convert.ToString(row[ColumnVariables.Selection]), StringComparison.OrdinalIgnoreCase)
                                     select new
                                     {
                                         Volume = Convert.ToString(row[ColumnVariables.Volume]),
                                         Index = Convert.ToString(row[ColumnVariables.Indx]),
                                         SampleSize = Convert.ToString(row[ColumnVariables.SampleSize])
                                     }).FirstOrDefault();
                        if (query != null)
                        {
                            if (selection == "DM Share")
                            {
                                DM.DMShare.Volume = Common.FormateValue(query.Volume);
                                DM.DMShare.Index = Common.FormateValue(query.Index);
                                DM.DMShare.SampleSize = Common.FormateValue(query.SampleSize);
                            }
                            else
                            {
                                DM.DMKOShare.Volume = Common.FormateValue(query.Volume);;
                                DM.DMKOShare.Index = Common.FormateValue(query.Index);
                                DM.DMKOShare.SampleSize = Common.FormateValue(query.SampleSize);
                            }
                        }
                    }
                    #endregion
                    #region load DM Categories
                    DM.CategoryShareList = (from row in table.AsEnumerable()
                                         where CategorySelectionList.Contains(Convert.ToString(row[ColumnVariables.Selection]))
                                         && DM.DrinkingMoment_Name.Equals(Convert.ToString(row[ColumnVariables.DrinkingMoments]),StringComparison.OrdinalIgnoreCase)
                                         select new CategoryShareEntity()
                                         {
                                             DrinkingMoment_Name = Convert.ToString(row[ColumnVariables.DrinkingMoments]),
                                             Category_Name = Convert.ToString(row[ColumnVariables.Category]),
                                             Category_Id=Convert.ToString(row[ColumnVariables.CategoryId])
                                         }).ToList().GroupBy(x => x.Category_Name).Select(x => x.FirstOrDefault()).ToList();
                    if(DM.CategoryShareList != null && DM.CategoryShareList.Count > 0)
                    {
                        foreach(CategoryShareEntity category in DM.CategoryShareList)
                        {
                            category.CategoryShare = new ShareEntity();
                            category.CategoryKOShare = new ShareEntity();
                            #region load Category share and KO share data
                            foreach (string selection in CategorySelectionList)
                            {
                                var query = (from row in table.AsEnumerable()
                                             where DM.DrinkingMoment_Name.Equals(Convert.ToString(row[ColumnVariables.DrinkingMoments]), StringComparison.OrdinalIgnoreCase)
                                              && category.Category_Name.Equals(Convert.ToString(row[ColumnVariables.Category]), StringComparison.OrdinalIgnoreCase)
                                             && selection.Equals(Convert.ToString(row[ColumnVariables.Selection]), StringComparison.OrdinalIgnoreCase)                                             
                                             select new
                                             {
                                                 Volume = Convert.ToString(row[ColumnVariables.Volume]),
                                                 Index = Convert.ToString(row[ColumnVariables.Indx]),
                                                 SampleSize = Convert.ToString(row[ColumnVariables.SampleSize])
                                             }).FirstOrDefault();
                                if (query != null)
                                {
                                    if (selection == "Category Share")
                                    {
                                        category.CategoryShare.Volume = Common.FormateValue(query.Volume);
                                        category.CategoryShare.Index = Common.FormateValue(query.Index);
                                        category.CategoryShare.SampleSize = Common.FormateValue(query.SampleSize);
                                    }
                                    else
                                    {
                                        category.CategoryKOShare.Volume = Common.FormateValue(query.Volume);
                                        category.CategoryKOShare.Index = Common.FormateValue(query.Index);
                                        category.CategoryKOShare.SampleSize = Common.FormateValue(query.SampleSize);
                                    }
                                }
                            }
                            #endregion

                            #region load Brand share data
                            category.BrandShareList = (from row in table.AsEnumerable()
                                                       where BrandShareInCategoryAndMarketList.Contains(Convert.ToString(row[ColumnVariables.Selection]))
                                                       && DM.DrinkingMoment_Name.Equals(Convert.ToString(row[ColumnVariables.DrinkingMoments]), StringComparison.OrdinalIgnoreCase)
                                                        && category.Category_Name.Equals(Convert.ToString(row[ColumnVariables.Category]), StringComparison.OrdinalIgnoreCase)
                                                       select new BrandShareEntity()
                                                       {
                                                           DrinkingMoment_Name = Convert.ToString(row[ColumnVariables.DrinkingMoments]),
                                                           Category_Name = Convert.ToString(row[ColumnVariables.Category]),
                                                           Brand_Name = Convert.ToString(row[ColumnVariables.Brand])
                                                       }).ToList().GroupBy(x => x.Brand_Name).Select(x => x.FirstOrDefault()).ToList();
                            if(category.BrandShareList != null && category.BrandShareList.Count > 0)
                            {
                                foreach(BrandShareEntity brand in category.BrandShareList)
                                {
                                    brand.ShareInCategory = new CategoryBrandShareEntity();
                                    brand.ShareInMarket = new CategoryBrandShareEntity();
                                    brand.ShareInCategory.BrandShare = new ShareEntity();
                                    brand.ShareInCategory.BrandShareDifference = new ShareEntity();
                                    brand.ShareInMarket.BrandShare = new ShareEntity();
                                    brand.ShareInMarket.BrandShareDifference = new ShareEntity();

                                    #region load brand share data
                                    foreach (string selection in BrandShareInCategoryAndMarketList)
                                    {
                                        var query = (from row in table.AsEnumerable()
                                                     where DM.DrinkingMoment_Name.Equals(Convert.ToString(row[ColumnVariables.DrinkingMoments]), StringComparison.OrdinalIgnoreCase)
                                                      && category.Category_Name.Equals(Convert.ToString(row[ColumnVariables.Category]), StringComparison.OrdinalIgnoreCase)
                                                       && brand.Brand_Name.Equals(Convert.ToString(row[ColumnVariables.Brand]), StringComparison.OrdinalIgnoreCase)
                                                     && selection.Equals(Convert.ToString(row[ColumnVariables.Selection]), StringComparison.OrdinalIgnoreCase)
                                                     select new
                                                     {
                                                         Volume = Convert.ToString(row[ColumnVariables.Volume]),
                                                         Index = Convert.ToString(row[ColumnVariables.Indx]),
                                                         SampleSize = Convert.ToString(row[ColumnVariables.SampleSize])
                                                     }).FirstOrDefault();
                                        if (query != null)
                                        {
                                            if (selection == "Brands Share In Category")
                                            {
                                                brand.ShareInCategory.BrandShare.Volume = Common.FormateValue(query.Volume);
                                                brand.ShareInCategory.BrandShare.Index = Common.FormateValue(query.Index);
                                                brand.ShareInCategory.BrandShare.SampleSize = Common.FormateValue(query.SampleSize);
                                            }
                                            else if (selection == "Share Difference In Category")
                                            {
                                                brand.ShareInCategory.BrandShareDifference.Volume = Common.FormateValue(query.Volume);
                                                brand.ShareInCategory.BrandShareDifference.Index = Common.FormateValue(query.Index);
                                                brand.ShareInCategory.BrandShareDifference.SampleSize = Common.FormateValue(query.SampleSize);
                                            }
                                            if (selection == "Brands Share In Market")
                                            {
                                                brand.ShareInMarket.BrandShare.Volume = Common.FormateValue(query.Volume);
                                                brand.ShareInMarket.BrandShare.Index = Common.FormateValue(query.Index);
                                                brand.ShareInMarket.BrandShare.SampleSize = Common.FormateValue(query.SampleSize);
                                            }
                                            else if (selection == "Share Difference In Market")
                                            {
                                                brand.ShareInMarket.BrandShareDifference.Volume = Common.FormateValue(query.Volume);
                                                brand.ShareInMarket.BrandShareDifference.Index = Common.FormateValue(query.Index);
                                                brand.ShareInMarket.BrandShareDifference.SampleSize = Common.FormateValue(query.SampleSize);
                                            }
                                        }
                                    }
                                    #endregion
                                }
                            }
                            #endregion;
                        }
                    }
                    #endregion
                }
            }
            return DMObj;
        }
        public DataSet GetDMExcelData(CBLSelectionEntity cBL_SelectionEntity)
        {
            object[] param_objects = new object[] { cBL_SelectionEntity.Market.Id,
                cBL_SelectionEntity.Wave.Id, cBL_SelectionEntity.DrinkingMoments.Id,
                cBL_SelectionEntity.Base.Id,cBL_SelectionEntity.Benchmark.Id,
                cBL_SelectionEntity.Measure.Id,Common.GetAdvancedFiltersDBMappingIdList(cBL_SelectionEntity.AdvancedFilters),
                cBL_SelectionEntity.SelectedDMId.Id, cBL_SelectionEntity.SelectedCategoryId.Id};

            ds = da.GetData(param_objects, SPVariables.USP_cbl_DMExcel);
            return ds;
        }
    }
}
