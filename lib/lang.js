/**
 * Created by Piercing on 30/9/15.
 */

'use strict';

var lang = {};

// Los templates se cargan en app.js
lang.templates = [];

/**
 * Register language
 * @param langID
 */
lang.registerLang = ( langID )=> {
    var stringsID = require ( '../lang/' + langID );
    lang.templates.push ( {
        langid : langID,
        strings: stringsID
    } );
};

/**
 *
 * @param langID
 * @returns {*}
 */
lang.getTemplate = ( langID )=> {
    for ( var i = 0; i < lang.templates.length; i ++ ) {
        var template = lang.templates[ i ];
        if ( template.langid === langID ) {
            return template;
        }
    }
    // Devuelvo el primer template
    return lang.templates[ 0 ];
};

/**
 *
 * @param key
 * @param langid
 * @param values
 * @returns {*}
 */
lang.translate = ( key, langid, values )=> {

    var stringKey = key;
    var strings   = lang.getTemplate ( langid ).strings;

    if ( strings.hasOwnProperty ( key ) ) {
        stringKey = strings[ key ];
    }
    // Si tiene valores custom los reemplazo
    if ( values ) {
        // Itero por los valores que recibo
        Object.getOwnPropertyNames ( values ).forEach ( ( value )=> {
            // Reemplazo: String.prototype.replace = function(searchValue,replaceValue) {};
            // Busco cada 'value' en 'values' y lo reemplazo en 'values[value]'
            stringKey = stringKey.replace ( `$$${value}$$`, values[ value ] );
        } );
    }
    return stringKey;
};

module.exports = lang;


