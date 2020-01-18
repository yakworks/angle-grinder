'use strict';

/* Controllers */

angular.module('app')
    // Chart controller 
    .controller('GalleryCtrl', ['$scope', function($scope) {

        $scope.init = function() {
            $('.item-slideshow > div').each(function() {
                var img = $(this).data('image');
                $(this).css({
                    'background-image': 'url(' + img + ')',
                    'background-size': 'cover'
                })
            });
        }
        $scope.showItemDetails = function() {
            var dlg = new DialogFx($('#itemDetails').get(0));
            dlg.toggle();
        }
        $scope.showFilters = function() {
            $('#filters').toggleClass('open');
        }

    }]);