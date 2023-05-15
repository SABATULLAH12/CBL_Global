using Microsoft.Practices.EnterpriseLibrary.Data.Sql;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBLGlobalDAL
{
    public abstract class BaseDal
    {       
        private string connectionString = null;
        public SqlDatabase database = null;
        public DbCommand sqlCmd = null;
        public DataSet dsData = null;
        public BaseDal(string _connectionString)
        {
            connectionString = ConfigurationManager.ConnectionStrings[_connectionString].ConnectionString;
        }
        protected string ConnectionString
        {
            get
            {
                return this.connectionString;
            }           
        }
        public abstract DataSet GetData(object[] objParameters, string strSPName);
        public abstract DataSet GetData(string strSPName);
        public abstract int SaveData(object[] objParameters, string strSPName);
    }
}
