/**
 * Created by Piercing on 29/9/15.
 */

"use strict";

var mongoose = require ( 'mongoose' );
var fs       = require ( 'fs' );
var path     = require ( 'path' );
var config   = require ( '../config' ).ads;
let helper   = require ( '../lib/helper' );

// Definir esquema de anuncio
var anuncioSchema = mongoose.Schema ( {
    nombre: { type: String, index: true },
    venta : { type: Boolean, index: true },
    precio: { type: Number, index: true },
    foto  : String,
    tags  : { type: [ String ], index: true }
} );

/**
 * Tags disponibles
 * @returns {string[]}
 */
anuncioSchema.statics.availableTags = function () {
    return [ 'work', 'lifestyle', 'motor', 'mobile' ];
};

/**
 * Cargando JSON anuncios
 * @param file
 * @param cb
 */
anuncioSchema.statics.loadJSON = function ( file, cb ) {
    // Codifico a 'utf8' el archivo recibido, y función con error o los datos
    fs.readFile ( file, { encoding: 'utf8' }, function ( err, data ) {
        // Si hay error
        if ( err ) {
            return cb ( err );
        }
        // Leyendo datos
        console.log ( file + ' load' );
        // Datos leídos
        console.log ( 'Loaded ads: \n' + data );

        try {
            if ( data ) {
                // Parseo los datos del JSON a objetos
                var ads = JSON.parse ( data );
                console.log ( ads );
                var numAds = ads.length;

                // LLamo  a la  función, itero  sacando todos
                // los elementos del array 'ads' y los guardo
                helper.iterateArrays ( ads, Anuncio.register, ( err )=> {
                    // Devuelvo el error si lo hubo
                    if ( err ) {
                        return cb ( err );
                    }
                    // Si no hubo error, devuelvo el
                    // número de elementos del array
                    return cb ( null, numAds );
                } );
                // Si no hay datos, genero un nuevo error avisando de que está vació el fichero
            }
        } catch ( err ) {
            return cb ( err );
        }

    } );
};


// Registrar anuncio nuevo
anuncioSchema.statics.register = function ( ad, cb ) {
    new Anuncio ( ad ).save ( cb );
};

/**
 * Query
 * @param filters
 * @param start
 * @param sort
 * @param limit
 * @param total
 * @param cb
 * @returns {Promise}
 */
anuncioSchema.statics.list = function ( filters, start, sort, limit, total, cb ) {

    console.log ( 'anuncio.list', filters, start, sort, limit, total );

    // Si pongo el cb,  cuando termine mongoose de hacer la búsqueda
    // ejecutará el callback y me devolverá los datos de la búsqueda.
    var query = Anuncio.find ( filters );
    query.sort ( sort );
    query.skip ( start );
    query.limit ( limit );

    // Ejecuto y devuelvo la consulta o el error
    return query.exec ( function ( err, rows ) {
        if ( err ) {
            return cb ( err );
        }
        // Itero por las filas que recibo y pongo prefijo a imágenes
        rows.forEach ( ( row ) => {
            // Si hay filas con foto
            if ( row.foto ) {
                // Asigno prefijo a la fila con la foto
                row.foto = config.imagesURLPath + row.foto;
            }
        } );

        // Objeto resultado con las filas
        var result = { rows: rows };

        // Si es distinto del total, devuelvo las filas obtenidas sin error
        if ( ! total ) {
            return cb ( null, result );
        }
        // Cuento los 'anuncios' y si  no  hay error
        // devuelvo el total de anuncios sin filtrar
        Anuncio.getCount ( {}, function ( err, total ) {
            if ( err ) {
                return cb ( err );
            }
            result.total = total;
            return cb ( null, result );
        } );
    } );
};

/**
 * Devuelve los anuncios filtrados
 * @param filter
 * @param cb
 * @returns {Query|*}
 */
anuncioSchema.statics.getCount = function ( filter, cb ) {
    return Anuncio.count ( filter, cb );
};

// exportar el modelo creado
var Anuncio    = mongoose.model ( 'Anuncio', anuncioSchema );
module.exports = Anuncio;








