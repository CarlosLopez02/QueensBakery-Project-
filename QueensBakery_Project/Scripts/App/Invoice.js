const urf = '/api/Client_Bill';
const Orders = '/api/Client_Order';

let invoices = [];
let currentInvoice = [];

let ordersArray = [];
let contain = 0;

const myRolInvoice = localStorage.getItem("myRol");


//Use Get (HTTP) invoice data
function getInvoices() {
    fetch(urf)
        .then(response => response.json())
        .then(data => {
            invoices = data;
            ShowInvoice(invoices);

        })
        .then(useRol)
        .catch(error => console.error('Failed to load data', error));
}


function loadData() {
    fetch(Orders)
        .then(response => response.json())  
        .then(ordersData => {  
            ordersArray = ordersData;
            console.log('Data loaded successfully');
            console.log(ordersArray);
        })
        .catch(error => console.error('Failed to load data', error));  
}



//Function to add invoices
function addInvoice() {
    const addBillcodextb = document.getElementById('InvoiceID');
    const addDCustomerIDTxtb = document.getElementById('CustomerID');
    const addOrderNumTxtb = document.getElementById('OrderNum');
    const addPaymentTxtb = document.getElementById('Payment');
    const addPromoTxtb = document.getElementById('Promo');
    const addDateTxtb = document.getElementById('DateInvoice');
    //const addsubtotaltxtb = document.getElementById('subtotal');
    //const addisvtxtb = document.getElementById('isv');
   // const addTotaltxtb = document.getElementById('total');

  

    if (
        !addBillcodextb.value.trim() ||
        !addDCustomerIDTxtb.value.trim() ||
        !addOrderNumTxtb.value.trim() ||
        !addPaymentTxtb.value.trim() ||
       // !addPromoTxtb.value.trim() ||
        !addDateTxtb.value.trim() 
        //!addsubtotaltxtb.value.trim() ||
        //!addisvtxtb.value.trim() 
        //!addTotaltxtb.value.trim()
    ) {
        alert("Please fill out all fields before submitting.");
        return;
    }


   

    const item = {
        Bill_Code: addBillcodextb.value.trim(),
        Client_ID: addDCustomerIDTxtb.value.trim(),
        Bill_orderNum: addOrderNumTxtb.value.trim(),
        Payment_methods: addPaymentTxtb.value.trim(),
        ID_promo_disc: addPromoTxtb.value.trim(),
        Bill_date: addDateTxtb.value.trim(),
        Subtotal: subTotal(parseInt(addOrderNumTxtb.value.trim()))/*parseFloat(addsubtotaltxtb.value.trim())*/,
        Sales_taxes: 0.12,
        Total: Total(parseInt(addOrderNumTxtb.value.trim())) //parseFloat(addTotaltxtb.value.trim())
    };

    

    fetch(urf, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })

        .then(response => response.json())
        .then(() => {
           
            alert("Invoice add correctly");
            getInvoices();
            addBillcodextb.value = '';
            addDCustomerIDTxtb.value = '';
            addOrderNumTxtb.value = '';
            addPaymentTxtb.value = '';
            addPromoTxtb.value = '';
            addDateTxtb.value = '';
            //addsubtotaltxtb.value = '';
            //addisvtxtb.value = '';
            //addTotaltxtb.value = '';
        })

        .catch(error => {
            console.error('Error updating data:', error);
        });


}






function subTotal(num) {

    const item = ordersArray.find(item => item.Order_number === num); 

    //subtotal and prices with discounts applied
    let subtotal = 0;
    let dessert = 0;
    let drink = 0;
    let discount = 0;
    

    //for desserts
    if (item.Order_dessertId != null) {
        const DessertPrice = item.Bakery_Desserts.Dessert_Unit_price;
        const quantity_desserts = item.Order_quantity_Dessert;

        //calc dessert
            if (item.Bakery_Desserts.ID_promo_disc != null) {
                const discount_dessert = item.Bakery_Desserts.Promos_discounts.PD_Percentage;
                dessert = DessertPrice - (DessertPrice * (discount_dessert / 100));
                dessert *= quantity_desserts;
            } else {
                dessert = DessertPrice;
                dessert *= quantity_desserts;
            }
         
    }

    if (item.Order_drinkCode != null) {
        const DrinkPrice = item.Bakery_Drinks.Drink_price;
        const quantity_drink = item.Order_quantity_Drinks;
        //calc drinks
        if (item.Bakery_Drinks.ID_promo_disc != null) {
            const discount_drink = item.Bakery_Drinks.Promos_discounts.PD_Percentage;
            drink = DrinkPrice - (DrinkPrice * (discount_drink / 100));
            drink *= quantity_drink;
        } else {
            drink = DrinkPrice;
            drink *= quantity_drink;
        }
    }

   

   
    if (item.Bakery_clients.ID_promo_desc != null) {
        const discountClient = item.Bakery_clients.Promos_discounts.PD_Percentage;
        discount = discountClient;
        discount = discount / 100;
    } 
   
   
  
    subtotal = dessert + drink;

    subtotal -= (subtotal * discount);

    
    console.log('Subtotal:', subtotal);


    contain = subtotal;

    return subtotal;
}




function Total(num) {
    const item = ordersArray.find(item => item.Order_number === num); 

    let subtotal = contain ;

    let isv = 0.12;

 
    isv *= subtotal;
    

    subtotal += isv;


    return subtotal;
}



//Function to modify invoices

//Update invoice
function updateInvoice() {
    const Invoice_ID = document.getElementById('EditinCode').value;
    const item = {
        Bill_Code: Invoice_ID,
        Client_ID: document.getElementById('EditCustomer').value.trim(),
        Bill_orderNum: document.getElementById('editOrdernum').value.trim(),
        Payment_methods: document.getElementById('editPayment').value.trim(),
        ID_promo_disc: document.getElementById('editPromo').value.trim(),
        Bill_date: document.getElementById('editDate').value.trim(),
        Subtotal: document.getElementById('editsubtotal').value.trim(),
        Sales_taxes: document.getElementById('edittaxes').value.trim(),
        Total: document.getElementById('edittotal').value.trim()
    };
    fetch(`${urf}/${Invoice_ID}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(() => getInvoices())
        .catch(error => console.error('Failed to update Invoice', error));
    closeInput();
    return false;
}


//function show all Invoices
function ShowInvoice(data) {
    const tBody = document.getElementById('DetInvoice');
    tBody.innerHTML = ' ';
    showCounter(data.length);
    currentInvoice = data;
    const button = document.createElement('button');
    data.forEach(item => {
        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';

        editButton.setAttribute('onclick', `
            if (${myRolInvoice == 1}) {
                displayEditFormInvoice('${item.Bill_Code}');
            } else {
                alert('You dont have access');
            }
        `);

        let DeleteButton = button.cloneNode(false);
        DeleteButton.innerText = 'Delete';

        DeleteButton.setAttribute('onclick', `
            if (${myRolInvoice == 1}) {
                deleteInvoice('${item.Bill_Code}');
            } else {
                alert('You dont have access');
            }
        `);
        let tr = tBody.insertRow();
        //
        let td1 = tr.insertCell(0);
        let txtBillcode = document.createTextNode(item.Bill_Code);
        td1.appendChild(txtBillcode);
        //
        let td2 = tr.insertCell(1);
        let txtclientID = document.createTextNode(item.Client_ID);
        td2.appendChild(txtclientID);
        //
        let td3 = tr.insertCell(2);
        let txtOrdnum = document.createTextNode(item.Bill_orderNum);
        td3.appendChild(txtOrdnum);
        //
        let td4 = tr.insertCell(3);
        let txtpaymentM = document.createTextNode(item.Payment_methods);
        td4.appendChild(txtpaymentM);
        //
        let td5 = tr.insertCell(4);
        let txtpromodis = document.createTextNode(item.ID_promo_disc);
        td5.appendChild(txtpromodis);
        //
        let td6 = tr.insertCell(5);
        let txtBdate = document.createTextNode(item.Bill_date);
        td6.appendChild(txtBdate);
        //
        let td7 = tr.insertCell(6);
        let txtsubtotal = document.createTextNode(item.Subtotal);
        td7.appendChild(txtsubtotal);
        //
        let td8 = tr.insertCell(7);
        let txtisv = document.createTextNode(item.Sales_taxes);
        td8.appendChild(txtisv);
        //
        let td9 = tr.insertCell(8);
        let txttotal = document.createTextNode(item.Total);
        td9.appendChild(txttotal);
        //
        let td10 = tr.insertCell(9);
        td10.appendChild(editButton);
        //
        let td11 = tr.insertCell(10);
        td11.appendChild(DeleteButton);

        console.log(`Value being passed: ${item.Bill_Code}`);


    })

    //invoices = data;
    console.log(myRolInvoice);
  

}

//Delete Customer
function deleteInvoice(Invoice_ID) {
    fetch(`${urf}/${Invoice_ID}`, {
        method: 'DELETE'
    })
        .then(() => getInvoices())
        .catch(error => console.error('Error on delete Invoice', error));
}

//Show edit Form SECTION
function displayEditFormInvoice(InvoiceID) {

    const item = invoices.find(item => item.Bill_Code === InvoiceID);


    document.getElementById('EditinCode').value = item.Bill_Code;
    document.getElementById('EditCustomer').value = item.Client_ID;
    document.getElementById('editOrdernum').value = item.Bill_orderNum;
    document.getElementById('editPayment').value = item.Payment_methods;
    document.getElementById('editPromo').value = item.ID_promo_disc;
    document.getElementById('editDate').value = item.Bill_date;
    document.getElementById('editsubtotal').value = item.Subtotal;
    document.getElementById('edittaxes').value = item.Sales_taxes;
    document.getElementById('edittotal').value = item.Total;

    document.getElementById('Invoice-Edit').style.display = 'block';
}

//function show Qty invoices register
function showCounter(itemCount) {
    const name = (itemCount === 1) ? 'Register' : 'Registers';
    document.getElementById('counter').innerText = `${itemCount} ${name}`;
}

function closeInput() {
    document.getElementById('Invoice-Edit').style.display = 'none';
}


function searchInvoices() {
    const searchValue = document.getElementById('SearcInvoices').value.trim().toLowerCase();
    const searchValueNum = parseFloat(searchValue);

    if (searchValue === "") {
        ShowInvoice(invoices);
        return;
    }

    const filteredInvoices = invoices.filter(invoice =>
        invoice.Bill_Code.trim().toLowerCase() === (searchValue) ||
        invoice.Bill_orderNum === (searchValueNum) ||
        invoice.Payment_methods.trim().toLowerCase() === (searchValue) ||
        invoice.ID_promo_disc.trim().toLowerCase() === (searchValue) ||
        invoice.Bill_date.trim().toLowerCase() === (searchValue) ||
        invoice.Subtotal === (searchValueNum) ||
        invoice.Sales_taxes === (searchValueNum) ||
        invoice.Total === (searchValueNum) ||
        invoice.Client_ID.trim().toLowerCase() === (searchValue)
    );

    if (filteredInvoices.length === 0) {
        document.getElementById('DetInvoice').innerHTML = '<tr><td colspan="7">No Invoice found.</td></tr>';
    } else {
        ShowInvoice(filteredInvoices);
    }
}



function useRol() {

    if (myRolInvoice == 2) {
        document.getElementById('Invoice-Add').style.display = 'none';
        document.getElementById('Invoice-Edit').style.display = 'none';
        document.getElementById('Invoice-Edit').style.pointerEvents = 'none';
        document.getElementById('Invoice-Edit').style.opacity = 0.15;
    }
    else if (myRolInvoice == 3) {
        document.getElementById('Invoice-Edit').style.display = 'none';
        document.getElementById('SearchInvoices').style.display = 'none';
        document.getElementById('Invoice-Edit').style.pointerEvents = 'none';
        document.getElementById('Invoice-Edit').style.opacity = 0.15;
    }


}