import _ from 'lodash'
import { makeLabel } from '../../../utils/labelMaker'

/**
 * transforms our simplified options into the formly way
 * @param {*} opts
 */
export function transformOptions(opts) {
  let optsAr = ensureArray(opts)
  optsAr = doReduce(optsAr)

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

function doReduce(optsAr) {
  const tplOptsKeys = ['label', 'required', 'placeholder', 'minLength', 'maxLength', 'rows', 'dataApiKey']

  return optsAr.reduce(function(accum, field) {
    if (field.fieldGroup) {
      field.fieldGroup = doReduce(ensureArray(field.fieldGroup))
      // make sure each item in field group has columns class
      field.fieldGroup.forEach(it => {
        if (!it.className) it.className = 'column'
      })
      _.defaults(field, { className: 'columns' })
    } else {
      _.defaults(field, { type: 'input' })
      // pull out the keys into own object
      const tplOpts = _.pick(field, tplOptsKeys)
      const templateOptions = field.templateOptions || {}
      _.defaults(templateOptions, tplOpts)

      // remove them from main field object
      field = _.omit(field, tplOptsKeys)

      // merge in defaults for label and placeholder if they don't exist
      if (_.isUndefined(templateOptions.label)) templateOptions.label = makeLabel(field.key)
      if (_.isUndefined(templateOptions.placeholder)) templateOptions.placeholder = templateOptions.label

      _.defaultsDeep(field, { templateOptions })
    }
    accum.push(field)
    return accum
  }, [])
}
