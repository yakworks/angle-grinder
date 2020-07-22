/* eslint-disable*/
import AgBaseControl from '../AgBaseControl'
import _ from 'lodash'
import './select-rest.scss'

class Controller extends AgBaseControl {
  selectOptions = {}
  opts = {
    minimumInputLength: 3,
    closeOnSelect: false,
    useDataObject: true,
    ajax: {
      // cache: true,
      dataType: 'json',
      quietMillis: 250,
      data: function (term, pageNum) { // page is the one-based page number tracked by Select2
        if (pageNum == null) { pageNum = 1 }
        return {
          q: term, //search term
          page: pageNum, // page number
          // sorting and pagination
          sort: 'name',
          order: 'asc',
          max: 20
        }
      },
      results: function (result, page) {
        return { results: result.data, more: page < result.total }
      }
    },
    displayFields:['num','name'],
    formatResult: (item) => this.repoFormatResult(item),
    formatSelection: (item) => item.name,
    initSelection: angular.noop // needs to be here or it blows up setting value
    //dropdownCssClass: "bigdrop", // apply a special css
    //escapeMarkup: function (m) { return m; } // don't escape is rendering html
  }

  /* @ngInject */
  constructor($element, $timeout, pathWithContext, $scope, $transclude) {
    super($element,$timeout,$scope, $transclude)
    this.pathWithContext = pathWithContext
  }

  $onInit() {
    super.onInit()
    _.merge(this.opts, this.selectOptions)
    this.opts.ajax.url = this.pathWithContext(this.url)
  }

  repoFormatResult(item) {
    let displayTds = ''
    this.opts.displayFields.forEach( it => displayTds = `${displayTds} <td>${item[it]}</td>` )
    var markup = `
      <table class="table table-condensed select-rest-result">
        <tr>
          ${displayTds}
        </tr>
      </table>
    `
    return markup;
  }

  // if its multiple & closeOnSelect:false then squinky hack so it stays open
  // https://github.com/select2/select2/issues/2264#issuecomment-213003190
  $postLink(scope, elm) {
    if(this.opts.multiple && !this.opts.closeOnSelect){
      this.$timeout(() => {
        let inputEl = angular.element(document.getElementById(this.id))
        inputEl.bind('select2-selecting', function(e) {
          e.preventDefault()
          let ngModelCtrl = inputEl.controller('ngModel')
          var data = ngModelCtrl.$modelValue || []
          data.push(e.object)
          ngModelCtrl.$setViewValue(data)
        })
      })
    }
  }

}
export default () => ({
  ...AgBaseControl.common.dir,
  template: require('./select-rest.html'),
  controller: Controller,
  require: {
    ngModelCtrl: 'ngModel',
    formCtrl: '^agForm'
  },
  scope: {
    ...AgBaseControl.common.scope,
    url: '@',
    selectOptions: '<',
    multiple: '@'
  }
})
