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
    public class Client_BillController : ApiController
    {
        private QueensBakeryEntities db = new QueensBakeryEntities();
        // GET: api/Client_Bill
        public IQueryable<Client_Bill> GetClient_Bill()
        {
            return db.Client_Bill
                .Include(b => b.payment_methods1)
                .Include(b => b.Promos_discounts)
                .Include(b => b.Client_Order)
                  .Include("Client_Order.Bakery_Desserts ")
                  .Include("Client_Order.Bakery_Drinks ")
                  .Include("Client_Order.Bakery_clients");


        }

        // GET: api/Client_Bill/5
        [ResponseType(typeof(Client_Bill))]
        public async Task<IHttpActionResult> GetClient_Bill(string id)
        {
            //Client_Bill client_Bill = await db.Client_Bill.FindAsync(id);
            //if (client_Bill == null)
            //{
            //    return NotFound();
            //}

            //return Ok(client_Bill);

            var clientBill = await db.Client_Bill
                            .Include(b => b.payment_methods1) 
                            .Include(b => b.Promos_discounts)
                            .Include(b => b.Client_Order)
                             .Include("Client_Order.Bakery_Desserts ")
                            .Include("Client_Order.Bakery_Drinks ")
                            .Include("Client_Order.Bakery_clients")
                            .FirstOrDefaultAsync(b => b.Bill_Code == id); 

            if (clientBill == null)
            {
                return NotFound();
            }

            return Ok(clientBill);
        }

        // PUT: api/Client_Bill/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutClient_Bill(string id, Client_Bill client_Bill)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != client_Bill.Bill_Code)
            {
                return BadRequest();
            }

            db.Entry(client_Bill).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Client_BillExists(id))
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

        // POST: api/Client_Bill
        [ResponseType(typeof(Client_Bill))]
        public async Task<IHttpActionResult> PostClient_Bill(Client_Bill client_Bill)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Client_Bill.Add(client_Bill);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (Client_BillExists(client_Bill.Bill_Code))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = client_Bill.Bill_Code }, client_Bill);
        }

        // DELETE: api/Client_Bill/5
        [ResponseType(typeof(Client_Bill))]
        public async Task<IHttpActionResult> DeleteClient_Bill(string id)
        {
            Client_Bill client_Bill = await db.Client_Bill.FindAsync(id);
            if (client_Bill == null)
            {
                return NotFound();
            }

            db.Client_Bill.Remove(client_Bill);
            await db.SaveChangesAsync();

            return Ok(client_Bill);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool Client_BillExists(string id)
        {
            return db.Client_Bill.Count(e => e.Bill_Code == id) > 0;
        }
    }
}