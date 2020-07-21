// import _ from 'lodash'

const template = `
<div class="pt-2">
  <ag-formly-form ag-form is-horizontal model="listCtrl.searchModel" class="extended-search-form "
    fields="listCtrl.cfg.searchForm" form="listCtrl.searchFormCtrl" is-columns="true">
    <ag-ok-cancel ok-label="Search"
      ok-click="listCtrl.search(listCtrl.searchModel)"
      cancel-click="listCtrl.searchReset()"
      is-loading="listCtrl.isSearching">
    </ag-ok-cancel>
  </ag-formly-form>

</div>
`

export default {
  template: template,
  controller: function($scope) {
    this.$onInit = () => {
      $scope.listCtrl = this.listCtrl
      console.log('$scope', $scope)
    }
  },
  bindings: {
    listCtrl: '<'
  }
}
