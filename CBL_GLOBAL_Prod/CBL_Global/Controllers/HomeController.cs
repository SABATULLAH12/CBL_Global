using CBL_Global.CommonFilters;
using CBLGlobalDAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CBL_Global.Controllers
{
    [SessionExpire]
    public class HomeController : Controller
    {
        public ActionResult Home()
        {
            return View();
        }     
    }
}