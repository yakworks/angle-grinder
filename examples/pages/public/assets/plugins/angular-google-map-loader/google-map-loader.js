/* 
    Credits: GFoley83 (https://gist.github.com/GFoley83/5953448) 
*/

/*!
 * JavaScript - loadGoogleMaps( version, apiKey, language, sensor )
 *
 * - Load Google Maps API using jQuery Deferred. 
 *   Useful if you want to only load the Google Maps API on-demand.
 * - Requires jQuery 1.5
 *
 *   UPDATES by Gavin Foley
 * - Tidied JS & made it JSLint compliant
 * - Updated script request to Google Maps API to be protocol relative
 * - Added "sensor" parameter which defaults to false if not present
 * 
 * Copyright (c) 2011 Glenn Baker
 * Dual licensed under the MIT and GPL licenses.
 */
/*globals window, google, jQuery*/
var loadGoogleMaps = (function ($, window) {
    "use strict";
 
    var now = $.now(),
        promise;
 
    return function (version, apiKey, language, sensor) {
        if (promise) {
            return promise;
        }
 
        //Create a Deferred Object
        var deferred = $.Deferred(),
            //Declare a resolve function, pass google.maps for the done functions
            resolve = function () {
                deferred.resolve(window.google && window.google.maps ? window.google.maps : false);
            },
            //global callback name
            callbackName = "loadGoogleMaps_" + (now++),
 
            // Default Parameters
            params = $.extend({
                "sensor": sensor || "false"
            },
            apiKey ? {
                "key": apiKey
            } : {},
            language ? {
                "language": language
            } : {});
 
        //If google.maps exists, then Google Maps API was probably loaded with the <script> tag
        if (window.google && window.google.maps) {
            resolve();
            //If the google.load method exists, lets load the Google Maps API in Async.
        } else if (window.google && window.google.load) {
            window.google.load("maps", version || 3, {
                "other_params": $.param(params),
                    "callback": resolve
            });
            //Last, try pure jQuery Ajax technique to load the Google Maps API in Async.
        } else {
            //Ajax URL params
            params = $.extend(params, {
                'callback': callbackName
            });
 
            //Declare the global callback
            window[callbackName] = function () {
                resolve();
 
                //Delete callback
                setTimeout(function () {
                    try {
                        delete window[callbackName];
                    } catch (e) {}
                }, 20);
            };
 
            //Can't use the jXHR promise because 'script' doesn't support 'callback=?'
            $.ajax({
                dataType: 'script',
                data: params,
                url: '//maps.googleapis.com/maps/api/js'
            });
 
        }
 
        promise = deferred.promise();
 
        return promise;
    };
 
})(jQuery, window);