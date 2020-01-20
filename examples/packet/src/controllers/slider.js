'use strict';

/* Controllers */

app.controller('SliderCtrl', ['$scope',
function ($scope) {
    $scope.sliders = {};
    $scope.sliders.sliderValue = 90;
    $scope.sliders.secondSliderValue = 75;
    $scope.sliders.thirdSliderValue = 65;
    $scope.sliders.fourthSliderValue = 50;
    $scope.sliders.fifthSliderValue = 70;
    $scope.sliders.sixthSliderValue = 80;

    $scope.sliders.verticalSliderValue = 90;
    $scope.sliders.secondVerticalSliderValue = 75;
    $scope.sliders.thirdVerticalSliderValue = 65;
    $scope.sliders.fourthVerticalSliderValue = 50;
    $scope.sliders.fifthVerticalSliderValue = 70;
    $scope.sliders.sixthVerticalSliderValue = 80;

    $scope.testOptions = {
        min: 0,
        max: 100,
        step: 1,
        value: 7,
        rangeValue: [2, 20]
    };

    $scope.sliders.rangeSliderValue = [10, 50];

    $scope.sliders.statusSliderValue = 5;

    $scope.myFormater = function (value) {
        return value + "%";
    };
}]);