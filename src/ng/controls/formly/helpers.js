import _ from 'lodash'
import {makeLabel} from '../../../utils/labelMaker'

/**
 * transforms options into the formly way
 * @param {*} opts
 */
export function transformOptions(opts){
  let optsAr = opts
  if (_.isPlainObject(opts)) {
    optsAr = _.map(opts, (val, key) => {
      val.key = key
      return val
    })
  }

  const toKeys = ['label', 'required', 'placeholder', 'minLength', 'maxLength', 'rows', 'dataApiKey']

  optsAr = optsAr.reduce(function(accum, item) {
    _.defaults(item, { type: 'input'})
    let templateOptions = _.pick(item, toKeys)
    item = _.omit(item, toKeys)
    _.defaultsDeep(item, { templateOptions})
    if(!item.templateOptions.label) item.templateOptions.label = makeLabel(item.key)
    makeLabel(item)
    accum.push(item)
    return accum
  }, [])

  return optsAr
}

