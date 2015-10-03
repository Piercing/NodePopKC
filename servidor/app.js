"use strict";

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// convierte cadenas de texto en objetos de mongodb para hacer búsquedas por ID
//var id = mongoose.helper.toObject;

var routes = require('./routes/index');
var anuncios = require('./routes/apiv1/anuncios');
var usuarios = require('./routes/apiv1/usuarios');
var pushTokens = require('./routes/apiv1/pushTokens');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('mensajesError',require('./datosConfig/mensajesError'));


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

// Comprueba el lenguaje del HEAD
require('./lib/idioma');

// requerir dbNodepop antes de cargar las rutas
require('./lib/dbNodepop.js');

// requerir script install_db.js
require('./datosConfig/install_db.js');

// requerir authenticate JWT
require('./lib/jwtAuth.js');

// requerir apiKey
require('./datosConfig/local_config.js');


// requerir los modelos
require('./models/Anuncio.js');
require('./models/Usuario.js');
require('./models/PushToken.js');

var msgError = require('./datosConfig/mensajesError.js');

app.use('/', routes);

/*API Versión 1*/

app.use('/apiv1/anuncios', anuncios);
app.use('/apiv1/usuarios', usuarios);
// Con JSON Web Authenticate
app.use('/apiv1/pushTokens', pushTokens);

app.use('/apiv1/usuarios', require('./routes/apiv1/authenticate'));
app.use('/apiv1/tags', require('./routes/apiv1/listaTags'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.send('error', {controlError: msgError['usuario_05'].en
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
