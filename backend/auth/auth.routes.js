'use strict'

const Users = require("./auth.controller");
module.exports = (router) => {

    router.post("/register", (req, res) => {
        console.log("El router detecto un registro");
        Users.createUser(req, res);
    });

    router.post("/login", (req, res) => {
        console.log("El router detecto un inicio");
        Users.loginUser(req, res);
    });

    router.get('/', (req, res) => {
        console.log("El router detecto un get");
        res.status(200).send("<h1>Página de inicio</h1>");
    });

};