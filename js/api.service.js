//http://greenvelvet.alwaysdata.net/bugTracker/api/

async function Ping() {
    const ping = await fetch("http://greenvelvet.alwaysdata.net/bugTracker/api/ping")
    .then(function (response) {
        return response.json()
    })
    .then(function (result) {
        JSON.stringify(result)
        console.log(result.result)
        ping 
        return result.result.ready;
    })
    .catch(error => console.log('error', error));

    return ping;
}

//Fonction connexion
async function Login() {
    let loginInput = document.getElementById("loginInput").value;
    let passwordInput = document.getElementById("passwordInput").value;

    localStorage.setItem("username", loginInput);

    await fetch("http://greenvelvet.alwaysdata.net/bugTracker/api/login/"+ loginInput + "/"+ passwordInput)
    .then(function (response) {
        return response.json()
    })
    .then(function (result) {
        JSON.stringify(result)
        console.log(result.result)

        let token = result.result.token;
        localStorage.setItem("token", token);
        localStorage.setItem("ID", result.result.id);

        if (token) {
            window.location ="./list.html"
        }
    })
    .catch(error => console.log('error', error));
}

//Fonction Inscription
function checkPassword() {
    let passwordInput = document.getElementById("passwordInput").value
    let checkPasswordInput = document.getElementById("checkPasswordInput").value

    if (passwordInput == checkPasswordInput) {
        Signup();
    } else {
        alert("Les mots de passe ne sont pas identiques. Veuillez vérifier.")
    }
    
}
async function Signup() {
    let loginInput = document.getElementById("loginInput").value
    let passwordInput = document.getElementById("passwordInput").value

    await fetch("http://greenvelvet.alwaysdata.net/bugTracker/api/signup/"+ loginInput + "/"+ passwordInput)
    .then(function (response) {
        return response.json()
    })
    .then(function (result) {
        JSON.stringify(result)
        console.log(result.result)
        
        let token = result.result.token;
        localStorage.setItem("token", token);
        localStorage.setItem("ID", result.result.id);

        if (token) {
            window.location ="./list.html"
        }
    })
    .catch(error => console.log('error', error));
}

//Fonction Liste
async function bugsList(ID, state) {
    const token = localStorage.getItem("token");
    let userList = await usersList();
    // let userList = localStorage.getItem("userList").split(",");
    
    let bugsTableBody = document.getElementById("bugListBody");
    bugsTableBody.innerHTML =""
    
    let userID = 0;
    if (ID != 0) {
        userID = localStorage.getItem("ID");
    }

    await fetch("http://greenvelvet.alwaysdata.net/bugTracker/api/list/" + token + "/" + userID)
    .then(function (response) {
        return response.json()
    })
    .then(function (result) {
        JSON.stringify(result)
        let bugList = result.result.bug;
        if (state) {
            temp = [];
            for (let i = 0; i < bugList.length; i++) {
                if (bugList[i].state == 0) {
                    temp.push(bugList[i]);
                }
            }
            bugList = temp;
        }

        bugList.forEach(element => {
            bugsTableBody.innerHTML += 
            `<tr>
                <td>
                    <h3>${element.title}</h3>
                    <span>${element.description}</span>
                </td>
                <td>${userList[element?.user_id]}</td>
                <td>
                    <select name="" id="${element.id}State" onchange="changeState(${element.id}, this.value)">
                        <option value="0">Non traité</option>
                        <option value="1">En traitement</option>
                        <option value="2">Traité</option>
                    </select>
                </td>
                <td>
                    <button onclick="Delete(${element.id})">Supprimer</button>
                </td>
            </tr>`

            var temp = element.state;
            var mySelect = document.getElementById(`${element.id}State`);

            for(var i, j = 0; i = mySelect.options[j]; j++) {
                if(i.value == temp) {
                    i.setAttribute("selected", "selected");
                    break;
                }
            }
            
        });

        console.log(bugList);
    })
    .catch(error => window.location ="./index.html");
}


//Fonction Add Bug
async function addBug() {

    var formItems = {
        "title": document.getElementById("bugAddTitle").value,
        "description": document.getElementById("bugAddDesc").value
    };

    var options = {
        method: 'POST',
        body: JSON.stringify(formItems),
      };

    let bugsTableBody = document.getElementById("bugListBody");
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    await fetch("http://greenvelvet.alwaysdata.net/bugTracker/api/add/" + token + "/450", options)
    .then(function (response) {
        return response.json()
    })
    .then(function (result) {
        JSON.stringify(result)

        bugsTableBody.innerHTML += 
            `<tr>
                <td>
                    <h3>${formItems.title}</h3>
                    <span>${formItems.description}</span>
                </td>
                <td>${username}</td>
                <td>
                    <select name="" id="${result.result.id}State" onchange="changeState(${result.result.id}, this.value)">
                        <option value="0">Non traité</option>
                        <option value="1">En traitement</option>
                        <option value="2">Traité</option>
                    </select>
                </td>
                <td>
                    <button onclick="Delete(${result.result.id})">Supprimer</button>
                </td>
            </tr>`

    })
    .catch(error => console.log('error', error));
}


//Fonction Delete Bug
async function Delete(bugID) {
    const token = localStorage.getItem("token");

    await fetch("http://greenvelvet.alwaysdata.net/bugTracker/api/delete/" + token + "/" + bugID)
    .then(function () {
        bugsList(0);
    })
    .catch(error => console.log('error', error));
}


//Function Change State
async function changeState(bugID, newState) {
    const token = localStorage.getItem("token");
    await fetch("http://greenvelvet.alwaysdata.net/bugTracker/api/state/" + token + "/" + bugID + "/" + newState)
    .then(function (response) {
        return response.json()
    }) 
    .then(function (result) {
        console.log(result)
    })
    .catch(error => console.log('error', error));
}


//Function Liste Users
async function usersList() {
    const token = localStorage.getItem("token");
    const userList =  await fetch("http://greenvelvet.alwaysdata.net/bugTracker/api/users/" + token)
    .then(function (response) {
        return response.json()
    }) 
    .then(function (result) {
        return result.result.user;
    })
    .catch(error => console.log('error', error));
    return userList
}


//Fonction Logout
async function Logout() {
    const token = localStorage.getItem("token");

    await fetch("http://greenvelvet.alwaysdata.net/bugTracker/api/logout/" + token)
    .then(function () {
        localStorage.clear();
        window.location ="./index.html";
    })
    .catch(error => console.log('error', error));
}