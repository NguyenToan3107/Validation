
// ĐỐi tượng 'Validator'
function Validator(options) {

    // Hàm thực hiện validate
    function validate(inputElement, rule) {
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector)

        var errorMessage = rule.test(inputElement.value)

        if (errorMessage) {
            errorElement.innerText = errorMessage
            inputElement.parentElement.classList.add('invalid')
        } else {
            errorElement.innerText = ''
            inputElement.parentElement.classList.remove('invalid')
        }
    }

    // Lấy element của form cần validate
    var formElement = document.querySelector(options.form);

    if (formElement) {

        options.rules.forEach(function (rule) {

            var inputElement = formElement.querySelector(rule.selector)

            if (inputElement) {
                // Xử lí trường hợp blur khỏi input
                inputElement.onblur = function () {
                    // value: inputElement.value
                    // test func: rule.test()
                    validate(inputElement, rule)
                }

                // Xử lí mỗi khi người dùng nhập vào input
                inputElement.oninput = function () {
                    var errorElement = inputElement.parentElement.querySelector(options.errorSelector)
                    errorElement.innerText = ''
                    inputElement.parentElement.classList.remove('invalid')
                }
            }
        });
    }
}

// Định nghĩa rules
// Nhuyễn tắc của các rules:
// 1. khi có lỗi => message lỗi
// 2. Khi hợp lệ => ko trả ra cái gì cả (undefined)
Validator.isRequired = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim() ? undefined : "Vui lòng nhập trường này"
        }
    }
}
Validator.isEmail = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : "Trường này phải là Email"
        }
    }
}

Validator.minLength = function (selector, min) {
    return {
        selector: selector,
        test: function (value) {
            return value.length >= min ? undefined : `Vui lòng nhập vào ${min} ký tự`
        }
    }
}

Validator({
    form: '#form-1',
    errorSelector: '.form-message',
    rules: [
        Validator.isRequired('#fullname'),
        Validator.isEmail('#email'),
        Validator.isRequired('#passwork'),
        Validator.minLength('#passwork', 6)
    ]
});