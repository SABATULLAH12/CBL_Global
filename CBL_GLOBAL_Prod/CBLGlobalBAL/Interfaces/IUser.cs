using CBLGlobal.MODELS.EntityModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBLGlobalBAL.Interfaces
{
    public interface IUser
    {
        UserEntity ValidateUser(string Username, string Password);
    }
}