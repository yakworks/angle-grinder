import BaseCtrl from '~/scripts/utils/BaseCtrl'
import _ from 'lodash'
import { generateData } from './dataGenerator'

export default class ListCtrl extends BaseCtrl {
  static initClass() {

    this.register("app", "gridExample.ListCtrl");
    this.inject("$scope", "$q", "$log", "exampleGrid", "FormDialogServ", "$uibModal");
  }

  initialize() {
    this.expose(this.$scope, "getSelectedRowsData", "editRecord", "createRecord", "deleteRecord");

    // initialize the grid with generated data
    this.data = generateData(100);
    this.$scope.data = this.data;

    const selectedRow = function() { return this.$log.debug("exampleGrid selected row:", arguments); }.bind(this);
    this.$scope.gridOptions = this.exampleGrid({data: this.data, onSelectRow: selectedRow});
    this.$scope.otherGridOptions = this.exampleGrid({data: this.data, pager: false});

    return this.$scope.selectedRowsData = [];
  }

  getSelectedRowsData() {
    const ids = this.$scope.exampleGrid.getSelectedRowIds();
    return this.$scope.selectedRowsData = _.map(ids, function(id) {
      return this.$scope.exampleGrid.getRowData(id);
    });
  }

  editRecord(id) {
    const record = this.findRecordById(id);

    const deferred = this.$q.defer();
    deferred.resolve(record);

    angular.extend(record, {
      persisted() { return true; },

      save() { return { $promise: deferred.promise }; },

      delete: () => {
        this.deleteRecordById(id);
        return { $promise: deferred.promise };
      }
    });

    const dialogOptions = {record, grid: this.$scope.exampleGrid};
    return this.FormDialogServ.open("/partials/gridExample/form.html", dialogOptions);
  }

  createRecord() {
    const record = {};

    const deferred = this.$q.defer();
    deferred.resolve(record);

    angular.extend(record, {
      persisted() { return false; },

      save() {
        record.id = new Date().getTime();
        return { $promise: deferred.promise };
      }
    });

    const dialogOptions = {record, grid: this.$scope.exampleGrid};
    return this.FormDialogServ.open("/partials/gridExample/form.html", dialogOptions).result
      .then(record => this.data.push(record));
  }

  deleteRecord(id) {
    const record = this.deleteRecordById(id);
    return this.$scope.exampleGrid.removeRow(record.id);
  }

  findRecordById(id) {
    id = parseInt(id);
    return _.find(this.data, row => row.id === id);
  }

  deleteRecordById(id) {
    const row = this.findRecordById(id);
    if (row != null) {
      this.data = _.reject(this.data, record => record.id === row.id);
      return row;
    }
  }
  createDialog() {
    // var parentElem = parentSelector ?
    //   angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
    var modalInstance = this.$uibModal.open({
      template: require('./simpleDialog.html')
      //controller: 'ModalInstanceCtrl',
      //controllerAs: '$ctrl',
      //size: size,
      //appendTo: parentElem
    });

    // modalInstance.result.then(function (selectedItem) {
    //   $ctrl.selected = selectedItem;
    // }, function () {
    //   $log.info('Modal dismissed at: ' + new Date());
    // });
  };
}
