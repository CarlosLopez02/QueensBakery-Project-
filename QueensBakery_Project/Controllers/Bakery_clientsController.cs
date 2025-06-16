using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using QueensBakery_Project;

namespace QueensBakery_Project.Controllers
{
    public class Bakery_clientsController : ApiController
    {
        private QueensBakeryEntities db = new QueensBakeryEntities();

        // GET: api/Bakery_clients
        public IQueryable<Bakery_clients> GetBakery_clients()
        {
            return db.Bakery_clients
             .Include(c => c.Promos_discounts) 
             .Include(c => c.Client_Order);
        }

        // GET: api/Bakery_clients/5
        [ResponseType(typeof(Bakery_clients))]
        public async Task<IHttpActionResult> GetBakery_clients(string id)
        {
            var bakery_clients = await db.Bakery_clients
                                  .Include(c => c.Promos_discounts)
                                  .Include(c => c.Client_Order)
                                  .FirstOrDefaultAsync(c => c.Client_ID == id);

            if (bakery_clients == null)
            {
                return NotFound();
            }

            return Ok(bakery_clients);
        }

        // PUT: api/Bakery_clients/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutBakery_clients(string id, Bakery_clients bakery_clients)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != bakery_clients.Client_ID)
            {
                return BadRequest();
            }

            db.Entry(bakery_clients).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Bakery_clientsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Bakery_clients
        [ResponseType(typeof(Bakery_clients))]
        public async Task<IHttpActionResult> PostBakery_clients(Bakery_clients bakery_clients)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Bakery_clients.Add(bakery_clients);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (Bakery_clientsExists(bakery_clients.Client_ID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = bakery_clients.Client_ID }, bakery_clients);
        }

        // DELETE: api/Bakery_clients/5
        [ResponseType(typeof(Bakery_clients))]
        public async Task<IHttpActionResult> DeleteBakery_clients(string id)
        {
            Bakery_clients bakery_clients = await db.Bakery_clients.FindAsync(id);
            if (bakery_clients == null)
            {
                return NotFound();
            }

            db.Bakery_clients.Remove(bakery_clients);
            await db.SaveChangesAsync();

            return Ok(bakery_clients);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool Bakery_clientsExists(string id)
        {
            return db.Bakery_clients.Count(e => e.Client_ID == id) > 0;
        }
    }
}