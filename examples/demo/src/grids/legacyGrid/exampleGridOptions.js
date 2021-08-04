import _ from 'lodash'

export default function exampleGridOptions(options) {
  const colModel = () => [
    {
      name: 'id',
      label: 'Inv No',
      width: 20,
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

  if (options == null) {
    options = {}
  }
  const defaults = {
    colModel: colModel(),
    sortname: 'id',
    shrinkToFit: true
  }

  return _.merge(defaults, options)
}
