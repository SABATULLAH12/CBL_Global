using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace CBL_Global.Controllers
{
    public class CommonFunctions
    {
        public static void SaveAsJson(string json, string UserName, string path, string ViewName)
        {
            if (UserName.Contains("@"))
                UserName = UserName.Substring(0, UserName.IndexOf("@"));

            if (!Directory.Exists(path + UserName))
                System.IO.Directory.CreateDirectory(path + UserName);
            File.WriteAllText(path + UserName + @"\" + ViewName + ".json", json);
        }
    }
}