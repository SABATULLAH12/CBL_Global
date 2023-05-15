using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBLGlobal.MODELS.EntityModel
{
   public class LoginRequest
    {
        public string username { get; set; }
        public string password { get; set; }
    }
    public class UserEntity
    {
        public string Username { get; set; }      
        public string Email { get; set; }
        public string Role { get; set; }
    }
}
