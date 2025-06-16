const uri = '/api/Bakery_Desserts';
let allDeserts = [];
let currentDesserts = [];


//Use Get (HTTP) dessert data
function getDessert() {
    fetch(uri)
        .then(response => response.json())
        .then(data => {
            allDeserts = data; 
            ShowDesserts(allDeserts); 
        })
        .catch(error => console.error('Failed to load data', error));
}

//Function to add desserts
function addDessert() {
    const addDesIDTxtb = document.getElementById('dessert_id');
    const addDesDescripTxtb = document.getElementById('dessert_desc');
    const addDesTypeTxtb = document.getElementById('dessert_type');
    const addDesCatTxtb = document.getElementById('dessert_cat');
    const addDespromoTxtb = document.getElementById('id-promo_dessert');
    const addDespriceTxtb = document.getElementById('des_price');

    if (addDespromoTxtb === null) {
        addDespromoTxtb = null;
    }

    if (
        !addDesIDTxtb.value.trim() ||
        !addDesDescripTxtb.value.trim() ||
        !addDesTypeTxtb.value.trim() ||
        !addDesCatTxtb.value.trim() ||
        !addDespromoTxtb.value.trim() ||
        !addDespriceTxtb.value.trim()
    ) {
        alert("Please fill out all fields before submitting.");
        return;
    }

    const item = {
        Dessert_id: addDesIDTxtb.value.trim(),
        Dessert_description: addDesDescripTxtb.value.trim(),
        Dessert_type: addDesTypeTxtb.value.trim(),
        Dessert_category: addDesCatTxtb.value.trim(),
        ID_promo_disc: addDespromoTxtb.value.trim(),
        Dessert_Unit_price: parseFloat( addDespriceTxtb.value.trim())
    };
    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })

        .then(response => response.json())
        .then(() => {
            alert("Dessert add correctly");
            getDessert();
            addDesIDTxtb.value = '';
            addDesDescripTxtb.value = '';
            addDesTypeTxtb.value = '';
            addDesCatTxtb.value = '';
            addDespromoTxtb.value = '';
            addDespriceTxtb.value = '';
        })

        .catch(error => {
            console.error('Error updating data:', error);
        });



}


//Function to modify desserts

//Update desserts
function updateDessert() {
    const DessertID = document.getElementById('EditdesId').value;
    const item = {
        Dessert_id: DessertID,
        Dessert_description: document.getElementById('editdesDesc').value.trim(),
        Dessert_type: document.getElementById('editdesType').value.trim(),
        Dessert_category: document.getElementById('editdesCat').value.trim(),
        ID_promo_disc: document.getElementById('editpromodis').value.trim(),
        Dessert_Unit_price: document.getElementById('editdesPrice').value.trim()
    };
    fetch(`${uri}/${DessertID}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(() => getDessert())
        .catch(error => console.error('Failed to update employee', error));
    closeInput();
    return false;
}


//function show all desserts
function ShowDesserts(data) {
    const tBody = document.getElementById('DetDessert');
    tBody.innerHTML = ' ';
    showCounter(data.length);
    currentDesserts = data;

    const button = document.createElement('button');
    data.forEach(item => {
        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.setAttribute('onclick', `displayEditFormDessert('${item.Dessert_id}')`);
        let DeleteButton = button.cloneNode(false);
        DeleteButton.innerText = 'Delete';
        DeleteButton.setAttribute('onclick', `deletedessert('${item.Dessert_id}')`);
        let tr = tBody.insertRow();
        //
        let td1 = tr.insertCell(0);
        let txtDessertId = document.createTextNode(item.Dessert_id);
        td1.appendChild(txtDessertId);
        //
        let td2 = tr.insertCell(1);
        let txtDessertDescription = document.createTextNode(item.Dessert_description);
        td2.appendChild(txtDessertDescription);
        //
        let td3 = tr.insertCell(2);
        let txtDessertType = document.createTextNode(item.Dessert_type);
        td3.appendChild(txtDessertType);
        //
        let td4 = tr.insertCell(3);
        let txtDessertCategory = document.createTextNode(item.Dessert_category);
        td4.appendChild(txtDessertCategory);
        //
        let td5 = tr.insertCell(4);
        let txtDessertPromo = document.createTextNode(item.ID_promo_disc);
        td5.appendChild(txtDessertPromo);
        //
        let td6 = tr.insertCell(5);
        let txtDessertPrice = document.createTextNode(item.Dessert_Unit_price);
        td6.appendChild(txtDessertPrice);
        //
        let td7 = tr.insertCell(6);
        td7.appendChild(editButton);
        //
        let td8 = tr.insertCell(7);
        td8.appendChild(DeleteButton);


    })

    //allDeserts = data;
}

//Delete Dessert
function deletedessert(Dessert_ID) {
    fetch(`${uri}/${Dessert_ID}`, {
        method: 'DELETE'
    })
        .then(() => getDessert())
        .catch(error => console.error('Error on delete dessert', error));
}

//Show edit Form SECTION
function displayEditFormDessert(Dessert_ID) {
    const item = allDeserts.find(item => item.Dessert_id === Dessert_ID);
    document.getElementById('EditdesId').value = item.Dessert_id;
    document.getElementById('editdesDesc').value = item.Dessert_description;
    document.getElementById('editdesType').value = item.Dessert_type
    document.getElementById('editdesCat').value = item.Dessert_category;
    document.getElementById('editpromodis').value = item.ID_promo_disc;
    document.getElementById('editdesPrice').value = item.Dessert_Unit_price;
    document.getElementById('Dessert-Edit').style.display = 'block';
}

//function show Qty Desserts register
function showCounter(itemCount) {
    const name = (itemCount === 1) ? 'Register' : 'Registers';
    document.getElementById('counter').innerText = `${itemCount} ${name}`;
}

function closeInput() {
    document.getElementById('Dessert-Edit').style.display = 'none';
}

function searchDessert() {
    const searchValue = document.getElementById('Searchdessert').value.trim().toLowerCase();
    const searchValueNum = parseFloat(searchValue); 

    if (searchValue === "") {
        ShowDesserts(allDeserts);
        return;
    }

    const filteredDesserts = allDeserts.filter(dessert =>
        dessert.Dessert_id.trim().toLowerCase() === (searchValue) ||
        dessert.Dessert_description.trim().toLowerCase() === (searchValue) ||
        dessert.Dessert_type.trim().toLowerCase() === (searchValue) ||
        dessert.Dessert_category.trim().toLowerCase() === (searchValue) ||
        dessert.ID_promo_disc.trim().toLowerCase() === (searchValue) ||
        dessert.Dessert_Unit_price === (searchValueNum)
    );

    if (filteredDesserts.length === 0) {
        document.getElementById('DetDessert').innerHTML = '<tr><td colspan="7">No desserts found.</td></tr>';
    } else {
        ShowDesserts(filteredDesserts);
    }
}