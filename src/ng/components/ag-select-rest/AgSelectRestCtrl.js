/* eslint-disable*/
import AgBaseComponent from '../AgBaseComponent'
/* @ngInject */
export default class AgSelectRestCtrl extends AgBaseComponent {
  items

  constructor($element, $timeout) {
    super($element, $timeout)
  }

  $onInit() {
    super.onInit()
    super.validate()
    this.ngOptions = 'value.id as value.name for value in cmpCtrl.items'
  }

  $postLink() {
    const el = this.$element
    const $sel = el.find('ng-transclude > select')
    // $sel.addClass("form-control")
    // el.find("ng-transclude > select").children().appendTo(el.find("select.comp_select"))

    this.$timeout(() => {
      // let $s = el.find("ng-transclude > select")
      // el.find("select.comp_select").append($s.children())
      // $s.children().appendTo(el.find("select.comp_select"))
      // $s.children().appendTo("select.comp_select");
    })
  }

  onChange() {
    super.onChange()
    super.validate()
  }
}
