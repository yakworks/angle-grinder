import angular from 'angular'
import agValMod from '../agValidations.module'
import _ from 'lodash'
// import $log from '../../../utils/Log'

/* eslint-disable */
angular.module(agValMod).directive('agValidationInline', function($timeout, $document) {
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
      var inputEl, ngModel

      // run in new cycle to ensure that getElementById(inputId) will succeed as its not there when using components
      $timeout(function() {
        inputEl = element.closest('.controls').find('input:first-child, select:first-child, textarea:first-child')
        inputEl = (inputEl?.length !== 0 ) ? inputEl[0] : $document[0].getElementById(inputId)
        if (_.isNil(inputEl) || inputEl.length === 0 ) {
          throw new Error('Can not find input element to attach the validation directive')
        }
        ngModel = angular.element(inputEl).controller('ngModel')
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
        //$log.debug("inputEl", inputEl)
        if (showErrors) {
          inputEl.setAttribute('aria-invalid', true)
          inputEl.setAttribute('aria-describedby', attrs.id)
        } else {
          inputEl.removeAttribute('aria-invalid')
          inputEl.removeAttribute('aria-describedby')
        }
      }
    }
  }
})
