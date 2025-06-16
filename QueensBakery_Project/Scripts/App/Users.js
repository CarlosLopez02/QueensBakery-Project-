
//API URL which contains the user data
const usr = '/api/Users_Bakery';


// An array to store the list of users fetched from the API
let users = [];



//---------------------------------------LOGIN---------------------------------------------------------------//

//function to fetch the user from the api
function getLogin() {
    

    fetch(usr) // we make a request to a specified URL
        .then(response => response.json()) //converting to JSON format
        .then(data => {
            // Assigning the fetched data to the global 'users' variable
            users = data;

            //getting the data from the form
            const code = document.getElementById('codefield').value;
            const password = document.getElementById('pass_field').value;

            //calling our function to validate the user 
            ValidUser(code, password);
        })
        //for posible errors
        .catch(error => {
            console.error('Error al cargar los datos:', error);
        });
}

//function to validate the user 
function ValidUser(Code, Password) {




    const user = users.find(user => user.User_code === Code && user.User_password === Password);
  


    if (user) {
    


        const rol1 = '1';
        const rol2 = '2';
        const rol3 = '3';

        


        if (user.Rol_ID === rol1) {
            window.location.href = 'Admin/AdminPanel';
           
          

        } else if (user.Rol_ID === rol2) {

            window.location.href = 'Manager/ManagerPanel';

        }
        else if (user.Rol_ID === rol3){
            window.location.href = 'Barista/BaristaPanel';
        }


    } else {
        console.log("Usuario o contraseña incorrectos.");
        errorMessage();

    }



}


//----------------------------------------------Registration--------------------------------------------------------//

//function add the a new user 
function AddUser() {
    const addCodeTextbox = document.getElementById('User-code');
    const addpasswordTextbox = document.getElementById('User-pass');
    const addIDTextbox = document.getElementById('User-ID');
    const addNameTextbox = document.getElementById('User-name');
    const addGenreTextbox = document.getElementById('User-Genre');
    const addEmailTextbox = document.getElementById('User-email');
    const addphoneTextbox = document.getElementById('User-phone');
    const addRolIDTextbox = document.getElementById('User-rol');

    let rolID = '';
    switch (addRolIDTextbox.value) {
        case 'admin':
            rolID = '1';

            break;
        case 'manager':
            rolID = '2';
            break;

        case 'barista':
            rolID = '3';
            break;

    }


    const item = {
        User_code: addCodeTextbox.value.trim(),
        User_password: addpasswordTextbox.value.trim(),
        User_ID: addIDTextbox.value.trim(),
        User_name: addNameTextbox.value.trim(),
        User_genre: addGenreTextbox.value.trim(),
        User_email: addEmailTextbox.value.trim(),
        User_phone: addphoneTextbox.value.trim(),
        Rol_ID: rolID

    };

    fetch(usr, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })

        .then(response => response.json())
        .then(() => {
            alert("User add correctly");
            addCodeTextbox.value = '';
            addpasswordTextbox.value = '';
            addIDTextbox.value = '';
            addNameTextbox.value = '';
            addGenreTextbox.value = '';
            addEmailTextbox.value = '';
            addphoneTextbox.value = '';
            addRolIDTextbox.value = '';
        })

        .catch(error => {
            console.error('Error al actualizar los datos:', error);
        });
}



//function for error message for invalid credentials
function errorMessage() {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = 'Incorrect user or password.';
    errorMessage.style.display = 'block';

    setTimeout(function () {
        errorMessage.style.display = 'none';
    }, 3000);

}

//------------------------------------------------Barista user------------------------------------------------------//




//Get user barista info
function getUserBarista() {
    fetch(usr)
        .then(response => response.json())
        .then(data => ShowBarista(data))
        .catch(error => console.error('Failed to load data', error));
}


//Function to modify users
//update users

function updateUsersBarista() {
    const UserID = document.getElementById('EditUcode').value;
    const item = {
        User_code: UserID,
        User_password: document.getElementById('editUpass').value.trim(),
        User_ID: document.getElementById('editUid').value.trim(),
        User_name: document.getElementById('editUname').value.trim(),
        User_genre: document.getElementById('editUgen').value.trim(),
        User_email: document.getElementById('editUemail').value.trim(),
        User_phone: document.getElementById('editUphone').value.trim(),
        Rol_ID: document.getElementById('editURol').value.trim()
    };
    fetch(`${usr}/${UserID}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(() => getUserBarista())
        .catch(error => console.error('Failed to update employee', error));
    closeInputBarista
    return false;
}

//function show all barista users
function ShowBarista(data) {
    const tBody = document.getElementById('DetUserBarista');
    tBody.innerHTML = ' ';
    showCounter(data.filter(item => item.Rol_ID === '3').length);
    const button = document.createElement('button');
    data.forEach(item => {
        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.setAttribute('onclick', `displayEditFormUserBarista('${item.User_code}')`);
        let DeleteButton = button.cloneNode(false);
        DeleteButton.innerText = 'Delete';
        DeleteButton.setAttribute('onclick', `deleteUserBarista('${item.User_code}')`);
        if (item.Rol_ID === '3') {
            let tr = tBody.insertRow();
            //
            let td1 = tr.insertCell(0);
            let txtCode = document.createTextNode(item.User_code);
            td1.appendChild(txtCode);
            //
            let td2 = tr.insertCell(1);
            let txtPassword = document.createTextNode(item.User_password);
            td2.appendChild(txtPassword);
            //
            let td3 = tr.insertCell(2);
            let txtID = document.createTextNode(item.User_ID);
            td3.appendChild(txtID);
            //
            let td4 = tr.insertCell(3);
            let txtName = document.createTextNode(item.User_name);
            td4.appendChild(txtName);
            //
            let td5 = tr.insertCell(4);
            let txtGenre = document.createTextNode(item.User_genre);
            td5.appendChild(txtGenre);
            //
            let td6 = tr.insertCell(5);
            let txtEmail = document.createTextNode(item.User_email);
            td6.appendChild(txtEmail);
            //
            let td7 = tr.insertCell(6);
            let txtPhone = document.createTextNode(item.User_phone);
            td7.appendChild(txtPhone);
            //
            let td8 = tr.insertCell(7);
            let txtRol = document.createTextNode(item.Rol_ID);
            td8.appendChild(txtRol);
            //
            let td9 = tr.insertCell(8);
            td9.appendChild(editButton);
            //
            let td10 = tr.insertCell(9);
            td10.appendChild(DeleteButton);
        }

    })

    users = data;
    console.log(users);
}

//function to delete barista
function deleteUserBarista(UserCode) {
    fetch(`${usr}/${UserCode}`, {
        method: 'DELETE'
    })
        .then(() => getUserBarista())
        .catch(error => console.error('Error on delete Barista', error));
}

//Show barista users 
function displayEditFormUserBarista(UserCode) {
    const item = users.find(item => item.User_code === UserCode);
    document.getElementById('EditUcode').value = item.User_code;
    document.getElementById('editUpass').value = item.User_password;
    document.getElementById('editUid').value = item.User_ID;
    document.getElementById('editUname').value = item.User_name;
    document.getElementById('editUgen').value = item.User_genre;
    document.getElementById('editUemail').value = item.User_email;
    document.getElementById('editUphone').value = item.User_phone;
    document.getElementById('editURol').value = item.Rol_ID;
    document.getElementById('Edit-userBarista').style.display = 'block';
}



//function show Qty UserBarista register
function showCounter(itemCount) {
    const name = (itemCount === 1) ? 'Register' : 'Registers';
    document.getElementById('counter').innerText = `${itemCount} ${name}`;
}

//Close edit form SECTION
function closeInputBarista() {
    document.getElementById('Edit-userBarista').style.display = 'none';
}


//-------------------------------------------Users Admin-----------------------------------------------------------//

//Get users info
function getUsers() {
    fetch(usr)
        .then(response => response.json())
        .then(data => ShowUsers(data))
        .catch(error => console.error('Failed to load data', error));
}


//Function to modify users
//update users

function updateUsers() {
    const UserID = document.getElementById('EditUcode').value;
    const item = {
        User_code: UserID,
        User_password: document.getElementById('editUpass').value.trim(),
        User_ID: document.getElementById('editUid').value.trim(),
        User_name: document.getElementById('editUname').value.trim(),
        User_genre: document.getElementById('editUgen').value.trim(),
        User_email: document.getElementById('editUemail').value.trim(),
        User_phone: document.getElementById('editUphone').value.trim(),
        Rol_ID: document.getElementById('editURol').value.trim()
    };
    fetch(`${usr}/${UserID}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(() => getUsers())
        .catch(error => console.error('Failed to update employee', error));
    closeInputAdmin();
    return false;
}

//function show all users
function ShowUsers(data) {
    const tBody = document.getElementById('DetUser');
    tBody.innerHTML = ' ';
    showCounterAdmin(data.length);
    const button = document.createElement('button');
    data.forEach(item => {
        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.setAttribute('onclick', `displayEditFormUser('${item.User_code}')`);
        let DeleteButton = button.cloneNode(false);
        DeleteButton.innerText = 'Delete';
        DeleteButton.setAttribute('onclick', `deleteUser('${item.User_code}')`);
         
            let tr = tBody.insertRow();
            //
            let td1 = tr.insertCell(0);
            let txtCode = document.createTextNode(item.User_code);
            td1.appendChild(txtCode);
            //
            let td2 = tr.insertCell(1);
            let txtPassword = document.createTextNode(item.User_password);
            td2.appendChild(txtPassword);
            //
            let td3 = tr.insertCell(2);
            let txtID = document.createTextNode(item.User_ID);
            td3.appendChild(txtID);
            //
            let td4 = tr.insertCell(3);
            let txtName = document.createTextNode(item.User_name);
            td4.appendChild(txtName);
            //
            let td5 = tr.insertCell(4);
            let txtGenre = document.createTextNode(item.User_genre);
            td5.appendChild(txtGenre);
            //
            let td6 = tr.insertCell(5);
            let txtEmail = document.createTextNode(item.User_email);
            td6.appendChild(txtEmail);
            //
            let td7 = tr.insertCell(6);
            let txtPhone = document.createTextNode(item.User_phone);
            td7.appendChild(txtPhone);
            //
            let td8 = tr.insertCell(7);
            let txtRol = document.createTextNode(item.Rol_ID);
            td8.appendChild(txtRol);
            //
            let td9 = tr.insertCell(8);
            td9.appendChild(editButton);
            //
            let td10 = tr.insertCell(9);
            td10.appendChild(DeleteButton);
        

    })

    users = data;
    console.log(users);
}

//function to delete user
function deleteUser(UserCode) {
    fetch(`${usr}/${UserCode}`, {
        method: 'DELETE'
    })
        .then(() => getUsers())
        .catch(error => console.error('Error on delete Barista', error));
}

//Show all users 
function displayEditFormUser(UserCode) {
    const item = users.find(item => item.User_code === UserCode);
    document.getElementById('EditUcode').value = item.User_code;
    document.getElementById('editUpass').value = item.User_password;
    document.getElementById('editUid').value = item.User_ID;
    document.getElementById('editUname').value = item.User_name;
    document.getElementById('editUgen').value = item.User_genre;
    document.getElementById('editUemail').value = item.User_email;
    document.getElementById('editUphone').value = item.User_phone;
    document.getElementById('editURol').value = item.Rol_ID;
    document.getElementById('Edit-user').style.display = 'block';
}



//function show Qty User register
function showCounterAdmin(itemCount) {
    const name = (itemCount === 1) ? 'Register' : 'Registers';
    document.getElementById('counter1').innerText = `${itemCount} ${name}`;
}

//Close edit form SECTION
function closeInputAdmin() {
    document.getElementById('Edit-user').style.display = 'none';
}