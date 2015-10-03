/**
 * Created by Piercing on 3/10/15.
 */
"use strict";
var express = require('express');
var router = express.Router();

// requiero el modelo 'Anuncio'
var Anuncio = require('../../models/Anuncio');

router.get('/tags', function(req, res, next) {
    Anuncio.listaTagsTags(function(err,rows){
        if (err) {
            return next(err)
        }
        res.json(rows);
    });
});

module.exports = router;