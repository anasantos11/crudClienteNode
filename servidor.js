var express = require('express');
var bodyParser = require('body-parser');
var fs = require("fs");

const file = "data.json";

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.listen(3000, function () {
    console.log('Servidor rodando na porta 3000!');
});

app.get('/', function (request, response) {
    response.send("Servidor rodando...")
});

app.get('/cliente', function (req, res) {
    fs.readFile(file, function read(error, data) {
        if (error) {
            console.error("Erro:  " + error.message);
            res.error("Erro:  " + error.message);
        } else {
            console.log("Read File: " + data);
            res.setHeader('Content-Type', 'application/json');
            res.send(data);
        }

    });
});

app.post('/cliente', function (req, res) {
    fs.readFile(file, 'utf8', function readFileCallback(error, data) {
        if (error) {
            console.error("Erro:  " + error.message);
            res.error("Erro:  " + error.message);
        } else {
            let obj = [];
            console.log("Read file in write: " + data);
            if (data != undefined && data.length > 0) {
                obj = JSON.parse(data);
            }
            obj.push(req.body);
            fs.writeFile(file, JSON.stringify(obj), function (error) {
                res.send("Cliente cadastrado com sucesso");
            });
        }
    });
});