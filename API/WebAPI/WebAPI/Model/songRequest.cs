using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Model
{
    public class SongRequest
    {
        public int Id { get; set; }
        public string SongId { get; set; }
        public int RequestAmount { get; set; }
        public int ListPlace { get; set; }
    }
}
