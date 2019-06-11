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
            context.Database.EnsureCreated();
            IQueryable<SongRequest> query = context.songRequest;
            SongRequest[] database = query.ToArray();
            //if (!context.songRequest.Any())
            if (database.Length == 0)
            {
                var song1 = new SongRequest()
                {
                    SongId = "60572fab-c835-4733-aa5a-2864c318c9c8",
                    ListPlace = 0,
                    RequestAmount = 3
                };

                var song2 = new SongRequest()
                {
                    SongId = "ecfa6746-7bc4-4088-ace6-d209477bd63f",
                    ListPlace = 1,
                    RequestAmount = 2
                };

                context.songRequest.Add(song1);
                context.songRequest.Add(song2);
                context.SaveChanges();
            }
        }
    }
}
