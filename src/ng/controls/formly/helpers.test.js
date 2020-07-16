/* eslint-disable */
import agMod from '~/angle-grinder'
import _ from 'lodash'
import {transformOptions} from './helpers'

describe('tranformOptions', () => {
  let testOpts = {
    foo:{
      label: 'Cust #',
      required: true
    },
    'bar.bazBuzz': {
      type: 'select',
      dataApiKey: 'barApi'
    }
  }

  let testArray = [
    {
      key: 'foo',
      label: 'Cust #',
      templateOptions: {
        required: true
      }
    },
    {
      key: 'bar.bazBuzz',
      type: 'select',
      templateOptions: {
        dataApiKey: 'barApi'
      }
    }
  ]

  let resultOpts = [
    {
      key: 'foo',
      type: 'input',
      templateOptions: {
        label: 'Cust #',
        required: true
      }
    },
    {
      key: 'bar.bazBuzz',
      type: 'select',
      templateOptions: {
        label: 'Baz Buzz',
        dataApiKey: 'barApi'
      }
    }
  ]

  describe('tranformOptions from object', function() {
    it('should tranformOptions from object', function() {
      let topts = tranformOptions(testOpts)
      //console.log("topts", topts)
      topts.forEach((item, i) => {
        expect(item).toEqual(resultOpts[i])
      })
      //expect(topts).toEqual(resultOpts)
    })

    it('should tranformOptions from array', function() {
      let topts = tranformOptions(testArray)
      //console.log("topts", topts)
      topts.forEach((item, i) => {
        expect(item).toEqual(resultOpts[i])
      })
    })
  })

})
