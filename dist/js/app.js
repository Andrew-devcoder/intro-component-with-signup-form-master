console.log('Init!');

const form = document.querySelector('form');
const telSelector = form.querySelector('input[type="tel"]');
const inputMask = new Inputmask('+38 (999) 999-99-99');
inputMask.mask(telSelector);

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
        },
    ])
    .addField('#email', [
        {
            rule: 'required',
            value: true,
        },
        {
            rule: 'email',
            value: true,
        },
    ])
    .addField('#tel', [
        {
            rule: 'required',
            value: true,
        },
        {
            rule: 'function',
            validator: function () {
                const phone = telSelector.inputmask.unmaskedvalue();
                return phone.length === 10;
            },
        },
        {
            rule: 'minLength',
            value: 10,
        },
    ])
    .addField('#password', [
        {
            rule: 'required',
            value: true,
        },
    ])
    .onSuccess((event) => {
        console.log('Validation passes and form submitted', event);

        let formData = new FormData(event.target);

        //
        // formData.append('name', document.getElementById('name').value);
        // formData.append('email', document.getElementById('email').value);
        //

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
