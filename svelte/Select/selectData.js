import _ from 'lodash'
import {isFunction, isPlainObject} from '../../src/utils/inspect'
import mix from '../../src/utils/mix-it-with';
import apiHolder from '../../src/stores/apiHolder'

/**
 * Common functions for the select data
 */
export const selectData = (opts) => {

  //props used from opts
  let {
    dataApiKey, dataApi, dataApiParams, minimumSearchLength,
    items, propertyKey, propertyLabel, isMulti, isItemValue
  } = opts

  let obj = {}

  obj.init = (dataApiFactory = apiHolder.dataApiFactory) => {
    if (dataApiKey || dataApi){
      if(!dataApi) dataApi = dataApiFactory[dataApiKey]

      // setup data
      opts.data = {}

      //if minimumInputLength then will query on demand
      if(minimumSearchLength) {
        opts.loadOptions = async (filterText) => {
          if (!(filterText.length >= minimumSearchLength)) return
          // console.log('filterText', filterText)
          //call picklist with params, if q:dataApiParams is null/undefined it will get pruned off
          let res = await dataApi.picklist({qSearch: filterText, q: dataApiParams})
          return res.data
        }
      }
      else {
        //if minimumInputLength is not set then load the whole dataset
        opts.data = () => {
          return obj.getDataFromApi({q: dataApiParams}) //get all of it.
        }
      }
    }

    // setup defaults for items if its specified
    if (items) {
      // if data is an array then tranform it down to be a property of results
      if (Array.isArray(items)) {
        // translateItemsIfNeeded makes ['red','green'] into [{id:'red',name'red}, etc...]
        opts.items = items = obj.translateItemsIfNeeded(items)
        console.log("opts.items", opts.items)
      }
    }

    // make data a function if its not
    if (isFunction(opts.data) === false) {
      const tmp = opts.data
      opts.data = function() { return tmp }
    }

    return obj
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
  obj.getDataFromApi = async ({q = null, qSearch = null}) => {
    let res = await dataApi.picklist({q, qSearch})
    let dta = res
    // if its an object then assume it pager object with data key
    if (isPlainObject(dta)) dta = res.data

    //if it has a keyField then translate it to the id, used when you want 'code' or maybe 'email' to be the key thats set
    if(opts.fields.id !== 'id') {
      dta = dta.map(o => {
        return { ...o, _id: o.id, id: o[opts.fields.id]}
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

  function getSelectedValue(item) {
    console.log("watchSelectedItem", item)
    //finder function to use
    let finder = isItemValue ? findItem : getItemKey
    let val
    if (isMulti && Array.isArray(item)) {
      val = item.map((selection) => finder(selection));
      // keyVal = item.map( selection => getItemKey(selection))
    } else {
      val = finder(item)
    }
    return val
  }

  function getSelectedValue(item, finderFunc) {
    console.log("getSelectedValue", item)
    //finder function to use
    if(!finderFunc) finderFunc = isItemValue ? findItem : getItemKey
    let val
    if (isMulti && Array.isArray(item)) {
      val = item.map((selection) => finderFunc(selection));
      // keyVal = item.map( selection => getItemKey(selection))
    } else {
      val = finderFunc(item)
    }
    return val
  }


  function findItem(selection) {
    return findItemByKey(getItemKey(selection)) || selection
  }

  function findItemByKey(key) {
    return items.find((item) => getItemKey(item) === key)
  }

  function getItemKey(item) {
    return item[propertyKey]
  }

  Object.assign(obj, { getSelectedValue, findItem, findItemByKey, getItemKey})

  return obj
}

