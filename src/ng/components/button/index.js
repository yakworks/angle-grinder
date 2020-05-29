// import Log from '../../../utils/Log'

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
    let icoVal = this[fldName]
    if (icoVal && icoVal.startsWith('fa-')) icoVal = `fa ${icoVal}`
    if (icoVal && icoVal.startsWith('mdi-')) icoVal = `mdi ${icoVal}`
    this[`${fldName}Class`] = icoVal
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
    type: '@'
  }
})
