/* eslint-disable*/
import AgBaseComponent from '../AgBaseComponent'
/* @ngInject */
export default class AgSelectRestCtrl extends AgBaseComponent {
  output

  constructor($element, $timeout, pathWithContext, Select2Options) {
    super($element, $timeout)
    this.Select2Options = Select2Options
    this.pathWithContext = pathWithContext
  }

  $onInit() {
    super.onInit()
    super.validate()
    console.log(this.output)
    const fields = ['id', 'name']
    const buildResult = (item) => {
      return fields.map((k) => item[k]).join(' - ')
    }
    this.selectOptions = this.Select2Options({
      width: 'auto',
      quietMillis: 250,
      multiple: this.multiple !== undefined,
      minimumInputLength: this.inputLength || 2,
      ajax: {
        url: this.pathWithContext(this.url)
      },

      // formatters for result and selection
      formatResult(item) {
        return buildResult(item)
      },
      formatSelection(item) {
        return buildResult(item)
      }
    })
  }

  onChange() {
    super.onChange()
    super.validate()
  }
}
