import {expect as x} from '@jest/globals'
import { formatAmount } from '../formatters.js'
describe('formatAmount', () => {

  test('formatAmount nums', () => {
    x( formatAmount(1000) ).toEqual('1,000.00')
    x( formatAmount(1.2) ).toEqual('1.20')
    x( formatAmount(1) ).toEqual('1.00')
    x( formatAmount(1.234) ).toEqual('1.23')
  })

  test('formatAmount string', () => {
    x( formatAmount('1,000') ).toEqual('1,000.00')
    x( formatAmount('1.2') ).toEqual('1.20')
    x( formatAmount('1') ).toEqual('1.00')
    x( formatAmount('1.234') ).toEqual('1.23')
  })

  test('formatAmount nothing', () => {
    x( formatAmount(undefined) ).toEqual('0')
    x( formatAmount(null) ).toEqual('0')
    x( formatAmount(false) ).toEqual('0')
    x( formatAmount('') ).toEqual('0')
    //TODO should we do 0 if its empty string?
    x( formatAmount(' ') ).toEqual('0')
    x( formatAmount('null') ).toEqual('0')
    x( formatAmount('undefined') ).toEqual('0')

  })

})


