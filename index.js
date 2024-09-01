function validator(options) {
    var formElement = document.querySelector(options.form)
    if (formElement) {
        document.querySelector('.btn-primary').addEventListener('click', function (e) {
            e.preventDefault()
            var valueUsername = document.querySelector('#username').value
            var valuePassword = document.querySelector('#password').value
            var values = {
                username : valueUsername,
                password : valuePassword
            }
            console.log(values)
            createCourse(values)
        })
    }
    
    
}
validator.isRequired = function (selector) {
    return {
        selector : selector,
        test : function (value) {
            return value
        }
    }
}
validator.minLength = function (selector) {
    return {
        selector : selector,
        test : function (value) {
            return value
        }
    }
}

var getApi = 'https://66d27be6184dce1713cda906.mockapi.io/username'
function start() {
    fetch(getApi)
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        console.log(data)
    })
}
function createCourse(data) {
    fetch(getApi, {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(data)
    })
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        console.log(data)
    })
}
start()