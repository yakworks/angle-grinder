/**
 * transforms config for ui, formify and card lists views, etc...
 * Loosely based on open api and will go further into the direction of extending that spec
 * see the test for examples
 */

import { makeLabel } from './nameUtils'
import { map, _defaults, pick, omit, defaultsDeep } from './dash'
import { isUndefined, isPlainObject } from './is'

export function transformFields(fields, ctrl) {
  // if its a plain object and first key starts with column and its a columns layout
  if (isPlainObject(fields) && Object.keys(fields)[0].startsWith('column')) {
    const colarr = map(fields, (val, key) => {
      const valCopy = val
      return doTransform(valCopy, ctrl)
    })
    return { columns: colarr }
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
  // let optsAr = ensureArray(opts)
  const optsAr = doReduce(ensureArray(opts), ctrl)
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
    'maxLength', 'rows', 'dataApiKey', 'selectOptions', 'disabled', 'addon']
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
      fieldDefaults(key, field)

      if (field.type === 'select') {
        defaultsDeep(field, { selectOptions: { useDataObject: true } })
      }

      if (field.type.indexOf('addon') > -1) {
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
    type: 'text'
  })
}
