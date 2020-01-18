'use strict';

/* Controllers */

angular.module('app', ['nvd3'])
    // Chart controller 
    .controller('ChartsCtrl', ['$scope', '$interval', '$timeout', '$http', function($scope, $interval, $timeout, $http) {

        /* ============================================================
         * Rickshaw Charts
         * ============================================================ */

        $scope.refreshRickshaw = function(options, $event) {
            var target = $(event.target).attr('href');
            var tabPane = $(target);

            $timeout(function() {
                options.height = 500;
                options.width = tabPane.width();

            });
        }
        $scope.refreshRickshawSlider = function(options, $event) {

            $timeout(function() {
                
                var graph = $("#rickshaw-slider .chart").data().chart;
                
                 graph.configure({
                    width: $('#rickshaw-slider .chart').width(),
                    height: $('#rickshaw-slider .chart').height()
                });

                graph.render()


            });
        }

        //
        // Rickshaw Realtime
        // -----------------

        var seriesData = [
            [],
            [],
            []
        ];
        var random = new Rickshaw.Fixtures.RandomData(50);
        for (var i = 0; i < 50; i++) {
            random.addData(seriesData);
        }

        $scope.rickshaw_realtime_options = {
            renderer: 'area',
            height: 500,
            padding: {
                top: 0.5
            }

        };

        $scope.rickshaw_realtime_series = [{
            data: seriesData[0],
            color: $.Pages.getColor('success-light', .5), // Get Pages contextual color
            name: 'DB Server'
        }, {
            data: seriesData[1],
            color: $.Pages.getColor('master-light'), // Get Pages contextual color
            name: 'Web Server'
        }];

        $scope.rickshaw_realtime_features = {
            yAxis: {
                orientation: 'right',
                tickFormat: Rickshaw.Fixtures.Number.formatKMBT,
                // element: document.getElementById('rickshaw-realtime_y_axis'),
            },
            hover: true,
        }


        //
        // Rickshaw Stacked bars
        // ---------------------

        var seriesData2 = [
            [],
            []
        ];
        var random2 = new Rickshaw.Fixtures.RandomData(40);
        for (var i = 0; i < 40; i++) {
            random2.addData(seriesData2);
        }

        $scope.rickshaw_stacked_options = {
            renderer: 'bar',
            height: 500,
            padding: {
                top: 0.5
            }

        };

        $scope.rickshaw_stacked_series = [{
            data: seriesData2[0],
            color: $.Pages.getColor('complete-light'), // Get Pages contextual color
            name: "New users"
        }, {
            data: seriesData2[1],
            color: $.Pages.getColor('master-light'), // Get Pages contextual color
            name: "Returning users"

        }];

        $scope.rickshaw_stacked_features = {
            hover: {
                formatter: function(series, x, y) {
                    var date = '<span class="date">' + new Date(x * 1000).toUTCString() + '</span>';
                    var swatch = '<span class="detail_swatch" style="background-color: ' + series.color + '"></span>';
                    var content = swatch + series.name + ": " + parseInt(y) + '<br>' + date;
                    return content;
                }
            }
        }


        /* ============================================================
         * NVD3 Charts
         * ============================================================ */

        $scope.nvd3_line_options = {
            chart: {
                type: 'lineChart',
                height: 500,
                x: function(d) {
                    return d[0]
                },
                y: function(d) {
                    return d[1] / 100
                },
                color: [
                    $.Pages.getColor('success'),
                    $.Pages.getColor('danger'),
                    $.Pages.getColor('primary'), //south america
                    $.Pages.getColor('complete'), //europe

                ],
                useInteractiveGuideline: true,
                transitionDuration: 500,
                xAxis: {
                    tickFormat: function(d) {
                        return d3.time.format('%x')(new Date(d))
                    }
                },
                yAxis: {
                    tickFormat: d3.format(',.2f')
                }
            }
        }

        $scope.nvd3_area_options = {
            chart: {
                type: 'stackedAreaChart',
                height: 500,
                margin: {
                    left: 15
                },
                x: function(d) {
                    return d[0]
                },
                y: function(d) {
                    return d[1]
                },
                color: [
                    $.Pages.getColor('success', .7),
                    $.Pages.getColor('info'),
                    $.Pages.getColor('primary', .87), //south america
                    $.Pages.getColor('warning'),
                    $.Pages.getColor('complete', .67), //europe
                    $.Pages.getColor('success-dark'),
                    $.Pages.getColor('menu', .2) //antarctica

                ],
                useInteractiveGuideline: true,
                rightAlignYAxis: true,
                transitionDuration: 500,
                showControls: true,
                clipEdge: true,
                xAxis: {
                    tickFormat: function(d) {
                        return d3.time.format('%a')(new Date(d))
                    }
                },
                yAxis: {
                    tickFormat: d3.format('d')
                },
                legend: {
                    margin: {
                        top: 30
                    }
                }
            }
        }

        $scope.nvd3_line2_options = {
            chart: {
                type: 'lineChart',
                height: 500,
                x: function(d) {
                    return d[0]
                },
                y: function(d) {
                    return d[1] / 100
                },
                color: [
                    $.Pages.getColor('success')

                ],
                useInteractiveGuideline: true,
                transitionDuration: 500,
                xAxis: {
                    tickFormat: function(d) {
                        return d3.time.format('%x')(new Date(d))
                    }
                },
                yAxis: {
                    tickFormat: d3.format(',.2f')
                }
            }
        }

        $http.get('assets/js/api/charts.json').success(function(data) {
            $scope.nvd3_line_data = data.nvd3.line;
            $scope.nvd3_area_data = data.nvd3.stackedArea;
            $scope.nvd3_line2_data = data.nvd3.monthSales;
        });

        $scope.refreshNvd3 = function(api) {
            api.update();
        }

        /* ============================================================
         * Sparkline Charts
         * ============================================================ */

        $scope.sparkline_line_data = [0, 10, 8, 20, 15, 10, 15, 5];
        $scope.sparkline_line_options = {
            type: 'line',
            width: '300',
            height: '200',
            chartRangeMax: 40,
            fillColor: $.Pages.getColor('danger', .3), // Get Pages contextual color
            lineColor: 'rgba(0,0,0,0)',
            highlightLineColor: 'rgba(0,0,0,.09)',
            highlightSpotColor: 'rgba(0,0,0,.21)',

        };
        $scope.sparkline_line2_data = [10, 10, 25, 29, 20, 22, 20, 22];
        $scope.sparkline_line2_options = {
            type: 'line',
            width: $("#sparkline-line").width(),
            height: '200',

            fillColor: $.Pages.getColor('warning', .3), // Get Pages contextual color
            lineColor: 'rgba(0,0,0,0)',
            highlightLineColor: 'rgba(0,0,0,.09)',
            highlightSpotColor: 'rgba(0,0,0,.21)',

        };

        $scope.sparkline_pie_data = [4, 3, 2, 1];
        $scope.sparkline_pie_options = {
            type: 'pie',
            width: $("#sparkline-pie").width(),
            height: '200',
            sliceColors: [$.Pages.getColor('warning'), $.Pages.getColor('danger'), $.Pages.getColor('master-light'), $.Pages.getColor('master')]

        };

    }]);


angular.module('app')
    .directive('rickshawSlider', ['$parse', function($parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {


                var seriesData = [
                    []
                ];
                var random = new Rickshaw.Fixtures.RandomData(50);

                for (var i = 0; i < 75; i++) {
                    random.addData(seriesData);
                }

                var graph = new Rickshaw.Graph({
                    element: document.querySelector("#rickshaw-slider .chart"),
                    renderer: 'multi',
                    dotSize: 5,
                    height: 500,
                    width: 700,
                    padding: {
                        left: 0.5
                    },
                    series: [{
                        name: 'Temperature',
                        data: seriesData.shift(),
                        color: $.Pages.getColor('success-light', .5), // Get Pages contextual color
                        opacity: 0,
                        renderer: 'stack'
                    }]
                });

                var y_ticks = new Rickshaw.Graph.Axis.Y({
                    graph: graph,
                    orientation: 'left',
                    pixelsPerTick: 50,
                    tickFormat: Rickshaw.Fixtures.Number.formatKMBT,
                    element: document.querySelector('#rickshaw-slider .y_axis')
                });

                var x_ticks = new Rickshaw.Graph.Axis.Time({
                    graph: graph,
                    timeFixture: new Rickshaw.Fixtures.Time()
                });

                var slider = new Rickshaw.Graph.RangeSlider.Preview({
                    graph: graph,
                    height: 100,
                    element: document.querySelector('#rickshaw-slider .slider')
                });

                var hoverDetail = new Rickshaw.Graph.HoverDetail({
                    graph: graph,
                    formatter: function(series, x, y) {
                        var date = '<span class="date">' + new Date(x * 1000).toUTCString() + '</span>';
                        var swatch = '<span class="detail_swatch" style="background-color: ' + series.color + '"></span>';
                        var content = swatch + series.name + ": " + parseInt(y) + '<br>' + date;
                        return content;
                    }
                });

                graph.render();

                $(window).resize(function() {
                    graph.configure({
                        width: $('#rickshaw-slider .chart').width(),
                        height: $('#rickshaw-slider .chart').height()
                    });

                    graph.render()
                });

                $('#rickshaw-slider .rickshaw-chart').data('chart', graph);

            }
        };
    }]);