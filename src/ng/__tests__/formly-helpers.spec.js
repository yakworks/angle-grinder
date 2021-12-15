/* eslint-disable */
import _ from 'lodash'
import {transformFields} from '../controls/formly/helpers'

describe('transformFields', () => {
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
      name: 'foo',
      templateOptions: {
        label: 'Cust #',
        required: true,
        placeholder: 'Cust #'
      }
    },
    {
      key: 'bar.bazBuzz',
      type: 'select',
      name: 'bar.bazBuzz',
      templateOptions: {
        label: 'Baz Buzz',
        dataApiKey: 'barApi',
        placeholder: 'Baz Buzz',
        selectOptions: { useDataObject: true }
      }
    }
  ]

  let resultFieldGroup = [
    {
      className: 'columns',
      fieldGroup: [
        {
          key: 'foo',
          name: 'foo',
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
          name: 'bar.bazBuzz',
          type: 'select',
          className: 'column',
          templateOptions: {
            label: 'Baz Buzz',
            dataApiKey: 'barApi',
            placeholder: 'Baz Buzz',
            selectOptions: { useDataObject: true }
          }
        }
      ]
    },
    {
      key: 'name',
      type: 'input',
      name: 'name',
      templateOptions: {
        label: 'Name',
        maxLength: 50,
        placeholder: 'Name'
      }
    }
  ]

  describe('tranformOptions from object', function() {
    it('should tranformOptions from object', function() {
      let topts = transformFields(testOpts)
      //console.log("topts", topts)
      topts.forEach((item, i) => {
        expect(item).toEqual(resultOpts[i])
      })
      //expect(topts).toEqual(resultOpts)
    })

    it('should tranformOptions from array', function() {
      let topts = transformFields(testArray)
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
      let formlyOpts = transformFields(testFieldGroupArray)
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

      let formlyOpts = transformFields(testFieldGroupObject)
      //console.log("topts", topts)
      expect(formlyOpts).toEqual(resultFieldGroup)
    })

    it('should work with columns', function() {
      let testCols = {
        column1:{
          foo:{}
        },
        column2:{
          bar:{}
        },
        column3:{
          baz:{},
          buzz:{}
        }
      }

      let resultCols = {
        columns: [[
          {
            key: 'foo',
            name: 'foo',
            type: 'input',
            templateOptions: {
              label: 'Foo',
              placeholder: 'Foo'
            }
          }
        ],
        [
          {
            key: 'bar',
            name: 'bar',
            type: 'input',
            templateOptions: {
              label: 'Bar',
              placeholder: 'Bar'
            }
          }
        ],
        [
          {
            key: 'baz',
            name: 'baz',
            type: 'input',
            templateOptions: {
              label: 'Baz',
              placeholder: 'Baz'
            }
          },
          {
            key: 'buzz',
            name: 'buzz',
            type: 'input',
            templateOptions: {
              label: 'Buzz',
              placeholder: 'Buzz'
            }
          }
        ]]
      }

      let formlyOpts = transformFields(testCols)
      //console.log("topts", topts)
      expect(formlyOpts).toEqual(resultCols)
    })
  })

})
