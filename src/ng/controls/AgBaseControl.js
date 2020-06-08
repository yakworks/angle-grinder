import stringUtils from '../../utils/stringFomUtils'
// import Log from '../../utils/Log'
import _ from 'lodash'

export default class AgBaseControl {
  isRequired = false

  /* @ngInject */
  constructor($element, $timeout, $scope, $transclude) {
    this.$element = $element
    this.$timeout = $timeout
    this.$scope = $scope
    this.$transclude = $transclude
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
    this.transcludeSlot = ['link', 'button'].filter((trans) => this.$transclude.isSlotFilled(trans))[0]
    this.hasTranscluded = !!this.transcludeSlot
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
        // needs to be in timeout so all things have rendered.
        const label = el.find('.label')
        // Log.debug("label", label)
        const colClass = this.columnsClass || ''
        var content = angular.element(`<div class="columns is-mobile ${colClass}"></div>`)
        el.wrap(content)
        el.parent().prepend(label)
      })
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
    transclude: {
      link: '?a',
      button: '?button'

    }
  },
  scope: {
    label: '@',
    hint: '@',
    name: '@',
    placeholder: '@',
    required: '@',
    ngRequired: '@',
    fieldClass: '@',
    inputClass: '@',
    labelClass: '@',
    isHorizontal: '@',
    columnsClass: '@',
    isDense: '@'
  }
}
