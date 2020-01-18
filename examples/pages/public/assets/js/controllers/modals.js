'use strict';

/* Controllers */

angular.module('app')
    // Chart controller 
    .controller('ModalsCtrl', ['$scope', function($scope) {
        $scope.modal = {};
        $scope.modal.slideUp = "default";
        $scope.modal.stickUp = "default";

        $scope.toggleSlideUpSize = function() {
            var size = $scope.modal.slideUp;
            var modalElem = $('#modalSlideUp');
            if (size == "mini") {
                $('#modalSlideUpSmall').modal('show')
            } else {
                $('#modalSlideUp').modal('show')
                if (size == "default") {
                    modalElem.children('.modal-dialog').removeClass('modal-lg');
                } else if (size == "full") {
                    modalElem.children('.modal-dialog').addClass('modal-lg');
                }
            }
        };

        $scope.stickUpSizeToggler = function() {
            var size = $scope.modal.stickUp;
            var modalElem = $('#myModal');
            if (size == "mini") {
                $('#modalStickUpSmall').modal('show')
            } else {
                $('#myModal').modal('show')
                if (size == "default") {
                    modalElem.children('.modal-dialog').removeClass('modal-lg');
                } else if (size == "full") {
                    modalElem.children('.modal-dialog').addClass('modal-lg');
                }
            }
        };

        $scope.modalSlideLeft = function() {
            setTimeout(function() {
                $('#modalSlideLeft').modal('show');
            }, 300);
        };

        $scope.fillSizeToggler = function() {
            $('#modalFillIn').modal('show');
            // Only for fillin modals so that the backdrop action is still there
            $('#modalFillIn').on('show.bs.modal', function(e) {
                $('body').addClass('fill-in-modal');
            })
            $('#modalFillIn').on('hidden.bs.modal', function(e) {
                $('body').removeClass('fill-in-modal');
            })

        }

    }]);