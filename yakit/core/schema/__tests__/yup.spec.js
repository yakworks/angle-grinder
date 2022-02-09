import _ from 'lodash'
import {transformFields} from '../transformSchema'
import { testSchema, testSchemaColumns } from './testSchemaModel'
import { buildYupValidation, yupFromField, addYupToSchema, checkDecimalFn, extractErrors, countDecimalPlaces} from '../schemaToYup'
import * as yup from 'yup';
import {expect as x} from '@jest/globals'

let nameSchema = {
  label: 'Cust Name',
  description: "A descriptive name for this entity",
  type:'string',
  maxLength: 50,
  minLength: 3,
  required: true //not standard json-schema, but should pick up
}

let localDateSchema = {
  format: 'date'
}

// check array for tests
const hasTest = (yupField, name) => {
  let nameTests = yupField['tests']
  return yupField['tests'].find(item => item.name === name)
}

describe('yup sanity check', () => {

  it('should tranformOptions from object', async function() {
    //let transformed = transformFields(testSchema)

    let yupSchema = yup.object({
      name: yupFromField(nameSchema),
      'user.name': yupFromField(nameSchema),
      localDate: yupFromField(localDateSchema)
    })
    let yupFields = yupSchema.describe().fields

    x(yupFields.localDate.type).toEqual('date')
    x(yupFields.name.type).toEqual('string')

    x(hasTest(yupFields.name, 'required')).toBeTruthy()
    x(hasTest(yupFields.name, 'min')).toBeTruthy()
    x(hasTest(yupFields.name, 'max')).toBeTruthy()

    // let errors = {};
    // let valRes
    // try {
    //   valRes = await yupSchema.validate({name:'xxx', localDate:'2022-13-01'}, { abortEarly: false })
    // } catch (err) {
    //   errors = extractErrors(err);
    // }
    // // x(valRes).toBe(false)
    // x(errors).toEqual({})
  })

  it('should add to transformed list', async function() {
    let transformed = transformFields(testSchema)

    addYupToSchema(transformed)
    // let yupSchema = yup.object({
    //   name: yupFromField(nameSchema),
    //   localDate: yupFromField(localDateSchema)
    // })
    // let yupFields = yupSchema.describe().fields

    // x(yupFields.localDate.type).toEqual('date')
    let nameFld = transformed.find(item => item.key === 'name')
    x(nameFld.validation).toBeTruthy()
    let yupField = nameFld.validation.describe()
    // x(yupField).toEqual({})
    x(hasTest(yupField, 'required')).toBeTruthy()
    x(hasTest(yupField, 'min')).toBeTruthy()
    x(hasTest(yupField, 'max')).toBeTruthy()

    // let nameTests = yupFields.name['tests']
    // x(hasTest(nameTests, 'required')).toBeTruthy()
    // x(hasTest(nameTests, 'min')).toBeTruthy()
    // x(hasTest(nameTests, 'max')).toBeTruthy()

  })

  it('should work for columns config', async function() {
    let transformed = transformFields(testSchemaColumns)
    addYupToSchema(transformed)

    let nameFld = transformed.fields.find(item => item.key === 'name')
    x(nameFld.validation).toBeTruthy()
    let yupField = nameFld.validation.describe()
    // x(yupField).toEqual({})
    x(hasTest(yupField, 'required')).toBeTruthy()
    x(hasTest(yupField, 'min')).toBeTruthy()
    x(hasTest(yupField, 'max')).toBeTruthy()

  })

  it('checkDecimalFn regex', async function() {

    // const numCheck = (number) => new RegExp("^[0-9]{1,15}(?:\.[0-9]{1,2})?$").test(number)
    const numCheck = checkDecimalFn(2)

    x(numCheck(100)).toBe(true)
    x(numCheck(100.1)).toBe(true)
    x(numCheck(100.12)).toBe(true)
    x(numCheck(100.123)).toBe(false)
    x(numCheck(100.000)).toBe(true)
    x(numCheck(100.001)).toBe(false)
  })

  it('countDecimalPlaces', async function() {

    x(countDecimalPlaces(100)).toEqual(0)
    x(countDecimalPlaces(0.01)).toEqual(2)
    x(countDecimalPlaces(100.12)).toEqual(2)
    x(countDecimalPlaces(100.123)).toEqual(3)
    //zeros, since its a number, will get dropped, so 100.000 is = 100
    x(countDecimalPlaces(100.000)).toEqual(0)
    x(countDecimalPlaces(0.001)).toEqual(3)
  })

  it('should buildYupFromSchema', async function() {
    let transformed = transformFields(testSchema)

    let yupSchema = buildYupValidation(transformed)

    // x(yupSchema.describe().fields).toEqual({})

    let descObj = yupSchema.describe()

    let fldKeys = Object.keys(yupSchema.fields)
    x(fldKeys.length).toEqual(10)

    //user should have 2 nested fields
    let userKeys = Object.keys(yupSchema.fields.user.fields)
    // x(yupSchema.fields.user).toEqual({})
    x(userKeys.length).toEqual(2)

    let errors = {};
    let valRes
    try {
      valRes = await yupSchema.validate({
        name:'foo', birthday:'2022-13-01', credits: 100.001
      }, { abortEarly: false })
    } catch (err) {
      // console.log(err)
      errors = extractErrors(err)
    }
    //should get 2 errors for user
    x(errors['credits']).toBeTruthy()
    x(errors['user.login']).toBeTruthy()
    x(errors['user.password']).toBeTruthy()

  })

  it('should buildYupValidation with columns', async function() {
    let transformed = transformFields(testSchemaColumns)

    let yupSchema = buildYupValidation(transformed)

    // x(yupSchema.describe().fields).toEqual({})

    let descObj = yupSchema.describe()

    let fldKeys = Object.keys(yupSchema.fields)
    x(fldKeys.length).toEqual(9)

    //user should have 2 nested fields
    let userKeys = Object.keys(yupSchema.fields.user.fields)
    // x(yupSchema.fields.user).toEqual({})
    x(userKeys.length).toEqual(2)

    let errors = {};
    let valRes
    try {
      valRes = await yupSchema.validate({
        name:'foo', birthday:'2022-13-01', credits: 100.001
      }, { abortEarly: false })
    } catch (err) {
      // console.log(err)
      errors = extractErrors(err)
    }
    //should get 2 errors for user
    x(errors['credits']).toBeTruthy()
    x(errors['user.login']).toBeTruthy()
    x(errors['user.password']).toBeTruthy()

  })
})

