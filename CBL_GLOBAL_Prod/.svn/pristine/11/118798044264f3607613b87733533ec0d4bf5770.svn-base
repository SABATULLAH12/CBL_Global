using CBL_Global.CommonFilters;
using CBLGlobal.MODELS.EntityModel;
using CBLGlobalBAL;
using CBLGlobalBAL.Interfaces;
using CBLGlobalDAL;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CBL_Global.Controllers
{
    [SessionExpire]
    public class BrandFitAnalysisController : Controller
    {
        IBrandFitAnalysis BrandFitAnalysisObj = new BrandFitAnalysis();
        // GET: BrandFitAnalysis
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult DeepDive()
        {
            return View();
        }
        [HttpPost]
        public JsonResult GetAnalysisData(CBLSelectionEntity CBL_SelectionEntity, string filterSelectionList,bool overwirtemenu)
        {         
            if (!ModelState.IsValid)
                return Json(new { result = "SessionExpired", url = Url.Action("Login", "Login") });
            if (overwirtemenu == true)
                SaveAsJSON(filterSelectionList);
            BrandFitEntity BrandFitEntityObj = BrandFitAnalysisObj.GetAnalysisData(CBL_SelectionEntity);
            var json_result = Json(BrandFitEntityObj, JsonRequestBehavior.AllowGet);
            return json_result;
        }
        [HttpPost]
        public DataSet GetAnalysisExcelData(CBLSelectionEntity CBL_SelectionEntity)
        {
            DataSet ds = new DataSet();
            ds = BrandFitAnalysisObj.GetAnalysisExcelData(CBL_SelectionEntity);
            return ds;
        }

        [HttpPost]
        public JsonResult GetDeepDiveData(CBLSelectionEntity CBL_SelectionEntity)
        {
            if (!ModelState.IsValid)
                return Json(new { result = "SessionExpired", url = Url.Action("Login", "Login") });

            BrandFitDeepDiveEntity BrandFitEntityObj = BrandFitAnalysisObj.GetDeepDiveData(CBL_SelectionEntity);
            var json_result = Json(BrandFitEntityObj, JsonRequestBehavior.AllowGet);
            return json_result;
        }
        public void SaveAsJSON(string Data)
        {
            try
            {
                string json = JsonConvert.SerializeObject(Data);
                if (Session[SessionVariables.User_Details] != null)
                {
                    string UserName = ((UserEntity)(Session[SessionVariables.User_Details])).Username;
                    CommonFunctions.SaveAsJson(json, UserName, Server.MapPath(@"..\UserJson\"), ViewNames.AdvancedAnalytics);
                }
            }
            catch (Exception ex)
            {
            }
        }
    }
}