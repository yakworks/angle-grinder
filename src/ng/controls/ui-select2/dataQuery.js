import _ from 'lodash'

export function setupData(opts, dataStoreApi) {
  if (opts.dataApiKey) {
    const dataApiKey = opts.dataApiKey
    opts.data = { results: () => dataStoreApi[dataApiKey].picklist() }
  }
  // setup defaults for data
  if (opts.data) {
    // if data is an array then tranform it down to be a property of results
    if (Array.isArray(opts.data)) {
      // convertSelect2Data makes ['red','green'] into [{id:'red',name'red}, etc...]
      const results = convertSelect2Data(opts.data)
      // console.log('results', results)
      opts.data = { results: results }
    }

    // if data.text is not set then default it to name (select2 defaults it to 'text')
    if (opts.data.text === undefined) {
      opts.data.text = 'name'
    }

    // assign special query that can handle promises
    opts.query = dataQuery(opts)
  }
}
// copied in from select2 source and modified so it works when data.results is a Promise
export function dataQuery(opts) {
  let data = opts.data // data elements
  let getText // function used to retrieve the text portion of a data item that is matched against the search

  const textField = data.text
  if (!$.isFunction(textField)) {
    getText = (item) => item[textField]
  }

  if (!$.isFunction(data.results)) {
    const dres = data.results
    data.results = () => dres
  }

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
        console.log('dta', dta)
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
        // does searching on any attributes too
        // for (attr in datum) {
        //   if (datum.hasOwnProperty(attr)) group[attr] = datum[attr]
        // }
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
      // if its an object then assume it pager object with data key
      if (_.isPlainObject(res)) dta = res.data

      dta.forEach(datum => process(datum, filtered.results))
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
