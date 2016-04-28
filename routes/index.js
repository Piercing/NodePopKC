"use strict";

var express = require ( 'express' );
var router  = express.Router ();
var fs      = require ( 'fs' );

/* GET home page. */
router.get ( '/', function ( req, res, next ) {

    // Leer de disco el fichero README.md
    fs.readFile ( __dirname + '/../README.md', { encoding: 'utf8' }, ( err, data )=> {

        if ( err ) {
            console.log ( err );
            return next ( new Error ( 'Could not access the file README.md' ) );
        }

        res.render ( 'index', { title: 'NodePop', readme: data } );
    } );
} );

module.exports = router;
