/* eslint-disable*/
import AgBaseComponent from '../AgBaseComponent'
/* @ngInject */
export default class AgSelectRestCtrl extends AgBaseComponent {

  constructor($element, $timeout, pathWithContext, Select2Options) {
    super($element, $timeout)
    this.Select2Options = Select2Options
    this.pathWithContext = pathWithContext
  }

  $onInit() {
    super.onInit()
    super.validate()
    this.selectOptions = this.Select2Options({
      width: 'auto',
      multiple: this.multiple !== undefined,
      ajax: {
        url: this.pathWithContext(this.url)
      },

      // formatters for result and selection
      formatResult(item) { return item.name },
      formatSelection(item) { return item.name }
    })
  }

  onChange() {
    super.onChange()
    super.validate()
  }
}
