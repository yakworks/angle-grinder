import _ from 'lodash'

export function setupData(opts, dataStoreApi) {
  if (opts.dataApiKey){
    //if minimumInputLength is not set then load the whole dataset
    if(!opts.minimumInputLength) {
      const dataApiKey = opts.dataApiKey
      const dataApiParams = opts.dataApiParams
      opts.data = { results: () => dataStoreApi[dataApiKey].picklist({q: dataApiParams}) }
    }
    else {
      opts.data = {}
      opts.query = dataMinCharsQuery(opts, dataStoreApi)
    }
  }
  // setup defaults for data
  if (opts.data) {
    // if data is an array then tranform it down to be a property of results
    if (Array.isArray(opts.data)) {
      // convertSelect2Data makes ['red','green'] into [{id:'red',name'red}, etc...]
      const results = convertSelect2Data(opts.data)
      opts.data = { results: results }
    }
    if(!opts.minimumInputLength){
      // assign special query that can handle promises and the lazy data loading
      opts.query = dataQuery(opts)
    }
  }

}
// copied in from select2 source and modified so it works when data.results is a Promise
export function dataQuery(opts) {
  let data = opts.data // data elements
  let getText // function used to retrieve the text portion of a data item that is matched against the search
  const displayFields = opts.displayFields

  if (displayFields.length > 1 ) {
      getText = (item) => displayFields.map(text => item[text]).join(' ')
  } else {
      getText = (item) => opts.text(item)
  }


  // make results a function if its not
  if (!$.isFunction(data?.results)) {
    const dres = data.results
    data.results = () => dres
  }

  // make data a function if its not
  if ($.isFunction(data) === false) {
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
        if (_.isPlainObject(res)) dta = res.data
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
      if (_.isPlainObject(res)) dta = res.data
      if(dta){
        dta.forEach(datum => process(datum, filtered.results))
      }
      query.callback(filtered)
    })
  }
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
  // if the data array first element is not an object then assume it needs to be converted into {id, text} format
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
        if (_.isPlainObject(response) && response.data){
          response.data.forEach(datum => filtered.results.push(datum))
        }
        query.callback(filtered)
      })
    }, quietMillis)
  }
}
