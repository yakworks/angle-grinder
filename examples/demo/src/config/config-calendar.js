'use strict';
angular.module('myModule', ['mwl.calendar'])
    .config(function (calendarConfig) {
        calendarConfig.dateFormatter = 'moment'; //use either moment or angular to format dates on the calendar. Default angular. Setting this will override any date formats you have already set.
        calendarConfig.showTimesOnWeekView = false; //Make the week view more like the day view, with the caveat that event end times are ignored.
        calendarConfig.colorTypes = {
            job: "#58748B",
            jobSec: "rgba(88, 116, 139, 0.3)",
            home: "#9A89B5",
            homeSec: "rgba(154, 137, 181, 0.30)",
            toDo: "#F18636",
            toDoSec: "rgba(241, 134, 54, 0.30)",
            cancelled: "#EEB424",
            cancelledSec: "rgba(238, 180, 36, 0.30)",
            generic: "#46b8da",
            genericSec: "rgba(70, 184, 218, 0.30)",
            offSiteWork: "#5A8770",
            offSiteWorkSec: "rgba(90, 135, 112, 0.3)"
        }
    });