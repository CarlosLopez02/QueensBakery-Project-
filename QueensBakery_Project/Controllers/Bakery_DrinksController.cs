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
    public class Bakery_DrinksController : ApiController
    {
        private QueensBakeryEntities db = new QueensBakeryEntities();

        // GET: api/Bakery_Drinks
        public IQueryable<Bakery_Drinks> GetBakery_Drinks()
        {
            return db.Bakery_Drinks.Include(u => u.Promos_discounts); 
        }

        // GET: api/Bakery_Drinks/5
        [ResponseType(typeof(Bakery_Drinks))]
        public async Task<IHttpActionResult> GetBakery_Drinks(string id)
        {
           

            var Drinks = await db.Bakery_Drinks
                              .Include(u => u.Promos_discounts)
                              .FirstOrDefaultAsync(u => u.Drink_code == id);
            if (Drinks == null)
            {
                return NotFound();
            }

            return Ok(Drinks);

        }

        // PUT: api/Bakery_Drinks/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutBakery_Drinks(string id, Bakery_Drinks bakery_Drinks)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != bakery_Drinks.Drink_code)
            {
                return BadRequest();
            }

            db.Entry(bakery_Drinks).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Bakery_DrinksExists(id))
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

        // POST: api/Bakery_Drinks
        [ResponseType(typeof(Bakery_Drinks))]
        public async Task<IHttpActionResult> PostBakery_Drinks(Bakery_Drinks bakery_Drinks)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Bakery_Drinks.Add(bakery_Drinks);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (Bakery_DrinksExists(bakery_Drinks.Drink_code))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = bakery_Drinks.Drink_code }, bakery_Drinks);
        }

        // DELETE: api/Bakery_Drinks/5
        [ResponseType(typeof(Bakery_Drinks))]
        public async Task<IHttpActionResult> DeleteBakery_Drinks(string id)
        {
            Bakery_Drinks bakery_Drinks = await db.Bakery_Drinks.FindAsync(id);
            if (bakery_Drinks == null)
            {
                return NotFound();
            }

            db.Bakery_Drinks.Remove(bakery_Drinks);
            await db.SaveChangesAsync();

            return Ok(bakery_Drinks);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool Bakery_DrinksExists(string id)
        {
            return db.Bakery_Drinks.Count(e => e.Drink_code == id) > 0;
        }
    }
}