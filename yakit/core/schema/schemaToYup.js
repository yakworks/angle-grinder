/**
 * takes a transformed field list and adds yup validation to it
 */
import * as yup from 'yup';
import { parse, isDate, parseISO } from "date-fns";
import {get, set} from '../dash'
import {isNothing} from '../truthy'
import { isUndefined, isPlainObject } from '../is'

function parseLocalDate(value, originalValue) {
  const parsedDate = isDate(originalValue) ? originalValue : parse(originalValue, "yyyy-MM-dd", new Date())
  return parsedDate
}

function parseLocalDateTime(value, originalValue) {
  const parsedDate = isDate(originalValue) ? originalValue : parseISO(originalValue)
  return parsedDate
}

export function countDecimalPlaces(value) {
  let text = value.toString()
  // verify if number 0.000005 is represented as "5e-6"
  if (text.indexOf('e-') > -1) {
    let [base, trail] = text.split('e-');
    let deg = parseInt(trail, 10);
    return deg;
  }
  // count decimals for number in representation like "0.123456"
  if (Math.floor(value) !== value) {
    return value.toString().split(".")[1].length || 0;
  }
  return 0;
}

/** returns functions that when called is true if matches precision regex, false if not */
export function checkDecimalFn(precision){
  const checkPrec = (number) => {
    if(isNothing(number)) return true //if its nothing then dont validate
    return new RegExp("^[0-9]{1,15}(?:\.[0-9]{1," + precision + "})?$").test(number)
  }
  return checkPrec
}
/**
 * add test for decimal places
 *
 * @param {*} fldSChema the field schema for yup
 * @param {number} precision the integer for number of decimal places
 * @returns the schema
 */
function decimalPrecision(fldSChema, precision = 2) {
  return fldSChema.test("maxDecimalPrecision",
    "number field must have 2 decimal places or less", checkDecimalFn(precision)
  )
}


/**
 * Shapes a yup validation for a field
 *
 * @param {Object} fieldSchema the schema property field
 * @returns the created yup object
 */
export function yupFromField(fieldSchema){
  let {type = 'string', format, required, minLength, maxLength, minimum, maximum, multipleOf} = fieldSchema

  let yupFn

  if(format === 'date' ){
    yupFn = yup.date().nullable()//.transform(parseLocalDate)
  } else if(format === 'date-time'){
    yupFn = yup.date().nullable()//.transform(parseLocalDateTime)
  } else if(type === 'boolean'){
    yupFn = yup.boolean()
  } else if(type === 'number' ){
    yupFn = yup.number().nullable()
    // yupFn = decimalPrecision(yupFn)
    if(multipleOf) {
      const precision = countDecimalPlaces(multipleOf)
      yupFn = decimalPrecision(yupFn, precision)
    }
  } else if(type === 'integer' ){
    yupFn = yup.number().integer().nullable()
  } else if(type === 'object' ){
    yupFn = yup.object().nullable()
    //?? if its an object return now and dont try the other stuff
    return yupFn
  } else {
    yupFn = yup.string().nullable()
  }

  if(required) yupFn = yupFn.required()
  if(minLength) yupFn = yupFn['min'](minLength)
  if(maxLength) yupFn = yupFn.max(maxLength)
  if(minimum) yupFn = yupFn.min(minimum)
  if(maximum) yupFn = yupFn.max(maximum)
  return yupFn
}

/**
 * Adds a yup property to all the shema fields in the list
 * fieldList should have run through the tranform already and either be a list of field configs
 * with the key field being the most important. Or it can be an object with a columns key
 * and the columns key will be a list of lists but the fields key should be a flatten list of all the fields
 * @param {Array} fieldList
 */
export function addYupToSchema(fieldList){
  let fieldListToUse = fieldList
  //if its a plain object then assume its a columns config and will have a fields property
  if(isPlainObject(fieldList)){
    fieldListToUse = fieldList['fields']
  }
  fieldListToUse.forEach(field => {
    if (!field.validation) {
      field.validation = yupFromField(field)
    }
  })
}

function createYupSchema(fields){
  let fieldListToUse = fields
  //if its a plain object then assume its a columns config and will have a fields property
  if(isPlainObject(fields)){
    fieldListToUse = fields['fields']
  }
  //first nest the validations so that any fields with dots in path are nested objects
  const valObj = {}
  fieldListToUse.forEach(field => {
    if (field.validation) {
      set(valObj, `${field.key}.validation`, field.validation)
    }
  })
  return createFromNested(valObj)
}

function createFromNested(valObj){
  const valObjKeys = Object.keys(valObj)
  const yupSchemaObj = {}
  valObjKeys.forEach(key => {
    const val = valObj[key]
    if(val.validation){
      //its the low level so just add it
      yupSchemaObj[key] = val.validation
    } else {
      //its nested so get it recursively
      yupSchemaObj[key] = createFromNested(val)
    }
  })
  // @ts-ignore
  return yup.object().shape(yupSchemaObj)
}

/**
 * buld yup from a list of field that have yup property
 * if they have dot paths then its will build those nested.
 *
 * @param {Array} fieldList with each item having the yup field built
 */
export function buildYupValidation(fieldList){
  addYupToSchema(fieldList)
  return createYupSchema(fieldList)
}

export function extractErrors(err){
  return err.inner.reduce((acc, err) => {
    return { ...acc, [err.path]: err.message };
  }, {});
}

// export default {
//   addYupToSchema,
//   yupFromField
// }
