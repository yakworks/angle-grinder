import _ from 'lodash'
import { setErrors } from './serverErrors'
// import Log from '../../../utils/Log'
// import { isAttrTruthy } from '../../utils/ngHelpers'

class AgFormController {
  /* @ngInject */
  constructor($scope, $element, $attrs, agValidationsConfig, $window) {
    this.$scope = $scope
    this.$element = $element
    this.$attrs = $attrs
    this.agValidationsConfig = agValidationsConfig
    this.$window = $window
  }

  $onInit() {
    const { $element, $attrs, agValidationsConfig } = this
    this.form = $element.controller('form')
    this.validationStrategy = $attrs.strategy
      ? agValidationsConfig.getValidationStrategy($attrs.strategy)
      : agValidationsConfig.getDefaultValidationStrategy()

    this.isHorizontal = !_.isUndefined($attrs.isHorizontal)
    this.labelClass = $attrs.labelClass
    // set default to is-3
    if (this.isHorizontal && !this.labelClass) this.labelClass = 'is-3'
    // add autocomplete="off" novalidate
    $element.attr('novalidate', true)
    $element.attr('autocomplete', 'off')
    this.tooltipTrigger = $attrs.tooltipTrigger
  }

  getValidationStrategy() {
    return this.validationStrategy
  }

  submit() {
    // focus first error if required
    if (this.form.$invalid && this.$attrs.focusError) {
      this.$window.setTimeout(function() {
        this.$element.find('.ng-invalid:input:visible:first').focus()
      })
    }

    this.$scope.$broadcast('AgForm.ForceErrorUpdate', null, 'submit')
  }

  reset() {
    this.form.$setPristine()
    this.form.$setUntouched()
    this.$scope.$broadcast('AgForm.ForceErrorUpdate', null, 'reset')
  }

  setServerErrors(response, resourceName) {
    setErrors(this.form, response, resourceName)
  }
}

/* @ngInject */
function agForm($timeout) {
  return {
    require: '',
    priority: -1,
    controller: AgFormController,
    controllerAs: 'agForm',
    link: function(scope, element, attrs, agFormCtrl) {
      element
        .on('submit', function() {
          scope.$apply(function() {
            agFormCtrl.submit()
          })
        })
        .on('reset', function() {
          // should we be using a $scope.$evalAsync(
          scope.$evalAsync(function() {
            agFormCtrl.reset()
          })
        })
    }
  }
}

export default agForm
