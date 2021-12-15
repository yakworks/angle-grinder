import { get, writable } from 'svelte/store';
import mix from '../utils/mix-it-with';
import { findIndexById } from '../utils/finders'
/** @typedef {import('svelte/store').Writable<{}>} Writable */

/**
 * The base datastore composed of the the stores for current item, page
 */
export const crudQueryStores = (stores = {}) => {

  let itemStore = writable({})

  let pageStore = writable({})

  let queryStore = writable({})

  let dataCacheStore = writable([])

  let viewDataStore = writable([])

  return mix(stores).with({

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
    * the current or visible array of data after filter.
    * on init this would be equal to whats in the dataCache
    * @type {Writable}
    */
    get data(){
      return viewDataStore
    },

    /**
    * the current array of filtered of viewable data
    * @type {object}
    */
    getData(){
      return get(viewDataStore)
    },

    /**
     * sets the viewable data in the store
     */
    setData(data){
      return viewDataStore.set(data)
    },

    /**
    * the current page view of the data {data:[...], page: , records: , total: }
    * @type {Writable}
    */
    get pageView(){
      return pageStore
    },

    /**
    * the page data
    * @type {object}
    */
    getPageView(){
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

  }) //end mix
}