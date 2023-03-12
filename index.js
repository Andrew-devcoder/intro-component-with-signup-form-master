// "use strict";

// document.addEventListener('DOMContentLoaded', function () {
//     const form = document.getElementById('form');
//     form.addEventListener('submit', formSend);

//     async function formSend(e) {
//         e.preventDefault();
//         let error = formValidate(form);

//         let formDate = new FormDate(form);

//         if (error === 0) {
//             let response = await fetc('sendemail.php', {
//                 method: 'POST',
//                 body: formDate
//             });
//             if (response.ok) {

//                 let result = await response.json();
//                 alert(result.messange);
//                 // formPreview.innerHTML = '';
//                 form.peset();
//             } else {
//                 alert("Error");
//             }
//         }
//     }

//     function formValidate(form) {
//         let error = 0;
//         let formReq = document.querySelectorAll('._req');

//         for (let index = 0; index < formReq.length; index++) {
//             const input = formReq[index];
//             formRemoveError(input);

//             if (input.classList.contains('_email')) {
//                 if (emailTest(input)) {
//                     formAddError(input);
//                     error++;
//                 }
//             } else {
//                 if (input.value === "") {
//                     formAddError(input);
//                     error++;
//                 }
//             }
//         }
//     }
//     function formAddError(input) {
//         input.parentElement.classlist.add('_error');
//         input.classlist.add('_error');
//     }
//     function formRemoveError(input) {
//         input.parentElement.classlist.remove('_error');
//         input.classlist.remove('_error');
//     }
//     function emailTest(input) {
//         return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(
//             input.value
//         );
//     }
// });

//  try use with npm 


var express = require('express');
var http = require('http');
var path = require('path');
var nodemailer = require('nodemailer');

var app = express();
var server = http.Server(app);
var port = 500;

app.set("port", port);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/index.html")));

app.get('/', function (req, response) {
    response.sendFile(path.join(__dirname, "/index.html"))
})

app.post("/send_email", function (req, response) {
    var name = req.body.name;
    var lastName = req.body.lastName;
    var email = req.body.email;
    var password = req.body.password;

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'andrey.kovpak.01@gmail.com',
            pass: 'ohfbxqcoqrhpvzmh',
        }
    });

    var infoUser = {
        name: name,
        lastName: lastName,
        email: email,
        password: password
    }

    var mailOptions = {
        from: 'andrey.kovpak.01@gmail.com',
        to: 'andrey.kovpak.01@icloud.com',
        subject: name,
        text: lastName
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error)
        } else {
            console.log("message sent" + info.response)
        }
        response.redirect("/")
    });
})

server.listen(port, function () {
    console.log("port: " + port)
})

// ohfbxqcoqrhpvzmh