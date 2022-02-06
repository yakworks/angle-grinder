/**
 * transforms config for ui, formify and card lists views, etc...
 * Loosely based on open api and will go further into the direction of extending that spec
 * see the test for examples
 */

import { makeLabel } from '../nameUtils'
import { map, _defaults, pick, omit, defaultsDeep, merge, get} from '../dash'
import { isUndefined, isPlainObject, isEmpty } from '../is'
import schemaRefs from './schemaRefs'

export function transformFields(fields, ctrl) {
  if(isEmpty(fields)) return fields
  // if its a plain object and first key starts with column and its a columns layout
  if (isPlainObject(fields) && Object.keys(fields)[0].startsWith('column')) {
    //add the references the main fields list
    let fieldList = []
    const colarr = map(fields, (val, key) => {
      const valCopy = val
      let transformedFields = doTransform(valCopy, ctrl)
      fieldList = fieldList.concat(transformedFields)
      return transformedFields
    })
    return { columns: colarr, fields: fieldList}
  } else {
    return doTransform(fields, ctrl)
  }
}

/**
 * transforms our simplified options into the formly way
 * @param {*} opts
 */
export function doTransform(opts, ctrl) {
  // if its a plain object and first key starts with column and its a columns layout
  let convArray = ensureArray(opts)
  const optsAr = doReduce(convArray, ctrl)
  return optsAr
}

function ensureArray(cfg) {
  if (isPlainObject(cfg)) {
    cfg = map(cfg, (val, key) => {
      if (key.startsWith('fieldGroup')) {
        const valCopy = val
        val = { fieldGroup: valCopy, className: 'columns' }
      } else {
        val.key = key
      }
      return val
    })
  }
  return cfg
}

function doReduce(optsAr, ctrl) {
  // const tplOptsKeys = ['label', 'required', 'placeholder', 'hint', 'minLength',
  //   'maxLength', 'rows', 'dataApi', 'selectOptions', 'options', 'disabled', 'addon']
  return optsAr.reduce(function(accum, field) {
    if (field.fieldGroup) {
      field.fieldGroup = doTransform(field.fieldGroup)
      // make sure each item in field group has columns class
      field.fieldGroup.forEach(it => {
        if (!it.className) it.className = 'column'
      })
      _defaults(field, { className: 'columns' })
    } else {
      const key = field.key
      ///merge in ref if it exists
      refMerge(field)
      selectOptions(field)
      fieldSchemaType(field)
      fieldDefaults(key, field)

      if (field.input.indexOf('addon') > -1) {
        field.onClick = ($event) => {
          if (!$event) return
          if (typeof field.addon.action === 'string') {
            const fn = ctrl[field.addon.action]
            fn.apply(ctrl, [$event])
          } else {
            return field.addon.action($event)
          }
        }
      }
      // defaultsDeep(field, tplOpts )
    }
    accum.push(field)
    return accum
  }, [])
}

/**
 * if field has a $ref then do lookup and merge in if found
 * uses a fairly primitive json pointer https://datatracker.ietf.org/doc/html/rfc6901
 * and only works with string starting with '#/' right now
 */
export function refMerge(field) {
  let refKey = field['$ref']
  if(refKey){
    //should start with '#/'
    refKey = refKey.substring(2).replaceAll('/','.')
    const refObj = schemaRefs.get(refKey)
    if(isEmpty(refObj)) return
    delete field['$ref']
    defaultsDeep(field, refObj)
  }
}
/**
 * if enum is specified then this will setup selectOptions for it
 */
export function selectOptions(field) {
  //options or selectOptions will work
  let options = field.selectOptions || field.options
  if(options) {
    if(!field.input) field.input = 'select'
    //if isValueObject and no type is set then make it object
    if(!field.type && options.isValueObject) field.type = 'object'
    // return
  }
  //check enum and merge it in
  const fieldEnum = field['enum']
  if(!isEmpty(fieldEnum)){
    if(!options) options = {}
    options = _defaults(options, {
      data: fieldEnum
    })
    if(!field.input) field.input = 'select'
  }
  field.selectOptions = options
  //remove the field.options if its there
  if(field.options) delete field.options
}


/**
 * adds an input based on the schema type. if no schema type then defaults to type:string and input:text
 */
export function fieldSchemaType(field) {
  if(!field.type) field.type = 'string'
  let {type, format, input } = field
  //if input is specified then its been overriden so do nothing
  if(input) return

  //if type is set to date then convert to standard string with format
  if(type === 'date' || type === 'date-time') {
    format = type
    type = 'string'
  }
  //if format starts with amount. we can have amount, amount-positive, amount-negative
  if(format && format.startsWith("amount")){
    field.multipleOf = 0.01
    if(!type) type = 'number'
  }

  if(format === 'date' || format === 'date-time'){
    input = format
  } else if(type === 'boolean'){
    input = 'toggle'
  } else if(type === 'integer' ){
    input = type
  } else if(type === 'number' ){
    input = type
  } else {
    if(!type) type = 'string'
    input = 'text'
  }
  //do some special formats
  if(format){
    if(format.endsWith("positive") && !field.min ) field.min = 0
    if(format.endsWith("negative") && !field.max ) field.max = 0
  }


  field.type = type
  field.input = input

}

/**
 * sets up default id, name, label, placeholder, type based on the path, see makeLabel.
 *
 * @param {string} path the name/key path
 * @param {object} opts the input options
 */
export function fieldDefaults(path, opts) {
  if (isUndefined(opts.label)) opts.label = makeLabel(path)
  _defaults(opts,{
    // id: path,
    name: path,
    placeholder: opts.label,
    input: 'text'
  })
}

/**
 * for search form type shemas add some defaults such as isMulti:true on selects.
 * if dont want that then set isMulti: false on the passed in and it wont get overwritten
 */
export function searchDefaults(schema){
  let fieldListToUse = schema
  //if its a plain object then assume its a columns config and will have a fields property
  if(isPlainObject(schema)){
    fieldListToUse = schema['fields']
  }

  fieldListToUse.forEach(field => {
    if(field.selectOptions && field.selectOptions.itMulti === undefined){
      field.selectOptions.itMulti = true
      // console.log("searchDefaults", field.selectOptions)
      // _defaults(field.selectOptions,{
      //   itMulti:true
      // })
      // console.log("searchDefaults", field.selectOptions)
    }
  })
}
