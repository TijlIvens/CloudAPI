using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Model
{
    public class DBInitializer
    {
        public static void Initialize(DatabaseContext context)
        {
            //Create the db if not yet exists
            context.Database.EnsureCreated();

            /*if (!context.songRequest.Any())
            {
                var song1 = new SongRequest()
                {
                    SongId = "4dfg45fg454g5df4g54d5g45d4g4dx6g54x6b4df54b3h484g35x4b",
                    ListPlace = 1,
                    RequestAmount = 1
                };

                var song2 = new SongRequest()
                {
                    SongId = "drg543g43q5z4y3ry4iyo7up457b1q6rt1j6rsyj1d6hqb1q64yhtu",
                    ListPlace = 1,
                    RequestAmount = 1
                };

                context.songRequest.Add(song1);
                context.songRequest.Add(song2);
                context.SaveChanges();
            }*/
        }
    }
}
