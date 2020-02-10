import angular from 'angular'
/* eslint-disable */
angular.module('agValidations').directive('agValidationInline', function($timeout) {
  'use strict'

  var _uniqueIdCounter = 0

  function nextUniqueId() {
    return 'validation_' + _uniqueIdCounter++
  }

  return {
    require: ['^agForm'],
    restrict: 'EA',
    scope: true,
    replace: true,
    template: require('./validationInline.html'),
    link: function(scope, element, attrs, ctrl) {
      var inputId = attrs.for || attrs.agValidationInline
      // if (angular.isUndefined(inputId)) {
      //   throw new Error('The validation input id must be specified eg. for="id"')
      // }

      var inputEl, ngModel

      // run in new cycle to ensure that getElementById(inputId) will succeed as its not there when using components
      $timeout(function() {
        inputEl = element.prev('input, select, textarea')
        // inputEl = angular.element(document.getElementById(inputId))
        if (inputEl.length === 0) {
          throw new Error('Can not find input element for the validation directive')
        }
        ngModel = inputEl.controller('ngModel')
        activate()
      })

      /**
       * Activates the directive
       */
      function activate() {
        element.addClass('ag-validation-inline')

        // Ensure the validation control has an id
        if (!attrs.id) {
          attrs.id = nextUniqueId()
          element.attr('id', attrs.id)
        }

        // Subscribe to "errors updated" event and redraw errors when changed
        scope.$on('AgForm.ErrorsUpdated', function(message, model) {
          if (model === null || model === ngModel) {
            redrawErrors()
          }
        })
      }

      /**
       * Will redraw error spans on the page when required
       */
      function redrawErrors() {
        var noOfErrors = attrs.multiple ? ngModel.$agErrors.length : 1
        scope.errors = ngModel.$agErrors.slice(0, noOfErrors)
        scope.showErrors = scope.errors.length > 0
        toggleAriaAttributes(scope.showErrors)
      }

      /**
       * Toggle aria attributes to denote validity state
       * @param showErrors true to add error state
       */
      function toggleAriaAttributes(showErrors) {
        if (showErrors) {
          inputEl
            .attr('aria-invalid', true)
            .attr('aria-describedby', attrs.id)
        } else {
          inputEl.removeAttr('aria-invalid')
          inputEl.removeAttr('aria-describedby')
        }
      }
    }
  }
})
