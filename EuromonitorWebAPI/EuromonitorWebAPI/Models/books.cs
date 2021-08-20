using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EuromonitorWebAPI.Models
{
    public class books
    {
        [Key]
        public int bookId { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string Name { get; set; }

        [Column(TypeName = "nvarchar(n)")]
        public string Text { get; set; }

        [Column(TypeName = "int")]
        public int Price { get; set; }
    }
}
