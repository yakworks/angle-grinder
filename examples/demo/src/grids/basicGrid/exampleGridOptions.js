import _ from "lodash";

export default function exampleGridOptions(options) {
  const colModel = () => [
    {
      name: 'id',
      label: 'id',
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
      name: 'tranDate',
      label: 'Date',
      width: 100,
      formatter: 'date'
    },
    {
      name: 'refnum',
      label: 'Ref#',
      width: 100
    },
    {
      name: 'amount',
      label: 'Amount',
      width: 80,
      formatter: 'currency'
    },
    {
      name: 'comments',
      label: 'Note'
    },
    {
      name: 'state',
      label: 'State',
      width: 80,
      fixed: true,
      align: 'center',
      // formatter: 'okIcon'
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
