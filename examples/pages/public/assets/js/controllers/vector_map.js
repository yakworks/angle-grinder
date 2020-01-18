'use strict';

/* Controllers */

angular.module('app', ['ngSanitize', 'ui.select'])

.controller('VectorMapCtrl', ['$scope', '$sce', function($scope, $sce) {

    $scope.mapLocations = [];

    $scope.locations = [
            {
                    "id":"au",
                    "title":"Australia",
                    "description":"<strong>AU</strong> Australia",
                    "action": "tooltip",
                    "pin": "marker green",
                    "x":"0.84330813",
                    "y":"0.744442"
                },
                {
                    "id":"ca",
                    "title":"Canada",
                    "description":"<strong>CA</strong> Canada",
                    "action": "tooltip",
                    "pin": "marker-alt red",
                    "x":"0.19892563",
                    "y":"0.278466"
                },
                {
                    "id":"ru",
                    "title":"Russia",
                    "description":"<strong>RU</strong> Russia",
                    "action": "tooltip",
                    "pin": "pulse blue",
                    "x":"0.77368313",
                    "y":"0.206653"
                },
                {
                    "id":"br",
                    "title":"Brazil",
                    "description":"<strong>BR</strong> Brazil",
                    "action": "tooltip",
                    
                    "pin": "pulse-alt",
                    "x":"0.32112063",
                    "y":"0.677865"
                },
                {
                    "id":"us",
                    "title":"United States",
                    "description":"<strong>US</strong> United States",
                    "action": "tooltip",
                    
                    "pin": "marker",
                    "x":"0.20611313",
                    "y":"0.39528375"
                },
                {
                    "id":"fr",
                    "title":"France",
                    "description":"<strong>FR</strong> France",
                    "action": "tooltip",
                    
                    "pin": "marker-alt purple",
                    "x":"0.47772563",
                    "y":"0.379214"
                },
                {
                    "id":"jp",
                    "title":"Japan",
                    "description":"<strong>JP</strong> Japan",
                    "action": "tooltip",
                    
                    "pin": "marker red",
                    "x":"0.85154688",
                    "y":"0.435778"
                },
                {
                    "id":"za",
                    "title":"South Africa",
                    "description":"<strong>ZA</strong> South Africa",
                    "action": "tooltip",
                    
                    "pin": "marker red",
                    "x":"0.54246",
                    "y":"0.746012"
                },
                {
                    "id":"pt",
                    "title":"Portugal",
                    "description":"<strong>PT</strong> Portugal",
                    "action": "tooltip",
                    
                    "pin": "marker red",
                    "x":"0.45162625",
                    "y":"0.424397"
                }

                
            ];


}]);

/**
 * AngularJS default filter with the following expression:
 * "person in people | filter: {name: $select.search, age: $select.search}"
 * performs a AND between 'name: $select.search' and 'age: $select.search'.
 * We want to perform a OR.
 */
angular.module('app')
    .filter('propsFilter', function() {
        return function(items, props) {
            var out = [];

            if (angular.isArray(items)) {
                items.forEach(function(item) {
                    var itemMatches = false;

                    var keys = Object.keys(props);
                    for (var i = 0; i < keys.length; i++) {
                        var prop = keys[i];
                        var text = props[prop].toLowerCase();
                        if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                            itemMatches = true;
                            break;
                        }
                    }

                    if (itemMatches) {
                        out.push(item);
                    }
                });
            } else {
                // Let the output be the input untouched
                out = items;
            }

            return out;
        };
    });

angular.module('app')
    .directive('mapplic', function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                $(element).mapplic({
                    source: 'http://revox.io/json/countries.json',
                    height: '100%',
                    search: false,
                    sidebar: false,
                    minimap: true,
                    locations: true,
                    deeplinking: true,
                    fullscreen: true,
                    hovertip: false,
                    maxscale: 4,
                    animate: true
                });


            }
        }
    });

$('body').on('click', '.mapplic-pin', function(e) {
    e.preventDefault();
    var location = $(e.target).data('location');
    $('#mapplic').data().mapplic.goToLocation(location, 800);
});