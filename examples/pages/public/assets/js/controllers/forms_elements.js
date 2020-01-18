'use strict';

/* Controllers */

angular.module('app', ['ngSanitize', 'ui.select', 'summernote', 'ngDropzone', 'daterangepicker', 'siyfion.sfTypeahead'])
    // Chart controller 
    .controller('FormElemCtrl', ['$scope', '$sce', '$compile', function($scope, $sce, $compile) {


        $scope.trustAsHtml = function(value) {
            return $sce.trustAsHtml(value);
        };

        $scope.summernote_options = {
            height: 200,
            onfocus: function(e) {
                $('body').addClass('overlay-disabled');
            },
            onblur: function(e) {
                $('body').removeClass('overlay-disabled');
            }
        }

        $scope.focus = function(e) {
            $('body').addClass('overlay-disabled');
        };
        $scope.blur = function(e) {
            $('body').removeClass('overlay-disabled');
        };

        $scope.dropzoneConfig = {
            parallelUploads: 3,
            maxFileSize: 30,
            url: 'path/to/api'
        };

        $scope.person = {};
        $scope.people = [
            { name: 'Adam', email: 'adam@email.com', age: 12, country: 'United States' },
            { name: 'Amalie', email: 'amalie@email.com', age: 12, country: 'Argentina' },
            { name: 'Estefanía', email: 'estefania@email.com', age: 21, country: 'Argentina' },
            { name: 'Adrian', email: 'adrian@email.com', age: 21, country: 'Ecuador' },
            { name: 'Wladimir', email: 'wladimir@email.com', age: 30, country: 'Ecuador' },
            { name: 'Samantha', email: 'samantha@email.com', age: 30, country: 'United States' },
            { name: 'Nicole', email: 'nicole@email.com', age: 43, country: 'Colombia' },
            { name: 'Natasha', email: 'natasha@email.com', age: 54, country: 'Ecuador' },
            { name: 'Michael', email: 'michael@email.com', age: 15, country: 'Colombia' },
            { name: 'Nicolás', email: 'nicolas@email.com', age: 43, country: 'Colombia' }
        ];


        $scope.availableColors = ['Red', 'Green', 'Blue', 'Yellow', 'Magenta', 'Maroon', 'Umbra', 'Turquoise'];

        $scope.multipleDemo = {};
        $scope.multipleDemo.colors = ['Blue', 'Red'];
        $scope.multipleDemo.selectedPeople = [$scope.people[5], $scope.people[4]];
        $scope.multipleDemo.selectedPeopleWithGroupBy = [$scope.people[8], $scope.people[6]];
        $scope.multipleDemo.selectedPeopleSimple = ['samantha@email.com', 'wladimir@email.com'];


        $scope.checkboxModel = {
            value1: true,
            value2: true
        };

        $scope.daterange = { startDate: null, endDate: null };


        // Typehead config
        var countries = new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.whitespace,
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            prefetch: 'http://revox.io/json/countries-list.json'
        });
        // initialize the bloodhound suggestion engine
        $scope.countriesOptions = {
            highlight: true
        };
        $scope.countriesData = {
            name: 'countries',
            source: countries
        }
        $scope.country = null;
        $scope.country2 = null;


        var bestPictures = new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            prefetch: 'http://revox.io/json/drop-countries.json',
            remote: {
                url: 'http://revox.io/json/drop-countries.json',
                wildcard: '%QUERY'
            }
        });
        $scope.moviesOptions = {
            highlight: true
        }
        $scope.moviesData = {
            name: 'best-pictures',
            display: 'value',
            source: bestPictures,
            templates: {
                empty: [
                    '<div class="empty-message">',
                    'unable to find any Best Picture winners that match the current query',
                    '</div>'
                ].join('\n'),
                suggestion: $compile('<div>{{value}}– {{year}}</div>')($scope)
            }
        }
        $scope.movie = null;

    }]);


angular.module('app')
    .directive('wysihtml5', function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var myCustomTemplates = {
                        "font-styles": function(locale) {
                            return '<li class="dropdown">' + '<a data-toggle="dropdown" class="btn btn-default dropdown-toggle ">' + '<span class="editor-icon editor-icon-headline"></span>' + '<span class="current-font">Normal</span>' + '<b class="caret"></b>' + '</a>' + '<ul class="dropdown-menu">' + '<li><a tabindex="-1" data-wysihtml5-command-value="p" data-wysihtml5-command="formatBlock" href="javascript:;" unselectable="on">Normal</a></li>' + '<li><a tabindex="-1" data-wysihtml5-command-value="h1" data-wysihtml5-command="formatBlock" href="javascript:;" unselectable="on">1</a></li>' + '<li><a tabindex="-1" data-wysihtml5-command-value="h2" data-wysihtml5-command="formatBlock" href="javascript:;" unselectable="on">2</a></li>' + '<li><a tabindex="-1" data-wysihtml5-command-value="h3" data-wysihtml5-command="formatBlock" href="javascript:;" unselectable="on">3</a></li>' + '<li><a tabindex="-1" data-wysihtml5-command-value="h4" data-wysihtml5-command="formatBlock" href="javascript:;" unselectable="on">4</a></li>' + '<li><a tabindex="-1" data-wysihtml5-command-value="h5" data-wysihtml5-command="formatBlock" href="javascript:;" unselectable="on">5</a></li>' + '<li><a tabindex="-1" data-wysihtml5-command-value="h6" data-wysihtml5-command="formatBlock" href="javascript:;" unselectable="on">6</a></li>' + '</ul>' + '</li>';
                        },
                        emphasis: function(locale) {
                            return '<li>' + '<div class="btn-group">' + '<a tabindex="-1" title="CTRL+B" data-wysihtml5-command="bold" class="btn  btn-default" href="javascript:;" unselectable="on"><i class="editor-icon editor-icon-bold"></i></a>' + '<a tabindex="-1" title="CTRL+I" data-wysihtml5-command="italic" class="btn  btn-default" href="javascript:;" unselectable="on"><i class="editor-icon editor-icon-italic"></i></a>' + '<a tabindex="-1" title="CTRL+U" data-wysihtml5-command="underline" class="btn  btn-default" href="javascript:;" unselectable="on"><i class="editor-icon editor-icon-underline"></i></a>' + '</div>' + '</li>';
                        },
                        blockquote: function(locale) {
                            return '<li>' + '<a tabindex="-1" data-wysihtml5-display-format-name="false" data-wysihtml5-command-value="blockquote" data-wysihtml5-command="formatBlock" class="btn  btn-default" href="javascript:;" unselectable="on">' + '<i class="editor-icon editor-icon-quote"></i>' + '</a>' + '</li>'
                        },
                        lists: function(locale) {
                            return '<li>' + '<div class="btn-group">' + '<a tabindex="-1" title="Unordered list" data-wysihtml5-command="insertUnorderedList" class="btn  btn-default" href="javascript:;" unselectable="on"><i class="editor-icon editor-icon-ul"></i></a>' + '<a tabindex="-1" title="Ordered list" data-wysihtml5-command="insertOrderedList" class="btn  btn-default" href="javascript:;" unselectable="on"><i class="editor-icon editor-icon-ol"></i></a>' + '<a tabindex="-1" title="Outdent" data-wysihtml5-command="Outdent" class="btn  btn-default" href="javascript:;" unselectable="on"><i class="editor-icon editor-icon-outdent"></i></a>' + '<a tabindex="-1" title="Indent" data-wysihtml5-command="Indent" class="btn  btn-default" href="javascript:;" unselectable="on"><i class="editor-icon editor-icon-indent"></i></a>' + '</div>' + '</li>'
                        },
                        image: function(locale) {
                            return '<li>' + '<div class="bootstrap-wysihtml5-insert-image-modal modal fade">' + '<div class="modal-dialog ">' + '<div class="modal-content">' + '<div class="modal-header">' + '<a data-dismiss="modal" class="close">×</a>' + '<h3>Insert image</h3>' + '</div>' + '<div class="modal-body">' + '<input class="bootstrap-wysihtml5-insert-image-url form-control" value="http://">' + '</div>' + '<div class="modal-footer">' + '<a data-dismiss="modal" class="btn btn-default">Cancel</a>' + '<a data-dismiss="modal" class="btn btn-primary">Insert image</a>' + '</div>' + '</div>' + '</div>' + '</div>' + '<a tabindex="-1" title="Insert image" data-wysihtml5-command="insertImage" class="btn  btn-default" href="javascript:;" unselectable="on">' + '<i class="editor-icon editor-icon-image"></i>' + '</a>' + '</li>'
                        },
                        link: function(locale) {
                            return '<li>' + '<div class="bootstrap-wysihtml5-insert-link-modal modal fade">' + '<div class="modal-dialog ">' + '<div class="modal-content">' + '<div class="modal-header">' + '<a data-dismiss="modal" class="close">×</a>' + '<h3>Insert link</h3>' + '</div>' + '<div class="modal-body">' + '<input class="bootstrap-wysihtml5-insert-link-url form-control" value="http://">' + '<label class="checkbox"> <input type="checkbox" checked="" class="bootstrap-wysihtml5-insert-link-target">Open link in new window</label>' + '</div>' + '<div class="modal-footer">' + '<a data-dismiss="modal" class="btn btn-default">Cancel</a>' + '<a data-dismiss="modal" class="btn btn-primary" href="">Insert link</a>' + '</div>' + '</div>' + '</div>' + '</div>' + '<a tabindex="-1" title="Insert link" data-wysihtml5-command="createLink" class="btn  btn-default" href="javascript:;" unselectable="on">' + '<i class="editor-icon editor-icon-link"></i>' + '</a>' + '</li>'
                        },
                        html: function(locale) {
                            return '<li>' + '<div class="btn-group">' + '<a tabindex="-1" title="Edit HTML" data-wysihtml5-action="change_view" class="btn  btn-default" href="javascript:;" unselectable="on">' + '<i class="editor-icon editor-icon-html"></i>' + '</a>' + '</div>' + '</li>'
                        }
                    }
                    //TODO: chrome doesn't apply the plugin on load
                setTimeout(function() {
                    $(element).wysihtml5({
                        html: true,
                        stylesheets: ["pages/css/editor.css"],
                        customTemplates: myCustomTemplates
                    });
                }, 500);
            }
        }
    })


.directive('timepicker', function() {
    return {
        restrict: 'A',
        link: function(scope, elem, attrs) {
            $(elem).timepicker().on('show.timepicker', function(e) {
                var widget = $('.bootstrap-timepicker-widget');
                widget.find('.glyphicon-chevron-up').removeClass().addClass('pg-arrow_maximize');
                widget.find('.glyphicon-chevron-down').removeClass().addClass('pg-arrow_minimize');
            });
        }
    }
});

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