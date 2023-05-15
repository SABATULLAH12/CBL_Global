using CBLGlobal.MODELS.EntityModel;
using CBLGlobalBAL;
using CBLGlobalDAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CBL_Global.Controllers
{
    public class LoginController : Controller
    {       
        // GET: Login
        public ActionResult Login()
        {            
            ClearSession();
            return View();
        }

        public string GetAuthorization(LoginRequest request)
        {
            User user = new CBLGlobalBAL.User();
            string response = "0";
            Session[SessionVariables.User_Details] = null;
            UserEntity UserObj = user.ValidateUser(request.username, request.password);
            if(UserObj != null)
            {
                response = "1";
                Session[SessionVariables.User_Details] = UserObj;
            }
            return response;
        }
        private void ClearSession()
        {
            Session.Clear();
            Session.RemoveAll();
        }
    }
}