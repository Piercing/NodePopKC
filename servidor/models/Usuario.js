/**
 * Created by Piercing on 29/9/15.
 */

"use strict";

let mongoose = require('mongoose');

// definir esquema de Usuario
let usuarioSchema = mongoose.Schema({
    nombre: String,
    email: String,
    clave: String
});

// exportar el modelo creado
var Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;