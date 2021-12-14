/* eslint-disable */
import _ from 'lodash'
import MemDatastore from '../local/MemDatastore'
import { findSomeDeep } from '../../utils/finders'
import countryData from '../../__tests__/countries'
import {expect as x} from '@jest/globals'

describe('Datastore', () => {

  const ds = MemDatastore({ initData: countryData })

  describe('Datastore internals', () => {
    test('findSomeDeep country united', () => {
      x( findSomeDeep(countryData, 'united').length ).toEqual(3)
    })

    test('qbe', async () => {
      const data = await ds.stores.getDataCache()
      const result = ds.qbe(data, {code: 'US'})
      x(result.length).toEqual(1)
    })

    test('qSearch', async () => {
      const data = await ds.stores.getDataCache()
      const s = ds.qSearch(data, 'united')
      x( s.length ).toEqual(3)
    })

    test('filter', async () => {
      const data = await ds.stores.getDataCache()
      const s = ds.filter(data, {q: 'united'})
      x( s.length ).toEqual(3)
    })

    test('filter q object', async () => {
      let data = await ds.stores.getDataCache()
      let s = ds.filter(data, {q: {code:'US'}})
      x( s.length ).toEqual(1)

      s = ds.filter(data, {q: {name:'united'}})
      x( s.length ).toEqual(3)
    })
  })

  describe('Datastore search', () => {
    test('search nothing', async function() {
      const params = {
        max: 20,
        page: 1,
        sort: "code"
      }
      await ds.search(params)
      let viewData = await ds.getViewData()
      let pager = await ds.stores.getPage()

      x(viewData.length).toEqual(42)
      x(pager.data.length).toEqual(20)

      x(pager.page).toEqual(1)
      x(pager.records).toEqual(42)
      x(pager.total).toEqual(3)
    })

    test('search simple q text', async function() {
      const params = {
        q: "united",
      }
      await ds.search(params)
      let viewData = await ds.getViewData()
      let pager = await ds.stores.getPage()

      x(viewData.length).toEqual(3)
      x(pager.data.length).toEqual(3)

      x(pager.page).toEqual(1)
      x(pager.records).toEqual(3)
      x(pager.total).toEqual(1)
    })

    test('qSearch param', async function() {
      const params = {
        qSearch: "united"
      }
      let items = await ds.search(params)

      x(items.length).toEqual(3)

    })

    test('picklist paged', async function() {
      const result = await ds.picklist()
      //console.log("result", result)
      expect(result.length).toEqual(42)
      // expect(result.data.length).toEqual(20)
    })

  })

})

