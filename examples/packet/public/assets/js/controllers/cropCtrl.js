'use strict';
/** 
  * controller for ngImgCrop
  * Simple Image Crop directive for AngularJS.
*/
app.controller('CropCtrl', ["$scope", function ($scope) {
    $scope.myImage = '';
    $scope.myCroppedImage = '';
    $scope.cropType = "square";

    var handleFileSelect = function (evt) {
        var file = evt.currentTarget.files[0];
        var reader = new FileReader();
        reader.onload = function (evt) {
            $scope.$apply(function ($scope) {
                $scope.myImage = evt.target.result;
            });
        };
        reader.readAsDataURL(file);
    };
    angular.element(document.querySelector('#fileInput')).on('change', handleFileSelect);
}]);