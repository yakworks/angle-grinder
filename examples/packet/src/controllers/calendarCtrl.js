'use strict';
/**
 * Controller of the angularBootstrapCalendarApp
*/
app.controller('CalendarCtrl', ["$scope", "$aside", "moment", "SweetAlert", "calendarConfig", function ($scope, $aside, moment, SweetAlert, calendarConfig) {


    var vm = this;
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    var actions = [{
        label: '<div class=\'btn btn-primary btn-sm pull-right\'><i class=\'ti-pencil\'></i></div>',
        onClick: function (args) {
            showModal('Edited', args.calendarEvent);
        }
    }, {
        label: '<div class=\'btn btn-danger btn-sm margin-right-10 pull-right\'><i class=\'ti-close\'></i></div>',
        onClick: function (args) {
            deleteEvent(args.calendarEvent)
        }
    }];

    $scope.events = [
        {
            title: 'Birthday Party',
            color: {
                primary: calendarConfig.colorTypes.home,
                secondary: calendarConfig.colorTypes.homeSec
            },
            type: 'home',
            startsAt: new Date(y, m, 5, 19, 0),
            endsAt: new Date(y, m, 5, 22, 30),
            actions: actions
        },
        {
            title: 'AngularJS Seminar',
            color: {
                primary: calendarConfig.colorTypes.offSiteWork,
                secondary: calendarConfig.colorTypes.offSiteWorkSec
            },
            type: 'off-site-work',
            startsAt: new Date(y, m, 8, 10, 30),
            endsAt: new Date(y, m, 9, 18, 30),
            actions: actions
        },
        {
            title: 'Event 1',
            color: {
                primary: calendarConfig.colorTypes.job,
                secondary: calendarConfig.colorTypes.jobSec
            },
            type: 'job',
            startsAt: new Date(y, m, d - 5),
            endsAt: new Date(y, m, d - 2),
            actions: actions
        },
        {
            title: 'Event 2',
            color: {
                primary: calendarConfig.colorTypes.cancelled,
                secondary: calendarConfig.colorTypes.cancelledSec
            },
            type: 'cancelled',
            startsAt: new Date(y, m, d - 3, 16, 0),
            endsAt: new Date(y, m, d - 3, 18, 0),
            actions: actions
        },
        {
            title: 'This is a really long event title',
            color: {
                primary: calendarConfig.colorTypes.toDo,
                secondary: calendarConfig.colorTypes.toDoSec
            },
            type: 'to-do',
            startsAt: new Date(y, m, d + 1, 19, 0),
            endsAt: new Date(y, m, d + 1, 22, 30),
            actions: actions
        },
    ];

    $scope.calendarView = 'month';
    $scope.calendarDate = new Date();

    function showModal(action, event) {
        var modalInstance = $aside.open({
            templateUrl: 'calendarEvent.html',
            placement: 'right',
            size: 'sm',
            backdrop: true,
            controller: function ($scope, $uibModalInstance) {
                var $cazz = this;
                $scope.$modalInstance = $uibModalInstance;
                $scope.action = action;
                $scope.event = event;
                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };
                $scope.deleteEvent = function () {
                    $uibModalInstance.close($scope.event, $scope.event);
                };
                $scope.maxDate = new Date(2020, 5, 22);
                $scope.minDate = new Date(1970, 12, 31);

                $scope.startOptions = {
                    showWeeks: false,
                    startingDay: 1,
                    minDate: $scope.minDate,
                    maxDate: $scope.maxDate
                };

                $scope.endOptions = {
                    showWeeks: false,
                    startingDay: 1,
                    minDate: $scope.minDate,
                    maxDate: $scope.maxDate
                };

                $scope.endOpen = function () {
                    $scope.endOptions.minDate = $scope.event.startsAt;
                    $scope.startOpened = false;
                    $scope.endOpened = !$scope.endOpened;
                };

                $scope.startOpen = function () {
                    $scope.startOptions.maxDate = $scope.event.endsAt;
                    $scope.endOpened = false;
                    $scope.startOpened = !$scope.startOpened;
                };

                $scope.changeTypeEvent = function (event) {                   
                    switch (event.type) {
                        case 'job':
                            event.color.primary = calendarConfig.colorTypes.job;
                            event.color.secondary = calendarConfig.colorTypes.jobSec;
                        break;
                        case 'home':
                            event.color.primary = calendarConfig.colorTypes.home;
                            event.color.secondary = calendarConfig.colorTypes.homeSec;
                        break;
                        case 'off-site-work':
                            event.color.primary = calendarConfig.colorTypes.offSiteWork;
                            event.color.secondary = calendarConfig.colorTypes.offSiteWorkSec;
                        break;
                        case 'cancelled':
                            event.color.primary = calendarConfig.colorTypes.cancelled;
                            event.color.secondary = calendarConfig.colorTypes.cancelledSec;
                        break;
                        case 'generic':
                            event.color.primary = calendarConfig.colorTypes.generic;
                            event.color.secondary = calendarConfig.colorTypes.genericSec;
                        break;
                        case 'to-do':
                            event.color.primary = calendarConfig.colorTypes.toDo;
                            event.color.secondary = calendarConfig.colorTypes.toDoSec;
                        break;
                    }
                };
            }
        });
        modalInstance.result.then(function (selectedEvent, action) {
            $scope.eventDeleted(selectedEvent);
        });
    }


    $scope.eventClicked = function (event) {
        showModal('Clicked', event);
    };
    $scope.addEvent = function () {
        $scope.events.push({
            title: 'New Event',
            startsAt: new Date(y, m, d, 10, 0),
            type: 'job',
            color: {
                primary: "#007AFF"
            },
            actions: actions
        });
        $scope.eventEdited($scope.events[$scope.events.length - 1]);
    };

    $scope.eventEdited = function (event) {
        showModal('Edited', event);
    };

    $scope.eventDeleted = function (event) {
        deleteEvent(event)        
    };

    function deleteEvent(event) {
        console.log(event)
        SweetAlert.swal({
            title: "Are you sure?",
            text: "Your will not be able to recover this event!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel plx!",
            closeOnConfirm: false,
            closeOnCancel: false
        }, function (isConfirm) {
            if (isConfirm) {
                angular.forEach($scope.events, function (value, index) {
                    if (value.calendarEventId == event.calendarEventId) {
                        $scope.events.splice(value.calendarEventId, 1);
                    }
                });
                SweetAlert.swal("Deleted!", "Event has been deleted.", "success");
            } else {
                SweetAlert.swal("Cancelled", "Event is safe :)", "error");
            }
        });
    }


    $scope.toggle = function ($event, field, event) {
        $event.preventDefault();
        $event.stopPropagation();

        event[field] = !event[field];
    };

    $scope.startOptions = {
        showWeeks: false,
        startingDay: 1,
        minDate: $scope.minDate,
        maxDate: $scope.maxDate
    };

    $scope.endOptions = {
        showWeeks: false,
        startingDay: 1,
        minDate: $scope.minDate,
        maxDate: $scope.maxDate
    };

    $scope.endOpen = function () {
        $scope.endOptions.minDate = $scope.event.startsAt;
        $scope.startOpened = false;
        $scope.endOpened = !$scope.endOpened;
    };

    $scope.startOpen = function () {
        $scope.startOptions.maxDate = $scope.event.endsAt;
        $scope.endOpened = false;
        $scope.startOpened = !$scope.startOpened;
    };

}]);
