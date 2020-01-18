'use strict';

/* Controllers */

angular.module('app')
    .controller('IconsCtrl', ['$scope', function($scope) {

        $scope.sieveOptions = {
            searchInput: $('#icon-filter'),
            itemSelector: ".fa-item"
        }

        $scope.filterIcons = function($event){
            var element = $event.target;

            if ($(element).val()) {
                        $('#icon-list').removeClass('hidden');
                        $('.icon-set-preview').css('opacity', '0');
                        $('#icon-list').css('transform', 'translateY(-260px)');
                        $("html, body").stop().animate({
                            scrollTop: "250px"
                        });
                    } else {
                        $('#icon-list').css('transform', 'translateY(0)');
                        $('.icon-set-preview').css('opacity', '1');
                        $('#icon-list').addClass('hidden');
                        $("html, body").stop().animate({
                            scrollTop: "0px"
                        });
                    }

        }

    }]);