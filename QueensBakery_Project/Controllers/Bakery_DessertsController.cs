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
    public class Bakery_DessertsController : ApiController
    {
        private QueensBakeryEntities db = new QueensBakeryEntities();

        // GET: api/Bakery_Desserts
        public IQueryable<Bakery_Desserts> GetBakery_Desserts()
        {
            return db.Bakery_Desserts.Include(u=>u.Promos_discounts);
        }

        // GET: api/Bakery_Desserts/5
        [ResponseType(typeof(Bakery_Desserts))]
        public async Task<IHttpActionResult> GetBakery_Desserts(string id)
        {
           

            var Desserts = await db.Bakery_Desserts
                                .Include(u => u.Promos_discounts)
                                .FirstOrDefaultAsync(u => u.Dessert_id == id);
            if (Desserts == null)
            {
                return NotFound();
            }

            return Ok(Desserts);
        }

        // PUT: api/Bakery_Desserts/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutBakery_Desserts(string id, Bakery_Desserts bakery_Desserts)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != bakery_Desserts.Dessert_id)
            {
                return BadRequest();
            }

            db.Entry(bakery_Desserts).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Bakery_DessertsExists(id))
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

        // POST: api/Bakery_Desserts
        [ResponseType(typeof(Bakery_Desserts))]
        public async Task<IHttpActionResult> PostBakery_Desserts(Bakery_Desserts bakery_Desserts)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Bakery_Desserts.Add(bakery_Desserts);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (Bakery_DessertsExists(bakery_Desserts.Dessert_id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = bakery_Desserts.Dessert_id }, bakery_Desserts);
        }

        // DELETE: api/Bakery_Desserts/5
        [ResponseType(typeof(Bakery_Desserts))]
        public async Task<IHttpActionResult> DeleteBakery_Desserts(string id)
        {
            Bakery_Desserts bakery_Desserts = await db.Bakery_Desserts.FindAsync(id);
            if (bakery_Desserts == null)
            {
                return NotFound();
            }

            db.Bakery_Desserts.Remove(bakery_Desserts);
            await db.SaveChangesAsync();

            return Ok(bakery_Desserts);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool Bakery_DessertsExists(string id)
        {
            return db.Bakery_Desserts.Count(e => e.Dessert_id == id) > 0;
        }
    }
}