import _ from 'lodash'
import {transformFields} from '../transformSchema'
import { testSchema, testSchemaColumns } from './testSchemaModel'
import {expect as x} from '@jest/globals'
import schemaRefs from '../schemaRefs'

describe('transformFields', () => {

  let resultSchema = [
    {
      label: 'Cust Name',
      description: "A descriptive name for this entity",
      type:'string',
      maxLength: 50,
      minLength: 3,
      required: true,
      //added
      key: 'name',
      name: 'name',
      placeholder: 'Cust Name',
      input: 'text'
    },
    {
      key: 'email',
      name: 'email',
      label: 'Email',
      placeholder: 'Email',
      input: 'text',
      type:'string'
    },
    {
      type: 'string',
      format: 'date',
      key: 'birthday',
      name: 'birthday',
      label: 'Birthday',
      placeholder: 'Birthday',
      input: 'date'
    },
    {
      key: 'type',
      type: 'string',
      enum: [ 'Customer', 'Vendor', 'Prospect'],
      name: 'type',
      label: 'Type',
      placeholder: 'Type',
      input: 'select',
      selectOptions:{
        data: [ 'Customer', 'Vendor', 'Prospect']
      }
    },
    {
      key: 'picker',
      type: 'object',
      name: 'picker',
      label: 'Picker',
      placeholder: 'Picker',
      input: 'select',
      selectOptions:{
        isValueObject: true,
        data:['foo', 'bar']
      }
    },
    {
      key: 'inactive',
      type: 'boolean',
      name: 'inactive',
      label: 'Inactive',
      placeholder: 'Inactive',
      input: 'toggle',
    },
    {
      key: 'credits',
      type: 'number',
      minimum: 0,
      multipleOf : 0.01,
      name: 'credits',
      label: 'Credits',
      placeholder: 'Credits',
      input: 'number',
    },
    {
      key: 'weight',
      type: 'integer',
      minimum: 0,
      name: 'weight',
      label: 'Weight',
      placeholder: 'Weight',
      input: 'integer',
    },
    {
      key: 'user.password',
      minLength: 5,
      required: true,
      name: 'user.password',
      label: 'Password',
      placeholder: 'Password',
      input: 'password',
      type:'string'
    },
    {
      key: 'user.login',
      minLength: 5,
      required: true,
      name: 'user.login',
      label: 'Login',
      placeholder: 'Login',
      input: 'text',
      type:'string'
    },
    {
      key: 'dates.date1',
      format: 'date-time',
      name: 'dates.date1',
      label: 'Date1',
      placeholder: 'Date1',
      input: 'date-time',
      type:'string'
    },
    {
      key: 'dates.date2',
      type: 'string',
      format: 'date',
      name: 'dates.date2',
      label: 'Date2',
      placeholder: 'Date2',
      input: 'date',
    }
  ]

  let resultFieldGroup = [
    {
      className: 'columns',
      fieldGroup: [
        {
          key: 'foo',
          name: 'foo',
          input: 'text',
          className: 'column',
          label: 'Cust #',
          required: true,
          placeholder: 'Cust #'
        },
        {
          key: 'bar.bazBuzz',
          name: 'bar.bazBuzz',
          input: 'select',
          className: 'column',
          label: 'Baz Buzz',
          dataApi: { key: 'barApi'},
          placeholder: 'Baz Buzz',
          selectOptions: { useDataObject: true }
        }
      ]
    },
    {
      key: 'name',
      input: 'text',
      name: 'name',
      label: 'Name',
      maxLength: 50,
      placeholder: 'Name'
    }
  ]

  describe('tranformOptions from object', function() {
    it('should tranformOptions from object', function() {
      let topts = transformFields(testSchema)
      console.log("topts", topts)
      topts.forEach((item, i) => {
        x(item).toEqual(resultSchema[i])
      })
      //expect(topts).toEqual(resultOpts)
    })

    it('should tranformOptions options to selectOption', function() {
      let topts = transformFields({
        picker:{
          input: 'select',
          options:{
            isValueObject: true,
            data:['foo', 'bar']
          }
        }
      })
      console.log("topts", topts)
      x(topts[0].selectOptions).toEqual({
        isValueObject: true,
        data:['foo', 'bar']
      })
    })

    it('should merge in refs', function() {
      schemaRefs.refs = {
        some:{
          picklists:{
            fooinator:{
              label: 'pick a foo',
              input: 'select',
              type: 'string',
              placeholder: 'pick a foo',
              options:{
                isValueObject: true,
                data:['foo', 'bar']
              }
            }
          }
        }
      }
      let topts = transformFields({
        fooPick:{
          label: 'better foo',
          '$ref': '#/some/picklists/fooinator',
          options:{
            dataApi:{
              key: 'foo'
            }
          }
        }
      })
      console.log("topts", topts)
      x(topts[0]).toEqual({
        key: 'fooPick',
        label: 'better foo',
        name: 'fooPick',
        type: 'string',
        input: 'select',
        placeholder: "pick a foo",
        selectOptions:{
          isValueObject: true,
          data:['foo', 'bar'],
          dataApi:{
            key: 'foo'
          }
        }
      })
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

      let resultCols = [[
          {
            key: 'foo',
            name: 'foo',
            input: 'text',
            label: 'Foo',
            placeholder: 'Foo',
            type:'string'
          }
        ],
        [
          {
            key: 'bar',
            name: 'bar',
            input: 'text',
            label: 'Bar',
            placeholder: 'Bar',
            type:'string'
          }
        ],
        [
          {
            key: 'baz',
            name: 'baz',
            input: 'text',
            label: 'Baz',
            placeholder: 'Baz',
            type:'string'
          },
          {
            key: 'buzz',
            name: 'buzz',
            input: 'text',
            label: 'Buzz',
            placeholder: 'Buzz',
            type:'string'
          }
        ]]

      let formlyOpts = transformFields(testCols)
      x(formlyOpts.columns).toEqual(resultCols)
    })

    it('test schema columns', function() {
      let trans = transformFields(testSchemaColumns)
      x(trans.columns.length).toEqual(2)
      x(trans.fields.length).toEqual(11)
    })
  })

})
