/**
 * Created by Piercing on 29/9/15.
 */

"use strict";

var mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');

// definir esquema de Usuario
var usuarioSchema = mongoose.Schema({
    nombre: String,
    email: String,
    clave: String
});

// indices
usuarioSchema.index({'email': 1}, {unique: true})
/*var fichero = path.join('./', 'usuarios.json');

 console.log('Abrir ' + fichero);

 // Abrir el fichero
 function createRecord(cb) {
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

// Obtener el usuario
function getUsuario(criterios, cb) {

    usuarioSchema.findOne(criterios, function (err, data) {
        if (err) {
            return cb(err);
        }
        return cb(null, data);
    });
};

// exportar el modelo creado
var Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
exports.getUsuario = getUsuario;