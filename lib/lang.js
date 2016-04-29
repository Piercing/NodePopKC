/**
 * Created by Piercing on 30/9/15.
 */

'use strict';

var lang = {};

// los templates se cargan en app.js
lang.templates = [];

/**
 *
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
 * Return template
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
        Object.getOwnPropertyNames ( values ).forEach ( ( value )=> {
            stringKey = stringKey.replace ( `$$${value}$$`, values[ value ] );
        } );
    }
    return stringKey;
};

module.exports = lang;


