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
    var filtros = {};

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

    // si me piden filtrar por rango de precio
    if (typeof req.query.precio !== 'undefined') {
        filtros.precio = {'$gte': req.query.precio.min, '$lte': req.query.precio.max};
    }

    // si me piden filtrar por nombre
    if (typeof req.query.nombre !== 'undefined') {
        filtros.nombre = new RegExp('^' + req.query.nombre, 'i');
    }

    // poner límites
    var start = parseInt(req.query.start) || 0;
    // el Api devuelve como máximo 4 registros en cada llamada
    var limit = parseInt(req.query.limit) || 4;

    console.log(filtros);

    Anuncio.list(filtros, start, limit, function (err, lista) {
        if (err) {
            console.log(err);
            res.json({ok: false, error: err});
            return;
        }
        res.json({ok: true, data: lista});
    });

    router.get('/', function (req, res, next) {
        Anuncio.listTags(function (err, rows) {
            if (err) {
                return next(err)
            }
            res.json(rows);
        });
    });
});

module.exports = router;