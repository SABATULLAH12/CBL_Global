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
    public class DrinkingMomentsDeepDiveController : Controller
    {
        IDrinkingMomentsDeepDive DrinkingMomentsDeepDiveObj = new DrinkingMomentsDeepDive();       
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult GetDMData(CBLSelectionEntity CBL_SelectionEntity, string filterSelectionList)
        {
            if (!ModelState.IsValid)
                return Json(new { result = "SessionExpired", url = Url.Action("Login", "Login") });
            SaveAsJSON(filterSelectionList);
            DrinkingMomentsDeepDiveEntity DrinkingMomentsDeepDiveEntityObj = DrinkingMomentsDeepDiveObj.GetDMData(CBL_SelectionEntity);
            var json_result = Json(DrinkingMomentsDeepDiveEntityObj, JsonRequestBehavior.AllowGet);
            return json_result;
        }

        public DataSet GetDMExcelData(CBLSelectionEntity CBL_SelectionEntity)
        {
            //if (!ModelState.IsValid)
            //    return Json(new { result = "SessionExpired", url = Url.Action("Login", "Login") });
            DataSet ds = new DataSet();
            ds = DrinkingMomentsDeepDiveObj.GetDMExcelData(CBL_SelectionEntity);
            return ds;
        }
        public void SaveAsJSON(string Data)
        {
            try
            {
                string json = JsonConvert.SerializeObject(Data);
                if (Session[SessionVariables.User_Details] != null)
                {
                    string UserName = ((UserEntity)(Session[SessionVariables.User_Details])).Username;
                    CommonFunctions.SaveAsJson(json, UserName, Server.MapPath(@"..\UserJson\"), ViewNames.DrinkingMomentsDeepdive);
                }
            }
            catch (Exception ex)
            {
            }
        }
    }
}