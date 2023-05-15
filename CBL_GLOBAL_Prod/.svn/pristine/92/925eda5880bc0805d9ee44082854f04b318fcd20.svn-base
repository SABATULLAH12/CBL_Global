using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBLGlobal.MODELS.EntityModel
{
    public class PanelInfo
    {
        public string Label { get; set; }      
        public bool HasSearchBox { get; set; }
        public List<PanelList> PanelPopup { get; set; }
        public bool Search { get; set; }
        public bool ClearAll { get; set; }
    }
    public class PanelList
    {
        public int Level { get; set; }
        public List<PanelData> Data { get; set; }
    }
    public class PanelData
    {
        public string Text { get; set; }       
        public string ID { get;set; }       
        public string ParentText { get; set; }             
        public int LevelId { get; set; }          
        public bool IsSelectable { get; set; }
        public string ButtonType { get; set; }
        public string Market { get; set; }
        public string Wave { get; set; }
        public bool HasSearchBox { get; set; }
    }
    public class ButtonTypes
    {
        public static string Radio {
            get
            {
                return "radio";
            }
        }
        public static string CheckBox
        {
            get
            {
                return "checkbox";
            }
        }
        public static string Menu
        {
            get
            {
                return "menu";
            }
        }
    }
}
