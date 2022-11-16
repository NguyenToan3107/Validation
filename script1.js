// Validator
function Validator(options) {
    const formElement = document.querySelector(options.form)
    if (formElement) {
        options.rules.forEach(function (rule) {
            const inputElement = formElement.querySelector(rule.selector)

            inputElement.onblur = function () {

                const errorElement = inputElement.parentElement.querySelector(options.errorSelector)

                const errorMessage = rule.test(inputElement.value);

                if (errorMessage) {
                    errorElement.innerHTML = errorMessage
                    inputElement.parentElement.classList.add('invalid')
                } else {
                    errorElement.innerHTML = ''
                    inputElement.parentElement.classList.remove('invalid')
                }
            }

            inputElement.oninput = function () {
                const errorElement = inputElement.parentElement.querySelector(options.errorSelector)
                errorElement.innerHTML = ''
                inputElement.parentElement.classList.remove('invalid')
            }
        })
    }

}

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
            const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            return regex.test(value) ? undefined : "Truòng này phải là Email"
        }
    }
}

Validator.isMinLength = function (selector, min) {
    return {
        selector,
        test: function (value) {
            return value.trim() > min ? undefined : `Trường nhâp tối thiểu ${min} ký tự`
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
        Validator.isMinLength('#passwork', 6)
    ]
})