/* eslint-disable*/
import AgBaseComponent from '../AgBaseComponent'
import _ from 'lodash'

/* @ngInject */
export default class AgSelectRestCtrl extends AgBaseComponent {
  selectOptions = {}
  opts = {
    minimumInputLength: 3,
    closeOnSelect: false,
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

  // $postLink(scope, elm) {
  //   let el = this.$element
  //   this.$timeout(function() {
  //     el.on("select2-selecting", function(e) {
  //       e.preventDefault();
  //       handleSelection(e, el);
  //     });
  //   })
  // }

  // onChange() {
  //   super.onChange()
  //   super.validate()
  // }
}

// hack so closeOnSelect: false works
// https://github.com/select2/select2/issues/2264#issuecomment-213003190
function handleSelection(e, target){
  e.preventDefault();
  console.log("e.obj", e.object)
  var data = target.select2('data');
  data.push(e.object)
  //target.select2('val', data)
  // data.push({
  //             'id': e.object.id,
  //             'name': e.object.name
  //         });
  target.select2('data', data);
  target.select2("open");
}
