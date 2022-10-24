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
    })
    .catch(error => console.log('error', error));
}