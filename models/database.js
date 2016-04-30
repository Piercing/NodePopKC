'use strict';

let mongoose = require ( 'mongoose' );
let database = mongoose.connection;

database.on ( 'error', function ( err ) {
    console.error ( 'mongodb connection error:', err );
    process.exit ( 1 );
} );

database.once ( 'open', function () {
    console.info ( 'Connected to mongodb.' );
} );

// Conectar a 'nodepop'
mongoose.connect ( 'mongodb://localhost/nodepop' );

// Cargamos todos los modelos
require ( './Anuncio' );
require ( './Usuario' );
require ( './PushToken' );

module.exports = database;