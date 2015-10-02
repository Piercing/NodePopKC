/**
 * Created by Piercing on 29/9/15.
 */
"use strict";

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let sha = require('sha256');

// requiero el modelo 'Usuario'
let Usuario = require('../../models/Usuario');

// crea un usuario
// POST /apiv1/usuarios
router.post('/', function (req, res, next) {

    // req del body
    //let clavesSHA = sha256.x2('sha256', req.body.clave) ;
    //let $hash = hash('sha512', $salt.$password);
    let objeto = {nombre: req.body.nombre, email:req.body.email, clave: req.body.clave};
    //let usuarioSHA= (nombre, email, clavesSHA);

    // crear un registro de usuario
    let usuario = new Usuario(objeto);
    // guardo el nuevo usuario
    usuario.save(function (err, creado) {
        if (err) {
            console.log(err);
            res.json({ok: false, error: err});
            return;
        }
        // devolver una confirmación
        res.json({ok: true, usuario: creado});
    });
});

module.exports = router;