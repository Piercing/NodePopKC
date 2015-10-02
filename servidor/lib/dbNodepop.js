/**
 * Created by Piercing on 29/9/15.
 */
"use strict";

// cargamos mongoose
var mongoose = require('mongoose');

// creamos objeto db (conexión)
var db = mongoose.connection;

// handler de error de conexión
db.on('error', function (err) {
    console.log(err);
    // paro la ejecución
    process.exit(1);
});

// handler de conexión, que lo haga una vez
db.once('open', function(){
   console.log('conectado a mongoose');
});

// conectamos para que salten los eventos
mongoose.connect('mongodb://localhost/nodepop');


module.exports = db;
