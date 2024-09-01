function validator (options) {
    var selectorRules = {}
    const formElement = document.querySelector('#form')
    // console.log(formElement)
    if (formElement) {
        formElement.onsubmit = function (e) {
            e.preventDefault();
            // var isFormValid = true;
            options.rules.forEach(function (rule) {
                // selectorRules[rule.section] = rule.test
                if(Array.isArray(selectorRules[rule.section])){
                    selectorRules[rule.section].push(rule.test)
                }else{
                    selectorRules[rule.section] = [rule.test]
                }
                var inputElement = formElement.querySelector(rule.section)
                var errorMessage = rule.test(inputElement.value)
                var errorElement = inputElement.parentElement.querySelector('.form-message')
                var span = inputElement.parentElement.querySelector('span')
                var rules = selectorRules[rule.section]
                for (var i = 0; i < rules.length; i++) {
                    errorMessage = rules[i](inputElement.value)
                }
                // createCourse(dataLogin)
                if (errorMessage) {
                    errorElement.innerText = errorMessage;
                    inputElement.classList.add('invalid');
                    span.classList.add('color-red');
                } else {
                    errorElement.innerText = ''
                    inputElement.classList.remove('invalid');
                    span.classList.remove('color-red'); 
                }
            })
            // console.log(selectorRules)
            var dataLogin = {
                username: document.querySelector('#username').value,
                password: document.querySelector('#password').value,
                confirmPassword: document.querySelector('#confimPassword').value
            }
            createCourse(dataLogin)
        }
        
        options.rules.forEach(function (rule) {
            
            var inputElement = formElement.querySelector(rule.section)
            if (inputElement) {
                inputElement.onblur = function () {
                    
                    var errorMessage = rule.test(inputElement.value)
                    var errorElement = inputElement.parentElement.querySelector('.form-message')
                    var span = inputElement.parentElement.querySelector('span')
                    
                    if (errorMessage) {
                        errorElement.innerText = errorMessage;
                        inputElement.classList.add('invalid');
                        span.classList.add('color-red');
                    } else {
                        errorElement.innerText = ''
                        inputElement.classList.remove('invalid');
                        span.classList.remove('color-red'); 
                    }
                    return !errorMessage
                }
            }
            
        })
    }
}
validator.isRequired = function (section) {
    return {
        section: section,
        test: function (value) {
            if (value.trim().length >= 6) {
                return undefined
            } else if (value.trim().length == 0) {
                return 'vui lòng nhập thông tin tài khoản'
            } else {
                return 'Tên tài khoản phải từ 6 kí tự trở lên'
            }
        }
    }
}
validator.minLength = function (section) {
    return {
        section: section,
        test: function (value) {
            if (value.trim().length >= 8) {
                return undefined
            } else if(value.trim().length == 0) {
                return 'vui lòng nhập mật khẩu'
            }
             else {
                return 'Mật này phải đủ 8 kí tự'
            }
        }
    }
}

validator.isConfirmed = function (section) {
    return {
        section: section,
        test: function (value) {
            if (Number(value) && value.trim().length == 4) {
                return undefined
            } else if(value.trim().length == 0) {
                return 'vui lòng nhập mật không cấp 2'
            }
            else {
                return 'Mật không cấp 2 phải đủ 4 số'
            }
        }
    }
}


// https://66d27be6184dce1713cda906.mockapi.io/username

var coursesApi = 'https://66d27be6184dce1713cda906.mockapi.io/username'

function start() {
    getCourseApi()
}

function getCourseApi() {
    fetch(coursesApi)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
        })
}
function createCourse(data) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch(coursesApi, options)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
        })
}

start()