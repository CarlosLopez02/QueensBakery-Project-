using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace QueensBakery_Project.Controllers
{
    public class ManageDataBakeryController : Controller
    {
        // GET: ManageDataBakery
        public ActionResult DessertData()
        {
            return View();
        }

        public ActionResult DrinksData()
        {
            return View();
        }

        public ActionResult CustomersData()
        {
            return View();
        }
        public ActionResult UserDataManager()
        {
            return View();
        }

        public ActionResult UserDataAdmin()
        {
            return View();
        }

        public ActionResult InvoiceData()
        {
            return View();
        }

        public ActionResult ClientOrderData()
        {
            return View();
        }

        public ActionResult ReportsView()
        {
            return View();
        }
    }
}