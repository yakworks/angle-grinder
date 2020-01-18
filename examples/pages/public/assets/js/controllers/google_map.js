'use strict';


angular.module('app', ["google-maps"])

        .controller('GoogleMapCtrl', ['$scope', '$timeout', '$log', function($scope, $timeout, $log) {
            $scope.zoomIn = function() {
                ++$scope.zoom;
            }
            $scope.zoomOut = function() {
                --$scope.zoom;
            }

            // Enable the new Google Maps visuals until it gets enabled by default.
            // See http://googlegeodevelopers.blogspot.ca/2013/05/a-fresh-new-look-for-maps-api-for-all.html
            google.maps.visualRefresh = true;

            $scope.markers = [{
                latitude: 45,
                longitude: -74
            }, {
                latitude: 38,
                longitude: -88
            }];

            $scope.markerLat = null;
            $scope.markerLng = null;

            $scope.addMarker = function() {
                $scope.markers.push({
                    latitude: parseFloat($scope.markerLat),
                    longitude: parseFloat($scope.markerLng)
                });

                $scope.markerLat = null;
                $scope.markerLng = null;
            };

            // default location
            $scope.center = {
                latitude: 40.6700,
                longitude: -73.9400
            };

            $scope.latitude = null;
            $scope.longitude = null;

            $scope.zoom = 11;

            $scope.styles = [{
                featureType: 'water',
                elementType: 'all',
                stylers: [{
                    hue: '#e9ebed'
                }, {
                    saturation: -78
                }, {
                    lightness: 67
                }, {
                    visibility: 'simplified'
                }]
            }, {
                featureType: 'landscape',
                elementType: 'all',
                stylers: [{
                    hue: '#ffffff'
                }, {
                    saturation: -100
                }, {
                    lightness: 100
                }, {
                    visibility: 'simplified'
                }]
            }, {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{
                    hue: '#bbc0c4'
                }, {
                    saturation: -93
                }, {
                    lightness: 31
                }, {
                    visibility: 'simplified'
                }]
            }, {
                featureType: 'poi',
                elementType: 'all',
                stylers: [{
                    hue: '#ffffff'
                }, {
                    saturation: -100
                }, {
                    lightness: 100
                }, {
                    visibility: 'off'
                }]
            }, {
                featureType: 'road.local',
                elementType: 'geometry',
                stylers: [{
                    hue: '#e9ebed'
                }, {
                    saturation: -90
                }, {
                    lightness: -8
                }, {
                    visibility: 'simplified'
                }]
            }, {
                featureType: 'transit',
                elementType: 'all',
                stylers: [{
                    hue: '#e9ebed'
                }, {
                    saturation: 10
                }, {
                    lightness: 69
                }, {
                    visibility: 'on'
                }]
            }, {
                featureType: 'administrative.locality',
                elementType: 'all',
                stylers: [{
                    hue: '#2c2e33'
                }, {
                    saturation: 7
                }, {
                    lightness: 19
                }, {
                    visibility: 'on'
                }]
            }, {
                featureType: 'road',
                elementType: 'labels',
                stylers: [{
                    hue: '#bbc0c4'
                }, {
                    saturation: -93
                }, {
                    lightness: 31
                }, {
                    visibility: 'on'
                }]
            }, {
                featureType: 'road.arterial',
                elementType: 'labels',
                stylers: [{
                    hue: '#bbc0c4'
                }, {
                    saturation: -93
                }, {
                    lightness: -2
                }, {
                    visibility: 'simplified'
                }]
            }]

        }]);