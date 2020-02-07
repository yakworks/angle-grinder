import InputBase from '../input-base'
/* @ngInject */
export default class YInputCtrl extends InputBase {
  // constructor($element, $timeout) {
  //   super($element, $timeout)
  // }
  $onInit() {
    super.onInit()
    super.validate()
  }

  onChange() {
    super.onChange()
    super.validate()
  }
}
