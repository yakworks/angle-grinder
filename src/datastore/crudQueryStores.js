import { get, writable } from 'svelte/store';
import { findIndexById } from '../utils/finders'
/** @typedef {import('svelte/store').Writable<{}>} Writable */

/**
 * The base datastore composed of the the stores for current item, page
 */
export const CommonStores = (o = {}) => {

  let itemStore = writable({})

  let pageStore = writable({})

  let queryStore = writable({})

  let dataCacheStore = writable([])

  let viewDataStore = writable([])

  let stores = {

    /**
    * the store for the current item
    * @type {Writable}
    */
    get item(){
      return itemStore
    },

    /**
     * The data cache. will be the entire data when not rest.
     * not sync as it should already be loaded before this is called
     * @type {Writable}
     */
    get dataCache(){
      return dataCacheStore
    },

    /**
     * sets the data in the store
     */
    setDataCache(data){
      return dataCacheStore.set(data)
    },

    /**
    * the actual data list from the store
    * @return {object}
    */
    getDataCache(){
      return get(dataCacheStore)
    },

    /**
    * the current store array of filtered data
    * @type {Writable}
    */
    get viewData(){
      return viewDataStore
    },

    /**
    * the current array of filtered
    * @type {object}
    */
    getViewData(){
      return get(viewDataStore)
    },

    /**
     * sets the data in the view store
     */
    setViewData(data){
      return viewDataStore.set(data)
    },

    /**
    * the current page store view of the data {data:[...], page: , records: , total: }
    * @type {Writable}
    */
    get page(){
      return pageStore
    },

    /**
    * the page data
    * @type {object}
    */
    getPage(){
      return get(pageStore)
    },

    /**
     * sets the page data into the store
     */
    setPage(pageData){
      return pageStore.set(pageData)
    },

    /**
    * the query parameters with the q search {max:int, page:int, sort:string, q:{} , qSearch:string}
    * @type {Writable}
    */
    get query(){
      return queryStore
    },

    /**
     * sets the page data into the store
     */
    setQuery(qdata){
      return queryStore.set(qdata)
    },
  }
  return Object.assign(o, stores)
}
