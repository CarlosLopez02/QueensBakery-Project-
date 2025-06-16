const urc = '/api/Bakery_clients';
let allCustomers = [];



const myRolCustomers = localStorage.getItem("myRol");



//Use Get (HTTP) customers data
function getCustomers() {
    fetch(urc)
        .then(response => response.json())
       .then(data => ShowCustomers(data))
        .then(useRol)
        .catch(error => console.error('Failed to load data', error));
}

//Function to add Customers
function addCustomer() {
    const addcusIDTxtb = document.getElementById('customerID');
    const addcusNameTxtb = document.getElementById('customerName');
    const addcusBirthTxtb = document.getElementById('customerBirth');
    const addcusAgeTxtb = document.getElementById('customerAge');
    const addcusGenreTxtb = document.getElementById('cusGenre');
    const addcusPhoneTxtb = document.getElementById('customerphone');
    const addcusAdresstxtb = document.getElementById('cusAdr');
    const addcuspromotxtb = document.getElementById('promocus');

    if (
        !addcusIDTxtb.value.trim() ||
        !addcusNameTxtb.value.trim() ||
        !addcusBirthTxtb.value.trim() ||
        !addcusAgeTxtb.value.trim() ||
        !addcusGenreTxtb.value.trim() ||
        !addcusPhoneTxtb.value.trim() ||
        !addcusAdresstxtb.value.trim() ||
        !addcuspromotxtb.value.trim()
    ) {
        alert("Please fill out all fields before submitting.");
        return;
    }

    const item = {
        Client_ID: addcusIDTxtb.value.trim(),
        Client_name: addcusNameTxtb.value.trim(),
        Client_birth: addcusBirthTxtb.value.trim(),
        Client_age: addcusAgeTxtb.value.trim(),
        Client_genre: addcusGenreTxtb.value.trim(),
        Client_phone: addcusPhoneTxtb.value.trim(),
        Client_address: addcusAdresstxtb.value.trim(),
        ID_promo_desc: addcuspromotxtb.value.trim()
    };
    fetch(urc, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })

        .then(response => response.json())
        .then(() => {
            alert("Customer add correctly");
            addcusIDTxtb.value = '';
            addcusNameTxtb.value = ''; 
            addcusBirthTxtb.value = '';
            addcusAgeTxtb.value = '';
            addcusGenreTxtb.value = ''; 
            addcusPhoneTxtb.value = '';
            addcusAdresstxtb.value = ''; 
            addcuspromotxtb.value = '';
        })

        .catch(error => {
            console.error('Error updating data:', error);
        });



}


//Function to modify customers

//Update Customers
function updateCustomer() {
    const CustomerID = document.getElementById('EditcusID').value;
    const item = {
        Client_ID: CustomerID,
        Client_name: document.getElementById('editcusName').value.trim(),
        Client_birth: document.getElementById('editCustomerbirth').value.trim(),
        Client_age: document.getElementById('editcusAge').value.trim(),
        Client_genre: document.getElementById('editcusGenre').value.trim(),
        Client_phone: document.getElementById('editcusphone').value.trim(),
        Client_address: document.getElementById('editcusAdr').value.trim(),
        ID_promo_desc: document.getElementById('editpromocus').value.trim()
    };
    fetch(`${urc}/${CustomerID}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(() => getCustomers())
        .catch(error => console.error('Failed to update employee', error));
    closeInput();
    return false;
}


//function show all customers
function ShowCustomers(data) {
    const tBody = document.getElementById('DetCustomers');
    tBody.innerHTML = ' ';
    showCounter(data.length);
    const button = document.createElement('button');
    data.forEach(item => {
        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.setAttribute('onclick', `
            if (myRolCustomers == 1 || myRolCustomers == 2) {
               displayEditFormCustomer('${item.Client_ID}');
            } else {
                alert('You dont have access');
            }
        `);
      
        let DeleteButton = button.cloneNode(false);
        DeleteButton.innerText = 'Delete';
        DeleteButton.setAttribute('onclick', `
            if (myRolCustomers == 1 || myRolCustomers == 2) {
              deletecustomer('${item.Client_ID}');
            } else {
                alert('You dont have access');
            }
        `);
      
        let tr = tBody.insertRow();
        //
        let td1 = tr.insertCell(0);
        let txtCustomerId = document.createTextNode(item.Client_ID);
        td1.appendChild(txtCustomerId);
        //
        let td2 = tr.insertCell(1);
        let txtCustomerName = document.createTextNode(item.Client_name);
        td2.appendChild(txtCustomerName);
        //
        let td3 = tr.insertCell(2);
        let txtCustomerBirth = document.createTextNode(item.Client_birth);
        td3.appendChild(txtCustomerBirth);
        //
        let td4 = tr.insertCell(3);
        let txtCustomerAge = document.createTextNode(item.Client_age);
        td4.appendChild(txtCustomerAge);
        //
        let td5 = tr.insertCell(4);
        let txtCustomerGenre = document.createTextNode(item.Client_genre);
        td5.appendChild(txtCustomerGenre);
        //
        let td6 = tr.insertCell(5);
        let txtCustomerPhone = document.createTextNode(item.Client_phone);
        td6.appendChild(txtCustomerPhone);
        //
        let td7 = tr.insertCell(6);
        let txtCustomerAdress = document.createTextNode(item.Client_address);
        td7.appendChild(txtCustomerAdress);
        //
        let td8 = tr.insertCell(7);
        let txtCustomerPromo = document.createTextNode(item.ID_promo_desc);
        td8.appendChild(txtCustomerPromo);
        //
        let td9 = tr.insertCell(8);
        td9.appendChild(editButton);
        //
        let td10 = tr.insertCell(9);
        td10.appendChild(DeleteButton);

        console.log(`Value being passed: ${item.Client_ID}`);

    })
   
    allCustomers = data;
    console.log(allCustomers);


  

    console.log(myRolCustomers);

}

//Delete Customer
function deletecustomer(Customer_ID) {
    fetch(`${urc}/${Customer_ID}`, {
        method: 'DELETE'
    })
        .then(() => getDessert())
        .catch(error => console.error('Error on delete customer', error));
}

//Show edit Form SECTION
function displayEditFormCustomer(Customer_ID) {

    const item = allCustomers.find(item => item.Client_ID === Customer_ID);
   

    document.getElementById('EditcusID').value = item.Client_ID;
    document.getElementById('editcusName').value = item.Client_name;
    document.getElementById('editCustomerbirth').value = item.Client_birth;
    document.getElementById('editcusAge').value = item.Client_age;
    document.getElementById('editcusGenre').value = item.Client_genre;
    document.getElementById('editcusphone').value = item.Client_phone;
    document.getElementById('editcusAdr').value = item.Client_address;
    document.getElementById('editpromocus').value = item.ID_promo_desc;
    document.getElementById('Customer-Edit').style.display = 'block';
}

//function show Qty Desserts register
function showCounter(itemCount) {
    const name = (itemCount === 1) ? 'Register' : 'Registers';
    document.getElementById('counter').innerText = `${itemCount} ${name}`;
}

function closeInput() {
    document.getElementById('Customer-Edit').style.display = 'none';
}


function useRol() {

    if (myRolCustomers == 3) {
      
        document.getElementById('Customer-Edit').style.display = 'none';
        document.getElementById('Customer-Edit').style.pointerEvents = 'none';
        document.getElementById('Customer-Edit').style.opacity = 0.15;
    } 
}

//------------------------------------------------------------------------------------------------------------------------//

//function show all Invoices
//function ShowInvoice(data) {
//    const tBody = document.getElementById('DetInvoice');
//    tBody.innerHTML = ' ';
//    showCounter(data.length);
//    currentInvoice = data;
//    const button = document.createElement('button');
//    data.forEach(item => {
//        let editButton = button.cloneNode(false);
//        editButton.innerText = 'Edit';
//        editButton.setAttribute('onclick', `displayEditFormInvoice('${item.Bill_Code}')`);
//        let DeleteButton = button.cloneNode(false);
//        DeleteButton.innerText = 'Delete';
//        DeleteButton.setAttribute('onclick', `deleteInvoice('${item.Bill_Code}')`);
//        let tr = tBody.insertRow();
//        //
//        let td1 = tr.insertCell(0);
//        let txtBillcode = document.createTextNode(item.Bill_Code);
//        td1.appendChild(txtBillcode);
//        //
//        let td2 = tr.insertCell(1);
//        let txtclientID = document.createTextNode(item.Client_ID);
//        td2.appendChild(txtclientID);
//        //
//        let td3 = tr.insertCell(2);
//        let txtOrdnum = document.createTextNode(item.Bill_orderNum);
//        td3.appendChild(txtOrdnum);
//        //
//        let td4 = tr.insertCell(3);
//        let txtpaymentM = document.createTextNode(item.Payment_methods);
//        td4.appendChild(txtpaymentM);
//        //
//        let td5 = tr.insertCell(4);
//        let txtpromodis = document.createTextNode(item.ID_promo_disc);
//        td5.appendChild(txtpromodis);
//        //
//        let td6 = tr.insertCell(5);
//        let txtBdate = document.createTextNode(item.Bill_date);
//        td6.appendChild(txtBdate);
//        //
//        let td7 = tr.insertCell(6);
//        let txtsubtotal = document.createTextNode(item.Subtotal);
//        td7.appendChild(txtsubtotal);
//        //
//        let td8 = tr.insertCell(7);
//        let txtisv = document.createTextNode(item.Sales_taxes);
//        td8.appendChild(txtisv);
//        //
//        let td9 = tr.insertCell(8);
//        let txttotal = document.createTextNode(item.Total);
//        td9.appendChild(txttotal);
//        //
//        let td10 = tr.insertCell(9);
//        td10.appendChild(editButton);
//        //
//        let td11 = tr.insertCell(10);
//        td11.appendChild(DeleteButton);

//        console.log(`Value being passed: ${item.Bill_Code}`);

//    })

//    //invoices = data;


//}




////Function  to search clients and there invoices
//function searchInvoices() {
//    const searchValue = document.getElementById('SearcInvoices').value.trim().toLowerCase();
//    const searchValueNum = parseFloat(searchValue);

//    if (searchValue === "") {
//        ShowInvoice(invoices);
//        return;
//    }

//    const filteredInvoices = invoices.filter(invoice =>
//        invoice.Bill_Code.trim().toLowerCase() === (searchValue) ||
//        invoice.Bill_orderNum === (searchValueNum) ||
//        invoice.Payment_methods.trim().toLowerCase() === (searchValue) ||
//        invoice.ID_promo_disc.trim().toLowerCase() === (searchValue) ||
//        invoice.Bill_date.trim().toLowerCase() === (searchValue) ||
//        invoice.Subtotal === (searchValueNum) ||
//        invoice.Sales_taxes === (searchValueNum) ||
//        invoice.Total === (searchValueNum) ||
//        invoice.Client_ID.trim().toLowerCase() === (searchValue)
//    );

//    if (filteredInvoices.length === 0) {
//        document.getElementById('DetInvoice').innerHTML = '<tr><td colspan="7">No Invoice found.</td></tr>';
//    } else {
//        ShowInvoice(filteredInvoices);
//    }



