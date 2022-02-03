import { hasSomeDeep, findSomeDeep } from '../finders'
import {expect as x} from '@jest/globals'
import countryData from './countries'

const sobj = {
  a: 'foos',
  b: 123,
  c:{
    nest: 'bars',
    val: 234
  }
}
const sobj2 = { a: 'foo'}

const testList = [sobj, sobj2]

describe('hasSomeDeep', () => {

  test('first level', () => {
    x(hasSomeDeep(sobj, 'foo')).toBe(true)
    x(hasSomeDeep(sobj, 'foos')).toBe(true)
    x(hasSomeDeep(sobj, 'oos')).toBe(true)
    x(hasSomeDeep(sobj, 123)).toBe(true)
  })

  test('deep', () => {
    x(hasSomeDeep(sobj, 'bars')).toBe(true)
    x(hasSomeDeep(sobj, 'ars')).toBe(true)
    x(hasSomeDeep(sobj, 234)).toBe(true)
  })
})

describe('findSomeDeep', () => {

  test('findSomeDeep', () => {
    x( findSomeDeep(testList, 'foo').length ).toEqual(2)
    x( findSomeDeep(testList, 'foos').length ).toEqual(1)
  })

  test('findSomeDeep country united', () => {
    x( findSomeDeep(countryData, 'united').length ).toEqual(3)
  })

})
