// import _ from 'lodash'
// import { isAttrTruthy } from '../../utils/ngHelpers'
// import $log from '../../../utils/Log'
import _ from 'lodash'

function ldebug(msg, o) {
  // $log.debug(msg, o)
}
export default ngModel

/**
 * Overrides angulars ng-model directive for agForms, key line is at end, only runs activate if its parent
 * is a agForm
 */
/* @ngInject */
function ngModel(agValidationsConfig, $rootScope, $interpolate, $document) {
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
        ldebug('ngModel', ngModel)
        // add id if it doesn't exist
        // if (!attrs.id) {
        //   attrs.id = _.uniqueId(`${attrs.name}_`)
        //   element.attr('id', attrs.id)
        // }

        let labelEl = $(element).closest('.form-group').find('.control-label')
        // if labelnot found using form-group then brute force look for <label for="theId"> format
        labelEl = labelEl || $document[0].querySelectorAll('label[for="' + attrs.id + '"]')
        // add required to label and for id if not exists
        // if (labelEl) {
        //   ldebug('attrs.required ', { required: isAttrTruthy(scope, attrs.required), ngRequired: isAttrTruthy(scope, attrs.ngRequired) })
        //   if (isAttrTruthy(scope, attrs.required) || isAttrTruthy(scope, attrs.ngRequired)) {
        //     ldebug('adding required class to labelEl', labelEl)
        //     labelEl.addClass('required')
        //   }
        //   if (!labelEl.attr('for')) {
        //     labelEl.attr('for', attrs.id)
        //   }
        // }
        // add "for" attr on ag-validation-inline el
        // const agValEl = $(element).closest('.controls').find('ag-validation-inline')
        // if (agValEl && !agValEl.attr('for')) {
        //   // ldebug("adding 'for' to ag-validation-inline'", agValEl)
        //   agValEl.attr('for', attrs.id)
        // }

        validationStrategyFn = agForm.getValidationStrategy()
        ngModel.$untouched = true

        // add extensions to ngModel
        // var labelEl = $document[0].querySelectorAll('label[for="' + attrs.id + '"]')
        angular.extend(ngModel, {
          $focused: false,
          $label: labelEl.length > 0 ? labelEl[0].innerText : '',
          $agErrors: []
        })
        ldebug('ngModel', ngModel)
        // set errors on the ngModel when $error changes
        scope.$watch(function() {
          return ngModel.$error
        }, updateErrors, true)

        // Update errors after server error is returned
        const getServerErrors = () => form.$error.$$server
        scope.$watch(getServerErrors, function(serverErrors) {
          if (serverErrors) {
            _.each(serverErrors, (val) => {
              const field = val.$name
              const getViewValue = () => form[field]?.$viewValue
              scope.$watch(getViewValue, function(oldVal, newVal) {
                if (oldVal === newVal) { return }
                // Remove server side error for the field when its value was changed
                if (form[field]) form[field].$setValidity('$$server', true)
                form.$serverErrors[field] = null
                updateErrors()
              })
            })
            updateErrors()
          }
        })

        scope.$on('AgForm.ForceErrorUpdate', updateErrors)

        element
          .on('focus', function() {
            ngModel.$focused = true
            updateErrors()
            scope.$apply()
          })
          .on('blur', function() {
          // set touched right away so the updateErrors is picked up
            ngModel.$setTouched()
            ngModel.$focused = false
            updateErrors()
            scope.$apply()
          })
      }

      function getErrorMessageForKey(key, fieldName) {
        if (key === '$$server') {
          return form.$serverErrors[fieldName]
        }
        // allows to add a msg-{error key} to override whats in
        var attrKey = 'msg' + key[0].toUpperCase() + key.substring(1)
        ldebug('getErrorMessageForKey', { attrs, key, defaultErrorsKey: defaultErrors[key] })
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
          var showErrors = value && shouldVal

          if (showErrors) {
            var error = {
              key: key,
              message: getErrorMessageForKey(key, ngModel.$name) // we need name for handling backend errors
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

      //
      if (agForm) {
        activate()
      }
    }
  }
}
