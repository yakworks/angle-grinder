'use strict';
/** 
  * controller for angular-ckeditor
*/
app.controller('CkeditorCtrl', ["$scope", function ($scope) {

    // Editor options.
    $scope.options = {
        language: 'en',
        allowedContent: true,
        entities: false
    };

    // Called when the editor is completely ready.
    $scope.onReady = function () {
        // ...
    };
}]);