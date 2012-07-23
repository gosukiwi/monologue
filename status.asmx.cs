using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;

namespace BackboneJS
{
    [WebService(Namespace = "http://gosukiwi.blogspot.com/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    [System.Web.Script.Services.ScriptService]
    public class status : System.Web.Services.WebService
    {
        [WebMethod]
        public string echo(string text)
        {
            return text;
        }
    }
}
