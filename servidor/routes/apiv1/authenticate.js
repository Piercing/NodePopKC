/**
 * Created by Piercing on 2/10/15.
 */
"use strict";

let express = require('express');
let router = express.Router();

let mongoose = require('mongoose');
let Usuario = mongoose.model('Usuario');

let jwt = require('jsonwebtoken');
let config = require('../../datosConfig/local_config');

let sha = require('sha256');

router.post('/authenticate', function (req, res) {

    // busco un sólo usuario
    Usuario.findOne({
        nombre: req.body.nombre,
        email: req.body.email,
        clave: req.body.clave
    }, function (err, usuario) {

        if (err) {
            return res.status(500).json({ok: false, error: {code: 500, message: err.message}});
        }

        if (!usuario) {
            return res.json({ok: false, error: {code: 401, message: 'Authentication failed. User not found.'}});

        }
        else if (usuario) {
            // codificado la clave candidata
            let validatePass = sha('sha256', req.body.clave);

            // compruebo clave candidata con la clave de la BBDD
            if (usuario.clave !== validatePass) {
                res.json({ok: false, error: {code: 401, message: 'Authentication failed. Wrong password.'}});

                // compruebo el email
            }
             if (usuario.email !== req.body.email) {
                return res.json({ok: false, error: {code: 401, message: 'Authentication failed. Email not found.'}});
            }
            else {
                // Si encuetro el usuario y su clave y email son correctos
                // creo el token
                var token = jwt.sign(usuario, config.jwt.secret, {
                    expiresInMinutes: config.jwt.expiresInMinutes
                });

                // devuelvo la información incluida en el token en JSON
                res.json({
                    ok: true,
                    message: 'Enjoy your token!',
                    token: token
                });
            }
        }
    });
});

module.exports = router;