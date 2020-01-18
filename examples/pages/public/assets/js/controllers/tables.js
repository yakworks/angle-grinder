'use strict';

/* Controllers */

angular.module('app')
    // Chart controller 
    .controller('BasicTableCtrl', ['$scope', function($scope) {
        var table = $('#basicTable');

        $scope.options = {
            "sDom": "t",
            
            "destroy": true,
            "paging": false,
            "scrollCollapse": true,
            "aoColumnDefs": [{
                'bSortable': false,
                'aTargets': [0]
            }],
            "order": [
                [1, "desc"]
            ]
        };

        $scope.selectRow = function(event) {
            var element = event.currentTarget;
             if ($(element).is(':checked')) {
                $(element).closest('tr').addClass('selected');
            } else {
                $(element).closest('tr').removeClass('selected');
            }
        }

    }])
    .controller('StripedTableCtrl', ['$scope', function($scope) {
        $scope.options = {
         "sDom": "t",
            
            "destroy": true,
            "paging": false,
            "scrollCollapse": true
        };

    }])
    .controller('DetailedTableCtrl', ['$scope', function($scope) {
         var _format = function(d) {
            // `d` is the original data object for the row
            return '<table class="table table-inline">' +
                '<tr>' +
                '<td>Learn from real test data <span class="label label-important">ALERT!</span></td>' +
                '<td>USD 1000</td>' +
                '</tr>' +
                '<tr>' +
                '<td>PSDs included</td>' +
                '<td>USD 3000</td>' +
                '</tr>' +
                '<tr>' +
                '<td>Extra info</td>' +
                '<td>USD 2400</td>' +
                '</tr>' +
                '</table>';
        }


        var table = $('#detailedTable');

        // Add event listener for opening and closing details
        $scope.expand = function(event) {
            var element = event.currentTarget;
            if ($(element).hasClass('shown') && $(element).next().hasClass('row-details')) {
                $(element).removeClass('shown');
                $(element).next().remove();
                return;
            }
            var tr = $(element).closest('tr');
            var row = table.DataTable().row(tr);

            $(element).parents('tbody').find('.shown').removeClass('shown');
            $(element).parents('tbody').find('.row-details').remove();

            row.child(_format(row.data())).show();
            tr.addClass('shown');
            tr.next().addClass('row-details');
        }

        $scope.options = {
          "sDom": "t",
            "scrollCollapse": true,
            "paging": false,
            "bSort": false
        };

    }])

    .controller('CondensedTableCtrl', ['$scope', function($scope) {
        $scope.options = {
           "sDom": "t",
            
            "destroy": true,
            "paging": false,
            "scrollCollapse": true
        }
    }]);
