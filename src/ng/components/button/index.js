// import Log from '../../../utils/Log'
import { getIconClass } from '@yakit/ui/icon'

class Controller {
  /* @ngInject */
  constructor($element, $transclude) {
    this.$element = $element
    // this.$transclude = $transclude
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
    if (this.fab === '' || this.fab === 'true') {
      this.btnCls = `${this.btnCls} is-fab`
      this.isFab = true
    }
    this.setupIconClass('iconSolo')
    this.setupIconClass('iconLeft')
    this.setupIconClass('iconRight')
  }

  // setupIconClass(fldName) {
  //   this[`${fldName}Class`] = getIconClass(this[fldName])
  // }
  setupIconClass(fldName) {
    if(this[fldName]) {
      let origIcoName = this[fldName]
      let icoClass = getIconClass(origIcoName)
      this[`${fldName}Class`] = icoClass
      //if it starts with material then it needs the text per google font
      this[`${fldName}Text`] = icoClass.startsWith('material') ? origIcoName : ''
    }
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
    fab: '@',
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
