/**
* For managing a dimension's select component and its data
*/

import {isFunction, isPlainObject} from '@yakit/core/is'
import mix from '@yakit/core/mix/mix-it-with';
import apiHolder from '@yakit/core/stores/apiHolder'
import { _defaults, isNil, uniqueId, get } from '@yakit/core/dash'

export const defaultOpts = {
  /** How long to wait when typing to do search */
  loadOptionsInterval: 300,
  /** will eagerly load the data set on first request, when false it does not cache and
   *  nothing is loaded until minSearchChars is met*/
  isEagerLoad: true,
  /** when isEagerLoad:false num of chars before load called is made */
  minSearchChars: 3,
  /**when true then can select multiple items */
  isMulti: false,
  /** if true store the selection as the objects vas the key/id */
  isValueObject: false,
  /** the key field in the data */
  propertyKey: 'id',
  /** the label field in the data, can be array if multiple columns should be shown in options list */
  propertyLabel: 'name',

}

/**
 * Common functions for the select data
 */
export const selectContext = (opts) => {

  //setup defaults if they dont exist
  _defaults(opts, defaultOpts)
  if(!opts.id) opts.id = uniqueId('select')
  if(isNil(opts.keepOpen)) opts.keepOpen = opts.isMulti

  //props used from opts
  let {
    minSearchChars, isEagerLoad,
    itemData, propertyKey, propertyLabel, isMulti, isValueObject
  } = opts

  let obj = {}

  obj.init = (dataApiFactory = apiHolder.dataApiFactory) => {
    let dataApiConfig = opts.dataApi || {}
    let dataApiKey = get(dataApiConfig, 'key') || opts.dataApiKey
    if (dataApiKey){
      // setup data
      opts.data = {}

      //old way to be added to q
      const dataApiParams = opts.dataApiParams
      if(!dataApiConfig.q && dataApiParams) dataApiConfig.q = dataApiParams

      const dataApi = get(dataApiFactory, dataApiKey)

      //if minimumInputLength then will query on demand
      if(isEagerLoad) {
        //if minimumInputLength is not set then load the whole dataset
        opts.data = () => {
          return obj.getDataFromApi({opts, dataApi, dataApiConfig}) //get all of it.
        }
      }
      else {
        opts.loadOptions = async (filterText) => {
          if (!(filterText.length >= minSearchChars)) return
          let qSearch = filterText
          let qExtra = dataApiConfig.q
          let params = dataApiConfig.params || {}
          let res = await dataApi.picklist({qSearch, q: qExtra, ...params})
          return res.data
        }
      }
    }

    // setup defaults for items if its specified
    if (itemData) {
      // if data is an array then tranform it down to be a property of results
      if (Array.isArray(itemData)) {
        // translateItemsIfNeeded makes ['red','green'] into [{id:'red',name'red}, etc...]
        opts.data = obj.translateItemsIfNeeded(itemData)
      }
    }

    // make data a function if its not
    if (isFunction(opts.data) === false) {
      const tmp = opts.data
      opts.data = async () => {
        // await obj.delay(1000)
        return tmp
      }
    }

    return obj
  }

  /**
   * gets the option label that shows for list and input for selected.
   * If its a multi column then this returns an array of values to show
   */
  obj.getOptionLabel = (item, filterText) => {
    if (Array.isArray(opts.propertyLabel)) {
      return opts.propertyLabel.map(prop => item[prop])
    } else {
      return item.isCreator ? `Create \"${filterText}\"` : item[opts.propertyLabel]
    }
  }

  /**
   * if opts.propertyLabel is array then defaults to using the last item as selectLabel
   */
  obj.getSelectionLabel = (itm) => {
    if (!itm) return null

    if (Array.isArray(opts.propertyLabel)) {
      const lastItem = opts.propertyLabel[opts.propertyLabel.length - 1]
      return itm[lastItem]
    } else {
      return itm[opts.propertyLabel];
    }
  }

  obj.translateItemsIfNeeded = (items) => {
    if (items && items.length > 0 && typeof items[0] !== 'object') {
      items = items.map((item) => {
        return { [propertyKey]: item, [propertyLabel]: `${item}` }
      })
    }
    return items
  }

  // function called to get data from api picklist
  obj.getDataFromApi = async ({opts, dataApi, dataApiConfig}) => {

    let qExtra = dataApiConfig.q
    let params = dataApiConfig.params || {}
    let res = await dataApi.picklist({q: qExtra, ...params})
    let dta = res
    // if its an object then assume it pager object with data key
    if (_.isPlainObject(dta)) dta = res.data

    //if it has a keyField then translate it to the id, used when you want 'code' or maybe 'email' to be the key thats set
    if(opts.propertyKey !== 'id') {
      dta = dta.map(o => {
        return { ...o, _id: o.id, id: o[opts.propertyKey]}
      })
    }
    if(opts.addData) {
      if (Array.isArray(opts.addData)) {
        dta = [...opts.addData, ...dta]
      } else {
        dta = [opts.addData, ...dta]
      }
    }
    return dta
  }

  //can use in testing to simulate rest delay
  obj.delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  /**
   * checks id loading items is needed and loads if so.
   * @returns the loaded items
   */
  obj.loadItemsIfNeeded = async (_) => {
    if(!opts.isEagerLoad) return
    if(!opts.items && !opts.isWaiting) {
      opts.isWaiting = true
      opts.items = await opts.data()
      opts.isWaiting = false
    }
    return opts.items
  }

  /**
   * gets the selected item for the value. If isValueObject is set then it just returns the passed in value
   * @return the value
   */
  obj.getSelectedItem = (value) => {
    if(opts.isValueObject) {
      return value
    } else {
      return obj.getSelectedValue(value, obj.findItemByKey)
    }
  }

  function getSelectedValue(item, finderFunc) {
    //finder function to use
    if(!finderFunc) finderFunc = isValueObject ? findItem : getItemKey
    let val
    if (isMulti && Array.isArray(item)) {
      val = item.map((selection) => finderFunc(selection));
      // keyVal = item.map( selection => getItemKey(selection))
    } else {
      val = finderFunc(item)
    }
    return val
  }

  /**
   * Uses the key/id in the passed in selection to find the entry in the items
   * if nothing found then returns the passed in selection
   *
   * @param {*} selection the object that is selected that should be matched
   * @returns
   */
  function findItem(selection) {
    return findItemByKey(getItemKey(selection)) || selection
  }

  /**
   * finds the item in opts.items for the key/id
   *
   * @param {*} key the id or key to look in the list for
   * @returns the found object
   */
  function findItemByKey(key) {
    if(!opts.items) return undefined
    return opts.items.find((item) => getItemKey(item) === key)
  }

  function getItemKey(item) {
    return item[propertyKey]
  }

  //set up functions on opts for components
  if(!opts.getOptionLabel) opts.getOptionLabel = obj.getOptionLabel
  if(!opts.getSelectionLabel) opts.getSelectionLabel = obj.getSelectionLabel

  Object.assign(obj, { getSelectedValue, findItem, findItemByKey, getItemKey})

  return obj
}

export default selectContext
