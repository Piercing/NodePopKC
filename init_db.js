"use strict";

var database = require ( './models/database' );
var mongoose = require ( 'mongoose' );
var readLine = require ( 'readline' );
var async    = require ( 'async' );
var Usuario  = mongoose.model ( 'Usuario' );
var Anuncio  = mongoose.model ( 'Anuncio' );
var path     = require ( 'path' );

// Colgamos evento abrir 'database'
database.once ( 'open', function () {

    // Creo interfaz de entrada salida de datos
    var rLine = readLine.createInterface ( {
        input : process.stdin,
        output: process.stdout
    } );

    rLine.question ( 'Are you sure to clear the BD, (yes or no)?', function ( response ) {
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

    // Cargamos anuncios y usuarios o devolvemos un error y salimos en 2º plano
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

    // Borro los anuncios
    Anuncio.remove ( {}, ()=> {
        console.log ( 'Delete ads.' );

        // Cargo anuncios.json
        var file = ( path.join ( __dirname, 'anuncios.json' ) );

        //'./anuncios.json';
        console.log ( 'Loading ' + file + ' ...' );

        // Cargo el JSON de los anuncios
        Anuncio.loadJSON ( file, ( err, numAdsLoaded )=> {
            // Si hay error lo devuelvo
            if ( err ) {
                return cb ( err );
            }
            // Devuelvo la cantidad de anuncios cargados
            console.log ( `Loaded ${numAdsLoaded} ads.` );
            return cb ( null, numAdsLoaded );
        } );
    } );
}

/**
 *
 * @param cb
 */
function startUsers ( cb ) {

    // Borro usuarios
    Usuario.remove ( {}, ()=> {
        // Creo un par de users nuevos
        var users = [
            { nombre: 'admin', email: 'merlosalbarracin@gmail.com', clave: '1234567' },
            { nombre: 'carlos', email: 'carlos@hotmail.es', clave: '7654321' }
        ];

        // Itero por el array de Usuarios almacenándolos en modo asíncrono
        async.eachSeries ( users, Usuario.register, ( err )=> {
            if ( err ) {
                return cb ( err );
            }
            console.log ( `Loaded ${users.length} users.` );
            return cb ( null, users.length );
        } );
    } );
}
