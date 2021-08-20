using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace EuromonitorWebAPI.Models
{
    public class AppUser : IdentityUser
    {
        [Column(TypeName="nvarchar(150)")]
        public string Firstname { get; set; }

        [Column(TypeName = "nvarchar(150)")]
        public string Lastname { get; set; }
    }
}
