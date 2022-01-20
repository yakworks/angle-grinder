import selectContext from '../select/selectContext'
import {expect as x} from '@jest/globals'

describe('single selection', () => {

  const simpleData = ['Pie', 'Red', 'Green']

  //array of object data. identifier defaults to id and label is name.
  //added code in for the demo of multi labels.
  const itemData = [
    {id: 1, code:'choc', name: '🍫 Chocolate'},
    {id: 2, code:'piz', name: '🍕 Pizza'},
    {id: 3, code:'cook', name: '🍪 Cookies'},
    {id: 4, code:'1234 12345566', name: '🎉 Big Really Long Desc 1234 1234 1234 1234 1234 1234 1234'}
  ]

  let opts = {
    itemData: simpleData
  }

  it('simple', async () => {
    let opts ={
      itemData: simpleData
    }
    let selCtx = selectContext(opts).init()
    let items = await selCtx.loadItemsIfNeeded()
    x( items ).toEqual([
      { id: "Pie", name: "Pie"},
      { id: "Red", name: "Red"},
      { id: "Green", name: "Green"}
    ])

    //sanity check functions used in select
    x(selCtx.getOptionLabel(items[0])).toEqual('Pie')

  })
})
