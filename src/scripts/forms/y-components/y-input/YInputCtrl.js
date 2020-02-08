import YBaseComponent from '../YBaseComponent'
/* @ngInject */
export default class YInputCtrl extends YBaseComponent {
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
