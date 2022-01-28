import { get, writable } from 'svelte/store';
import mix from '../mix/mix-it-with';
import { findIndexById } from '../finders'
/** @typedef {import('svelte/store').Writable<{}>} Writable */

/**
 * The base datastore composed of the the stores for current item, page
 */
export const crudQueryStores = (stores = {}) => {

  let stateStore = writable({})

  let itemStore = writable({})

  let pageViewStore = writable({})

  let queryStore = writable({})

  let masterDataStore = writable([])

  let dataStore = writable([])

  return mix(stores).with({

    /**
    * state store for isDense, hasSelected, showSearchForm, selectedItem, selectedId
    * @type {Writable}
    */
    get stateStore(){
      return stateStore
    },

    /**
    * the store for the current item that has been select
    * @type {Writable}
    */
    get itemStore(){
      return itemStore
    },

    setItem(currentItem){
      itemStore.set(currentItem)
    },

    /**
     * The data cache. will be the entire data when not rest.
     * not sync as it should already be loaded before this is called
     * @type {Writable}
     */
    get masterDataStore(){
      return masterDataStore
    },

    /**
     * sets the data in the store
     */
    setMasterData(data){
      return masterDataStore.set(data)
    },

    /**
    * the actual data list from the store
    * @return {object}
    */
    getMasterData(){
      return get(masterDataStore)
    },

    /**
    * the current or visible array of data after filter.
    * on init this would be equal to whats in the masterData
    * @type {Writable}
    */
    get dataStore(){
      return dataStore
    },

    /**
    * the current array of filtered of viewable data
    * @type {object}
    */
    getData(){
      return get(dataStore)
    },

    /**
     * sets the viewable data in the store
     */
    setData(data){
      return dataStore.set(data)
    },

    /**
    * the current page view of the data {data:[...], page: , records: , total: }
    * @type {Writable}
    */
    get pageViewStore(){
      return pageViewStore
    },

    /**
    * the page data
    * @type {object}
    */
    getPageView(){
      return get(pageViewStore)
    },

    /**
     * sets the page data into the store
     */
    setPageView(pageData){
      return pageViewStore.set(pageData)
    },

    /**
    * the query parameters with the q search {max:int, page:int, sort:string, q:{} , qSearch:string}
    * @type {Writable}
    */
    get queryStore(){
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
