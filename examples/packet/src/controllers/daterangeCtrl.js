'use strict';
/**
 * controller for Date Range Picker
 */

app.controller('DateRangeCtrl', function ($scope) {
    $scope.dates = {
        startDate: moment('2013-09-20'),
        endDate: moment('2013-09-25')
    };
    $scope.dates2 = {
        startDate: moment().subtract(1, 'day'),
        endDate: moment().subtract(1, 'day')
    };
    $scope.ranges = {
        'Today': [moment(), moment()],
        'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        'Last 7 days': [moment().subtract(7, 'days'), moment()],
        'Last 30 days': [moment().subtract(30, 'days'), moment()],
        'This month': [moment().startOf('month'), moment().endOf('month')]
    };
});