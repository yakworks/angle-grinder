/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const grids = angular.module("exampleApp.grids");

grids.factory("exampleGrid", [
  function() {

    const colModel = () => [{
      name: "id",
      label: "Inv No",
      width: 60,
      sorttype: "int",
      align: "right"
    }
    , {
      name: "customer.name",
      label: "Customer",
      formatter: "editActionLink"
    }
    , {
      name: "invoiceDate",
      label: "Date",
      width: 100,
      formatter: "date"
    }
    , {
      name: "amount",
      label: "Amount",
      width: 80,
      formatter: "currency"
    }
    , {
      name: "note",
      label: "Note"
    }
    , {
      name: "complete",
      label: "Complete",
      width: 80,
      fixed: true,
      align: "center",
      formatter: "okIcon"
    }
    ];

    return function(options) {
      if (options == null) { options = {}; }
      const defaults = {
        datatype: "local",
        colModel: colModel(),
        sortname: "id",
        shrinkToFit: true
      };

      return _.extend(defaults, options);
    };
  }
]);
