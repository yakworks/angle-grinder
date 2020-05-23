import stringUtils from '../../utils/stringFomUtils'
import $log from '../../utils/Log'
import _ from 'lodash'

export default class AgBaseControl {
  isRequired = false

  /* @ngInject */
  constructor($element, $timeout) {
    this.$element = $element
    this.$timeout = $timeout
  }

  onInit() {
    this.type = this.type || 'text'
    const modelPath = this.$element.attr('ng-model')
    if (modelPath) {
      this.modelKey = _.split(modelPath, '.').slice(-1).pop()
    }
    // passing in a blank string to label will not be undefined, and is how to blank it out
    if (typeof this.label === 'undefined') {
      this.label = stringUtils.parseWords(this.modelKey)
    }
    this.placeholder = this.placeholder || (this.label || stringUtils.parseWords(this.modelKey))

    // figure out an id for the field if it doesn't have one
    if (!this.id) {
      const idKey = `field_${this.type}_${this.modelKey}`
      this.id = _.uniqueId(`${idKey}_`)
    }
    if (!this.name) {
      this.name = this.id
    }

    if (!this.maximumLength) {
      this.maximumLength = 50
    }
    // if required is added it wont be undefined and may have blank str if no value is set
    if (this.required === '' || this.required === 'true' ||
        this.ngRequired === '' || this.ngRequired === 'true') {
      this.isRequired = true
    }
    if (this.formCtrl) {
      if (!this.isHorizontal) this.isHorizontal = this.formCtrl.isHorizontal
      if (!this.labelClass && this.formCtrl.labelClass) this.labelClass = this.formCtrl.labelClass
    }
    // if (this.isHorizontal) this.labelClass = `column ${this.labelClass}`

    this.ngModelCtrl.$render = () => {
      this.value = this.ngModelCtrl.$viewValue
    }
  }

  onChange() {
    $log.debug('onChange', this)
    try {
      if (this.value && this.maximumLength && this.value.length > this.maximumLength) {
        this.value = this.value.substring(0, this.maximumLength)
      }
    } catch (e) {
      this.value = ''
      // log this to your system as a security message
    }
    this.ngModelCtrl.$setViewValue(this.value)
  }

  validate() {
    // run extra validation code here
    return true
  }

  $postLink() {
    this.$timeout(() => {
      if (this.isHorizontal && this.label) {
        // move label out and wrap with a column div
        const label = this.$element.find('label.label')
        var content = angular.element('<div class="columns is-mobile"></div>')
        this.$element.wrap(content)
        this.$element.parent().prepend(label)
        // this.$element.replaceWith(content);
      }
    })
  }
}

AgBaseControl.common = {
  dir: {
    restrict: 'E',
    replace: true,
    controllerAs: '$ctrl',
    bindToController: true
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
    isHorizontal: '@'
  }
}
