// require('dotenv').config();

console.log('Init!');

const form = document.querySelector('form');
const myInput = form.querySelector('input[type="tel"]');
const inputMask = new Inputmask('+38 (999) 999-99-99');
inputMask.mask(myInput);

const validation = new JustValidate('.form');

validation
    .addField('#name', [
        {
            rule: 'minLength',
            value: 3,
        },
        {
            rule: 'maxLength',
            value: 30,
        },
        {
            rule: 'required',
            value: true,
            errorMessage: '!',
        },
    ])
    .addField('#lastName', [
        {
            rule: 'minLength',
            value: 3,
        },
        {
            rule: 'maxLength',
            value: 30,
        },
        {
            rule: 'required',
            value: true,
            errorMessage: '!',
        },
    ])
    .addField('#email', [
        {
            rule: 'required',
            value: true,
            errorMessage: '!',
        },
        {
            rule: 'email',
            value: true,
            errorMessage: '!',
        },
    ])
    .addField('#tel', [
        {
            rule: 'required',
            value: true,
            errorMessage: '!',
        },
        {
            rule: 'function',
            validator: function () {
                const phone = telSelector.inputmask.unmaskedvalue();
                return phone.length === 10;
            },
            errorMessage: '!',
        },
    ])
    .addField('#password', [
        {
            rule: 'required',
            value: true,
            errorMessage: '!',
        },
    ])
    .onSuccess((event) => {
        console.log('Validation passes and form submitted', event);

        let formData = new FormData(event.target);

        console.log(...formData);

        let xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    console.log('Sent');
                }
            }
        };

        xhr.open('POST', 'mail.php', true);
        xhr.send(formData);

        event.target.reset();
    });
