const uro = '/api/Client_Order';
let allOrder = [];



const myRolOrder = localStorage.getItem("myRol");
let temp;
const addSubtotal = document.getElementById('subtotalV')
let ctrl = 0;


//Use Get (HTTP) order data
function getOrder() {
    fetch(uro)
        .then(response => response.json())
        .then(data => ShowOrders(data))
        .then(useRol)
        .catch(error => console.error('Failed to load data', error));
}

//Function to add orders
function addOrder() {
    const addOrderNumberTxtb = document.getElementById('ordernum');
    const addCliIDTxtb = document.getElementById('clientID');
    const addOrderDateTxtb = document.getElementById('OrderDate');
    const addDesIDTxtb = document.getElementById('dessertID');
    const addDriCodeTxtb = document.getElementById('drinkcode');
    const addQuanDrinks = document.getElementById('QuanDrinks');
    const addQuanDessert = document.getElementById('QuanDessert');
    const addEmployeeID = document.getElementById('EmployeeID');



    if (
        !addOrderNumberTxtb.value.trim() ||
        !addCliIDTxtb.value.trim() ||
        !addOrderDateTxtb.value.trim()||
        !addDesIDTxtb.value.trim() ||
        !addDriCodeTxtb.value.trim() ||
         !addQuanDrinks.value.trim() ||
        !addQuanDessert.value.trim() ||
        !addEmployeeID.value.trim()
    ) {
        alert("Please fill out all fields before submitting.");
        return;
    }

    const item = {
        Order_number: addOrderNumberTxtb.value.trim(),
        Order_clientID: addCliIDTxtb.value.trim(),
        Order_date: addOrderDateTxtb.value.trim(),
        Order_dessertId: addDesIDTxtb.value.trim(),
        Order_drinkCode: addDriCodeTxtb.value,
        Order_quantity_Drinks: addQuanDrinks.value,
        Order_quantity_Dessert: addQuanDessert.value,
        employee_ID: addEmployeeID.value.trim(),
    };
    fetch(uro, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })

        .then(response => response.json())
        .then(() => {
            alert("Order add correctly");
            getOrder();
             addOrderNumberTxtb.value = '';
            addCliIDTxtb.value = '';
            addOrderDateTxtb.value = '';
            addDriCodeTxtb.value = '';
            addDesIDTxtb.value = '';
            addQuanDrinks.value = '';
            addQuanDessert.value = '';
            addEmployeeID.value = '';
        })

        .catch(error => {
            console.error('Error updating data:', error);
        });

    ctrl += 1;

   
}



function subTotal(num) {

    const item = allOrder.find(item => item.Order_number === num);

    console.log(item);

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


    return subtotal;
}

function showsubTotal(){


    console.log(temp);
    addSubtotal.value = subTotal(temp);
}

//Function to modify orders

//Update Orders
function updateOrder() {
    const OrderID = document.getElementById('EditOrdernum').value;
    const item = {
        Order_number: OrderID,
        Order_clientID: document.getElementById('EditClientID').value.trim(),
        Order_date: document.getElementById('editOrderdate').value.trim(),
        Order_dessertId: document.getElementById('editdessertID').value.trim(),
        Order_drinkCode: document.getElementById('editdrinkCode').value.trim(),
        Order_quantity_Drinks: document.getElementById('editQuanDri').value.trim(),
        Order_quantity_Dessert: document.getElementById('editQuanDes').value.trim(),
        employee_ID: document.getElementById('editEmployeeID').value.trim()
        
    };
    fetch(`${uro}/${OrderID}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(() => getOrder())
        .catch(error => console.error('Failed to update employee', error));
    closeInput();
    return false;
}


//function show all orders
function ShowOrders(data) {
    allOrder = data;
    const tBody = document.getElementById('DetOrder');
    tBody.innerHTML = ' ';
    showCounter(data.length);
    const button = document.createElement('button');
    data.forEach(item => {
        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.setAttribute('onclick', `
            if (${myRolOrder == 1}) {
                displayEditFormOrder(${item.Order_number});
            } else {
                alert('You dont have access');
            }
        `);
          

        let DeleteButton = button.cloneNode(false);
        DeleteButton.innerText = 'Delete';
        DeleteButton.setAttribute('onclick', `
            if (${myRolOrder == 1}) {
                deleteOrder(${item.Order_number});
            } else {
                alert('You dont have access');
            }
        `);
           

        let tr = tBody.insertRow();
        //
        let td1 = tr.insertCell(0);
        let txtordernum = document.createTextNode(item.Order_number);
        td1.appendChild(txtordernum);
        //
        let td2 = tr.insertCell(1);
        let txtCID = document.createTextNode(item.Order_clientID);
        td2.appendChild(txtCID);
        //
        let td3 = tr.insertCell(2);
        let txtOd = document.createTextNode(item.Order_date);
        td3.appendChild(txtOd);
        //
        let td4 = tr.insertCell(3);
        let txtDid = document.createTextNode(item.Order_dessertId);
        td4.appendChild(txtDid);
        //
        let td5 = tr.insertCell(4);
        let txtdriCode = document.createTextNode(item.Order_drinkCode);
        td5.appendChild(txtdriCode);
        //
        let td6 = tr.insertCell(5);
        let txtquanDri = document.createTextNode(item.Order_quantity_Drinks);
        td6.appendChild(txtquanDri);
        //
        let td7 = tr.insertCell(6);
        let txtquanDes = document.createTextNode(item.Order_quantity_Dessert);
        td7.appendChild(txtquanDes);
        //
        let td8 = tr.insertCell(7);
        let txtEmployeeID = document.createTextNode(item.employee_ID);
        td8.appendChild(txtEmployeeID);
        //
        let td9 = tr.insertCell(8);
        td9.appendChild(editButton);
        //
        let td10 = tr.insertCell(9);
        td10.appendChild(DeleteButton);

       
        temp = item.Order_number;
       

        console.log(`Value being passed: ${item.Order_number}`);

    })

   
 

        if (ctrl > 0) {
            showsubTotal();
           
        }
    

     
    console.log(myRolOrder);

}

//Delete Order
function deleteOrder(Order_ID) {
    fetch(`${uro}/${Order_ID}`, {
        method: 'DELETE'
    })
        .then(ctrl = 0)
        .then(addSubtotal.value = "")
        .then(() => getOrder())
        .catch(error => console.error('Error on delete Order', error));
}

//Show edit Form SECTION
function displayEditFormOrder(Order_ID) {

    const item = allOrder.find(item => parseInt(item.Order_number, 10) === Order_ID);


    document.getElementById('EditOrdernum').value = item.Order_number;
    document.getElementById('EditClientID').value = item.Order_clientID;
    document.getElementById('editOrderdate').value = item.Order_date;
    document.getElementById('editdessertID').value = item.Order_dessertId;
    document.getElementById('editdrinkCode').value = item.Order_drinkCode;
    document.getElementById('editQuanDri').value = item.Order_quantity_Drinks;
    document.getElementById('editQuanDes').value = item.Order_quantity_Dessert;
    document.getElementById('editEmployeeID').value = item.employee_ID;
    document.getElementById('Order-Edit').style.display = 'block';
}

//function show Qty Order register
function showCounter(itemCount) {
    const name = (itemCount === 1) ? 'Register' : 'Registers';
    document.getElementById('counter').innerText = `${itemCount} ${name}`;
}

function closeInput() {
    document.getElementById('Order-Edit').style.display = 'none';
}

function useRol() {

    if (myRolOrder == 3) {
        document.getElementById('Order-Edit').style.display = 'none';
        document.getElementById('Order-Edit').style.pointerEvents = 'none';
        document.getElementById('Order-Edit').style.opacity = 0.15;
    }
  


}