/* eslint-disable */
// TODO WIP
agForm.directive('agValidationTooltip', function() {
  'use strict'

  return {
    require: ['^agForm', '^ngModel'],
    restrict: 'EA',
    link: function(scope, element, attrs, ctrls) {
      var agForm = ctrls[0]
      var ngModel = ctrls[1]

      var ngModelElement
      var lastErrors

      /**
       * Activates the directive
       */
      function activate() {
        setupNgModel()
        setupTooltipElement()

        // Subscribe to "errors updated" event and redraw errors when changed
        scope.$on('AgForm.ErrorsUpdated', function(message, model) {
          if (model === null || model === ngModel) {
            redrawErrors()
          }
        })
      }

      function setupTooltipElement() {
        element.addClass('ag-error-container')

        // default SELECT tooltip placement to top
        if (element[0].nodeName.toUpperCase() === 'SELECT' && !attrs.placement) {
          attrs.placement = 'top'
          element.attr('placement', attrs.placement)
        }

        element.tooltip({
          animation: false,
          html: true,
          placement: attrs.placement || 'bottom',
          trigger: agForm.tooltipTrigger || 'manual',
          container: attrs.container || 'body'
        })
      }

      function setupNgModel() {
        // allow for a different tooltip container that is not on the ngModel element
        var ngModelElementId = attrs.for || attrs.agValidationTooltip
        ngModelElement = ngModelElementId
          ? angular.element(document.getElementById(ngModelElementId))
          : element

        ngModelElement.addClass('ag-validation-tooltip')

      }

      function redrawErrors() {
        if (ngModel.$xtErrors.length === 0) {
          lastErrors = null
          element.tooltip('hide')
          return
        }

        // hmm reduce adds br to front of string..
        var noOfErrors = attrs.multiple ? ngModel.$xtErrors.length : 1
        var errors = ngModel.$xtErrors
          .slice(0, noOfErrors)
          .map(function(value) {
            return value.message
          })
          .join('<br />')

        // only redraw if needed
        if (errors !== lastErrors) {
          lastErrors = errors

          setTimeout(function() {
            element
              .attr('title', errors)
              .tooltip('fixTitle')
              .tooltip('show')
          })
        }
      }

      if (!$ || !angular.isFunction($.fn.tooltip)) {
        throw new Error('agform requires a jquery tooltip plugin, like bootstrap.js')
      }

      activate()
    }
  }
})
