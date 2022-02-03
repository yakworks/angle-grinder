import _ from 'lodash'
import { makeLabel } from '@yakit/core/nameUtils'

export function transformFields(fields, ctrl) {
  // if its a plain object and first key starts with column and its a columns layout
  if (_.isPlainObject(fields) && Object.keys(fields)[0].startsWith('column')) {
    const colarr = _.map(fields, (val, key) => {
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
  if (_.isPlainObject(cfg)) {
    cfg = _.map(cfg, (val, key) => {
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
      _.defaults(field, { className: 'columns' })
    } else {
      const key = field.key
      _.defaults(field, { type: 'input', name: key })
      // pull out the keys into own object
      const tplOpts = _.pick(field, tplOptsKeys)
      const templateOptions = field.templateOptions || {}
      _.defaults(templateOptions, tplOpts)

      // remove them from main field object
      field = _.omit(field, tplOptsKeys)

      // merge in defaults for label and placeholder if they don't exist
      if (_.isUndefined(templateOptions.label)) templateOptions.label = makeLabel(field.key)
      if (_.isUndefined(templateOptions.placeholder)) templateOptions.placeholder = templateOptions.label
      if (field.type === 'select') {
        _.defaultsDeep(templateOptions, { selectOptions: { useDataObject: true } })
      }
      if (field.type.indexOf('addon') > -1) {
        templateOptions.onClick = ($event) => {
          if (!$event) return
          if (typeof templateOptions.addon.action === 'string') {
            const fn = ctrl[templateOptions.addon.action]
            fn.apply(ctrl, [$event])
          } else {
            return templateOptions.addon.action($event)
          }
        }
      }
      _.defaultsDeep(field, { templateOptions })
    }
    accum.push(field)
    return accum
  }, [])
}
