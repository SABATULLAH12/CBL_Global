using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBLGlobal.MODELS.EntityModel
{
    public class ExportPPTRequest
    {
        public string pageName { get; set; }
        public string imgBase64 { get; set; }
        public CBLSelectionEntity filter { get; set; }
       
    }

    public class ExportPPTResponse
    {
        public bool FileStatus { get; set; }
        public string FilePath { get; set; }
    }
}
