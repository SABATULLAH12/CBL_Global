using AQLogger;
using Aspose.Slides;
using CBL_Global.CommonFilters;
using CBLGlobal.MODELS.EntityModel;
using CBLGlobalBAL;
using CBLGlobalBAL.Interfaces;
using CBLGlobalDAL;
using OfficeOpenXml;
using OfficeOpenXml.Style;
using System;
using System.Collections.Generic;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Web.Mvc;


namespace CBL_Global.Controllers
{
    [SessionExpire]
    public class CommonController : Controller
    {

        [HttpPost]
        public JsonResult GetFilters(string Filter)
        {
            if (!ModelState.IsValid)
                return Json(new { result = "SessionExpired", url = Url.Action("Login", "Login") });

            IFilters filters = new Filters();
            List<PanelInfo> panelInfo = filters.GetFilters(Filter);
            var json_result = Json(panelInfo, JsonRequestBehavior.AllowGet);
            json_result.MaxJsonLength = int.MaxValue;
            return json_result;
        }
        #region GetDefaultSelectionsForUser
        [HttpPost]
        public string GetDefaultSelectionsForUser(string View)
        {
            string fileName=string.Empty;
            if (Session[SessionVariables.User_Details] != null)
            {
                string UserName = ((UserEntity)(Session[SessionVariables.User_Details])).Username;
                if (UserName.Contains("@"))
                    UserName = UserName.Substring(0, UserName.IndexOf("@"));
                switch (View)
                {
                    case ViewNames.FiveW:
                        fileName = ViewNames.FiveW;
                        break;
                    case ViewNames.DrinkingMomentsDeepdive:
                        fileName = ViewNames.DrinkingMomentsDeepdive;
                        break;
                    case ViewNames.AdvancedAnalytics:
                        fileName = ViewNames.AdvancedAnalytics;
                        break;
                    default:
                        fileName = "";
                        break;

                }
                fileName = Server.MapPath(@"..\UserJson\") + UserName + "\\" + fileName + ".json";
                if (System.IO.File.Exists(fileName))
                    fileName = System.IO.File.ReadAllText(fileName);
                else
                    fileName = null;
               // return new JsonResult(Json(BrandFitEntityObj, JsonRequestBehavior.AllowGet));
            }
            return fileName;
        }
        #endregion


        #region PPT
        public JsonResult DownloadPPT(ExportPPTRequest request)
        {
            if (!ModelState.IsValid)
                return Json(new { result = "SessionExpired", url = Url.Action("Login", "Login") });

            var response = new ExportPPTResponse();
            try
            {
                using (MemoryStream ms = new MemoryStream(Convert.FromBase64String(request.imgBase64)))
                {
                    using (System.Drawing.Bitmap bm2 = new System.Drawing.Bitmap(ms))
                    {
                        response = ImageToPPT(bm2, request);
                    }
                }
            }
            catch (Exception ex)
            {
                Logger.GetInstance().Error("DownloadPPT", ex);
                response.FileStatus = false;
                throw;
            }
            return this.Json(response, JsonRequestBehavior.AllowGet);
        }

        public ExportPPTResponse ImageToPPT(Image imgToReplace, ExportPPTRequest request)
        {
            var response = new ExportPPTResponse();
            var userInfo = Session[SessionVariables.User_Details] as UserEntity;
            var userFolderName = userInfo.Username.Split('@')[0];
            try
            {
                var sourceFile = Server.MapPath("~/Templates/CBLGlobalPPTTemplate.pptx");

                string sTime = DateTime.Now.ToString("MMddyy");
                var fileName = GetFileName(request.pageName) + sTime + ".pptx";

                if (Directory.Exists(Server.MapPath("~/Temp/ExportedFiles/" + userFolderName)))
                    Directory.Delete(Server.MapPath("~/Temp/ExportedFiles/" + userFolderName), true);

                Directory.CreateDirectory(Server.MapPath("~/Temp/ExportedFiles/" + userFolderName));

                Aspose.Slides.License license = new Aspose.Slides.License();
                license.SetLicense(Server.MapPath("~/Aspose.Slides.lic"));

                Aspose.Slides.Presentation pres = new Aspose.Slides.Presentation(sourceFile);

                ReplaceImage(pres, pres.Slides[1], "Image", imgToReplace);
                ReplaceFilterText(pres.Slides[0], "Filters", request);
                ReplaceText(pres.Slides[0], "Header", GetHeaderText(request.pageName));
                ReplaceText(pres.Slides[1], "Header", GetHeaderText(request.pageName));
                pres.Save(Server.MapPath("~/Temp/ExportedFiles/" + userFolderName + "/" + fileName), Aspose.Slides.Export.SaveFormat.Pptx);

                response.FilePath = "../Temp/ExportedFiles/" + userFolderName + "/" + fileName;
                response.FileStatus = true;
            }
            catch (Exception ex)
            {
                Logger.GetInstance().Error("ImageToPPT", ex);
                response.FileStatus = false;              
                throw;
            }
            return response;
        }

        public string GetHeaderText(string pageName)
        {
            switch (pageName)
            {
                case "DrinkingMomentsMenu": return "Drinking Moment Deep Dive";
                case "FiveWProfileMenu": return "5W Profile";
                case "BrandFitAnalysisMenu": return "Brand Fit Tool";
                case "BrandFitDeepDiveMenu": return "Brand Fit Deep Dive";

                default: return "";
            }
        }

        public string GetFileName(string pageName)
        {
            switch (pageName)
            {
                case "DrinkingMomentsMenu": return "DrinkingMoment_DeepDive_";
                case "FiveWProfileMenu":     return "5W_";
                case "BrandFitAnalysisMenu": return "BrandFit";
                case "BrandFitDeepDiveMenu": return "BrandFitDeepDive";

                default: return "";
            }
        }
        public void ReplaceImage(Aspose.Slides.Presentation pres, Aspose.Slides.ISlide sld, string CurrentImageName, Image imgToReplace)
        {
            try
            {
                for (int i = 0; i < sld.Shapes.Count; i++)
                {
                    if (sld.Shapes[i] is Shape)
                    {
                        Shape shp = (Shape)sld.Shapes[i];
                        string strname = (string)shp.Name;
                        if (strname == CurrentImageName)
                        {
                            Aspose.Slides.IPictureFrame pf = (Aspose.Slides.IPictureFrame)shp;
                            using (System.Drawing.Image img = imgToReplace)
                            {
                                IPPImage imgx = pres.Images.AddImage(img);
                                pf = sld.Shapes.AddPictureFrame(Aspose.Slides.ShapeType.Rectangle, shp.X, shp.Y, shp.Width, shp.Height, imgx);
                                shp.X = 0;
                                shp.Y = 0;
                                shp.Width = 0;
                                shp.Height = 0;
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Logger.GetInstance().Error("ReplaceImage", ex);
            }
        }

        public void ReplaceText(Aspose.Slides.ISlide sld, string shapeName, string text)
        {
            foreach (IShape shp in sld.Shapes)
            {
                string strname = (string)shp.Name;
                if (strname == shapeName)
                {
                    ((IAutoShape)shp).TextFrame.Text = text;
                }
            }
        }

        public void ReplaceFilterText(Aspose.Slides.ISlide sld, string shapeName, ExportPPTRequest request)
        {
            List<string> filterlist = new List<string>();
            foreach (IShape shp in sld.Shapes)
            {
                var i = 0;
                string strname = (string)shp.Name;
                if (strname == shapeName)
                {
                    ((IAutoShape)shp).TextFrame.Paragraphs[i].Portions[0].Text = "Market: " + request.filter.Market.Name;
                    ((IAutoShape)shp).TextFrame.Paragraphs[i+=2].Portions[0].Text = "Wave: " + request.filter.Wave.Name;
                    if (request.pageName == "DrinkingMomentsMenu")
                    {
                        ((IAutoShape)shp).TextFrame.Paragraphs[i+=2].Portions[0].Text = "Drinking Moment: " + request.filter.DrinkingMoments.Name;
                        ((IAutoShape)shp).TextFrame.Paragraphs[i+=2].Portions[0].Text = "Base: " + request.filter.Base.Name;
                        ((IAutoShape)shp).TextFrame.Paragraphs[i+=2].Portions[0].Text = "Benchmark: " + request.filter.Benchmark.Name;
                        ((IAutoShape)shp).TextFrame.Paragraphs[i+=2].Portions[0].Text = "Measure: " + request.filter.Measure.Name;
                    }
                    else if(request.pageName== "FiveWProfileMenu")
                    {
                        ((IAutoShape)shp).TextFrame.Paragraphs[i+=2].Portions[0].Text = "Brand/Category: " + request.filter.BrandsCategory.Name;
                        ((IAutoShape)shp).TextFrame.Paragraphs[i+=2].Portions[0].Text = "Benchmark: " + request.filter.Benchmark.Name;
                        ((IAutoShape)shp).TextFrame.Paragraphs[i+= 2].Portions[0].Text = "Measure: " + request.filter.Measure.Name;
                        //string filter = "";
                        if (request.filter.DrinkingMoments5W != null)
                        {
                            foreach (var fil in request.filter.DrinkingMoments5W)
                            {
                                //filter += " " + fil.Name;
                                filterlist.Add(fil.Name);
                            }
                            ((IAutoShape)shp).TextFrame.Paragraphs[i += 2].Portions[0].Text = "Drinking Moments: " + String.Join(", ", filterlist);
                        }
                        else
                            ((IAutoShape)shp).TextFrame.Paragraphs[i += 2].Portions[0].Text = "";
                    }  
                    else if(request.pageName== "BrandFitAnalysisMenu" || request.pageName== "BrandFitDeepDiveMenu")
                    {
                        ((IAutoShape)shp).TextFrame.Paragraphs[i += 2].Portions[0].Text = "Drinking Moment: " + request.filter.DrinkingMoments.Name;
                        ((IAutoShape)shp).TextFrame.Paragraphs[i += 2].Portions[0].Text = "Fit Basis: " + request.filter.FitBasis.Name;
                        if (request.pageName == "BrandFitDeepDiveMenu")
                            ((IAutoShape)shp).TextFrame.Paragraphs[i += 2].Portions[0].Text = "Compare By: " + request.filter.CompareDeepDive.Name;
                        else
                        {
                            foreach (var fil in request.filter.CompareBy)
                            {
                                //filter += " " + fil.Name;
                                filterlist.Add(fil.Name);
                            }
                        ((IAutoShape)shp).TextFrame.Paragraphs[i += 2].Portions[0].Text = "Compare By: " + String.Join(", ", filterlist);
                        }
                        if(request.filter.BrandsCategory.Name!=""&& request.filter.BrandsCategory.Name !=null )
                            ((IAutoShape)shp).TextFrame.Paragraphs[i += 2].Portions[0].Text = "Brands/Category: " + request.filter.BrandsCategory.Name;
                        ((IAutoShape)shp).TextFrame.Paragraphs[i += 2].Portions[0].Text = "Benchmark: " + request.filter.Benchmark.Name;
                    }    

                   
                    if (request.filter.AdvancedFilters != null)
                    {
                        //string filter= "";
                        filterlist = new List<string>();
                        foreach (var fil in request.filter.AdvancedFilters)
                        {
                            //filter += " " + fil.Name;
                            filterlist.Add(fil.ParentName + ": " + fil.Name);
                        }
                        ((IAutoShape)shp).TextFrame.Paragraphs[i += 2].Portions[0].Text = "Additional Filters: " + String.Join(", " , filterlist);
                    }
                    else
                        ((IAutoShape)shp).TextFrame.Paragraphs[i += 2].Portions[0].Text = "";

                }
            }

        }
        #endregion

        #region Excel
        [HttpPost]
        public JsonResult DownloadExcel(CBLSelectionEntity CBL_SelectionEntity)
        {
            if (!ModelState.IsValid)
                return Json(new { result = "SessionExpired", url = Url.Action("Login", "Login") });

            var response = new ExportPPTResponse();
            if (CBL_SelectionEntity.pageName == "FiveWProfileMenu")
                response = Prepare5WExcel(CBL_SelectionEntity);
            else if (CBL_SelectionEntity.pageName == "DrinkingMomentsMenu")
                response = PrepareDMExcel(CBL_SelectionEntity);
            else if (CBL_SelectionEntity.pageName == "BrandFitAnalysisMenu")
                response = PrepareBrandFitExcel(CBL_SelectionEntity);
            else if (CBL_SelectionEntity.pageName == "BrandFitDeepDiveMenu")
                response = PrepareBrandFitDeepDiveExcel(CBL_SelectionEntity);

            return this.Json(response, JsonRequestBehavior.AllowGet);
        }

        public ExportPPTResponse Prepare5WExcel(CBLSelectionEntity Filters)
        {
            FiveWProfileController FiveWProfileObj = new FiveWProfileController();
            var response = new ExportPPTResponse();
            var userInfo = Session[SessionVariables.User_Details] as UserEntity;
            var userFolderName = userInfo.Username.Split('@')[0];
            DataSet dsExcel = new DataSet();
            dsExcel = FiveWProfileObj.Get5WExcelData(Filters);
            try
            {
                var sourceFile = Server.MapPath("~/Templates/5W_ExcelTemplate.xlsx");
                ExcelPackage package = new ExcelPackage(new System.IO.FileInfo(sourceFile), true);
                ExcelWorksheet ws = package.Workbook.Worksheets["Brandcategory"];
                //Adding Filters
                ws.Cells[2, 2].Value = Convert.ToString(Filters.Market.Name);
                ws.Cells[3, 2].Value = Convert.ToString(Filters.Wave.Name);
                ws.Cells[4, 2].Value = Convert.ToString(Filters.BrandsCategory.Name);
                ws.Cells[5, 2].Value = Convert.ToString(Filters.Benchmark.Name);
                ws.Cells[6, 2].Value = Convert.ToString(Filters.Measure.Name);
                ws.Cells[11, 4].Value = Convert.ToString(Filters.BrandsCategory.Name);
                ws.Cells[11, 5].Value = Convert.ToString(Filters.Benchmark.Name);
                ws.Cells[1, 1].Value = "5W Profile of "+ Convert.ToString(Filters.BrandsCategory.Name)+" in "+ Convert.ToString(Filters.Market.Name);
                ws.Cells[7, 2].Value = (Filters.DrinkingMoments5W==null || Filters.DrinkingMoments5W.Count==0)? 
                    "NA":String.Join(",", Filters.DrinkingMoments5W.Select(x => x.Name));
                ws.Cells[8,2].Value= (Filters.AdvancedFilters == null || Filters.AdvancedFilters.Count == 0) ?
                    "NA" : String.Join(",", Filters.AdvancedFilters.Select(x => x.Name));
                var row = 12;
                ws.Cells[9, 2].Value = dsExcel.Tables[0].Rows[0][0];
                for(int i=0; i < dsExcel.Tables[1].Rows.Count; i++)
                {
                    var col = 1;
                    for (int j = 0; j < dsExcel.Tables[1].Columns.Count; j++)
                    {

                        ws.Cells[row, col].Value = (j==3||j==4)? Convert.ToString(Math.Round(Convert.ToDouble(dsExcel.Tables[1].Rows[i][j]),1))+"%" : dsExcel.Tables[1].Rows[i][j];
                        if (j == 5)
                        {
                            ws.Cells[row, col].Value = Convert.ToString(Math.Round(Convert.ToDouble(dsExcel.Tables[1].Rows[i][j]), 0));
                        }
                        if (j == 3)
                        {
                            if (Convert.ToInt32(dsExcel.Tables[1].Rows[i][j + 2]) < 80)
                                ws.Cells[row, col].Style.Font.Color.SetColor(Color.Red);
                            else if(Convert.ToInt32(dsExcel.Tables[1].Rows[i][j + 2]) > 120)
                                ws.Cells[row, col].Style.Font.Color.SetColor(Color.Green);
                        }
                        
                           
                        ws.Cells[row, col].Style.Border.Bottom.Style = OfficeOpenXml.Style.ExcelBorderStyle.Thin;
                        ws.Cells[row, col].Style.Border.Right.Style = OfficeOpenXml.Style.ExcelBorderStyle.Thin;
                        col++;
                    }
                    row++;
                }

                package.Save();
                Session["ExcelFileStream"] = package.Stream;

                string sTime = DateTime.Now.ToString("MMddyy");
                var fileName = GetFileName(Filters.pageName) + sTime + ".xlsx";
                Session["Filename"] = fileName;
               
                response.FilePath = "";
                response.FileStatus = true;
                
            }
            catch (Exception ex)
            {
                Logger.GetInstance().Error("Prepare5WExcel", ex);
                response.FileStatus = false;
                throw;
            }
            return response;
        }

        public ExportPPTResponse PrepareDMExcel(CBLSelectionEntity Filters)
        {
            DrinkingMomentsDeepDiveController FiveWProfileObj = new DrinkingMomentsDeepDiveController();
            var response = new ExportPPTResponse();
            var userInfo = Session[SessionVariables.User_Details] as UserEntity;
            var userFolderName = userInfo.Username.Split('@')[0];
            DataSet dsExcel = new DataSet();
            dsExcel = FiveWProfileObj.GetDMExcelData(Filters);
            try
            {
                var sourceFile = Server.MapPath("~/Templates/Global_Drinking_Moment_Deepdive_Template.xlsx");
                ExcelPackage package = new ExcelPackage(new System.IO.FileInfo(sourceFile), true);
                ExcelWorksheet ws = package.Workbook.Worksheets["DM_Deepdive"];
                //Adding Filters
                ws.Cells[2, 2].Value = Convert.ToString(Filters.Market.Name);
                ws.Cells[3, 2].Value = Convert.ToString(Filters.Wave.Name);
                ws.Cells[4, 2].Value = Convert.ToString(Filters.DrinkingMoments.Name);
                ws.Cells[5, 2].Value = Convert.ToString(Filters.Base.Name);
                ws.Cells[6, 2].Value = Convert.ToString(Filters.Benchmark.Name);
                ws.Cells[7, 2].Value = Convert.ToString(Filters.Measure.Name);
                ws.Cells[12, 3].Value = Convert.ToString(Filters.Measure.Name)+ " Mix in "+ Convert.ToString(Filters.Base.Name);
                ws.Cells[12, 4].Value = Convert.ToString(Filters.Measure.Name)+ " Mix in "+ Convert.ToString(Filters.Benchmark.Name);
                ws.Cells[1, 1].Value = Convert.ToString(Filters.DrinkingMoments.Name)+" Deepdive in " + Convert.ToString(Filters.Market.Name);
                ws.Cells[8, 2].Value = (Filters.AdvancedFilters == null || Filters.AdvancedFilters.Count == 0) ?
                    "NA" : String.Join(",", Filters.AdvancedFilters.Select(x => x.Name));
                var row = 13;
                for (int k = 0; k < dsExcel.Tables.Count; k++)
                {
                   
                    for (int i = 0; i < dsExcel.Tables[k].Rows.Count; i++)
                    {
                        var col = 2;
                        for (int j = 0; j < dsExcel.Tables[k].Columns.Count; j++)
                        {

                            if (j == 0)
                            {
                                ws.Cells[row, col].Value = Convert.ToString(dsExcel.Tables[k].Rows[i][j]);
                                ws.Cells[row, col].Style.HorizontalAlignment = ExcelHorizontalAlignment.Left;
                                ws.Cells[row, col].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                                ws.Cells[row, col].Style.Border.Right.Style = ExcelBorderStyle.Thin;
                                ws.Cells[row, col].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                                if ( Convert.ToString(dsExcel.Tables[k].Rows[i][j]) == Filters.SelectedDMId.Name || Convert.ToString(dsExcel.Tables[k].Rows[i][j]) == Filters.SelectedCategoryId.Name)
                                    ws.Cells[row, col].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(255, 192, 0));
                            }
                            else
                            {
                                ws.Cells[row, col].Value =( dsExcel.Tables[k].Rows[i][j]==DBNull.Value || Convert.ToInt32(dsExcel.Tables[k].Rows[i][j]) == -10000 ) ? "NA" :(j==3||j==6? Convert.ToString(Math.Round(Convert.ToDouble(dsExcel.Tables[k].Rows[i][j]), 1)): Convert.ToString(Math.Round(Convert.ToDouble(dsExcel.Tables[k].Rows[i][j]), 1)) + "%");
                                ws.Cells[row, col].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                                ws.Cells[row, col].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                                ws.Cells[row, col].Style.Border.Right.Style = ExcelBorderStyle.Thin;
                                ws.Cells[row, col].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                            }
                            if (j == 1 && k!=2)
                            {
                                if (dsExcel.Tables[k].Rows[i][j + 2] != DBNull.Value){
                                    if (Convert.ToInt32(dsExcel.Tables[k].Rows[i][j + 2]) < 80)
                                        ws.Cells[row, col].Style.Font.Color.SetColor(Color.Red);
                                    else if (Convert.ToInt32(dsExcel.Tables[k].Rows[i][j + 2]) > 120)
                                        ws.Cells[row, col].Style.Font.Color.SetColor(Color.Green);
                                }
                            }
                            //ws.Cells[row, col].Style.Border.Bottom.Style = OfficeOpenXml.Style.ExcelBorderStyle.Thin;
                            //ws.Cells[row, col].Style.Border.Right.Style = OfficeOpenXml.Style.ExcelBorderStyle.Thin;
                            col++;
                        }
                        row++;
                    }
                    row++;
                    var column = 2;
                    var BrandsList = 9;
                    var CategoryList = 7;
                    
                    if (k == 0)
                    {
                        
                        ws.Cells[row, 2, row, 6].Merge = true;
                        ws.Cells[row, 2, row, 6].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(64, 64, 64));
                        ws.Cells[row, 2].Value = Filters.SelectedDMId.Name;
                        ws.Cells[row, 2].Style.Font.Color.SetColor(Color.White);
                        ws.Cells[row, 2].Style.Font.Bold = true;
                        ws.Cells[row, 2].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                        row++;
                        ws.Cells[row, column++].Value = "Category";
                        ws.Cells[row, column++].Value = Convert.ToString(Filters.Measure.Name)+" Mix in "+ Filters.SelectedDMId.Name;
                        ws.Cells[row, column++].Value = Convert.ToString(Filters.Measure.Name) + " Mix in " + Filters.Base.Name;
                        ws.Cells[row, column++].Value = "Index";
                        ws.Cells[row, column++].Value = "KO Share of Category in "+ Filters.SelectedDMId.Name;
                        for(var s=2; s< CategoryList; s++)
                        {
                            ws.Cells[row, s].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                            ws.Cells[row, s].Style.Font.Bold = true;
                            ws.Cells[row, s].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                            ws.Cells[row, s].Style.Border.Right.Style = ExcelBorderStyle.Thin;
                            ws.Cells[row, s].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                        }
                    }
                    else if (k == 1)
                    {
                        
                        ws.Cells[row, 2, row, 8].Merge = true;
                        ws.Cells[row, 2, row, 8].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(64, 64, 64));
                        ws.Cells[row, 2].Style.Font.Color.SetColor(Color.White);
                        ws.Cells[row, 2].Style.Font.Bold = true;
                        ws.Cells[row, 2].Value =Filters.SelectedCategoryId.Name;
                        ws.Cells[row, 2].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                        ws.Cells[row, 2].Style.Font.Color.SetColor(Color.White);
                        row++;
                        ws.Cells[row, column++].Value = "Brands*";
                        ws.Cells[row, column++].Value = "Mix among "+ Filters.SelectedCategoryId.Name+" in "+Filters.SelectedDMId.Name;
                        ws.Cells[row, column++].Value = "Mix among " + Filters.SelectedCategoryId.Name + " & " + Filters.SelectedDMId.Name+" in Previous Wave";
                        ws.Cells[row, column++].Value = "Change";
                        ws.Cells[row, column++].Value = "Mix among " + Filters.SelectedCategoryId.Name;
                        ws.Cells[row, column++].Value = "Mix among " + Filters.SelectedCategoryId.Name + " in Previous Wave";
                        ws.Cells[row, column++].Value = "Change";
                        for (var s = 2; s < BrandsList; s++)
                        {
                            ws.Cells[row, s].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                            ws.Cells[row, s].Style.Font.Bold = true;
                            ws.Cells[row, s].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                            ws.Cells[row, s].Style.Border.Right.Style = ExcelBorderStyle.Thin;
                            ws.Cells[row, s].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                        }
                    }
                    else if (k == 2)
                    {
                        ws.Cells[row, column].Value = "* Occasions with no brand are not shown";
                        ws.Cells[row, column].Style.Font.Bold = true;
                    } 
                    row++;
                }

                package.Save();
                Session["ExcelFileStream"] = package.Stream;

                string sTime = DateTime.Now.ToString("MMddyy");
                var fileName = GetFileName(Filters.pageName) + sTime + ".xlsx";
                Session["Filename"] = fileName;

                response.FilePath = "";
                response.FileStatus = true;

            }
            catch (Exception ex)
            {
                Logger.GetInstance().Error("Prepare5WExcel", ex);
                response.FileStatus = false;
                throw;
            }
            return response;
        }

        public ExportPPTResponse PrepareBrandFitExcel(CBLSelectionEntity Filters)
        {
            BrandFitAnalysisController BrandFitObj = new BrandFitAnalysisController();
            var response = new ExportPPTResponse();
            var userInfo = Session[SessionVariables.User_Details] as UserEntity;
            var userFolderName = userInfo.Username.Split('@')[0];
            DataSet dsExcel = new DataSet();
            dsExcel = BrandFitObj.GetAnalysisExcelData(Filters);
            try
            {
                var sourceFile = Server.MapPath("~/Templates/Brand_Fit_ExcelTemplate.xlsx");
                ExcelPackage package = new ExcelPackage(new System.IO.FileInfo(sourceFile), true);
                ExcelWorksheet ws = package.Workbook.Worksheets["Brand_Fit"];
                //Adding Filters
                ws.Cells[2, 2].Value = Convert.ToString(Filters.Market.Name);
                ws.Cells[3, 2].Value = Convert.ToString(Filters.Wave.Name);
                ws.Cells[4, 2].Value = Convert.ToString(Filters.DrinkingMoments.Name);
                ws.Cells[5, 2].Value = Convert.ToString(Filters.FitBasis.Name);
                ws.Cells[6, 2].Value = String.Join(",", Filters.CompareBy.Select(x => x.Name));
                ws.Cells[7, 2].Value = Convert.ToString(Filters.BrandsCategory.Name) == "" ? "NA" : Convert.ToString(Filters.BrandsCategory.Name);
                ws.Cells[8, 2].Value = Convert.ToString(Filters.Benchmark.Name);
                ws.Cells[9, 2].Value = (Filters.AdvancedFilters == null || Filters.AdvancedFilters.Count == 0) ?
                  "NA" : String.Join(",", Filters.AdvancedFilters.Select(x => x.Name));
                ws.Cells[1, 1].Value = "Beverage Opportunity Spaces in " + Convert.ToString(Filters.Market.Name);


                // 3 table creation
                int strLn = 9 + 3, col = 3, tbgap = 3;

                string[] colmnt = dsExcel.Tables[0].AsEnumerable().Select(r => r.Field<string>(ColumnVariables.DM)).Distinct().ToArray();
                string[] rowt = dsExcel.Tables[0].AsEnumerable().Select(r => r.Field<string>(ColumnVariables.CompareBy)).Distinct().ToArray();
                int tbl2 = (strLn + (rowt.Count() + 1) * 1) + tbgap;
                int tbl3 = (strLn + (rowt.Count() + 1) * 2) + tbgap * 2;
                string commenHdr = Convert.ToString(Filters.BrandsCategory.Name) == "" ? ColumnVariables.BrandsCategories : ColumnVariables.Demography;
                //---Set red Bar table header

                setTopBanner("C" + (strLn - 1) + ":" + getNumberforAlphabet(colmnt.Count() + 2) + (strLn - 1),ws, strLn, colmnt, ColumnVariables.expTblH1);
                setTopBanner("C" + (tbl2 - 1) + ":" + getNumberforAlphabet(colmnt.Count() + 2) + (tbl2 - 1), ws, strLn, colmnt, ColumnVariables.expTblH2);
                setTopBanner("C" + (tbl3 - 1) + ":" + getNumberforAlphabet(colmnt.Count() + 2) + (tbl3 - 1), ws, strLn, colmnt, ColumnVariables.expTblH3);

                //------

                setHeadercell(true, true, ws, strLn, col - 1, commenHdr, null);
                setHeadercell(true, true, ws, tbl2, col - 1, commenHdr, null);
                setHeadercell(true, true, ws, tbl3, col - 1, commenHdr, null);

                foreach (string colmn in colmnt)
                {
                    setHeadercell(true, true, ws, strLn, col, colmn, null);
                    setHeadercell(true, true, ws, tbl2, col, colmn, null);
                    setHeadercell(true, true, ws, tbl3, col++, colmn, null);                 
                }
                col = 2;
                foreach (string row in rowt)
                {
                    setHeadercell(false, false, ws, strLn - 1 + col, 2, row, null);
                    setHeadercell(false, false, ws, tbl2 - 1 + col, 2, row, null);
                    setHeadercell(false, false, ws, tbl3 - 1 + col++, 2, row, null);                  
                }

                col = 0;
                int com_prv = 0;
                int rowl = 0; double? fitscore, VolCont, ShareDM;
                foreach (DataRow dr in dsExcel.Tables[0].AsEnumerable())
                //for (int rowl = 0; rowl < dsExcel.Tables[0].Rows.Count; rowl++)
                {
                    if (com_prv == 0 || Convert.ToInt32(dr[ColumnVariables.CompareById]) != com_prv)
                    {
                        com_prv = Convert.ToInt32(dr[ColumnVariables.CompareById]);
                        col++;
                        rowl = 0;
                    }
                    VolCont = isNullorEmpty(dr[ColumnVariables.VolCont], 1);
                    ShareDM = isNullorEmpty(dr[ColumnVariables.ShareDM], 1);
                    fitscore = isNullorEmpty(dr[ColumnVariables.FitScore]);

                    setHeadercell(true, false, ws, strLn + col, rowl + 3, Convert.ToString(VolCont), dr[ColumnVariables.ShareIndex], true, fitscore);
                    setHeadercell(true, false, ws, tbl2 + col, rowl + 3, Convert.ToString(ShareDM), dr[ColumnVariables.ShareIndex], true, fitscore);
                    setHeadercell(true, false, ws, tbl3 + col, rowl + 3, Convert.ToString(fitscore), dr[ColumnVariables.ShareIndex], false, fitscore);

                    rowl++;
                }

                package.Save();
                Session["ExcelFileStream"] = package.Stream;

                string sTime = DateTime.Now.ToString("MMddyy");
                var fileName = GetFileName(Filters.pageName) + sTime + ".xlsx";
                Session["Filename"] = fileName;

                response.FilePath = "";
                response.FileStatus = true;

            }
            catch (Exception ex)
            {
                Logger.GetInstance().Error("Prepare5WExcel", ex);
                response.FileStatus = false;
                throw;
            }
            return response;
        }

        public ExportPPTResponse PrepareBrandFitDeepDiveExcel(CBLSelectionEntity Filters) {
            BrandFitAnalysisController BrandFitObj = new BrandFitAnalysisController();
            var response = new ExportPPTResponse();
            var userInfo = Session[SessionVariables.User_Details] as UserEntity;
            var userFolderName = userInfo.Username.Split('@')[0];
            var dsExcel =  BrandFitObj.GetDeepDiveData(Filters);

            try
            {
                var sourceFile = Server.MapPath("~/Templates/Brand_Fit_Deep_Dive_ExcelTemplate.xlsx");
                ExcelPackage package = new ExcelPackage(new System.IO.FileInfo(sourceFile), true);
                ExcelWorksheet ws = package.Workbook.Worksheets["Deepdive"];
                //Adding Filters
                ws.Cells[2, 2].Value = Convert.ToString(Filters.Market.Name);
                ws.Cells[3, 2].Value = Convert.ToString(Filters.Wave.Name);
                ws.Cells[4, 2].Value = Convert.ToString(Filters.DrinkingMoments.Name);
                ws.Cells[5, 2].Value = Convert.ToString(Filters.FitBasis.Name);
                ws.Cells[6, 2].Value = String.Join(",", Filters.CompareBy.Select(x => x.Name));
                ws.Cells[7, 2].Value = Convert.ToString(Filters.BrandsCategory.Name) == "" ? "NA" : Convert.ToString(Filters.BrandsCategory.Name);
                ws.Cells[8, 2].Value = Convert.ToString(Filters.Benchmark.Name);
                ws.Cells[9, 2].Value = (Filters.AdvancedFilters == null || Filters.AdvancedFilters.Count == 0) ?
                  "NA" : String.Join(",", Filters.AdvancedFilters.Select(x => x.Name));
                ws.Cells[10, 2].Value = GetOpportunitySpace(Filters);
                UpdateHeaderDynamicaly(ws, Convert.ToString(Filters.FitBasis.Name));

                int value = Int32.Parse(Filters.ExcelData.Recommendation1);
                int index = Int32.Parse(Filters.ExcelData.Recommendation2);
                var recommendation = "";

                if (value > 50 && index > 120)
                    recommendation = "Defend";
                if (value > 50 && index < 120)
                    recommendation = "Expand";
                if (value < 50 && index > 120)
                    recommendation = "Reshape";
                if (value < 50 && index < 120)
                    recommendation = "Reconsider";

                ws.Cells[11, 2].Value = recommendation;
                ws.Cells[1, 1].Value = "Beverage Opportunity Spaces in " + Convert.ToString(Filters.Market.Name);

                int rowStart = 15, columnStart = 2, dataLength = 0, maxVolume = 0;

                ws.Cells[15, 2, 19, 7].Style.Fill.PatternType = ExcelFillStyle.Solid;
                ws.Cells[15, 2, 19, 7].Style.Fill.BackgroundColor.SetColor(Color.Transparent);
                //ws.Cells[15, 2, 19, 7].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(255,255,162));

                while (dataLength != 5)
                {

                    columnStart = 1;
                    maxVolume = getMaxVolumeIndex((dsExcel.Data as BrandFitDeepDiveEntity).RFDWidgetsData[dataLength].BrandsList);
                    ws.Cells[(rowStart + dataLength), columnStart + 1].Value = (dsExcel.Data as BrandFitDeepDiveEntity).RFDWidgetsData[dataLength].RFD;
                    ws.Cells[(rowStart + dataLength), columnStart + 2].Value = (dsExcel.Data as BrandFitDeepDiveEntity).RFDWidgetsData[dataLength].BrandsList[maxVolume].Category;

                    string volumeInString = (dsExcel.Data as BrandFitDeepDiveEntity).RFDWidgetsData[dataLength].BrandsList[maxVolume].Volume;
                    decimal volumeInFloat;
                    if (decimal.TryParse(volumeInString, out volumeInFloat))
                    {
                        volumeInFloat = Decimal.Round(volumeInFloat, 1);
                        volumeInString = volumeInFloat.ToString() + '%';
                        // Do something with the new text value
                    }
                    ws.Cells[(rowStart + dataLength), columnStart + 3].Value = volumeInString;
                    ws.Cells[(rowStart + dataLength), columnStart + 4].Value = (dsExcel.Data as BrandFitDeepDiveEntity).RFDWidgetsData[dataLength].BrandsList[maxVolume].Brand;

                    ws.Cells[(rowStart + dataLength), columnStart + 6].Value = (dsExcel.Data as BrandFitDeepDiveEntity).Reasons[dataLength].ReasonForDrinking;

                    if (ifReasonsIsInRFD((dsExcel.Data as BrandFitDeepDiveEntity), dataLength))
                    {
                        ws.Cells[(rowStart + dataLength), columnStart + 1].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(255, 255, 162));
                    }

                    if ((dsExcel.Data as BrandFitDeepDiveEntity).Reasons[dataLength].OverlappingBenefits == "1")
                        ws.Cells[(rowStart + dataLength), columnStart + 6].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(255, 255, 162));

                    dataLength++;

                }

                package.Save();
                Session["ExcelFileStream"] = package.Stream;

                string sTime = DateTime.Now.ToString("MMddyy");
                var fileName = GetFileName(Filters.pageName) + sTime + ".xlsx";
                Session["Filename"] = fileName;

                response.FilePath = "";
                response.FileStatus = true;

            }
            catch (Exception ex) {
                Logger.GetInstance().Error("Prepare5WExcel", ex);
                response.FileStatus = false;
                throw;
            }
            return response;
        }

        private void UpdateHeaderDynamicaly(ExcelWorksheet ws,string dynamicValue)
        {
            ws.Cells[14, 2].Value = "Top 5 " + dynamicValue + " in the Moment";
            ws.Cells[14, 3].Value = "Top Category in the Moment and " + dynamicValue ;
            ws.Cells[14, 7].Value = "Top " + dynamicValue + " for the Brand";
        }

        private static string GetOpportunitySpace(CBLSelectionEntity Filters)
        {
            if (Filters.ExcelData.OpportunitySpace == null || Convert.ToString(Filters.ExcelData.OpportunitySpace) == "")
                return "NA";
            else
                if (Filters.ExcelData.OpportunitySpace.IndexOf(":") > 0)
                return Filters.ExcelData.OpportunitySpace.Substring(0, Filters.ExcelData.OpportunitySpace.IndexOf(":"));
            else
                return Filters.ExcelData.OpportunitySpace;
        }

        private bool ifReasonsIsInRFD(BrandFitDeepDiveEntity brandFitDeepDiveEntity, int dataLength) {

            List<String> reasonsName = new List<string>();

            var a = brandFitDeepDiveEntity.RFDWidgetsData[dataLength].RFD;

            foreach (var reasons in brandFitDeepDiveEntity.Reasons)
                reasonsName.Add(reasons.ReasonForDrinking);
            
            var result = reasonsName.Any(word => brandFitDeepDiveEntity.RFDWidgetsData[dataLength].RFD.Contains(word));

            return result;
        }

        private int getMaxVolumeIndex(List<BaseBrandCategory> brandsList) {
            int position = 0, temp = 2;
            var a = brandsList[0];
            float max = 0;

            while(temp != -1) {
                if(float.Parse(brandsList[temp].Volume) > max) {
                    max = float.Parse(brandsList[temp].Volume);
                    position = temp;
                } 
                temp--;
            }

            return position;
        }

        private void setTopBanner(string range,ExcelWorksheet ws, int strLn, string[] colmnt,string header)
        {
            ws.Cells[range].Merge = true;
            ws.Cells[range].Value = header;
            ws.Cells[range].Style.Fill.PatternType = ExcelFillStyle.Solid;
            ws.Cells[range].Style.Fill.BackgroundColor.SetColor(ColorTranslator.FromHtml("#BE0000"));
            ws.Cells[range].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
            ws.Cells[range].Style.Font.Color.SetColor(Color.White);
            ws.Cells[range].Style.Font.Bold = true;
        }

        private string getNumberforAlphabet(int num)
        {
            if (num > 26)
                return "z";
            Dictionary<int, string> alp = new Dictionary<int, string>() { { 1, "a" }, { 2, "b" }, { 3, "c" }, { 4, "d" }, { 5, "e" }, { 6, "f" }, { 7, "g" }, { 8, "h" }, { 9, "i" }, { 10, "j" }, { 11, "k" }, { 12, "l" }, { 13, "m" }, { 14, "n" }, { 15, "o" }, { 16, "p" }, { 17, "q" }, { 18, "r" }, { 19, "s" }, { 20, "t" }, { 21, "u" }, { 22, "v" }, { 23, "w" }, { 24, "x" }, { 25, "y" }, { 26, "z" } };
            string value = "";
            alp.TryGetValue(num, out value);
            return value;
        }
        private double? isNullorEmpty(dynamic val,int round=0)
        {
            if (val == null ||Convert.ToString(val).Trim() == "")
                return null;

            return Math.Round(Convert.ToDouble(val), round);
        }

        private static void setHeadercell(bool HorCenter, bool wrptext, ExcelWorksheet ws, int strLn, int col, string colmn,dynamic index,bool percpostfix=false,double? fitscore=null)
        {
            ws.Cells[strLn, col].Value = colmn + ((percpostfix==true)?"%":"");
            ws.Cells[strLn, col].Style.Border.Bottom.Style = OfficeOpenXml.Style.ExcelBorderStyle.Thin;
            ws.Cells[strLn, col].Style.Border.Top.Style = OfficeOpenXml.Style.ExcelBorderStyle.Thin;
            ws.Cells[strLn, col].Style.Border.Right.Style = OfficeOpenXml.Style.ExcelBorderStyle.Thin;
            ws.Cells[strLn, col].Style.Border.Left.Style = OfficeOpenXml.Style.ExcelBorderStyle.Thin;
            ws.Cells[strLn, col].Style.Font.Size = 10;
            if (HorCenter == true)
                ws.Cells[strLn, col].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
            if (wrptext == true)
                ws.Cells[strLn, col].Style.WrapText = true;

            if (index != null)
            {

                if (Convert.ToDouble(fitscore) > 50 && index > 120)
                {
                    ws.Cells[strLn, col].Style.Fill.PatternType = ExcelFillStyle.Solid;
                    ws.Cells[strLn, col].Style.Fill.BackgroundColor.SetColor(ColorTranslator.FromHtml("#9DBD96"));
                }
                if (Convert.ToDouble(fitscore) > 50 && index < 120)
                {
                    ws.Cells[strLn, col].Style.Fill.PatternType = ExcelFillStyle.Solid;
                    ws.Cells[strLn, col].Style.Fill.BackgroundColor.SetColor(ColorTranslator.FromHtml("#FEC84F"));
                }
                if (Convert.ToDouble(fitscore) < 50 && index > 120)
                {
                    ws.Cells[strLn, col].Style.Fill.PatternType = ExcelFillStyle.Solid;
                    ws.Cells[strLn, col].Style.Fill.BackgroundColor.SetColor(ColorTranslator.FromHtml("#DDDDDD"));
                }
                if (Convert.ToDouble(fitscore) < 50 && index < 120)
                {
                    ws.Cells[strLn, col].Style.Fill.PatternType = ExcelFillStyle.Solid;
                    ws.Cells[strLn, col].Style.Fill.BackgroundColor.SetColor(ColorTranslator.FromHtml("#FFFFFF"));
                }
            }

        }

    [HttpGet]
        public dynamic ExcelDownload()
        {
            try
            {
                MemoryStream stream = (MemoryStream)Session["ExcelFileStream"];
                // download file
                stream.Position = 0;
                return File(stream, "application/octet-stream", Session["Filename"].ToString());
            }
            catch (Exception ex)
            {
                // handle exception here
                return Redirect("../?error=" + ex.Message);
            }
        }


        #endregion
    }
}