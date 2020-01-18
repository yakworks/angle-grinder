'use strict';

/* Controllers */

angular.module('app', ['mgo-angular-wizard'])
    .controller('FormWizardCtrl', ['$scope', 'WizardHandler', function($scope,WizardHandler) {

    	 $scope.finished = function() {
            alert("Wizard finished :)");
        }

        $scope.logStep = function() {
            console.log("Step continued");
        }

        $scope.goBack = function() {
            WizardHandler.wizard().goTo(0);
        }
        
        $scope.getCurrentStep = function(){
        	return WizardHandler.wizard().currentStepNumber();
        }
        $scope.goToStep = function(step){
        	WizardHandler.wizard().goTo(step);
        }

    }]);
