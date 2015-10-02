/**
 * Created by Piercing on 29/9/15.
 */
"use strict";

let express = require('express');
let router = express.Router();

// requiero el modelo 'pushToken'
let PushToken = require('../../models/PushToken');

/* GET users listing. */
router.post('/', function (req, res, next) {

    // crear ruta pushToken
    console.log(req.body);
    let pushToken = new PushToken(req.body);
    pushToken.save(function (err, guardado) {
        if (err) {
            console.log(err)
            return res.json({ok: false, error: err});
        }
        //devolver confirmación
        res.json({ok: true, usuario: guardado});
    });
});

module.exports = router;