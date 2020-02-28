import angular from 'angular'
import GridList from './listCtrl'
import _ from 'lodash'

const app = angular.module('app')

app.controller('gridExample.ListCtrl',GridList)

app.config(['agDateFilterProvider', provider => // set default date format
  provider.setDefaultFormat('MM/DD/YY H:mm a')
])

app.config(['agCurrencyFilterProvider', function(provider) {
  // set default currency format
  // provider.setDefaultFormat('<%= amount %> <%= symbol %>')
  // return provider.setDefaultSymbol('GBP')
}
])

app.factory('exampleGrid', [
  function() {
    const colModel = () => [{
      name: 'id',
      label: 'Inv No',
      width: 60,
      sorttype: 'int',
      align: 'right'
    },
    {
      name: 'customer.name',
      label: 'Customer',
      formatter: 'editActionLink'
    },
    {
      name: 'invoiceDate',
      label: 'Date',
      width: 100,
      formatter: 'date'
    },
    {
      name: 'amount',
      label: 'Amount',
      width: 80,
      formatter: 'currency'
    },
    {
      name: 'note',
      label: 'Note'
    },
    {
      name: 'complete',
      label: 'Complete',
      width: 80,
      fixed: true,
      align: 'center',
      formatter: 'okIcon'
    }
    ]

    return function(options) {
      if (options == null) { options = {} }
      const defaults = {
        datatype: 'local',
        colModel: colModel(),
        sortname: 'id',
        shrinkToFit: true
      }

      return _.extend(defaults, options)
    }
  }
])
