const Orders = '/api/Client_Order';
const desserts = '/api/Bakery_Desserts';
const drinks = '/api/Bakery_Drinks';
const invoices = '/api/Client_Bill';




let ordersArray = [];
let dessertsArray = [];
let drinksArray = [];
let InvoicesArray = [];

//-------------------------------
let currentOrders = [];



function gettables() {
    Promise.all([
        fetch(Orders).then(response => response.json()),
        fetch(desserts).then(response => response.json()),
        fetch(drinks).then(response => response.json()),
        fetch(invoices).then(response => response.json())
    ])
        .then(([ordersData, dessertsData, drinksData, invoicedata]) => {
         
            ordersArray = ordersData;
            dessertsArray = dessertsData;
            drinksArray = drinksData;
            InvoicesArray = invoicedata;

            
            ShowOrdersB(ordersArray);
            combineDesOrder();
            combineDriOrder();
            showInvoicesTable(InvoicesArray); 
        })
        .catch(error => console.error('Failed to load data', error));
}


function combineDesOrder() {
    const combinedData = dessertsArray.map(dessert => {

        const related = ordersArray.filter(d => d.Order_dessertId === dessert.Dessert_id);
    
        const totalQuantitySold = related.reduce((sum, order) => sum + order.Order_quantity_Dessert, 0);

        return {
            dessertId: dessert.Dessert_id,
            description: dessert.Dessert_description,
            category: dessert.Dessert_category,
            unitPrice: dessert.Dessert_Unit_price,
            discount: dessert.ID_promo_disc,
            totalQuantitySold: totalQuantitySold,
            totalOrders: related.length
        };
    });

    
    showDessertsCombinedData(combinedData);
}

function combineDriOrder() {
    const combinedData = drinksArray.map(drinks => {

        const related = ordersArray.filter(d => d.Order_drinkCode === drinks.Drink_code);

        const totalQuantitySold = related.reduce((sum, order) => sum + order.Order_quantity_Drinks, 0);

        return {
            DrinkCode: drinks.Drink_code,
            description: drinks.Drink_desc,
            Type: drinks.Drink_type,
            unitPrice: drinks.Drink_price,
            discount: drinks.ID_promo_disc,
            totalQuantitySold: totalQuantitySold,
            totalOrders: related.length
        };
    });


    showDrinksCombinedData(combinedData);
}
function showDessertsCombinedData(data) {
    const tBody = document.getElementById('DessertsTable');
    tBody.innerHTML = ''; 

    data.forEach(item => {
        let tr = tBody.insertRow();

        let td0 = tr.insertCell(0);
        td0.textContent = item.dessertId;

        let td1 = tr.insertCell(1);
        td1.textContent = item.description;

        let td2 = tr.insertCell(2);
        td2.textContent = item.category;

        let td3 = tr.insertCell(3);
        td3.textContent = item.unitPrice;

        let td4 = tr.insertCell(4);
        td4.textContent = item.discount;

        let td5 = tr.insertCell(5);
        td5.textContent = item.totalQuantitySold;

        let td6 = tr.insertCell(6);
        td6.textContent = item.totalOrders;
    });
}

function showDrinksCombinedData(data) {
    const tBody = document.getElementById('DrinksTable');
    tBody.innerHTML = '';

    data.forEach(item => {
        let tr = tBody.insertRow();

        let td0 = tr.insertCell(0);
        td0.textContent = item.DrinkCode;

        let td1 = tr.insertCell(1);
        td1.textContent = item.description;

        let td2 = tr.insertCell(2);
        td2.textContent = item.Type;

        let td3 = tr.insertCell(3);
        td3.textContent = item.unitPrice;

        let td4 = tr.insertCell(4);
        td4.textContent = item.discount;

        let td5 = tr.insertCell(5);
        td5.textContent = item.totalQuantitySold;

        let td6 = tr.insertCell(6);
        td6.textContent = item.totalOrders;
    });
}

function ShowOrdersB(data) {
   
    const tBody = document.getElementById('DetOrderB');
    tBody.innerHTML = ' ';
    //showCounter(data.length);
    currentOrders = data;
    data.forEach(item => {



        let tr = tBody.insertRow();
        //
        let td0 = tr.insertCell(0);
        let txtEmployeeID = document.createTextNode(item.employee_ID);
        td0.appendChild(txtEmployeeID);
        //
        let td1 = tr.insertCell(1);
        let txtEid = document.createTextNode(item.Order_number);
        td1.appendChild(txtEid);
        //
        let td2 = tr.insertCell(2);
        let txtCID = document.createTextNode(item.Order_clientID);
        td2.appendChild(txtCID);
        //
        let td3 = tr.insertCell(3);
        let txtOd = document.createTextNode(item.Order_date);
        td3.appendChild(txtOd);
        //
        let td4 = tr.insertCell(4);
        let txtDid = document.createTextNode(item.Order_dessertId);
        td4.appendChild(txtDid);
        //
        let td5 = tr.insertCell(5);
        let txtdriCode = document.createTextNode(item.Order_drinkCode);
        td5.appendChild(txtdriCode);
        //
        let td6 = tr.insertCell(6);
        let txtquanDri = document.createTextNode(item.Order_quantity_Drinks);
        td6.appendChild(txtquanDri);
        //
        let td7 = tr.insertCell(7);
        let txtquanDes = document.createTextNode(item.Order_quantity_Dessert);
        td7.appendChild(txtquanDes);
      

    })


}


function showInvoicesTable(data) {
    const tBody = document.getElementById('InvoicesTable');
    tBody.innerHTML = ''; 

    data.forEach(item => {
        let tr = tBody.insertRow();

        let td0 = tr.insertCell(0);
        td0.textContent = item.Bill_Code;  

        let td1 = tr.insertCell(1);
        td1.textContent = item.Bill_orderNum; 

        let td2 = tr.insertCell(2);
        td2.textContent = item.Payment_methods;  

        let td3 = tr.insertCell(3);
        td3.textContent = item.ID_promo_disc;  

        let td4 = tr.insertCell(4);
        td4.textContent = item.Bill_date; 

        let td5 = tr.insertCell(5);
        td5.textContent = item.Subtotal;  

        let td6 = tr.insertCell(6);
        td6.textContent = item.Sales_taxes;  

        let td7 = tr.insertCell(7);
        td7.textContent = item.Total; 

        let td8 = tr.insertCell(8);
        td8.textContent = item.Client_ID;  
    });
}

//Search orders
function searchbaristaOrders() {
    const searchValue = document.getElementById('idB').value.trim().toLowerCase();
    const searchValueNum = parseFloat(searchValue);

    console.log(searchValue);

    if (searchValue === "") {
        ShowOrdersB(ordersArray);
        return;
    }

    const filteredOrderB = ordersArray.filter(B =>
        B.Order_number === (searchValueNum) ||
        B.Order_clientID.trim().toLowerCase() === (searchValue) ||
        B.Order_date.trim().toLowerCase() === (searchValue) ||
        B.Order_dessertId.trim().toLowerCase() === (searchValue) ||
        B.Order_drinkCode.trim().toLowerCase() === (searchValue) ||
        B.Order_quantity_Drinks === (searchValueNum) ||
        B.Order_quantity_Dessert === (searchValueNum) ||
        B.employee_ID.trim().toLowerCase() === (searchValue)
    );

    if (filteredOrderB.length === 0) {
        document.getElementById('DetOrderB').innerHTML = '<tr><td colspan="7">No Orders found.</td></tr>';
    } else {
        ShowOrdersB(filteredOrderB);
    }
}