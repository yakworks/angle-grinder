import angular from 'angular'
import _ from 'lodash'
// import Log from '../../../utils/Log'

export default agForm

/* @ngInject */
function agForm($timeout) {
  return {
    require: '',
    priority: -1,
    controller: AgFormController,
    controllerAs: 'agForm',
    link: function(scope, element, attrs, agForm) {
      element
        .on('submit', function() {
          scope.$apply(function() {
            agForm.submit()
          })
        })
        .on('reset', function() {
          // should we be using a $scope.$evalAsync(
          scope.$evalAsync(function() {
            agForm.reset()
          })
        })
    }
  }

  /* @ngInject */
  function AgFormController($scope, $element, $attrs, agValidationsConfig, $window) {
    var vm = this
    var form = $element.controller('form')
    var validationStrategy = $attrs.strategy
      ? agValidationsConfig.getValidationStrategy($attrs.strategy)
      : agValidationsConfig.getDefaultValidationStrategy()

    // Log.debug('$attrs',$attrs)
    this.isHorizontal = !_.isUndefined($attrs.isHorizontal)
    this.labelClass = $attrs.labelClass
    // set default to is-3
    if (this.isHorizontal && !this.labelClass) this.labelClass = 'is-3'

    // add autocomplete="off" novalidate
    $element.attr('novalidate',true)
    $element.attr('autocomplete', "off")

    // polyfill for setSubmitted pre 1.3
    function setSubmitted() {
      if (angular.isFunction(form.$setSubmitted)) {
        form.$setSubmitted()
        return
      }
      form.$submitted = true
      $element.addClass('ng-submitted')
    }

    function setUnsubmitted() {
      if (angular.isFunction(form.$setSubmitted)) {
        return
      }
      form.$submitted = false
      $element.removeClass('ng-submitted')
    }

    angular.extend(vm, {

      form: form,

      getValidationStrategy: function() {
        return validationStrategy
      },

      tooltipTrigger: $attrs.tooltipTrigger,

      submit: function() {
        setSubmitted()

        // focus first error if required
        if (form.$invalid && $attrs.focusError) {
          $window.setTimeout(function() {
            $element.find('.ng-invalid:input:visible:first').focus()
          })
        }

        $scope.$broadcast('AgForm.ForceErrorUpdate', null, 'submit')
      },

      reset: function() {
        vm.form.$setPristine()
        vm.form.$setUntouched()
        setUnsubmitted()

        $scope.$broadcast('AgForm.ForceErrorUpdate', null, 'reset')
      }

    }) // end angular.extend
  }
}
