/**
 * Created by Piercing on 29/9/15.
 */

"use strict";

let mongoose = require('mongoose');
let fs = require('fs');
let path = require('path');

// definir esquema de Usuario
let usuarioSchema = mongoose.Schema({
    nombre: String,
    email: String,
    clave: String
});

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



// exportar el modelo creado
var Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;