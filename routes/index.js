"use strict";

var express = require ( 'express' );
var router  = express.Router ();
var fs      = require ( 'fs' );

/* GET home page. */
router.get ( '/', function ( req, res, next ) {

    // Leer de disco el fichero README.md
    fs.readFile ( __dirname + '/../README.md', { encoding: 'utf8' }, ( err, data )=> {
        // Si hay eror
        if ( err ) {
            console.log ( err );
            return next ( new Error ( 'Could not access the file README.md' ) );
        }
        // Sino, renderizo en el index el título y los datos
        res.render ( 'index', { title: 'NodePop', readme: data } );
    } );
} );

module.exports = router;
