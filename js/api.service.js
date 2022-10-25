//http://greenvelvet.alwaysdata.net/bugTracker/api/

fetch("http://greenvelvet.alwaysdata.net/bugTracker/api/ping")
    .then(function (response) {
        return response.json()
    })
    .then(function (result) {
        JSON.stringify(result)
        console.log(result.result)
    })
    .catch(error => console.log('error', error));

//Fonction connexion
async function Login() {
    let loginInput = document.getElementById("loginInput").value
    let passwordInput = document.getElementById("passwordInput").value

    await fetch("http://greenvelvet.alwaysdata.net/bugTracker/api/login/"+ loginInput + "/"+ passwordInput)
    .then(function (response) {
        return response.json()
    })
    .then(function (result) {
        JSON.stringify(result)
        console.log(result.result)

        let token = result.result.token;
        localStorage.setItem("token", token);

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

        if (token) {
            window.location ="./list.html"
        }
    })
    .catch(error => console.log('error', error));
}

//Fonction Liste
async function bugsList() {
    let bugsTableBody = document.getElementById("bugListBody");
    bugsTableBody.innerHTML =""
    const token = localStorage.getItem("token");
    let userID = 0;

    await fetch("http://greenvelvet.alwaysdata.net/bugTracker/api/list/" + token + "/" + userID)
    .then(function (response) {
        return response.json()
    })
    .then(function (result) {
        JSON.stringify(result)
        let bugList = result.result.bug;

        bugList.forEach(element => {
            bugsTableBody.innerHTML += 
            `<tr>
                <td>
                    <h3>${element.title}</h3>
                    <span>${element.description}</span>
                </td>
                <td>${element.user_id}</td>
                <td>
                    <select name="" id="">
                        <option value="">State 0</option>
                        <option value="">State 1</option>
                        <option value="">State 2</option>
                    </select>
                </td>
                <td>
                    <button onclick="Delete(${element.id})">Supprimer</button>
                </td>
            </tr>`
        });

        console.log(bugList);
    })
    .catch(error => console.log('error', error));
}


//Fonction Delete Bug
async function Delete(bugID) {
    const token = localStorage.getItem("token");

    await fetch("http://greenvelvet.alwaysdata.net/bugTracker/api/delete/" + token + "/" + bugID)
    .then(function () {
        bugsList();
    })
    .catch(error => console.log('error', error));
}

// var formItems = {"title":"TestTitle",
//     "description":"testDescription"};