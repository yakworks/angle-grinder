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
        required: true,
        placeholder: 'Cust #'
      }
    },
    {
      key: 'bar.bazBuzz',
      type: 'select',
      templateOptions: {
        label: 'Baz Buzz',
        dataApiKey: 'barApi',
        placeholder: 'Baz Buzz'
      }
    }
  ]

  let resultFieldGroup = [
    {
      className: 'columns',
      fieldGroup: [
        {
          key: 'foo',
          type: 'input',
          className: 'column',
          templateOptions: {
            label: 'Cust #',
            required: true,
            placeholder: 'Cust #'
          }
        },
        {
          key: 'bar.bazBuzz',
          type: 'select',
          className: 'column',
          templateOptions: {
            label: 'Baz Buzz',
            dataApiKey: 'barApi',
            placeholder: 'Baz Buzz'
          }
        }
      ]
    },
    {
      key: 'name',
      type: 'input',
      templateOptions: {
        label: 'Name',
        maxLength: 50,
        placeholder: 'Name'
      }
    }
  ]

  describe('tranformOptions from object', function() {
    it('should tranformOptions from object', function() {
      let topts = transformOptions(testOpts)
      //console.log("topts", topts)
      topts.forEach((item, i) => {
        expect(item).toEqual(resultOpts[i])
      })
      //expect(topts).toEqual(resultOpts)
    })

    it('should tranformOptions from array', function() {
      let topts = transformOptions(testArray)
      //console.log("topts", topts)
      topts.forEach((item, i) => {
        expect(item).toEqual(resultOpts[i])
      })
    })

    it('should work with fieldGroup array', function() {
      let testFieldGroupArray = [
        {
          fieldGroup: _.cloneDeep(testOpts)
        },
        {
          key: 'name',
          maxLength: 50
        }
      ]
      let formlyOpts = transformOptions(testFieldGroupArray)
      //console.log("topts", topts)
      expect(formlyOpts).toEqual(resultFieldGroup)
    })

    it('should work with fieldGroup object', function() {
      let testFieldGroupObject = {
        fieldGroup: _.cloneDeep(testOpts),
        name: {
          maxLength: 50
        }
      }

      let formlyOpts = transformOptions(testFieldGroupObject)
      //console.log("topts", topts)
      expect(formlyOpts).toEqual(resultFieldGroup)
    })
  })

})
