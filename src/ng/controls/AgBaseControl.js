import * as nu from '@yakit/core/nameUtils'

// import Log from '../../utils/Log'
import _ from 'lodash'

export default class AgBaseControl {
  isRequired = false
  isDisabled= false

  /* @ngInject */
  constructor($element, $timeout, $scope, $transclude) {
    this.$element = $element
    this.$timeout = $timeout
    this.$scope = $scope
    // this.dataStoreApi = dataStoreApi
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
      this.label = nu.parseWords(this.modelKey)
    }
    this.placeholder = this.placeholder || (this.label || nu.parseWords(this.modelKey))

    // if its not passed in then create a unique id for this component
    if (!this.elementId) {
      const idKey = `${this.formCtrl.form.$name}_${this.modelKey}`
      this.elementId = idKey
    }
    // Log.debug("this.elementId", this.elementId)

    if (!this.name) {
      // to be able to handle server errors by field name
      this.name = this.modelKey
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

        var content = angular.element(`<div class="columns is-mobile ${colClass}"></div>`)
        el.wrap(content)
        el.parent().prepend(label)

        // when we append label it still shown when we hide a component with ng-hide, so need to add ng-hide class manually
        if (attributes['ng-hide'] || attributes['ng-show']) {
          this.$scope.$watch(() => {
            return el.attr('class')
          }, (newValue) => {
            this.$timeout(() => {
              ['ng-hide', 'ng-show'].forEach((clazz) => {
                if (newValue.indexOf(clazz) > -1) {
                  el.parent().addClass(clazz)
                } else {
                  el.parent().removeClass(clazz)
                }
              })
            })
          })
        }
      })
    }
  }

  $onDestroy() {
    if (this.isHorizontal && this.label) {
      // to hide wrapper when we hide component with ng-if, we remove because label is adding after each component creating
      this.$element.parent().remove()
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
    labelKey: '@',
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
    isDense: '@',
    elementId: '@'
  }
}
