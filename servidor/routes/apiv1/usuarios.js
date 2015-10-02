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
router.post('/', function (req, res) {

    // codificado la clave del usuario que recibo por el body
    let clavesSHA = sha('sha256', req.body.clave);
    // req parámetros del nuevo usuario con clave cifrada del body
    let usuarioCifrado = {nombre: req.body.nombre, email: req.body.email, clave: clavesSHA};

    // crear un registro de usuario
    let usuario = new Usuario(usuarioCifrado);
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