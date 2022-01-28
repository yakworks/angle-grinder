import { get, writable } from 'svelte/store';
import { findIndexById } from '../finders'
import { crudQueryStores } from './crudQueryStores';
import mix from '../mix/mix-it-with';
/** @typedef {import('svelte/store').Writable<{}>} Writable */

const not_implemented = "not implemented"

/**
 * Adds the stores property for the writable and subscriable stores
 */
export const withSubStores = (ds) => {

  const {initData = [], ident = 'id'} = ds

  const stores = crudQueryStores()
  if(initData) stores.setMasterData(initData)

  return mix(ds).with({
    stores, ident,

    unsubs: [], //array to populat with return value of sub for destroy to call

    //if paging this is the pager info with data
    get pageViewStore(){
      return ds.stores.pageViewStore
    },

    //the viewable or filtered data
    get dataStore(){
      return ds.stores.dataStore
    },
  })
}

/**
 * Contract for reading and query
 *
 * @param {object} ds the base object to mix into
 * @returns
 */
export const queryModel = (ds) => {

  const core = withSubStores(ds)

  return mix(ds).with({
    ...core,

    async search(params){ throw Error(not_implemented) },

    /**
     * Fuzzy text search.
     * @param {string} searchKey
     * @returns the filtered items
     */
    async qSearch(text){ throw Error(not_implemented) },

    async picklist(params){ throw Error(not_implemented) },

    /**
     * Returns a promise for the item with the given identifier
     */
    async get(id){ throw Error(not_implemented) },

    /**
     * gets the item in the data list for the id.
     * If the passed in list is a store then it will do a get(list) to unwrap its data first
     */
    findById(data, id){
      const list = (typeof data.subscribe === "function") ? get(data): data
      const idx = ds.findIndexById(list, id)
      return idx === -1 ? false : data[idx]
    },

    /**
     * searches array for id key match and returns it index in the array
     */
    findIndexById(list, id){
      return findIndexById({ list, id , ident: core.ident })
    }

  })
}

/**
 * constract for (c)create, (u)update, (d)delete
 * as well as bulk
 */
export const cudModel = (ds) => {

  const {ident = 'id'} = ds

  return mix(ds).with({

    /**
     * Create if no id prop or Update if it has id prop
     * Returns a promise to save the item.
     * It delegates to update() or create() if the object has or does not have an identifier set
     */
    async save(item){
      return item[ident] ? ds.update(item) : ds.create(item)
    },

    async create(item){ },

    /** Returns a promise to save (PUT) an existing item. */
    async update(item){ throw Error(not_implemented) },

    /**
    * Returns a promise to remove (DELETE) an item.
    */
    async remove(id){ throw Error(not_implemented) },

    /**
     * Bulk updates items
     */
    async bulkUpdate({ids, data}){ throw Error(not_implemented) },

  }) //end mix

}

/**
 * combination queryModel and cudModel
 */
export const crudQueryModel = (ds = {}) => {

  return mix(ds).with(queryModel, cudModel)

}

// export default datastoreStores
