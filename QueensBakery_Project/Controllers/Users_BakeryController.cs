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
    public class Users_BakeryController : ApiController
    {
        private QueensBakeryEntities db = new QueensBakeryEntities();

        // Constructor para desactivar la creación de proxies dinámicos
        public Users_BakeryController()
        {
            db.Configuration.ProxyCreationEnabled = false; // Desactivar proxies dinámicos
        }

        // GET: api/Users_Bakery
        public IQueryable<Users_Bakery> GetUsers_Bakery()
        {
            return db.Users_Bakerye.Include(u => u.Role);
        }

        // GET: api/Users_Bakery/5
        [ResponseType(typeof(Users_Bakery))]
        public async Task<IHttpActionResult> GetUsers_Bakery(string id)
        {
             var user = await db.Users_Bakerye
                                .Include(u => u.Role) 
                                .FirstOrDefaultAsync(u => u.User_code == id);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        // PUT: api/Users_Bakery/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutUsers_Bakery(string id, Users_Bakery users_Bakery)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != users_Bakery.User_code)
            {
                return BadRequest();
            }

            db.Entry(users_Bakery).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Users_BakeryExists(id))
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

        // POST: api/Users_Bakery
        [ResponseType(typeof(Users_Bakery))]
        public async Task<IHttpActionResult> PostUsers_Bakery(Users_Bakery users_Bakery)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Users_Bakerye.Add(users_Bakery);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (Users_BakeryExists(users_Bakery.User_code))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = users_Bakery.User_code }, users_Bakery);
        }

        // DELETE: api/Users_Bakery/5
        [ResponseType(typeof(Users_Bakery))]
        public async Task<IHttpActionResult> DeleteUsers_Bakery(string id)
        {
            Users_Bakery users_Bakery = await db.Users_Bakerye.FindAsync(id);
            if (users_Bakery == null)
            {
                return NotFound();
            }

            db.Users_Bakerye.Remove(users_Bakery);
            await db.SaveChangesAsync();

            return Ok(users_Bakery);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool Users_BakeryExists(string id)
        {
            return db.Users_Bakerye.Count(e => e.User_code == id) > 0;
        }
    }
}