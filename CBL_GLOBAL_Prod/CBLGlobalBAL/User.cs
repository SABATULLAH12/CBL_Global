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
    public class User : IUser
    {
        DataAccess da = new DataAccess(SQLFactory.SQLConnectionString);
        DataSet ds = null;     
        public UserEntity ValidateUser(string Username,string Password)
        {
            UserEntity UserObj = null;
            try
            {
                object[] paramValues = new object[] { Username, Password };
                ds = da.GetData(paramValues, SPVariables.SP_validateUser);
                if(ds != null && ds.Tables.Count > 0)
                {
                    UserObj = new UserEntity()
                    {
                        Username= Username,
                        Email=Convert.ToString(ds.Tables[0].Rows[0]["Email"]),
                        Role = Convert.ToString(ds.Tables[0].Rows[0]["UserRole"])
                    };
                }
            }
            catch(Exception ex)
            {
                throw ex;
            }
            return UserObj;
        }
    }
}
