import _ from 'lodash'

/* @ngInject */
export default class ListCtrl {
  constructor($scope, $log, Resource, $filter, DialogCrudCtrlMixin) {
    this.$filter = $filter
    $scope.gridOptions = {
      path: '/api/orgShowCase/list?format=json',
      colModel: this.colModel(),
      multiselect: false, // turn off multiselect
      shrinkToFit: true, // makes columns fit to width
      sortname: 'name',
      sortorder: 'asc'
    }

    $scope.tzShowCase = _.cloneDeep(Resource)

    $scope.filters = {}

    DialogCrudCtrlMixin($scope, {
      Resource,
      gridName: 'orgShowCaseGrid',
      templateUrl: '/orgShowCase/formTemplate',
      beforeEdit(record) {
        // saves data from server to compare retrieved data and data that will be send to the server
        $scope.tzShowCase = _.cloneDeep(record)
        const orgShowCase = _.cloneDeep(record)
        // convert `Contact.type` enum field to the string
        return orgShowCase
      }
    }
    )
  }

  colModel() {
    return [
      { name: 'id', label: 'ID', width: 30, fixed: true },
      { name: 'name', label: 'Name', width: 100, fixed: true, formatter: 'editActionLink' },
      { name: 'exampleDate', label: 'Example Date', width: 70, formatter: 'date' },
      { name: 'exampleDateTime', label: 'Example Date Time', width: 70, formatter: 'date' },
      { name: 'exampleLocalDate', label: 'Example Local Date', width: 70, formatter: 'date' }
    ]
  }
}
