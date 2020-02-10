import angular from 'angular'
import _ from 'lodash'
import $log from '../../utils/Log'

angular.module('agValidations').directive('ngModel', function(agValidationsConfig, $rootScope, $interpolate, $document) {
  'use strict'

  return {
    require: ['ngModel', '^?agForm', '^?form'],
    link: function(scope, element, attrs, ctrls) {
      var defaultErrors = agValidationsConfig.getErrorMessages()
      var ngModel = ctrls[0]
      var agForm = ctrls[1]
      var form = ctrls[2]
      var validationStrategyFn

      /**
       * Active the directive
       */
      function activate() {
        // add id if it doesn't exist
        if (!attrs.id) {
          attrs.id = _.uniqueId(`${attrs.name}_`)
          element.attr('id', attrs.id)
        }

        const labelEl = element.closest('.form-group').find('.control-label')
        // add required to label and for id if not exists
        if (labelEl) {
          if (attrs.required || attrs.ngRequired) {
            // $log.debug("adding required class to labelEl", labelEl)
            labelEl.addClass('required')
          }
          if (!labelEl.attr('for')) {
            labelEl.attr('for', attrs.id)
          }
        }
        // add "for" attr on ag-validation-inline el
        const agValEl = element.closest('.controls').find('ag-validation-inline')
        if (agValEl && !agValEl.attr('for')) {
          $log.debug("adding 'for' to ag-validation-inline'", agValEl)
          agValEl.attr('for', attrs.id)
        }

        validationStrategyFn = agForm.getValidationStrategy()
        ngModel.$untouched = true

        // add extensions to ngModel
        // var labelEl = $document[0].querySelectorAll('label[for="' + attrs.id + '"]')
        angular.extend(ngModel, {
          $focused: false,
          $label: labelEl.length > 0 ? labelEl[0].innerText : '',
          $agErrors: []
        })

        // set errors on the ngModel when $error changes
        scope.$watch(function() {
          return ngModel.$error
        }, updateErrors, true)

        scope.$on('AgForm.ForceErrorUpdate', updateErrors)

        element
          .on('focus', function() {
            // ngModel.$focused = true;
            updateErrors()
            scope.$apply()
          })
          .on('blur', function() {
            // set touched right away so the updateErrors is picked up
            ngModel.$setTouched()
            // ngModel.$focused = false;
            updateErrors()
            scope.$apply()
          })
      }

      function getErrorMessageForKey(key) {
        // allows to add a msg-{error key} to override whats in
        var attrKey = 'msg' + key[0].toUpperCase() + key.substring(1)
        $log.debug('getErrorMessageForKey', { attrs, key, defaultErrorsKey: defaultErrors[key] })
        // use either the provided string as an interpolated attribute, or the default message
        return attrs[attrKey]
          ? $interpolate(attrs[attrKey])(attrs)
          : $interpolate(defaultErrors[key])(attrs)
      }

      /**
       * Sets the $xtErrors collection on validation change
       */
      function updateErrors() {
        ngModel.$agErrors = []

        angular.forEach(ngModel.$error, function(value, key) {
          const shouldVal = validationStrategyFn(form, ngModel)
          // console.log(`shouldVal:${shouldVal} , value:${value}`)
          var showErrors = value && shouldVal

          if (showErrors) {
            var error = {
              key: key,
              message: getErrorMessageForKey(key)
            }

            // This is a bit of hack right now to ensure that data type validation errors are shown
            // in priority over the required message if both fail.
            // TODO will likely need to introduce priorities of error messages
            if (key === 'required') {
              ngModel.$agErrors.push(error)
            } else {
              ngModel.$agErrors.unshift(error)
            }
          }
        })

        $rootScope.$broadcast('AgForm.ErrorsUpdated', ngModel)
      }

      if (agForm) {
        activate()
      }
    }
  }
})