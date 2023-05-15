using CBL_Global.CommonFilters;
using CBLGlobal.MODELS.EntityModel;
using CBLGlobalBAL;
using CBLGlobalBAL.Interfaces;
using CBLGlobalDAL;
using Newtonsoft.Json;
using System;
using System.Data;
using System.Web.Mvc;

namespace CBL_Global.Controllers
{
    [SessionExpire]
    public class FiveWProfileController : Controller
    {
        // GET: FiveWProfile

        IFiveWProfile FiveWProfileObj = new FiveWProfile();
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult Get5WData(CBLSelectionEntity CBL_SelectionEntity,string filterSelectionList,bool overwirtemenu)
        {
            if (!ModelState.IsValid)
                return Json(new { result = "SessionExpired", url = Url.Action("Login", "Login") });
            if (overwirtemenu == true)
                SaveAsJSON(filterSelectionList);
            FiveWProfileEntity FiveWProfileEntityObj = FiveWProfileObj.Get5WData(CBL_SelectionEntity);
            var json_result = Json(FiveWProfileEntityObj, JsonRequestBehavior.AllowGet);
            return json_result;
        }
        public DataSet Get5WExcelData(CBLSelectionEntity CBL_SelectionEntity)
        {
            //if (!ModelState.IsValid)
            //    return Json(new { result = "SessionExpired", url = Url.Action("Login", "Login") });
            DataSet ds = new DataSet();
             ds = FiveWProfileObj.Get5WExcelData(CBL_SelectionEntity);   
            return ds;
        }
        public void SaveAsJSON(string Data)
        {
            try
            {   string json = JsonConvert.SerializeObject(Data);
                if (Session[SessionVariables.User_Details] != null)
                {
                    string UserName = ((UserEntity)(Session[SessionVariables.User_Details])).Username;
                    CommonFunctions.SaveAsJson(json, UserName, Server.MapPath(@"..\UserJson\"), ViewNames.FiveW);
                }
            }
            catch (Exception ex)
            {
            }
        }

        
    }
}