/*
 * @author Mike Seiler <http://www.michaelseiler.net>
 */
(function() {
  'use strict';

  angular
    .module('appName.geoLocationService')
    .factory('geoLocationService', geoLocationService);

    geoLocationService.$inject = ['$window','$q'];

    function geoLocationService($window,$q) {
      return {
        getLocation: getLocation
      };

      function getLocation() {
        var deferred = $q.defer();

        if(!$window.navigator.geolocation) {
            return deferred.resolve("GPS_UNAVAILABLE");
          } else {
            cordova.plugins.diagnostic.isLocationEnabled(function(enabled) {
              if(!enabled) {
                return deferred.resolve("GPS_UNAVAILABLE");
              } else {
                $window.navigator.geolocation.getCurrentPosition(function (position) {
                return deferred.resolve(position);
                },
                function (err) {
                  if(err.code == 1) {
                    // Browser response will always either be allowed or denied
                    // as HTML5 simply asks if you will allow a site to use your location
                    return deferred.resolve("USER_DENIED");
                  } else if(err.code == 2) {
                    // err.code 2 should never happen as the Diagnostic plugin
                    // catches the disabled GPS above; keep it here to catch
                    // unexpected behavior
                    return deferred.resolve("GPS_UNAVAILABLE");
                  } else {
                    return deferred.resolve(err);
                  }
                });
              }
            }, function(error) {
               alert("The following error occurred: " + error);
            });
        }
        return deferred.promise;
      }
  }
})();
