'use strict'

const authRoutes = require("./auth/auth.routes");
const express = require("express");
const bodyParser = require('body-parser');
const properties = require("./config/properties");
const database = require("./config/db");

//Arrancar DB
database.openConnection();

const app = express();
var router = express.Router();

//MIDDLEWARES PERMITE LA COMUNICACIÓN DE ENTRADA Y SALIDA
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

//CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/api', router);

authRoutes(router);

app.use(router);

app.listen(
    properties.PORT,
    () => {
        console.log(`Servidor corriendo correctamente en el puerto ${properties.PORT}\n`);
    }
);