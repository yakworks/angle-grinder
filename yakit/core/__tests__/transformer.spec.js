import _ from 'lodash'
import {transformFields} from '../transformer'
import {expect as x} from '@jest/globals'

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
      required: true
    },
    {
      key: 'bar.bazBuzz',
      type: 'select',
      dataApiKey: 'barApi'
    }
  ]

  let resultOpts = [
    {
      key: 'foo',
      type: 'text',
      name: 'foo',
      label: 'Cust #',
      required: true,
      placeholder: 'Cust #'
    },
    {
      key: 'bar.bazBuzz',
      type: 'select',
      name: 'bar.bazBuzz',
      label: 'Baz Buzz',
      dataApiKey: 'barApi',
      placeholder: 'Baz Buzz',
      selectOptions: { useDataObject: true }
    }
  ]

  let resultFieldGroup = [
    {
      className: 'columns',
      fieldGroup: [
        {
          key: 'foo',
          name: 'foo',
          type: 'text',
          className: 'column',
          label: 'Cust #',
          required: true,
          placeholder: 'Cust #'
        },
        {
          key: 'bar.bazBuzz',
          name: 'bar.bazBuzz',
          type: 'select',
          className: 'column',
          label: 'Baz Buzz',
          dataApiKey: 'barApi',
          placeholder: 'Baz Buzz',
          selectOptions: { useDataObject: true }
        }
      ]
    },
    {
      key: 'name',
      type: 'text',
      name: 'name',
      label: 'Name',
      maxLength: 50,
      placeholder: 'Name'
    }
  ]

  // let searchExample = {
  //   column1: [
  //     {key: 'name'}
  //   ],
  //   column2:[
  //     {key: 'num'}
  //   ],
  //   column3:[
  //     {key: 'ponum'}
  //   ]
  // }

  describe('tranformOptions from object', function() {
    it('should tranformOptions from object', function() {
      let topts = transformFields(testOpts)
      topts.forEach((item, i) => {
        x(item).toEqual(resultOpts[i])
      })
      //expect(topts).toEqual(resultOpts)
    })

    it('should tranformOptions from array', function() {
      let topts = transformFields(testArray)
      topts.forEach((item, i) => {
        x(item).toEqual(resultOpts[i])
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
      x(formlyOpts).toEqual(resultFieldGroup)
    })

    it('should work with fieldGroup object', function() {
      let testFieldGroupObject = {
        fieldGroup: _.cloneDeep(testOpts),
        name: {
          maxLength: 50
        }
      }

      let formlyOpts = transformFields(testFieldGroupObject)
      x(formlyOpts).toEqual(resultFieldGroup)
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
            type: 'text',
            label: 'Foo',
            placeholder: 'Foo'
          }
        ],
        [
          {
            key: 'bar',
            name: 'bar',
            type: 'text',
            label: 'Bar',
            placeholder: 'Bar'
          }
        ],
        [
          {
            key: 'baz',
            name: 'baz',
            type: 'text',
            label: 'Baz',
            placeholder: 'Baz'
          },
          {
            key: 'buzz',
            name: 'buzz',
            type: 'text',
            label: 'Buzz',
            placeholder: 'Buzz'
          }
        ]]
      }

      let formlyOpts = transformFields(testCols)
      x(formlyOpts).toEqual(resultCols)
    })
  })

})
