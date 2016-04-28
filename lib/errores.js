"use strict";

module.exports = function () {

    return function (err, req, res, next) {
        if (err.controlError) {

            var idioma = (req.headers["lang"] || 'es');
            if ((idioma !== 'en') && (idioma !== 'es')) idioma = 'es'
            var code = err.controlError.code || 200;
            var mensaje = err.controlError[idioma];

            res.status(code).json({ok: false, mensaje: mensaje});
        }
        else
            next(err);
    };
};

