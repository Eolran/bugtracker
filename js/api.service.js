//http://greenvelvet.alwaysdata.net/bugTracker/api/

fetch("http://greenvelvet.alwaysdata.net/bugTracker/api/ping")
    .then(function(response) {
        return response.json()
    })
    .then(function(result){
        JSON.stringify(result)
        console.log(result.result)
    })
    .catch(error => console.log('error', error));