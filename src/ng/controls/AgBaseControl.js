import stringUtils from '../../utils/stringFomUtils'
// import Log from '../../utils/Log'
import _ from 'lodash'

export default class AgBaseControl {
  isRequired = false
  isDisabled= false

  /* @ngInject */
  constructor($element, $timeout, $scope, $transclude, $parse) {
    this.$element = $element
    this.$timeout = $timeout
    this.$scope = $scope
    this.$parse = $parse
    // this.$transclude = $transclude
    $transclude((clone) => {
      clone.each((i, el) => {
        if ($(el).html() !== undefined) {
          this.hasTranscluded = true
        }
      })
    })
  }

  initDefaults() {
    this.type = this.type || 'text'
    const modelPath = this.$element.attr('ng-model')
    if (!this.modelKey && modelPath) {
      this.modelKey = _.split(modelPath, '.').slice(-1).pop()
    }
    // passing in a blank string to label will not be undefined, and is how to blank it out
    if (typeof this.label === 'undefined') {
      this.label = stringUtils.parseWords(this.modelKey)
    }
    this.placeholder = this.placeholder || (this.label || stringUtils.parseWords(this.modelKey))

    // if its not passed in then create a unique id for this component
    if (!this.elementId) {
      const idKey = `field_${this.type}_${this.modelKey}`
      this.elementId = _.uniqueId(`${idKey}_`)
    }
    // Log.debug("this.elementId", this.elementId)

    if (!this.name) {
      this.name = this.elementId
    }

    // if required is added it wont be undefined and may have blank str if no value is set
    if (this.required === '' || this.required === 'true' ||
        this.ngRequired === '' || this.ngRequired === 'true') {
      this.isRequired = true
    }
    // if disabled is added it wont be undefined and may have blank str if no value is set
    if (this.disabled === '' || this.disabled === 'true' ||
        this.ngDisabled === '' || this.ngDisabled === 'true') {
      this.isDisabled = true
    }
    // this.transcludeSlot = ['link', 'button'].filter((trans) => this.$transclude.isSlotFilled(trans))[0]
    // this.hasTranscluded = !!this.transcludeSlot
  }

  onInit() {
    this.initDefaults()

    this.ngModelCtrl.$render = () => {
      this.value = this.ngModelCtrl.$viewValue
    }

    // Do the label positioning based on isHorizontal
    if (this.formCtrl) {
      if (!this.isHorizontal) this.isHorizontal = this.formCtrl.isHorizontal
      if (!this.labelClass && this.formCtrl.labelClass) this.labelClass = this.formCtrl.labelClass
    }

    // if isHorizontal, move label outside and wrap in a columns div
    if (this.isHorizontal && this.label) {
      this.$timeout(() => {
        const el = this.$element
        const attributes = el[0].attributes
        // needs to be in timeout so all things have rendered.
        const label = el.find('.label')
        // Log.debug("label", label)
        const colClass = this.columnsClass || ''
        // when we append label it still shown when we hide a component with ng-hide, so need to add ng-hide class manually
        if (attributes['ng-hide']) {
          this.$scope.$watch(() => {
            return el.attr('class')
          }, (newValue) => {
            this.$timeout(() => {
              if (newValue.indexOf('ng-hide') > -1) {
                label.addClass('ng-hide')
              } else {
                label.removeClass('ng-hide')
              }
            })
          })
        }

        var content = angular.element(`<div class="columns is-mobile ${colClass}"></div>`)
        el.wrap(content)
        el.parent().prepend(label)
      })
    }
  }

  $onDestroy() {
    if (this.isHorizontal && this.label) {
      const el = this.$element
      // to hide label when we hide component with ng-if, we remove because label is adding after each component creating
      el.parent().find('label')[0].remove()
    }
  }

  onChange() {
    this.ngModelCtrl.$setViewValue(this.value)
  }

  validate() {
    // run extra validation code here
    return true
  }

  // $postLink() {
  //   this.$scope.$evalAsync(() => {
  //   })
  // }
}

AgBaseControl.common = {
  dir: {
    restrict: 'E',
    replace: true,
    controllerAs: '$ctrl',
    bindToController: true,
    transclude: true
  },
  scope: {
    label: '@',
    hint: '@',
    name: '@',
    placeholder: '@',
    required: '@',
    disabled: '@',
    ngRequired: '@',
    fieldClass: '@',
    inputClass: '@',
    labelClass: '@',
    isHorizontal: '@',
    columnsClass: '@',
    isDense: '@'
  }
}
