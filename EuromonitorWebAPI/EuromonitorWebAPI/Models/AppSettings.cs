using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EuromonitorWebAPI.Models
{
    public class AppSettings
    {
        public String JWTSecret { get; set; }

        public String ClientURL { get; set; }
    }
}
