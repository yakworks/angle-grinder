'use strict';
/** 
  * controller for ngSweetAlert
  * AngularJS wrapper for SweetAlert
*/
app.controller('SweetAlertCtrl', ['$scope', 'SweetAlert', function ($scope, SweetAlert) {

    $scope.demo1 = function () {
        SweetAlert.swal({
            title: "Here's a message",
            confirmButtonColor: "#007AFF"
        });
    };

    $scope.demo2 = function () {
        SweetAlert.swal({
            title: "Here's a message!",
            text: "It's pretty, isn't it?",
            confirmButtonColor: "#007AFF"
        });
    };

    $scope.demo3 = function () {
        SweetAlert.swal({
            title: "Good job!",
            text: "You clicked the button!",
            type: "success",
            confirmButtonColor: "#007AFF"
        });
    };

    $scope.demo4 = function () {
        SweetAlert.swal({
            title: "Are you sure?",
            text: "Your will not be able to recover this imaginary file!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!"
        }, function () {
            SweetAlert.swal({
                title: "Booyah!",
                confirmButtonColor: "#007AFF"
            });
        });
    };

    $scope.demo5 = function () {
        SweetAlert.swal({
            title: "Are you sure?",
            text: "Your will not be able to recover this imaginary file!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel plx!",
            closeOnConfirm: false,
            closeOnCancel: false
        }, function (isConfirm) {
            if (isConfirm) {
                SweetAlert.swal({
                    title: "Deleted!",
                    text: "Your imaginary file has been deleted.",
                    type: "success",
                    confirmButtonColor: "#007AFF"
                });
            } else {
                SweetAlert.swal({
                    title: "Cancelled",
                    text: "Your imaginary file is safe :)",
                    type: "error",
                    confirmButtonColor: "#007AFF"
                });
            }
        });
    };

    $scope.demo6 = function () {
        SweetAlert.swal({
            title: "Sweet!",
            text: "Here's a custom image.",
            imageUrl: "http://oitozero.com/img/avatar.jpg",
            confirmButtonColor: "#007AFF"
        });
    };

}]);