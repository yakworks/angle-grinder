import {expect as x} from '@jest/globals'
import fmt from '../formatters.js'
import {parseDate, formatDate} from '../date/date-format';
import {isoDateToDisplay} from '../date/dateSupport';

describe('formatAmount', () => {

  test('formatAmount nums', () => {
    x( fmt.amount(1000) ).toEqual('1,000.00')
    x( fmt.amount(1.2) ).toEqual('1.20')
    x( fmt.amount(1) ).toEqual('1.00')
    x( fmt.amount(1.234) ).toEqual('1.23')
  })

  test('formatAmount string', () => {
    x( fmt.amount('1,000') ).toEqual('1,000.00')
    x( fmt.amount('1.2') ).toEqual('1.20')
    x( fmt.amount('1') ).toEqual('1.00')
    x( fmt.amount('1.234') ).toEqual('1.23')
  })

  test('formatAmount nothing', () => {
    x( fmt.amount(undefined) ).toEqual('0')
    x( fmt.amount(null) ).toEqual('0')
    x( fmt.amount(false) ).toEqual('0')
    x( fmt.amount('') ).toEqual('0')
    //TODO should we do 0 if its empty string?
    x( fmt.amount(' ') ).toEqual('0')
    x( fmt.amount('null') ).toEqual('0')
    x( fmt.amount('undefined') ).toEqual('0')

  })

})

describe('format date', () => {

  test('fmt.date', () => {
    // let parsedDate = parseDate('2022-01-01')
    x( isoDateToDisplay('2022-01-01') ).toEqual('01/01/2022')
  })

  test('fmt.date', () => {
    x( fmt.date('2022-01-01') ).toEqual('01/01/2022')
  })
})

