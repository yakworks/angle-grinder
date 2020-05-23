/* eslint-disable no-useless-constructor */
import AgBaseComponent from '../AgBaseComponent'

/* @ngInject */
export default class AgCheckboxCtrl extends AgBaseComponent {
  constructor($element, $timeout) {
    super($element, $timeout)
  }

  $onInit() {
    super.onInit()
    super.validate()
  }

  onChange() {
    super.onChange()
    super.validate()
  }
}
