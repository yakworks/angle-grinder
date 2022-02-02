/**
 * transforms config for ui, formify and card lists views, etc...
 * Loosely based on open api and will go further into the direction of extending that spec
 * see the test for examples
 */

import { makeLabel } from '../nameUtils'
import { map, _defaults, pick, omit, defaultsDeep } from '../dash'
import { isUndefined, isPlainObject, isEmpty } from '../is'

export function transformFields(fields, ctrl) {
  console.log("fields", fields)
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
  const tplOptsKeys = ['label', 'required', 'placeholder', 'hint', 'minLength',
    'maxLength', 'rows', 'dataApi', 'selectOptions', 'disabled', 'addon']
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
      selectOptions(field)
      fieldSchemaType(field)
      fieldDefaults(key, field)

      // if (field.input === 'select') {
      //   defaultsDeep(field, { selectOptions: { useDataObject: true } })
      // }

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
 * if enum is specified then this will setup selectOptions for it
 */
export function selectOptions(field) {
  if(field.selectOptions) {
    if(!field.input) field.input = 'select'
    //if isValueObject and no type is set then make it object
    if(!field.type && field.selectOptions.isValueObject) field.type = 'object'
    return
  }
  const fieldEnum = field['enum']
  if(fieldEnum){
    field.selectOptions = {
      data: fieldEnum
    }
    field.input = 'select'
  }
}

/**
 * adds an input based on the schema type. if no schema type then defaults to type:string and input:text
 */
export function fieldSchemaType(field) {
  if(!field.type) field.type = 'string'
  let {type = 'string', format, input } = field
  //if input is specified then its been overriden so do nothing
  if(input) return

  if(format === 'date' || format === 'date-time'){
    input = format
  } else if(type === 'boolean'){
    input = 'toggle'
  } else if(type === 'integer' || type === 'number' ){
    input = type
  } else {
    input = 'text'
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
