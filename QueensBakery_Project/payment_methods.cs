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
    
    public partial class payment_methods
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public payment_methods()
        {
            this.Client_Bill = new HashSet<Client_Bill>();
        }
    
        public string ID_method { get; set; }
        public string pay_descrip { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Client_Bill> Client_Bill { get; set; }
    }
}
