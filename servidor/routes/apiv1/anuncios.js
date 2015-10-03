/**
 * Created by Piercing on 29/9/15.
 */
"use strict";

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// requiero el modelo 'Anuncio'
var Anuncio = require('../../models/Anuncio');


/* GET users listing. */
router.get('/', function (req, res) {

    // sacar filtros de busqueda de query-string
    let filtros = {};

    // controlo los errores

    // si me piden filtrar por tag
    if (typeof req.query.tags !== 'undefined') {
        filtros.tags = req.query.tags;
    }

    // si me piden filtrar por venta
    if (typeof req.query.venta !== 'undefined') {
        filtros.venta = req.query.venta;
    }

    // si me piden filtrar por precio igual
    if (typeof req.query.precio !== 'undefined') {
        filtros.precio = {'$gte': req.query.precio};
    }

    // si me piden filtrar por precio igual
    if (typeof req.query.precio !== 'undefined') {
        filtros.precio = {'$lte': req.query.precio};
    }

    // si me piden filtrar por nombre
    if (typeof req.query.nombre !== 'undefined') {
        filtros.nombre = new RegExp('^' + req.query.nombre, 'i');
    }

    // poner límites
    let start = parseInt(req.query.start) || 0;
    // el Api devuelve como máximo 4 registros en cada llamada
    let limit = parseInt(req.query.limit) || 4;

    console.log(filtros);

    Anuncio.list(filtros, start, limit, function (err, lista) {
        if (err) {
            console.log(err);
            res.json({ok: false, error: err});
            return;
        }
        res.json({ok: true, data: lista});
    });
});

module.exports = router;
