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
    public class Client_OrderController : ApiController
    {
        private QueensBakeryEntities db = new QueensBakeryEntities();

        // GET: api/Client_Order
        public IQueryable<Client_Order> GetClient_Order()
        {
            return db.Client_Order
                .Include(c => c.Bakery_clients)
                .Include(c=>c.Bakery_Drinks)
                .Include(c=>c.Bakery_Desserts);
        }

        // GET: api/Client_Order/5
        [ResponseType(typeof(Client_Order))]
        public async Task<IHttpActionResult> GetClient_Order(int id)
        {
            
            var clients_order = await db.Client_Order
                                  .Include(c => c.Bakery_clients)
                                  .Include(c => c.Bakery_Drinks)
                                  .Include(c => c.Bakery_Desserts)
                                  .FirstOrDefaultAsync(c => c.Order_number == id);

            if (clients_order == null)
            {
                return NotFound();
            }

            return Ok(clients_order);

        }

        // PUT: api/Client_Order/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutClient_Order(int id, Client_Order client_Order)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != client_Order.Order_number)
            {
                return BadRequest();
            }

            db.Entry(client_Order).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Client_OrderExists(id))
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

        // POST: api/Client_Order
        [ResponseType(typeof(Client_Order))]
        public async Task<IHttpActionResult> PostClient_Order(Client_Order client_Order)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Client_Order.Add(client_Order);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (Client_OrderExists(client_Order.Order_number))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = client_Order.Order_number }, client_Order);
        }

        // DELETE: api/Client_Order/5
        [ResponseType(typeof(Client_Order))]
        public async Task<IHttpActionResult> DeleteClient_Order(int id)
        {
            Client_Order client_Order = await db.Client_Order.FindAsync(id);
            if (client_Order == null)
            {
                return NotFound();
            }

            db.Client_Order.Remove(client_Order);
            await db.SaveChangesAsync();

            return Ok(client_Order);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool Client_OrderExists(int id)
        {
            return db.Client_Order.Count(e => e.Order_number == id) > 0;
        }
    }
}