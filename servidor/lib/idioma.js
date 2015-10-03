/**
 * Created by Piercing on 30/9/15.
 */

var mensajeError = require('../datosConfig/mensajesError');

module.exports = function() {

    return function(req, res, next) {

        // Comprobar idioma en el HEAD
        if ((!req.headers.lang) || (req.headers.lang!=='es' && req.headers.lang!=='en') )
            return next({controlError:mensajeError['idioma']});
        next();
    };
};


