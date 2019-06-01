using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Model;

namespace WebAPI.Controllers
{
    [Route("api/songs")]
    [ApiController]
    public class SongRequestController : ControllerBase
    {
        public DatabaseContext context { get; set; }
        public SongRequestController(DatabaseContext ctxt)
        {
            context = ctxt;
        }
        [HttpGet]
        public List<SongRequest> GetSongs()
        {
            return context.songRequest.ToList();
        }

        [HttpPost]
        public ActionResult<IncommingSongRequest> AddBook([FromBody]IncommingSongRequest request)
        {
            IQueryable<SongRequest> query = context.songRequest;
            if (!string.IsNullOrWhiteSpace(request.SongId))
            {
                query = query.Where(d => d.SongId == request.SongId);
                SongRequest[] result = query.ToArray();
                if (result.Length > 0)
                {
                    IQueryable<SongRequest> query2 = context.songRequest;
                    query2 = query2.Where(d => d.ListPlace < result[0].ListPlace);
                    query2 = query2.Where(d => d.RequestAmount < (result[0].RequestAmount + 1));
                    var moveSongs = query2.ToArray();
                    int lowestPlace = result[0].ListPlace;
                    foreach (SongRequest moveSong in moveSongs)
                    {
                        if (moveSong.ListPlace < lowestPlace)
                            lowestPlace = moveSong.ListPlace;
                        moveSong.ListPlace++;
                    }
                    result[0].ListPlace = lowestPlace;
                    result[0].RequestAmount++;
                    context.SaveChanges();
                    return Ok(result[0]);
                }
                else
                {
                    SongRequest songRequest = new SongRequest { ListPlace = context.songRequest.ToArray().Length, RequestAmount = 1, SongId = request.SongId };
                    context.songRequest.Add(songRequest);
                    context.SaveChanges();
                    return Created("", songRequest);
                }
            }
            else
                return NotFound();
            
        }

        [Route("{id}")]
        [HttpDelete]
        public IActionResult DeleteSong(int id)
        {
            var theSong = context.songRequest.Find(id);
            if (theSong == null)
                return NotFound();
            context.songRequest.Remove(theSong);
            IQueryable<SongRequest> query = context.songRequest;
            query = query.Where(d => d.ListPlace > theSong.ListPlace);
            var results = query.ToArray();
            foreach (SongRequest result in results)
            {
                result.ListPlace--;
            }

            context.SaveChanges(); 
            return Ok(theSong);
        }
    }
}