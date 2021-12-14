import { kyFetch } from './ky'
import prune from '../utils/prune';
import mix from '../utils/mix-it-with';
import {isObject} from '../utils/inspect';
import { get, writable } from 'svelte/store';

const restgetFeature = ({ api }) => ds => {
  let itemStore = writable({})

  let ext = {
    //current item
    get itemStore(){
      return itemStore
    },
    async get(id) {
      const item = await api.getById(id)
      itemStore.set(item)
      return item
    }
  }
  return Object.assign(ds, ext)
}

const restQueryFeature = ({ api }) => ds => {

  /**
   * the current paged view of the data {data:[...], page: , records: , total: }
   */
  let pageStore = writable({})

  /**
   * the query parameters with the q search {max:int, page:int, sort:string, q:{} , qSearch:string}
   */
  let queryStore = writable({})

  /**
   * when grid is for child or detail data, restrictSearch is what to filter it by,
   * for example is showing invoices for customer then restrictSearch might be set to {custId:123}
   */
  let { restrictSearch } = ds

  /**
   * stringify if its an object, otherwise return itself
   */
  function stringify(o){
    return isObject(o) ? JSON.stringify(o) :o
  }

  let ext = {

    get pageStore(){
      return pageStore
    },

    get pageStoreValue(){
      return get(pageStore)
    },

    get queryStore(){
      return queryStore
    },

    /**
     * adds searchParams, which are the query params ( the part after the ? )
     * and then calls the get. if the params has a q property and its a string then
     * @param {*} params
     */
    async search(params) {
      let searchParams = ds.setupSearchParams(params)
      console.log("searchParams", searchParams)
      const page = await api.get({ searchParams })
      console.log("page", page)
      pageStore.set(page)
      return page
    },

    // prunes params and stringifies the q param if exists
    setupSearchParams(params){
      let pruned = prune(params)
      let { q, sort } = pruned
      if(restrictSearch) q = {...q, ...restrictSearch}
      //save it before we stringify
      queryStore.set({...pruned, q, sort})

      if(q) pruned.q = stringify(q)
      //stringify sort and remove the quotes and brackets
      if(sort) pruned.sort = stringify(sort).replace(/{|}|"/g, '')
      return pruned
    }
  }

  return Object.assign(ds, ext)
}

/**
 * A common wrapper around RESTful resource
 */
export const ListDatastore = ({ endpoint, ...opts }) => {

  //the full data cache, optional use?
  let dataCache = []
  //the filtered data, unpaginated, after a search
  let viewData = []

  let api = kyFetch(endpoint)

  let ds = {
    ...opts,
    api,
    async getData(){
      //if dataCache is empty then fill it.
      return dataCache
    },

    async getViewData(){
      return viewData
    },

    // updates the dataView and the pager
    updateViewData(filteredData) {
      viewData = filteredData
    }
  }

  return mix(ds).it(ListDatastore).with(
    restQueryFeature({ api }),
    getFeature({ api })
  )
}

export default ListDatastore
