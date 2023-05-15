using CBLGlobalDAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CBL_Global.CommonFilters
{
    public class SessionExpireAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            if (HttpContext.Current.Session[SessionVariables.User_Details] == null)
            {
                if (filterContext.HttpContext.Request.IsAjaxRequest())
                    filterContext.Controller.ViewData.ModelState.AddModelError("Session-Expired", "User Session Expired");
                else
                {
                    HttpContext.Current.Response.Redirect("~/Login/Login");
                }
            }
            base.OnActionExecuting(filterContext);
        }
    }
}