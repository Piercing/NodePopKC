/**
 * Created by Piercing on 29/9/15.
 */

"use strict";

var mongoose = require('mongoose');

// definir esquema de pushToken
var pushTokenSchema = mongoose.Schema({
    plataforma: {type: String, enum: ['ios', 'android']},
    token: String,
    usuario: String
});

// exportar el modelo creado
var pushToken = mongoose.model('pushToken', pushTokenSchema);

module.exports = pushToken;
