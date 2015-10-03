/**
 * Created by Piercing on 29/9/15.
 */
"use strict";

let mongoose = require('mongoose');
let fs = require('fs');
let path = require('path');

// definir esquema de anuncio
let anuncioSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String]
});
// ínidice
anuncioSchema.index({'nombre': 1, type: -1});

// ejecuto la query con todo
anuncioSchema.statics.list = function (filtros, start, limit, cb) {

    console.log('anuncio.list', filtros, start, limit);

    // si pongo el callback ('find(filtros, cb)'), cuando termine mongoose de hacer
    // la búsqueda ejecutará el callback y me devolverá los datos de la búsqueda.
    let query = Anuncio.find(filtros);
    query.sort('precio');
    query.skip(0);
    query.limit(10);
    query.select('nombre precio venta tags ');
    return query.exec(function (err, rows) {
        if (err) {
            return cb(err);
        }
        return cb(null, rows);
    });
};

/*var fichero = path.join('./', 'anuncios.json');

 console.log('Abrir ' + fichero);

 // Abrir el fichero
 function cargaJson(cb) {
 fs.readFile(fichero, function (err, data) {
 if (err) {
 return cb(err);
 }
 /!*try {
 // parsearlo
 var packageJson = JSON.stringify(data);
 } catch (e) {
 return cb(e);
 }*!/
 return cb(null, data);
 });
 }*/


// exportar el modelo creado
let Anuncio = mongoose.model('Anuncio', anuncioSchema);

module.exports = Anuncio;
