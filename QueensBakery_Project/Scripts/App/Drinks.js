const urd = '/api/Bakery_Drinks';
let allDrinks = [];
let currentDrinks = [];

//Use Get (HTTP) drinks data
function getDrinks() {
    fetch(urd)
        .then(response => response.json())
        .then(data => {
            allDrinks = data;
            ShowDrinks(data)
        })
        .catch(error => console.error('Failed to load data', error));
}

//Function to add desserts
function addDrinks() {
    const addDriCodextb = document.getElementById('dri_code');
    const addDridescTxtb = document.getElementById('dri_desc');
    const addDripromoTxtb = document.getElementById('id-promo_drinks');
    const addDripriceTxtb = document.getElementById('dri_price');
    const addDritypeTxtb = document.getElementById('dri_type');
  

    if (
        !addDriCodextb.value.trim() ||
        !addDridescTxtb.value.trim() ||
        !addDripromoTxtb.value.trim() ||
        !addDripriceTxtb.value.trim() ||
        !addDritypeTxtb.value.trim() 
        
    ) {
        alert("Please fill out all fields before submitting.");
        return;
    }

    const item = {
        Drink_code: addDriCodextb.value.trim(),
        Drink_desc: addDridescTxtb.value.trim(),
        ID_promo_disc: addDripromoTxtb.value.trim(),
        Drink_price: parseFloat(addDripriceTxtb.value.trim()),
        Drink_type: addDritypeTxtb.value.trim()
       
    };

    fetch(urd, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })

        .then(response => response.json())
        .then(() => {
            alert("Drink add correctly");
            addDriCodextb.value = '';
            addDridescTxtb.value = '';
            addDripromoTxtb.value = '';
            addDripriceTxtb.value = '';
            addDritypeTxtb.value = '';
          
        })

        .catch(error => {
            console.error('Error updating data:', error);
        });



}


//Function to modify drinks

//Update drinks
function updateDrinks() {
    const DrinksID = document.getElementById('EditdriCode').value;
    const item = {
        Drink_code: DrinksID,
        Drink_desc: document.getElementById('editdriDesc').value.trim(),
        ID_promo_disc: document.getElementById('editpromodri').value.trim(),
        Drink_price: document.getElementById('editdriPrice').value.trim(),
        Drink_type: document.getElementById('editdriType').value.trim(),
    };
    fetch(`${urd}/${DrinksID}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(() => getDrinks())
        .catch(error => console.error('Failed to update employee', error));
    closeInput();
    return false;
}


//function show all drinks
function ShowDrinks(data) {
    const tBody = document.getElementById('DetDrinks');
    tBody.innerHTML = ' ';
    showCounter(data.length);
    currentDrinks = data;

    const button = document.createElement('button');
    data.forEach(item => {
        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.setAttribute('onclick', `displayEditFormDrink('${item.Drink_code}')`);
        let DeleteButton = button.cloneNode(false);
        DeleteButton.innerText = 'Delete';
        DeleteButton.setAttribute('onclick', `deleteDrinks('${item.Drink_code}')`);
        let tr = tBody.insertRow();
        //
        let td1 = tr.insertCell(0);
        let txtDrinkId = document.createTextNode(item.Drink_code);
        td1.appendChild(txtDrinkId);
        //
        let td2 = tr.insertCell(1);
        let txtDrinkDescription = document.createTextNode(item.Drink_desc);
        td2.appendChild(txtDrinkDescription);
        //
        let td3 = tr.insertCell(2);
        let txtDrinkPromo = document.createTextNode(item.ID_promo_disc);
        td3.appendChild(txtDrinkPromo);
        //
        let td4 = tr.insertCell(3);
        let txtDrinkprice = document.createTextNode(item.Drink_price);
        td4.appendChild(txtDrinkprice);
        //
        let td5 = tr.insertCell(4);
        let txtDrinkType = document.createTextNode(item.Drink_type);
        td5.appendChild(txtDrinkType);
        //
        let td6 = tr.insertCell(5);
        td6.appendChild(editButton);
        //
        let td7 = tr.insertCell(6);
        td7.appendChild(DeleteButton);


    })

    //allDrinks = data;
}

//Delete Drink
function deleteDrinks(Drink_ID) {
    fetch(`${urd}/${Drink_ID}`, {
        method: 'DELETE'
    })
        .then(() => getDrinks())
        .catch(error => console.error('Error on delete drink', error));
}

//Show edit Form SECTION
function displayEditFormDrink(Drink_ID) {
    const item = allDrinks.find(item => item.Drink_code === Drink_ID);
    document.getElementById('EditdriCode').value = item.Drink_code;
    document.getElementById('editdriDesc').value = item.Drink_desc;
    document.getElementById('editpromodri').value = item.ID_promo_disc;
    document.getElementById('editdriPrice').value = item.Drink_price;
    document.getElementById('editdriType').value = item.Drink_type;
    document.getElementById('Drinks-Edit').style.display = 'block';
}

//function show Qty Drinks register
function showCounter(itemCount) {
    const name = (itemCount === 1) ? 'Register' : 'Registers';
    document.getElementById('counter').innerText = `${itemCount} ${name}`;
}

function closeInput() {
    document.getElementById('Drinks-Edit').style.display = 'none';
}


//Search drinks
function searchDrinks() {
    const searchValue = document.getElementById('Searchdrink').value.trim().toLowerCase();
    const searchValueNum = parseFloat(searchValue);

    if (searchValue === "") {
        ShowDrinks(allDrinks);
        return;
    }

    const filteredDrinks = allDrinks.filter(drinks =>
        drinks.Drink_code.trim().toLowerCase() === (searchValue) ||
        drinks.Drink_desc.trim().toLowerCase() === (searchValue) ||
        drinks.ID_promo_disc.trim().toLowerCase() === (searchValue) ||
        drinks.Drink_price === (searchValue) ||
        drinks.Drink_type.trim().toLowerCase() === (searchValue) 
    );

    if (filteredDrinks.length === 0) {
        document.getElementById('DetDrinks').innerHTML = '<tr><td colspan="7">No drinks found.</td></tr>';
    } else {
        ShowDrinks(filteredDrinks);
    }
}