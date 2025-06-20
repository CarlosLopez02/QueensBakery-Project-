//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace QueensBakery_Project
{
    using System;
    using System.Collections.Generic;
    
    public partial class Client_Order
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Client_Order()
        {
            this.Client_Bill = new HashSet<Client_Bill>();
        }
    
        public int Order_number { get; set; }
        public string Order_clientID { get; set; }
        public Nullable<System.DateTime> Order_date { get; set; }
        public string Order_dessertId { get; set; }
        public string Order_drinkCode { get; set; }
        public Nullable<int> Order_quantity_Drinks { get; set; }
        public Nullable<int> Order_quantity_Dessert { get; set; }
        public string employee_ID { get; set; }
    
        public virtual Bakery_clients Bakery_clients { get; set; }
        public virtual Bakery_Desserts Bakery_Desserts { get; set; }
        public virtual Bakery_Drinks Bakery_Drinks { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Client_Bill> Client_Bill { get; set; }
    }
}
