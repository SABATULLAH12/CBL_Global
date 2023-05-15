using CBLGlobalBAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CBLGlobal.MODELS.EntityModel;
using CBLGlobalDAL;
using System.Configuration;
using System.Data;

namespace CBLGlobalBAL
{
    public class Filters : IFilters
    {
        DataAccess da = new DataAccess(SQLFactory.SQLConnectionString);
        DataSet ds = null;
        public List<PanelInfo> GetFilters(string Filter)
        {
            List<PanelInfo> panelInfolsit = null;
            PanelList panelList = null;
            List<PanelData> panelData = null;
            try
            {
                object[] paramValues = new object[] { Filter };
                ds = da.GetData(paramValues, SPVariables.USP_populateLeftpanel);
                if(ds != null && ds.Tables.Count > 0)
                {
                    List<string> panelLevels = new List<string>();
                    foreach(var column in ds.Tables[0].Columns)
                    {                        
                        if(Convert.ToString(column).ToLower().Contains("level"))
                        {
                            panelLevels.Add(Convert.ToString(column));
                        }
                    }
                    panelInfolsit = (from row in ds.Tables[0].AsEnumerable()
                                 select new PanelInfo() {
                                     Label = Convert.ToString(row[ColumnVariables.FilterType]),
                                     HasSearchBox = ds.Tables[1].AsEnumerable().Where(x => x.Field<string>(Filter == "5W" ? "FiveW" : Filter) == Convert.ToString(row[ColumnVariables.FilterType])).FirstOrDefault() == null ? false : true
                                 }).ToList().GroupBy(x => x.Label).Select(x => x.FirstOrDefault()).ToList();
                    foreach(PanelInfo panelInfo in panelInfolsit)
                    {
                        panelInfo.PanelPopup = new List<PanelList>();
                        for (int i = 0; i < panelLevels.Count; i++)
                        {
                            panelList = new PanelList();
                            panelList.Level = i + 1;
                            if (i == 0)
                            {
                                panelData = (from row in ds.Tables[0].AsEnumerable()
                                             where Convert.ToString(panelInfo.Label).Equals(Convert.ToString(row[ColumnVariables.FilterType]), StringComparison.OrdinalIgnoreCase)
                                             && !string.IsNullOrEmpty(Convert.ToString(row[panelLevels[i]]))
                                             select new PanelData()
                                             {
                                                 ID = Convert.ToString(row[ColumnVariables.UniqueFilterId]),
                                                 Text = Convert.ToString(row[panelLevels[i]]).Trim(),
                                                 LevelId = i + 1,
                                                 ParentText = string.Empty,
                                                 Market = Convert.ToString(row[ColumnVariables.Country]),
                                                 Wave = Convert.ToString(row[ColumnVariables.TimePeriod]),
                                                 IsSelectable = (i + 1) == panelLevels.Count ? true : (string.IsNullOrEmpty(Convert.ToString(row[panelLevels[i + 1]])) ? true : false),
                                                 ButtonType = panelInfo.Label.Equals("Advanced Filters", StringComparison.OrdinalIgnoreCase) ?
                                                 ((i + 1) == panelLevels.Count ? ButtonTypes.CheckBox : (string.IsNullOrEmpty(Convert.ToString(row[panelLevels[i + 1]])) ?
                                                 ButtonTypes.CheckBox : ButtonTypes.Menu)) : ((i + 1) == panelLevels.Count ? ButtonTypes.Radio : (string.IsNullOrEmpty(Convert.ToString(row[panelLevels[i + 1]])) ?
                                                 ButtonTypes.Radio : ButtonTypes.Menu)),
                                                 HasSearchBox = ds.Tables[1].AsEnumerable().Where(x => x.Field<string>(Filter == "5W" ? "FiveW" : Filter) == Convert.ToString(row[panelLevels[i]]).Trim()).FirstOrDefault() == null ? false : true
                                             }).ToList();
                                if (Convert.ToString(panelInfo.Label) == "Markets")
                                    panelData = panelData.GroupBy(x => new { x.Text }).Select(x => x.FirstOrDefault()).ToList();
                                else 
                                    panelData = panelData.GroupBy(x => new { x.Text, x.ParentText, x.Market, x.Wave }).Select(x => x.FirstOrDefault()).ToList();
                            }
                            else
                            {
                                panelData = (from row in ds.Tables[0].AsEnumerable()
                                             where Convert.ToString(panelInfo.Label).Equals(Convert.ToString(row[ColumnVariables.FilterType]), StringComparison.OrdinalIgnoreCase)
                                             && !string.IsNullOrEmpty(Convert.ToString(row[panelLevels[i]]))
                                             select new PanelData()
                                             {
                                                 ID = Convert.ToString(row[ColumnVariables.UniqueFilterId]),
                                                 Text = Convert.ToString(row[panelLevels[i]]).Trim(),
                                                 LevelId = i + 1,
                                                 Market = Convert.ToString(row[ColumnVariables.Country]),
                                                 Wave = Convert.ToString(row[ColumnVariables.TimePeriod]),
                                                 ParentText = Convert.ToString(row[panelLevels[i - 1]]).Trim(),
                                                 IsSelectable = (i + 1) == panelLevels.Count ? true : (string.IsNullOrEmpty(Convert.ToString(row[panelLevels[i + 1]])) ? true : false),
                                                 ButtonType = (panelInfo.Label.Equals("Advanced Filters", StringComparison.OrdinalIgnoreCase)|| panelInfo.Label.Equals("Drinking Moments", StringComparison.OrdinalIgnoreCase)
                                                 || panelInfo.Label.Equals("Compare By", StringComparison.OrdinalIgnoreCase)) ?
                                                 ((i + 1) == panelLevels.Count ? ButtonTypes.CheckBox : (string.IsNullOrEmpty(Convert.ToString(row[panelLevels[i + 1]])) ?
                                                 ButtonTypes.CheckBox : ButtonTypes.Menu)) : ((i + 1) == panelLevels.Count ? ButtonTypes.Radio : (string.IsNullOrEmpty(Convert.ToString(row[panelLevels[i + 1]])) ?
                                                 ButtonTypes.Radio : ButtonTypes.Menu))
                                             }).ToList().GroupBy(x => new { x.Text, x.ParentText, x.Market, x.Wave ,x.IsSelectable}).Select(x => x.FirstOrDefault()).ToList();
                                            // .GroupBy(x => new { x.Text, x.ParentText, x.Market, x.Wave }).Select(x => x.FirstOrDefault()).ToList();
                            }
                            if(panelData != null && panelData.Count > 0)
                            {
                                panelList.Data = panelData;
                                panelInfo.PanelPopup.Add(panelList);
                            }                           
                        }                       
                    }
                }
            }
            catch(Exception ex)
            {
                throw ex;
            }
            return panelInfolsit;
        }       
    }
}
