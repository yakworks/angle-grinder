import _ from 'lodash'
import {isFunction, isPlainObject} from '../../src/utils/inspect'
import apiHolder from '../../src/stores/apiHolder'

export function setupData(opts, dataApiFactory = apiHolder.dataApiFactory) {
  if (opts.dataApiKey){
    const dataApi = dataApiFactory[opts.dataApiKey]
    const dataApiParams = opts.dataApiParams

    // setup data
    opts.data = {}

    //if minimumInputLength then will query on demand
    if(opts.minimumSearchLength) {
      opts.loadOptions = async (filterText) => {
        if (!(filterText.length >= opts.minimumSearchLength)) return
        // console.log('filterText', filterText)
        let params = {qSearch: filterText}
        if(dataApiParams) params.q = dataApiParams
        let res = await dataApi.picklist(params)
        return res.data
      }
    }
    else {
      //if minimumInputLength is not set then load the whole dataset
      opts.data = () => {
        return getDataFromApi({opts, dataApi, dataApiParams})
      }
    }
  }

  // setup defaults for data
  if (opts.items) {
    // if data is an array then tranform it down to be a property of results
    if (Array.isArray(opts.items)) {
      // translateItemsIfNeeded makes ['red','green'] into [{id:'red',name'red}, etc...]
      opts.items = translateItemsIfNeeded(opts)
      console.log("opts.items", opts.items)
    }

    // if(!opts.minimumSearchLength){
    //   // assign special query that can handle promises and the lazy data loading
    //   opts.query = dataQuery(opts)
    // }
  }

  // make data a function if its not
  if (isFunction(opts.data) === false) {
    const tmp = opts.data
    opts.data = function() { return tmp }
  }

  // if (!opts.loadOptions) {
  //   const tmp = opts.data
  //   opts.data = function() { return tmp }
  // }

}

// function called to get data from api picklist
async function getDataFromApi({opts, dataApi, dataApiParams}){
  let res = await dataApi.picklist({q: dataApiParams})
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

export function dataQuery(opts) {
  let data = opts.data // data elements
  // For Searching, not display
  // function used to retrieve the text portion of a data item that is matched against the search
  let getText
  const displayFields = opts.displayFields

  getText = (item) => displayFields.map(fld => item[fld]).join(' ')

  // make results a function if its not
  if (!isFunction(data?.results)) {
    const dres = data.results
    data.results = () => dres
  }

  // make data a function if its not
  if (isFunction(data) === false) {
    const tmp = data
    data = function() { return tmp }
  }

  // cache the data.results
  // let dataResults
  return function(query) {

    var t = query.term; var filtered = { results: [] }; var process
    opts.dataResults = opts.dataResults || data().results()
    if (t === '') {
      Promise.resolve(opts.dataResults).then(res => {

        let dta = res
        // if its an object then assume it pager object with data key
        if (isPlainObject(res)) dta = res.data
        // add the selectAll option if enabled
        if (opts.showSelectAll) dta = [{ id: 'selectAll' }, ...dta]
        return query.callback({ results: dta })
      })
      return
    }

    process = function(datum, collection) {
      var group //, attr
      if (datum.children) {
        group = {}
        group.children = []
        datum.children.forEach(childDatum => process(childDatum, group.children))
        if (group.children.length || query.matcher(t, getText(group), datum)) {
          collection.push(group)
        }
      } else {
        if (query.matcher(t, getText(datum), datum)) {
          collection.push(datum)
        }
      }
    }

    Promise.resolve(opts.dataResults).then(res => {
      let dta = res
      if(!res) console.log("dataQuery empty promise resolved ")
      // if its an object then assume it pager object with data key
      if (isPlainObject(res)) dta = res.data
      if(dta){
        dta.forEach(datum => process(datum, filtered.results))
      }
      query.callback(filtered)
    })
  }
}

export function translateItemsIfNeeded({items, optionIdentifier, labelIdentifier}) {
  if (items && items.length > 0 && typeof items[0] !== 'object') {
    items = items.map((item) => {
      return { [optionIdentifier]: item, [labelIdentifier]: `${item}` }
    })
  }
  return items
}

/**
 * converts an array of strings to and object map
 * makes ['red','green'] into [{id:'red',name'red}, etc...]
 *
 * @param {Array} strArray - the array to convert
 * @param {String} textFieldKey - the key for the object
 */
export function convertSelect2Data(strArray, textFieldKey = 'name') {

  let dataArr
  // if the data array first element is not an object then assume it needs to be converted into {id, name} format
  if (strArray[0] != null && typeof strArray[0] !== 'object') {
    dataArr = []
    strArray.forEach((item) => {
      if (item !== undefined) {
        dataArr.push({ id: item, [textFieldKey]: item })
      }
    })
  }
  return dataArr || strArray
}

// if minimumInputLength > 0 then query api as they type
export function dataMinCharsQuery(opts, dataStoreApi) {
  let timeout
  let quietMillis = opts.quietMillis || 500

  opts.initSelection = angular.noop
  // cache the data.results
  // let dataResults
  return function(query) {
    window.clearTimeout(timeout)
    // quietMillis to wait until done typing,
    timeout = window.setTimeout(function() {
      let q = query.term
      const dataApiKey = opts.dataApiKey
      let picklistQuery = () => dataStoreApi[dataApiKey].picklist({q: q })
      let dataResults = picklistQuery()

      Promise.resolve(dataResults).then(response => {
        var filtered = { more:false, results: [] }
        // if its an object then assume it pager object with data key
        if (isPlainObject(response) && response.data){
          response.data.forEach(datum => filtered.results.push(datum))
        }
        query.callback(filtered)
      })
    }, quietMillis)
  }
}

export default {
  translateItemsIfNeeded,
  setupData
}
