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
    dataApiKey, dataApi, dataApiParams, minimumSearchLength, isEagerLoad,
    itemData, propertyKey, propertyLabel, isMulti, isValueObject
  } = opts

  let obj = {}

  obj.init = (dataApiFactory = apiHolder.dataApiFactory) => {
    // console.log("init with opts", opts)
    if (dataApiKey || dataApi){
      if(!dataApi) dataApi = dataApiFactory[dataApiKey]
      // console.log("setup dataApi", dataApi)
      // setup data
      opts.data = {}

      //if minimumInputLength then will query on demand
      if(isEagerLoad) {
        // console.log("setup data func for rest api")
        //if minimumInputLength is not set then load the whole dataset
        opts.data = () => {
          return obj.getDataFromApi({q: dataApiParams}) //get all of it.
        }
      }
      else {
        console.log("is not isEagerLoad so using loadOptions", isEagerLoad)
        opts.loadOptions = async (filterText) => {
          if (!(filterText.length >= minimumSearchLength)) return
          // console.log('filterText', filterText)
          //call picklist with params, if q:dataApiParams is null/undefined it will get pruned off
          let res = await dataApi.picklist({qSearch: filterText, q: dataApiParams})
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
        // console.log("translated item data", opts.data)
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
      console.log("itm[lastItem]", itm[lastItem])
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
  obj.getDataFromApi = async ({q = null, qSearch = null}) => {
    console.log("getDataFromApi called", q, qSearch)
    let res = await dataApi.picklist({q, qSearch})
    let dta = res
    // if its an object then assume it pager object with data key
    if (isPlainObject(dta)) dta = res.data

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
    if(!opts.items && !opts.isWaiting) {
      console.log("first call to load data")
      opts.isWaiting = true
      opts.items = await opts.data()
      console.log("loaded items", opts.items)
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
    // console.log("getSelectedValue", item, finderFunc)
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


  function findItem(selection) {
    return findItemByKey(getItemKey(selection)) || selection
  }

  function findItemByKey(key) {
    // await loadItemsIfNeeded()
    console.log("findItemByKey with key and items", key, opts.items)
    return opts.items.find((item) => getItemKey(item) === key)
  }

  function getItemKey(item) {
    return item[propertyKey]
  }

  Object.assign(obj, { getSelectedValue, findItem, findItemByKey, getItemKey})

  return obj
}

