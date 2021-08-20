using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EuromonitorWebAPI.Models
{
    public class ApplicationUserModel
    {
        public string UserName { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public string Firstname { get; set; }

        public string Lastname { get; set; }

    }
}
