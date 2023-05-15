using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Practices.EnterpriseLibrary.Data.Sql;
using System.Data.Common;

namespace CBLGlobalDAL
{
   public class DataAccess : BaseDal
    {       
        public DataAccess(string _connectionString) : base(_connectionString)
        {
        }

        public override DataSet GetData(object[] objParameters, string strSPName)
        {          
            dsData = new DataSet();            
            database = new SqlDatabase(base.ConnectionString);
            sqlCmd = database.DbProviderFactory.CreateCommand();           
            sqlCmd = database.GetStoredProcCommand(strSPName, objParameters);
            sqlCmd.CommandType = CommandType.StoredProcedure;
            sqlCmd.CommandTimeout = 7200;

            try
            {              
                dsData = database.ExecuteDataSet(sqlCmd);
            }
            catch (Exception ex)
            {
                dsData = null;
                throw ex;
            }
            return dsData;
        }
        public override DataSet GetData(string strSPName)
        {
            dsData = new DataSet();
            database = new SqlDatabase(base.ConnectionString);
            try
            {
                dsData = database.ExecuteDataSet(strSPName);
            }
            catch (Exception ex)
            {
                dsData = null;
                throw ex;
            }
            return dsData;
        }
        public override int SaveData(object[] objParameters, string strSPName)
        {
            SqlDatabase database = new SqlDatabase(base.ConnectionString);
            return database.ExecuteNonQuery(strSPName, objParameters);
        }
    }
}
