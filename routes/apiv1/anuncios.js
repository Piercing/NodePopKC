/**
 * Created by Piercing on 29/9/15.
 */
"use strict";

var express = require ( 'express' );
var router  = express.Router ();

var mongoose = require ( 'mongoose' );
// requiero el modelo 'Anuncio'
var Anuncio = mongoose.model ( 'Anuncio' );

// Auth con JWT
var jwtAuth = require ( '../../lib/jwtAuth' );
router.use ( jwtAuth () );

/* GET users listing. */
router.get ( '/', function ( req, res ) {

    // Sacar filtros de busqueda de query-string
    var filters = {};
    // Poner límites
    var start = parseInt ( req.query.start ) || 0;
    // El Api devuelve como máximo 1000 registros en cada llamada
    var limit = parseInt ( req.query.limit ) || 1000;
    // Ordenar, o por 'id'
    var sort = req.query.sort || '_id';

    var total = req.query.total === 'true';

    // control de errores //

    // si me piden filtrar por tag
    if ( typeof req.query.tag !== 'undefined' ) {
        filters.tags = req.query.tag;
    }

    // si me piden filtrar por venta
    if ( typeof req.query.venta !== 'undefined' ) {
        filters.venta = req.query.venta;
    }

    // si me piden filtrar por precio igual
    if ( typeof req.query.precio !== 'undefined' ) {
        filters.precio = { '$gte': req.query.precio };
    }

    // si me piden filtrar por rango de precio
    if ( typeof req.query.precio !== 'undefined' ) {
        filters.precio = { '$gte': req.query.precio.min, '$lte': req.query.precio.max };
    }

    // si me piden filtrar por nombre
    if ( typeof req.query.nombre !== 'undefined' ) {
        filters.nombre = new RegExp ( '^' + req.query.nombre, 'i' );
    }

    console.log ( filters );

    Anuncio.list ( filters, start, sort, limit, total, function ( err, list ) {
        if ( err ) {
            //console.log ( err );
            return res.status ( 500 ).json ( { ok: false, error: { code: 500, message: err.message } } );
        }
        res.json ( { ok: true, data: list } );
    } );

    router.get ( '/tags', function ( req, res, next ) {
        Anuncio.listTags ( function ( err, rows ) {
            if ( err ) {
                return next ( err )
            }
            res.json ( rows );
        } );
    } );
} );

module.exports = router;
