/* eslint-disable*/
import AgBaseComponent from '../AgBaseComponent'
import _ from 'lodash'

/* @ngInject */
export default class AgSelectRestCtrl extends AgBaseComponent {
  selectOptions = {}
  opts = {
    minimumInputLength: 3,
    useDataObject: true,
    ajax: {
      dataType: 'json',
      quietMillis: 250,
      data: function (term, pageNum) { // page is the one-based page number tracked by Select2
        if (pageNum == null) { pageNum = 1 }
        return {
          q: term, //search term
          page: pageNum, // page number
          // sorting and pagination
          sort: 'id',
          order: 'asc',
          max: 20
        }
      },
      results: function (result, page) {
        return { results: result.rows, more: page < result.total }
      }
    },
    formatResult: this.repoFormatResult,
    formatSelection: (item) => item.name,
    initSelection: angular.noop // needs to be here or it blows up setting value
    //dropdownCssClass: "bigdrop", // apply a special css
    //escapeMarkup: function (m) { return m; } // don't escape is rendering html
  }

  constructor($element, $timeout, pathWithContext) {
    super($element, $timeout)
    this.pathWithContext = pathWithContext
  }

  $onInit() {
    super.onInit()
    _.merge(this.opts, this.selectOptions)
    this.opts.ajax.url = this.pathWithContext(this.url)
  }

  repoFormatResult(item) {
    var markup = `
      <table class="table table-condensed select-rest-result">
        <tr>
          <td>${item.num}</td>
          <td>${item.name}</td>
        </tr>
      </table>
    `
    return markup;
  }

  // onChange() {
  //   super.onChange()
  //   super.validate()
  // }
}
