// import Log from '../../../utils/Log'
import { getIconClass } from '../../../utils/icon'

class Controller {
  constructor($element, $transclude) {
    this.$element = $element
    // this.$transclude = $transclude
    // console.log("this.$transclude", this.$transclude)
    $transclude((clone) => {
      // if clone.length then it has inner content/text for button
      if (clone.length) this.hasTranscluded = true
    })
  }

  $onInit() {
    this.btnType = this.type || 'button'
    this.btnCls = this.buttonClass || ''
    // setup color class
    if (this.color) this.btnCls = `${this.btnCls} is-${this.color}`
    // if its icon then its an an icon button with no border, set is-icon-button
    if (this.icon) {
      this.btnCls = `${this.btnCls} is-icon-button`
      this.iconSolo = this.icon
    }
    this.setupIconClass('iconSolo')
    this.setupIconClass('iconLeft')
    this.setupIconClass('iconRight')
  }

  setupIconClass(fldName) {
    this[`${fldName}Class`] = getIconClass(this[fldName])
  }

  fireClick(event) {
    if (_.isFunction(this.buttonClick)) { // if there is a default then use it
      this.buttonClick(event)
    }
  }

  get ngClass() {
    // let self = this
    return {
      'is-loading': this.isLoading
    }
  }
}
Controller.$inject = ['$element', '$transclude']
export default () => ({
  restrict: 'E',
  replace: true,
  controllerAs: 'btnCtrl',
  bindToController: true,
  transclude: true,
  template: require('./button.html'),
  controller: Controller,
  scope: {
    buttonClass: '@',
    color: '@',
    iconLeft: '@',
    iconRight: '@',
    iconSolo: '@',
    icon: '@',
    isLoading: '<',
    isDisabled: '<',
    // size: '@',
    buttonClick: '=',
    btnType: '@'
  }
})
