"use strict";

var database = require ( './models/database' );
var mongoose = require ( 'mongoose' );
var readLine = require ( 'readline' );
var async    = require ( 'async' );

// Colgamos evento abrir la 'database'
database.once ( 'open', function () {

    // Creo interfaz de entrada salida de datos
    var rLine = readLine.createInterface ( {
        input : process.stdin,
        output: process.stdout
    } );

    rLine.question ( 'Are you sure to clear the BD?', function ( response ) {
        // Cerramos interfaz
        rLine.close ();
        if ( response.toLowerCase () === 'yes' ) {
            // Respuesta = si: llamamos a la función para
            // iniciar  anuncios y  usuarios  por defecto.
            installScript ();
        } else {
            console.log ( 'Installation aborted by user' );
            // Salimos
            return process.exit ( 0 );
        }
    } );
} );

/**
 *
 */
function installScript () {

    // Cargamos anuncios y usuarios o devolvemos un error y salimos
    async.series ( [ startAds, startUsers ], ( err ) => {
            if ( err ) {
                console.error ( 'There has been an error: ', err );
                return process.exit ( 1 );
            }
            return process.exit ( 0 );
        }
    );
}

/**
 *
 * @param cb
 */
function startAds ( cb ) {
    // Obtengo el modelo de anuncios
    var Anuncio = mongoose.model ( 'Anuncio' );

    // Borro los anuncios
    Anuncio.remove ( {}, ()=> {
        console.log ( 'Delete ads.' );

        // Cargo anuncios.json
        var file = './anuncios.json';
        console.log ( 'Loading ' + file + '...' );

        // Cargo el HSON de los anuncios
        Anuncio.loadJSON ( file, ( err, numLoaded )=> {
            // Si hay error lo devuelvo
            if ( err ) {
                return cb ( err );
            }
            // Devuelvo la cantidad de anuncios cargados sin error
            console.log ( `Loaded ${numLoaded} ads.` );
            return cb ( null, numLoaded );
        } );
    } );
}

/**
 *
 * @param cb
 */
function startUsers ( cb ) {
    var Usuario = mongoose.model ( 'Usuario' );

    Usuario.remove ( {}, ()=> {
        var usuarios = [
            { nombre: 'admin', email: 'merlosalbarracin@gmail.com', clave: '123456' },
            { nombre: 'carlos', email: 'carlos@hotmail.es', clave: '123456' }
        ];

        // Itero por el array de Usuarios
        async.eachSeries ( usuarios, Usuario.createRecord, ( err )=> {
            if ( err ) {
                return cb ( err );
            }
            console.log ( `Loaded ${usuarios.length} users.` );
            return cb ( null, usuarios.length );
        } );
    } );
}
